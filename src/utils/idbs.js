// src/utils/idb.js
const DB_NAME = "csc375-docs"; // keep this constant across the app
const VERSION = 3;             // bump when schema changes (only increase)
const STORES = { FILES: "files", NOTES: "notes" };

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;

      // Files store
      if (!db.objectStoreNames.contains(STORES.FILES)) {
        const s = db.createObjectStore(STORES.FILES, { keyPath: "id" });
        s.createIndex("by_date", "createdAt");
      }

      // Notes store
      if (!db.objectStoreNames.contains(STORES.NOTES)) {
        const s = db.createObjectStore(STORES.NOTES, { keyPath: "id" });
        s.createIndex("by_kind", "kind", { unique: false });        // 'team' | 'client'
        s.createIndex("by_createdAt", "createdAt", { unique: false });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/* ---------- Low level helpers ---------- */
function tx(db, store, mode, fn) {
  return new Promise((res, rej) => {
    const t = db.transaction(store, mode);
    const s = t.objectStore(store);
    const out = fn(s);
    t.oncomplete = () => res(out?.result ?? undefined);
    t.onerror = () => rej(t.error);
  });
}
function getAll(db, store) {
  return tx(db, store, "readonly", (s) => s.getAll());
}
function getOne(db, store, id) {
  return tx(db, store, "readonly", (s) => s.get(id));
}
function addOne(db, store, rec) {
  return tx(db, store, "readwrite", (s) => s.add(rec));
}
function putOne(db, store, rec) {
  return tx(db, store, "readwrite", (s) => s.put(rec));
}
function delOne(db, store, id) {
  return tx(db, store, "readwrite", (s) => s.delete(id));
}

/* ---------- Files API ---------- */
export async function addFile(record) {
  const db = await openDB();
  await addOne(db, STORES.FILES, record);
}
export async function getAllFiles() {
  const db = await openDB();
  const list = await getAll(db, STORES.FILES);
  return (list || []).sort((a, b) => b.createdAt - a.createdAt);
}
export async function getFile(id) {
  const db = await openDB();
  return await getOne(db, STORES.FILES, id);
}
export async function updateFile(id, patch) {
  const db = await openDB();
  const cur = await getOne(db, STORES.FILES, id);
  if (cur) await putOne(db, STORES.FILES, { ...cur, ...patch });
}
export async function deleteFile(id) {
  const db = await openDB();
  await delOne(db, STORES.FILES, id);
}

/* ---------- Notes API ---------- */
export async function addNote(record) {
  const db = await openDB();
  await addOne(db, STORES.NOTES, record);
}
export async function getNotes(kind) {
  const db = await openDB();
  const list = await getAll(db, STORES.NOTES);
  return (list || [])
    .filter((n) => n.kind === kind)
    .sort((a, b) => b.createdAt - a.createdAt);
}
export async function updateNote(id, patch) {
  const db = await openDB();
  const cur = await getOne(db, STORES.NOTES, id);
  if (cur) await putOne(db, STORES.NOTES, { ...cur, ...patch });
}
export async function deleteNote(id) {
  const db = await openDB();
  await delOne(db, STORES.NOTES, id);
}

/* ---------- Utilities (optional) ---------- */
export async function exportAll() {
  const [files, team, client] = await Promise.all([
    getAllFiles(),
    getNotes("team"),
    getNotes("client"),
  ]);
  return { files, notes: [...team, ...client] };
}
export function deleteDatabase() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.deleteDatabase(DB_NAME);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}
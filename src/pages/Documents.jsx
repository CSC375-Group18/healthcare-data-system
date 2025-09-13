import { useEffect, useRef, useState } from "react";
import PageHeader from "../components/PageHeader";
import { addFile, getAllFiles, getFile, deleteFile, updateFile } from "../utils/idbs";

const DOC_TYPES = ["Formal", "Notes", "Other"];

export default function DocumentsHub() {
  const [items, setItems] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  // load on mount
  useEffect(() => {
    (async () => setItems(await getAllFiles()))();
  }, []);

  async function handleFiles(files) {
    const list = Array.from(files);
    for (const file of list) {
      const arrayBuffer = await file.arrayBuffer();
      const record = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        blob: new Blob([arrayBuffer], { type: file.type || "application/octet-stream" }),
        docType: "Formal",
        notes: "",
        createdAt: Date.now(),
      };
      await addFile(record);
    }
    setItems(await getAllFiles());
  }

  function onDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  function onPick() {
    const el = inputRef.current;
    if (el) el.click();
  }

  async function onDownload(id) {
    const rec = await getFile(id);
    if (!rec) return;
    const url = URL.createObjectURL(rec.blob);
    const a = document.createElement("a");
    a.href = url; a.download = rec.name;
    document.body.appendChild(a); a.click();
    a.remove(); URL.revokeObjectURL(url);
  }

  async function onDelete(id) {
    await deleteFile(id);
    setItems(await getAllFiles());
  }

  async function onUpdate(id, patch) {
    await updateFile(id, patch);
    setItems(await getAllFiles());
  }

  return (
    <div>
      <PageHeader title="Documents" subtitle="Deliverables and notes (stored locally in your browser)" />

      {/* Uploader */}
      <div
        className={`uploader ${dragOver ? "uploader--over" : ""}`}
        onDragOver={(e)=>{e.preventDefault(); setDragOver(true);}}
        onDragLeave={()=>setDragOver(false)}
        onDrop={onDrop}
        onClick={onPick}
        role="button"
      >
        <div>
          <strong>Click to upload</strong> or drag & drop files here
          <div className="muted" style={{marginTop:6}}>RFP, Charter, notes, PDFs, images…</div>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          onChange={(e)=>{ if (e.target.files?.length) handleFiles(e.target.files); e.target.value = ""; }}
        />
      </div>

      {/* List */}
      <div className="card" style={{marginTop:16}}>
        {items.length === 0 ? (
          <p className="muted">No documents yet. Upload files to get started.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th style={{width:"32%"}}>Name</th>
                <th style={{width:"12%"}}>Type</th>
                <th style={{width:"20%"}}>Notes</th>
                <th style={{width:"10%"}}>Size</th>
                <th style={{width:"16%"}}>Date</th>
                <th style={{width:"10%"}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it)=>(
                <tr key={it.id}>
                  <td>{it.name}</td>
                  <td>
                    <select
                      value={it.docType}
                      onChange={(e)=>onUpdate(it.id, { docType: e.target.value })}
                    >
                      {DOC_TYPES.map(t=> <option key={t} value={t}>{t}</option>)}
                    </select>
                  </td>
                  <td>
                    <input
                      className="doc-notes"
                      placeholder="Add notes"
                      value={it.notes || ""}
                      onChange={(e)=>onUpdate(it.id, { notes: e.target.value })}
                    />
                  </td>
                  <td>{formatSize(it.size)}</td>
                  <td>{new Date(it.createdAt).toLocaleString()}</td>
                  <td>
                    <div className="doc-actions">
                      <button onClick={()=>onDownload(it.id)}>Download</button>
                      <button className="danger" onClick={()=>onDelete(it.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="muted" style={{marginTop:16}}>
        <strong>Privacy note:</strong> Files are saved in your browser (IndexedDB) on this device and are not uploaded to a server.
        If you need cross-device sharing, consider storing documents in your GitHub repo or a cloud drive and link them here.
      </p>
    </div>
  );
}

function formatSize(bytes) {
  if (!bytes && bytes !== 0) return "—";
  const units = ["B","KB","MB","GB"];
  let i = 0, n = bytes;
  while (n >= 1024 && i < units.length-1) { n /= 1024; i++; }
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}
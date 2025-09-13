// src/pages/Notes.jsx
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { addNote, getNotes, updateNote, deleteNote } from "../utils/idbNotes";

function NoteForm({ kind, onAdded }) {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [summary, setSummary] = useState("");
  const [link, setLink] = useState("");

  async function handleAdd() {
    if (!summary.trim()) return;
    const record = {
      id: crypto.randomUUID(),
      kind, // 'team' | 'client'
      date,
      summary: summary.trim(),
      link: link.trim(),
      createdAt: Date.now(),
    };
    await addNote(record);
    setSummary("");
    setLink("");
    onAdded && onAdded();
  }

  return (
    <div className="note-form">
      <input
        type="date"
        value={date}
        onChange={(e)=>setDate(e.target.value)}
        aria-label="date"
      />
      <input
        placeholder="Short summary..."
        value={summary}
        onChange={(e)=>setSummary(e.target.value)}
      />
      <input
        placeholder="Link (optional)"
        value={link}
        onChange={(e)=>setLink(e.target.value)}
      />
      <button className="btn" onClick={handleAdd}>Add</button>
    </div>
  );
}

function NoteList({ kind }) {
  const [items, setItems] = useState([]);

  async function refresh() {
    setItems(await getNotes(kind));
  }
  useEffect(() => { refresh(); }, [kind]);

  async function onChange(id, patch) {
    await updateNote(id, patch);
    refresh();
  }

  async function onDelete(id) {
    await deleteNote(id);
    refresh();
  }

  return (
    <div className="note-list">
      {items.length === 0 ? (
        <p className="muted">No {kind === "team" ? "team" : "client"} notes yet.</p>
      ) : (
        items.map((n) => (
          <div key={n.id} className="note-item">
            <div className="note-row">
              <input
                className="short"
                type="date"
                value={n.date || ""}
                onChange={(e)=>onChange(n.id, { date: e.target.value })}
                aria-label="date"
              />
              <input
                value={n.summary || ""}
                onChange={(e)=>onChange(n.id, { summary: e.target.value })}
                placeholder="Summary"
              />
              <div className="linkwrap">
                <input
                  value={n.link || ""}
                  onChange={(e)=>onChange(n.id, { link: e.target.value })}
                  placeholder="Link"
                />
                {n.link ? (
                  <a className="linkbtn" href={n.link} target="_blank" rel="noreferrer">Open</a>
                ) : (
                  <span className="muted">No link</span>
                )}
              </div>
              <div className="note-actions">
                <button className="danger" onClick={()=>onDelete(n.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))
      )}
      <NoteForm kind={kind} onAdded={refresh} />
    </div>
  );
}

export default function Notes() {
  return (
    <div>
      <PageHeader title="Notes" subtitle="Team meeting notes and client meeting notes" />

      <section className="card">
        <h3>Team Meeting Notes</h3>
        <NoteList kind="team" />
      </section>

      <section className="card" style={{ marginTop: 16 }}>
        <h3>Client Meeting Notes</h3>
        <NoteList kind="client" />
      </section>
    </div>
  );
}
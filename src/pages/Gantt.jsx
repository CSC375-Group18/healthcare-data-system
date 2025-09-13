// src/pages/Gantt.jsx
import { useEffect, useRef, useState } from "react";
import PageHeader from "../components/PageHeader";

const LS_KEY = "csc375_gantt_editable_v2";

const DEFAULT = [
  { id: "d1", title: "Discovery & RFP", start: 1, end: 2 },
  { id: "d2", title: "Charter & Scope", start: 3, end: 3 },
  { id: "d3", title: "Interviews", start: 4, end: 6 },
  { id: "d4", title: "Wireframes / UI", start: 7, end: 8 },
  { id: "d5", title: "Prototype", start: 9, end: 10 },
  { id: "d6", title: "Final Report", start: 11, end: 12 },
];

export default function Gantt() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : DEFAULT;
    } catch {
      return DEFAULT;
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  // --- Add form ---
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1);

  function addPhase() {
    const s = clamp(parseInt(start, 10) || 1, 1, 12);
    const e = clamp(parseInt(end, 10) || s, s, 12);
    if (!title.trim()) return;
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: title.trim(), start: s, end: e },
    ]);
    setTitle("");
    setStart(1);
    setEnd(1);
  }
  function removePhase(id) {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }
  function updatePhase(id, patch) {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  // --- Reorder (drag handle only) ---
  const [dragIndex, setDragIndex] = useState(null);
  function onHandleDragStart(idx, e) {
    setDragIndex(idx);
    if (e.dataTransfer) e.dataTransfer.setDragImage(new Image(), 0, 0);
    document.body.classList.add("dragging");
  }
  function onDrop(idx) {
    if (dragIndex === null || dragIndex === idx) return;
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(idx, 0, moved);
      return next;
    });
  }
  function endAnyDrag() {
    setDragIndex(null);
    document.body.classList.remove("dragging");
  }

  // --- Resize by edges ---
  const resizeRef = useRef(null); // { id, side, rect }
  const [resizing, setResizing] = useState(null); // { id, side } | null

  function startResize(phase, side, rect) {
    resizeRef.current = { id: phase.id, side, rect };
    setResizing({ id: phase.id, side });
    document.body.classList.add("dragging");
    window.addEventListener("mousemove", onResizeMove);
    window.addEventListener("mouseup", endResize, { once: true });
  }

  function onResizeMove(e) {
    const r = resizeRef.current;
    if (!r) return;
    const x = e.clientX;
    const rel = (x - r.rect.left) / r.rect.width; // 0..1 across the barwrap
    let m = Math.floor(rel * 12) + 1; // month 1..12
    m = clamp(m, 1, 12);

    setItems((prev) =>
      prev.map((p) => {
        if (p.id !== r.id) return p;
        if (r.side === "left") {
          const ns = clamp(m, 1, p.end);
          return ns === p.start ? p : { ...p, start: ns };
        } else {
          const ne = clamp(m, p.start, 12);
          return ne === p.end ? p : { ...p, end: ne };
        }
      })
    );
  }

  function endResize() {
    resizeRef.current = null;
    setResizing(null);
    document.body.classList.remove("dragging");
    window.removeEventListener("mousemove", onResizeMove);
  }

  return (
    <div>
      <PageHeader
        title="Gantt chart"
      />

      {/* Add Phase */}
      <div className="card gantt-simple" style={{ marginBottom: 12 }}>
        <div className="gantt-form">
          <input
            className="gantt-form__title"
            placeholder="Phase title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="gantt-form__num"
            type="number"
            min={1}
            max={12}
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="Start"
          />
          <input
            className="gantt-form__num"
            type="number"
            min={1}
            max={12}
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="End"
          />
          <button className="btn btn--primary" onClick={addPhase}>
            Add
          </button>
        </div>
      </div>

      <div
        className="card gantt-simple"
        onDragOver={(e) => e.preventDefault()}
      >
        {/* month header */}
        <div className="gantt-s__months">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="gantt-s__m">
              M{i + 1}
            </div>
          ))}
        </div>

        {/* rows */}
        <div className="gantt-s__rows">
          {items.map((p, idx) => (
            <div
              key={p.id}
              className="gantt-s__row"
              onDrop={() => onDrop(idx)}
            >
              <div className="gantt-s__label">
                <span
                  className="gantt-s__handle"
                  title="Drag to reorder"
                  draggable
                  onDragStart={(e) => onHandleDragStart(idx, e)}
                  onDragEnd={endAnyDrag}
                >
                  ≡
                </span>
                <input
                  className="gantt-s__titleInput"
                  value={p.title}
                  onChange={(e) => updatePhase(p.id, { title: e.target.value })}
                />
                <button
                  className="danger"
                  onClick={() => removePhase(p.id)}
                  title="Delete"
                >
                  ✕
                </button>
              </div>

              <BarRow
                phase={p}
                resizing={resizing}
                onStartResize={(side, rect) => startResize(p, side, rect)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, isNaN(n) ? min : n));
}

/* ---------- Bar row with invisible edge handles + animated feedback ---------- */
function BarRow({ phase, onStartResize, resizing }) {
  const wrapRef = useRef(null);

  function mousedown(side) {
    const rect = wrapRef.current?.getBoundingClientRect?.();
    if (!rect) return;
    onStartResize(side, rect);
  }

  const isResizing = resizing && resizing.id === phase.id;

  return (
    <div className="gantt-s__barwrap" ref={wrapRef}>
      <div
        className={`gantt-s__bar ${isResizing ? "is-resizing" : ""}`}
        style={{
          left: `${((phase.start - 1) / 12) * 100}%`,
          width: `${((phase.end - phase.start + 1) / 12) * 100}%`,
        }}
      >
        {/* Invisible hit areas at bar edges */}
        <span
          className="gantt-s__edge left"
          title="Drag to extend/shrink"
          onMouseDown={() => mousedown("left")}
        />
        <span
          className="gantt-s__edge right"
          title="Drag to extend/shrink"
          onMouseDown={() => mousedown("right")}
        />
      </div>
    </div>
  );
}
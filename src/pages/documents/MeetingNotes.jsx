import PageHeader from '../../components/PageHeader';

export default function MeetingNotes() {
  return (
    <div>
      <PageHeader title="Meeting Notes" subtitle="Notes from every meeting" />
      <div className="stack">
        <article className="card"><h4>—</h4><p className="muted">No notes yet.</p></article>
      </div>
    </div>
  );
}
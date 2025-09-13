import PageHeader from '../../components/PageHeader';

export default function ClientMeetings() {
  return (
    <div>
      <PageHeader title="Client Meetings" subtitle="Interviews and communications" />
      <div className="stack">
        <article className="card"><h4>—</h4><p className="muted">No notes yet.</p></article>
      </div>
    </div>
  );
}
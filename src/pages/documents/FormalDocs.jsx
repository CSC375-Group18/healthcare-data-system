import PageHeader from '../../components/PageHeader';

export default function FormalDocs() {
  return (
    <div>
      <PageHeader title="Formal Documents" subtitle="RFP, Charter, etc." />
      <div className="card">
        <table className="table">
          <thead><tr><th>Title</th><th>Type</th><th>Version</th><th>Date</th><th>Link</th></tr></thead>
          <tbody><tr><td colSpan="5" className="muted">No documents yet.</td></tr></tbody>
        </table>
      </div>
    </div>
  );
}
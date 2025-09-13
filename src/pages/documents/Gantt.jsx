import PageHeader from '../../components/PageHeader';

export default function Gantt() {
  return (
    <div>
      <PageHeader title="Gantt Chart" subtitle="Schedule & changes" />
      <section className="card">
        <div className="gantt-placeholder">
          <p className="muted">Gantt chart will appear here (placeholder).</p>
        </div>
      </section>
    </div>
  );
}
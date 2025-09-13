import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';

export default function Project() {
  return (
    <div>
      <PageHeader title="Project" subtitle="Executive summary & scope" />
      <section className="card"><h3>Executive Summary</h3><EmptyState /></section>
      <section className="card"><h3>Problems</h3><EmptyState /></section>
      <section className="card"><h3>Proposed Solution</h3><EmptyState /></section>
      <section className="card"><h3>Core Advantages</h3><EmptyState /></section>
      <section className="card"><h3>Scope</h3><EmptyState /></section>
    </div>
  );
}
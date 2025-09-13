import PageHeader from '../components/PageHeader';

export default function Contact() {
  return (
    <div>
      <PageHeader title="Contact" subtitle="Group contact and course disclaimer" />
      <div className="two-col">
        <section className="card"><h3>Group Email</h3><p>your-group-email@example.com</p></section>
        <section className="card"><h3>Disclaimer</h3><p>This website has been created solely for the CSC 375 course project. All content is intended for educational purposes only.</p></section>
      </div>
    </div>
  );
}
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AppLayout({ children }) {
  return (
    <div className="site-shell">
      <Navbar />
      <main className="site-main">
        <div className="container">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
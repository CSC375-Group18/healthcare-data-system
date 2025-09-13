export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} CSC375 Group • For educational purposes only.</p>
        <p className="muted">Disclaimer: This website is created solely for
              the CSC 375 course project. It is intended for educational
              purposes only and does not represent a real consulting company.</p>
      </div>
    </footer>
  );
}
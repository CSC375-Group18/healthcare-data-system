import { NavLink } from "react-router-dom";
import "../ProjectWebsite.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="brand">CSC375 Healthcare Data System</NavLink>
        <nav className="nav-links">
          <NavLink to="/">About</NavLink>
          <NavLink to="/documents">Documents</NavLink>
          <NavLink to="/notes">Notes</NavLink>
          <NavLink to="/gantt">Gantt</NavLink>
        </nav>
      </div>
    </header>
  );
}
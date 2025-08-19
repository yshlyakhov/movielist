import { Link } from "react-router-dom";
import "./navigation.css";

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/movies" className="nav-link">
          Movies
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;

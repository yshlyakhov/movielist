import { NavLink } from "react-router-dom";

import "./navigation.css";

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
          state={Date.now()}
        >
          Movie App
        </NavLink>
      </div>
      <div className="navbar-links">
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
          state={Date.now()}
        >
          Movies
        </NavLink>
        <NavLink
          to="/series"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          TV Series
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
        >
          Favorites
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;

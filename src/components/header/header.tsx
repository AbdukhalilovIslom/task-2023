import { NavLink } from "react-router-dom";

import "./style.scss";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="ul">
          <li className="li">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/"
            >
              Post
            </NavLink>
          </li>
          <li className="li">
            <NavLink to="/photos">Photo</NavLink>
          </li>
          <li className="li">
            <NavLink to="/tasks">ToDo</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

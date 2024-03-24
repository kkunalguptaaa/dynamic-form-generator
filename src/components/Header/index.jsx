import { NavLink } from "react-router-dom";

import "./index.css";

const Header = () => {
  return (
    <div className="header-container">
      <h1 className="header-logo">Form Generator</h1>
      <ul className="header-nav">
        <li>
          <NavLink to="/">Form List</NavLink>
        </li>
        <li>
          <NavLink to="/add-form">Create Form</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;

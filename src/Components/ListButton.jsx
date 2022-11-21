import { NavLink } from "react-router-dom";

function ListButton({ section }) {
  let selected = {
    textDecoration: "underline",
    color: "white",
  };

  let element = {
    textDecoration: "none",
    color: "white",
  };

  return (
    <li key={section.id}>
      <NavLink
        style={({ isActive }) => (isActive ? selected : element)}
        to={section.path}
      >
        {section.name}
      </NavLink>
    </li>
  );
}

export default ListButton;

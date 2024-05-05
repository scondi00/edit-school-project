import { Outlet, Link } from "react-router-dom";
import "../css-files/administracija.css";

export default function AdminNavbar() {
  return (
    <div>
      <nav className="admin-navbar">
        <Link className="link" to={"/administracija/radionice"}>
          &lt;Radionice/&gt;
        </Link>
        <Link className="link" to={"/administracija/predavaci"}>
          &lt;Predavači/&gt;
        </Link>
        <Link className="link" to={"/administracija/organizacije"}>
          &lt;Organizacije/&gt;
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}

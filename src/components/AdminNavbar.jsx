import { Outlet, Link } from "react-router-dom";

export default function AdminNavbar(
  {
    //setModal, modal
  }
) {
  return (
    <div>
      <nav style={{ backgroundColor: "violet" }}>
        <Link to={"/administracija/radionice"}>Radionice</Link>
        <Link to={"/administracija/predavaci"}>Predavaci</Link>
        <Link to={"/administracija/organizacije"}>Organizacije</Link>
        {/* <button onClick={() => setModal(true)}>Dodaj</button> */}
      </nav>
      <Outlet />
    </div>
  );
}

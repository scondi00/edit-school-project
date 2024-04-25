import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../App";

export default function Navbar() {
  const isAdmin = useContext(AdminContext);
  return (
    <div>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/radionice"}>Radionice</Link>
        <Link to={"/predavaci"}>Predavaci</Link>
        {isAdmin && <Link to={"/administracija"}>Administracija</Link>}
      </nav>
      <Outlet />
    </div>
  );
}

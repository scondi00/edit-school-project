import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../App";
import "../App.css";
import Logo from "../assets/Code - school.png";

export default function Navbar() {
  const { isAdmin, setAdmin } = useContext(AdminContext);

  return (
    <div>
      <nav className="main-navbar">
        <div className="img-link-div">
          <img src={Logo} alt="logo-image" />
          <div className="link-div">
            <Link to={"/radionice"} className="link">
              &lt; Radionice /&gt;
            </Link>
            <Link to={"/predavaci"} className="link">
              &lt; Predavači /&gt;
            </Link>
            {isAdmin && (
              <Link to={"/administracija"} className="link">
                &lt; Administracija /&gt;
              </Link>
            )}
          </div>
        </div>

        <button
          className={`toggle-button ${isAdmin ? "on" : "off"}`}
          onClick={() => setAdmin(!isAdmin)}
        >
          <span className="toggle-label">{isAdmin ? "Admin" : "Klijent"}</span>
        </button>
      </nav>
      <Outlet />
    </div>
  );
}

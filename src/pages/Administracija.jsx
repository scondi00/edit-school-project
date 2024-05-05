import AdminNavbar from "../components/AdminNavbar";
import { useContext, useState, createContext } from "react";
import { AdminContext } from "../App";
import AdminLogo from "../assets/administrator.png";

export const pageContext = createContext();

export default function Administracija() {
  const [page, setPage] = useState("radionice"); //pratimo na kojem smo page-u

  const { isAdmin, setAdmin } = useContext(AdminContext); // pratimo jesmo li klijent ili admin

  return (
    <pageContext.Provider value={{ page, setPage }}>
      <div>
        <div className="title">Administracija</div>
        {isAdmin === true ? (
          <div>
            <AdminNavbar />
          </div>
        ) : (
          <div className="overlay-container">
            <div className="not-admin-div">
              <div className="not-admin-box">
                <p>Greška!</p>
                <p>Izgleda da nisi administrator!</p>
                <img src={AdminLogo} alt="admin-logo" />
              </div>
            </div>
          </div>
        )}
      </div>
    </pageContext.Provider>
  );
}

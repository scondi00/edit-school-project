import { Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";

import "./App.css";

import Radionice from "./pages/Radionice";
import Predavači from "./pages/Predavači";
import Navbar from "./components/Navbar";
import Error from "./pages/Error";
import Administracija from "./pages/Administracija";
import PredavacProfil from "./components/PredavacProfil";
import AdminRadionice from "./pages/AdminRadionice";
import AdminPredavaci from "./pages/AdminPredavaci";
import AdminOrganizacije from "./pages/AdminOrganizacije";

export const AdminContext = createContext();

function App() {
  const [isAdmin, setAdmin] = useState(false);
  return (
    <AdminContext.Provider value={{ isAdmin, setAdmin }}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/radionice" element={<Radionice />} />
          <Route path="/predavaci" element={<Predavači />} />
          <Route path="/administracija" element={<Administracija />}>
            <Route
              path="/administracija/radionice"
              element={<AdminRadionice />}
            />
            <Route
              path="/administracija/predavaci"
              element={<AdminPredavaci />}
            />
            <Route
              path="/administracija/organizacije"
              element={<AdminOrganizacije />}
            />
          </Route>
          <Route path="/predavaci/:id" element={<PredavacProfil />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </AdminContext.Provider>
  );
}

export default App;

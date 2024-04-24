import { Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";

import "./App.css";

import HomePage from "./pages/HomePage";
import Radionice from "./pages/Radionice";
import Predavači from "./pages/Predavači";
import Navbar from "./components/Navbar";
import Error from "./pages/Error";
import Administracija from "./pages/Administracija";
import PredavacProfil from "./components/PredavacProfil";

export const AdminContext = createContext();

function App() {
  const [isAdmin, setAdmin] = useState(false);
  return (
    <AdminContext.Provider value={isAdmin}>
      <button onClick={() => setAdmin(!isAdmin)}>Toggle for User Admin</button>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route exact path="/" element={<HomePage />} />

          <Route path="/radionice" element={<Radionice />} />
          <Route path="/predavaci" element={<Predavači />} />
          <Route path="/administracija" element={<Administracija />} />
          <Route path="/predavaci/:id" element={<PredavacProfil />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </AdminContext.Provider>
  );
}

export default App;

import AdminNavbar from "../components/AdminNavbar";
import { useContext, useState, createContext } from "react";
import { AdminContext } from "../App";
import Tablica from "../components/Tablica";
import DodajNovuRadionicu from "../components/DodajNovuRadionicu";
import DodajNovogPredavaca from "../components/Modals/DodajNovogPredavaca";
import DodajOrganizaciju from "../components/Modals/DodajOrganizaciju";

export const pageContext = createContext();

export default function Administracija() {
  const [page, setPage] = useState("radionice"); //pratimo na kojem smo page-u

  const isAdmin = useContext(AdminContext); // pratimo jesmo li klijent ili admin
  // const [modal, setModal] = useState(false);
  // const [dodajRadionicu, setDodajRadionicu] = useState(false);
  // const [dodajOrganizaciju, setDodajOrganizaciju] = useState(false);
  // const [dodajPredavaca, setDodajPredavaca] = useState(false);

  // useEffect(() => {
  //   if (modal) {
  //     console.log("modal is true, check which window");
  //     switch (page) {
  //       case "radionice":
  //         setDodajRadionicu(true);
  //         setDodajPredavaca(false);
  //         setDodajOrganizaciju(false);
  //         break;
  //       case "predavaci":
  //         setDodajRadionicu(false);
  //         setDodajPredavaca(true);
  //         setDodajOrganizaciju(false);
  //         break;
  //       case "organizacije":
  //         setDodajRadionicu(false);
  //         setDodajPredavaca(false);
  //         setDodajOrganizaciju(true);
  //         break;
  //       default:
  //         break;
  //     }
  //   } else {
  //     setDodajRadionicu(false);
  //     setDodajPredavaca(false);
  //     setDodajOrganizaciju(false);
  //   }
  // }, [modal]);

  return (
    <pageContext.Provider value={{ page, setPage }}>
      <div>
        <h1>Administracija</h1>
        {isAdmin === true ? (
          <div>
            <AdminNavbar
            // setModal={setModal} modal={modal}
            />
          </div>
        ) : (
          <div>
            <p>Oh oo... looks like you aint admin no mo</p>
          </div>
        )}
      </div>
      {/* {dodajRadionicu && <DodajNovuRadionicu setDodajRadionicu={setModal} />}
      {dodajPredavaca && (
        <DodajNovogPredavaca setModalNoviPredavac={setModal} />
      )}
      {dodajOrganizaciju && <DodajOrganizaciju setModalNovaOrg={setModal} />} */}
    </pageContext.Provider>
  );
}

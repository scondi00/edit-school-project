import { useState } from "react";
import IzbrisiBtn from "./IzbrisiBtn";
import AdminRadionicaEdit from "./Modals/AdminRadionicaEdit";
import AdminPredavacEdit from "./Modals/AdminPredavacEdit";
import AdminOrgEdit from "./Modals/AdminOrgEdit";

export default function RedakTablice({ item, stupci, ime, set }) {
  const [modalEdit, setModalEdit] = useState(false);

  let componentToRender;

  switch (ime) {
    case "radionice":
      componentToRender = (
        <AdminRadionicaEdit item={item} setModalEdit={setModalEdit} set={set} />
      );
      break;
    case "predavaci":
      componentToRender = (
        <AdminPredavacEdit item={item} setModalEdit={setModalEdit} set={set} />
      );
      break;
    case "organizacije":
      componentToRender = (
        <AdminOrgEdit item={item} setModalEdit={setModalEdit} set={set} />
      );
      break;
    default:
      componentToRender = null;
  }

  return (
    <tr>
      {stupci.map((stupac, index) => (
        <td key={index}>{item[stupac.variable]}</td>
      ))}
      <td>
        <button onClick={() => setModalEdit(true)}>Uredi</button>
        {modalEdit && componentToRender}
      </td>
      <td>
        <IzbrisiBtn item={item} ime={ime} set={set} />
      </td>
    </tr>
  );
}

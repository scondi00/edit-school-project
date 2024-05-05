import axios from "axios";

export default function IzbrisiBtn({ item, ime, set }) {
  const izbrisiPodatak = () => {
    if (window.confirm(`Jeste li sigurni da želite izbrisati ${item.ime} ?`)) {
      axios
        .delete(`http://localhost:3001/${ime}/${item.id}`)
        .then((r) => {
          axios
            .get(`http://localhost:3001/${ime}`)
            .then((rez) => set(rez.data));
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <button className="admin-delete-btn" onClick={izbrisiPodatak}>
      Izbriši
    </button>
  );
}

import axios from "axios";

export default function IzbrisiBtn({ item, ime, set }) {
  const izbrisiPodatak = () => {
    axios
      .delete(`http://localhost:3001/${ime}/${item.id}`)
      .then((r) => {
        axios.get(`http://localhost:3001/${ime}`).then((rez) => set(rez.data));
      })
      .catch((err) => alert(err));
  };

  return <button onClick={izbrisiPodatak}>Izbriši</button>;
}

import { useState } from "react";
import axios from "axios";

export default function Prijava({ setModal, currentRadionica }) {
  const [novaPrijava, setNovaPrijava] = useState({
    puno_ime: "",
    email: "",
    razlog_prijave: "",
    broj_mobitela: "",
    radionica: currentRadionica.ime,
  });

  const [brojPrijava, setBrojPrijava] = useState(0);
  const [prijavaModal, setPrijavaModal] = useState(true);
  const [hvalaModal, setHvalaModal] = useState(false);

  const handlePovratak = () => {
    window.location.reload();
  };

  function obradiPodatke(objekt) {
    return {
      puno_ime: objekt.puno_ime,
      email: objekt.email,
      broj_mobitela: objekt.broj_mobitela,
      razlog_prijave: objekt.razlog_prijave,
      radionica: objekt.radionica,
    };
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // dohvat broja prijava s radionice
    axios
      .get(`http://localhost:3001/radionice/${currentRadionica.id}`)
      .then((r) => {
        setBrojPrijava(r.data.broj_prijava);

        axios.patch(`http://localhost:3001/radionice/${currentRadionica.id}`, {
          broj_prijava: r.data.broj_prijava + 1, // povecat broj prijava za 1
        });

        // zabilježi prijavu
        const zaSlanje = obradiPodatke(novaPrijava);

        axios
          .post("http://localhost:3001/prijave", zaSlanje)
          .then((rez) => console.log(rez))
          .catch((err) => alert(err));
      })
      .catch((err) => alert(err));

    setPrijavaModal(!prijavaModal);
    setHvalaModal(!hvalaModal);
  };

  return (
    <div className="modal-background">
      {prijavaModal && (
        <div className="modal-container">
          {/* zatvori modal window */}
          <button className="exit-modal" onClick={() => setModal(false)}>
            X
          </button>
          <div className="modal-title">
            <h2>Prijava na: {currentRadionica.ime} </h2>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="puno_ime"
                placeholder="Puno ime polaznika..."
                value={novaPrijava.puno_ime}
                onChange={(e) =>
                  setNovaPrijava({ ...novaPrijava, puno_ime: e.target.value })
                }
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email polaznika..."
                value={novaPrijava.email}
                onChange={(e) =>
                  setNovaPrijava({ ...novaPrijava, email: e.target.value })
                }
                required
              />
              <input
                type="tel"
                name="broj_mobitela"
                placeholder="Broj telefona..."
                value={novaPrijava.broj_mobitela}
                onChange={(e) =>
                  setNovaPrijava({
                    ...novaPrijava,
                    broj_mobitela: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                name="razlog_prijave"
                placeholder="Upišite razlog prijave..."
                value={novaPrijava.razlog_prijave}
                onChange={(e) =>
                  setNovaPrijava({
                    ...novaPrijava,
                    razlog_prijave: e.target.value,
                  })
                }
                required
              />
              <input type="submit" value="Prijavi se" />
            </form>
          </div>
        </div>
      )}
      {hvalaModal && (
        <div className="modal-container">
          <h2>Hvala na prijavi !</h2>
          <p>Lore ipsum...</p>
          <button onClick={handlePovratak}>Povratak na radionice</button>
        </div>
      )}
    </div>
  );
}

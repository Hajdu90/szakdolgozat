import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Csomagok.module.css";

import alapKep from "../pictures/alap.jpg";

const API_BASE_URL = "http://localhost:8000";

interface Csomag {
  id: number;
  helyszin_id: number;
  ar: number;
  szabad_helyek: number;
  indulasi_datum: string;
  visszaut_datum: string;
  helyszin: {
    orszag: string;
    varos: string;
    leiras?: string | null;
  };
}

function Csomagok() {
  const [csomagok, setCsomagok] = useState<Csomag[]>([]);
  const [csomagKereso, setCsomagKereso] = useState<Csomag[]>([]);

  /* Keresohoz */
  const [orszag, setOrszag] = useState("");
  const [datum, setDatum] = useState("");
  const [utas, setUtas] = useState(1);

  useEffect(() => {
   
    fetch(`${API_BASE_URL}/api/utazasi_csomagoks`, {
      method: "GET",
      credentials: "include", // Ez biztosítja, hogy a Sanctum ne dobja el a kérést
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP hiba! státusz: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const lista = Array.isArray(data) ? data : [];
        setCsomagok(lista);
        setCsomagKereso(lista);
      })
      .catch((err) => {
        console.error("Hiba a Csomagok fetch-nél:", err);
        setCsomagok([]);
        setCsomagKereso([]);
      });
  }, []);

  /* Kereső logika */
  const keresoFunkcio = () => {
    const ujLista = csomagok.filter((csomag) => {
      const orszagKeres = orszag ? csomag.helyszin.orszag === orszag : true;
      const datumKeres = datum
        ? new Date(csomag.indulasi_datum) <= new Date(datum) &&
          new Date(csomag.visszaut_datum) >= new Date(datum)
        : true;
      const szabadHelyek = csomag.szabad_helyek >= utas;

      return orszagKeres && datumKeres && szabadHelyek;
    });

    setCsomagKereso(ujLista);
  };

  return (
    <div>
      {/* Keresés szekció */}
      <header className={style.homeHeader}>
        <select
          className={style.destinationSelect}
          value={orszag}
          onChange={(e) => setOrszag(e.target.value)}
        >
          <option value="" disabled>Hova szeretne utazni?</option>
          <option value="Orszag1">Orszag1</option>
          <option value="Orszag2">Orszag2</option>
          <option value="Orszag3">Orszag3</option>
          <option value="Orszag4">Orszag4</option>
        </select>

        <input
          type="date"
          className={style.dateInput}
          value={datum}
          onChange={(e) => setDatum(e.target.value)}
        />

        <div className={style.passengerCounter}>
          <span className={style.passengerLabel}>Utasok</span>
          <button
            className={style.passengerBtn}
            onClick={() => setUtas((prev) => Math.max(prev - 1, 1))}
          > - </button>
          <span className={style.passengerNumber}>{utas}</span>
          <button
            className={style.passengerBtn}
            onClick={() => setUtas((prev) => Math.min(prev + 1, 10))}
          > + </button>
        </div>

        <button className={style.searchBtn} onClick={keresoFunkcio}>
          Keresés
        </button>
      </header>

      {/* Csomagok listázása */}
      <div className={style.csomagContainer}>
        {csomagKereso.length > 0 ? (
          csomagKereso.map((csomag) => (
            <Link
              className={style.noLink}
              key={csomag.id}
              to={`/csomagok/${csomag.id}`}
            >
              <div className={style.divContainer}>
                <div className={style.firstpicture}>
                  <img src={alapKep} alt={csomag.helyszin.orszag} />
                </div>

                <div className={style.szovegContainer}>
                  <p className={style.orszagText}>{csomag.helyszin.orszag}</p>
                  <p className={style.varosText}>{csomag.helyszin.varos}</p>
                  <p className={style.leirasText}>
                    {csomag.helyszin.leiras ?? "Leírás hamarosan."}
                  </p>
                  <p className={style.arText}>Ár: {csomag.ar} Ft</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>Nincs találat a keresésre.</p>
        )}
      </div>
    </div>
  );
}

export default Csomagok;
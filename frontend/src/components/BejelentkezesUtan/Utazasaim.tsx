import { useEffect, useState } from "react";

import styles from "./Utazasaim.module.css";
import { useAuth } from "../Authorization/AuthContext";






interface Utazas {
  id: number;
  letszam: number;
  aktualis_ar: number;
  utazasi_csomag: {
    id: number;
    indulasi_datum: string;
    visszaut_datum: string;
    szabad_helyek: number;
    ar: number;
    helyszin: {
      orszag: string;
      varos: string;
    };
    utazasi_mod: {
      tipus: string;
    };
  };
}

function Utazasaim() {
  const [utazasok, setUtazasok] = useState<Utazas[]>([]);
  const { lemondFoglalas } = useAuth();
 

  useEffect(() => {
    const fetchUtazasok = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/utazasaim`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setUtazasok(data);
      } catch (err) {
        console.error("Hiba a foglalt utazások lekérésekor:", err);
      }
    };

    fetchUtazasok();
  }, []);

  if (utazasok.length === 0) return <p>Még nincs foglalt utazásod.</p>;



//fogalás lemondasa

const lemondas = async (id: number) => {
    try {
        await lemondFoglalas(id);
        setUtazasok(prev => prev.filter(u => u.id !== id));
    } catch (err) {
        console.error("Hiba a lemondásnál:", err);
    }
};




  return (
  <div className={styles.utazasaimContainer}>
    <h2 className={styles.utazasaimTitle}>Foglalt Utazásaim</h2>
    <div className={styles.utazasLista}>
        {utazasok.map((fogl) => (
            <div key={fogl.id} className={styles.utazasListaElem}>
                <h3 className={styles.utazasElemNev}>
                    {fogl.utazasi_csomag.helyszin.orszag}, {fogl.utazasi_csomag.helyszin.varos}
                </h3>
                <div className={styles.utazasElemReszletek}>


                    <p className={styles.utazasElemDatum}>
                        {fogl.utazasi_csomag.indulasi_datum} - {fogl.utazasi_csomag.visszaut_datum}
                    </p>

                    <p className={styles.utazasElemMod}>Utazási mód: {fogl.utazasi_csomag.utazasi_mod.tipus}</p>
                    <p className={styles.utazasElemAr}>Ár: {fogl.aktualis_ar} Ft </p>
                    <p className={styles.utazasElemLetszam}>Fő: {fogl.letszam}</p>
                    <button onClick={() => lemondas(fogl.id)}>Lemondás</button>
                </div>
            </div>
        ))}
    </div>
</div>
   
   
  );
}

export default Utazasaim;
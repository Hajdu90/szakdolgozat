import { useEffect, useState } from "react";
import style from "./Csomagok.module.css"
import { Link } from "react-router-dom";
import Csomagok from "./Csomagok";
import alapKep from "../pictures/alap.jpg"
const API_BASE_URL = "http://localhost:8000";




interface Csomag {
  id: number;
  helyszin_id: number;
  ar: number;
  szabad_helyek: number;
  indulasi_datum: string;
  visszaut_datum: string;
  akcios_ar: number;
  is_lastminute: boolean;   
  helyszin: {
    orszag: string;
    varos: string;
  };
  utazasi_mod: {
    tipus: string;
  };

   kepek?:{
    id:number;
    kep_eleresi_ut:string
  }[];
}

function LastMinuteCsomagok() {

  const [lastMinList, setLastMinList] = useState<Csomag[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/utazasi_csomagoks`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP hiba stat: ${res.status}`);
        return res.json();
      })
      .then(data => setLastMinList(Array.isArray(data) ? data : []))
      .catch(err => {
        console.log("Hiba a LastMinute fetch-nél:", err);
        setLastMinList([]);
      });
  }, []);

  return (
      <div className={style.csomagContainer}>
         {lastMinList
         .filter(csomag => csomag.is_lastminute)
          .map(csomag => (
          <Link
          className={style.noLink}
          key={csomag.id}
          to={`/csomagok/${csomag.id}`}  // ← javítva, szóköz volt benne
          >
            <div className={style.divContainer}>  {/* ← ide kerül */}
            <div className={style.firstpicture}>
               <img
                  src={csomag.kepek && csomag.kepek.length > 0
                    ? csomag.kepek[0].kep_eleresi_ut
                    : alapKep}
                  alt={csomag.helyszin.orszag}
                />
                 </div>
                 <div className={style.szovegContainer}>
                <p className={style.orszagText}>{csomag.helyszin.orszag}</p>
                <p className={style.varosText}>{csomag.helyszin.varos}</p>
                <p className={style.lmArRegi}>{csomag.ar} Ft</p>
                <p className={style.lmar}>Akciós ár: {csomag.akcios_ar} Ft</p>
                  </div>
                  </div>
          </Link>
        ))}
    </div>



   
  );
}




export default LastMinuteCsomagok;
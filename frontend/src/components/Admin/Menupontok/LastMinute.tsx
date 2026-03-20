import { useEffect, useState } from "react";

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
}

function LastMinute() {

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
    <div>
      <h2>Last Minute Utazások</h2>
      <table>
        <thead>
          <tr>
            <th>Ország</th>
            <th>Város</th>
            <th>Utazási mód</th>
            <th>Ár</th>
            <th>LastMinute ár</th>
            <th>Szabad helyek</th>
          </tr>
        </thead>
        <tbody>
          {lastMinList
            .filter(csomag => csomag.is_lastminute)
            .map(csomag => (
              <tr key={csomag.id}>
                <td>{csomag.helyszin.orszag}</td>
                <td>{csomag.helyszin.varos}</td>
                <td>{csomag.utazasi_mod.tipus}</td>
                <td>{csomag.ar}</td>
                <td>{csomag.akcios_ar}</td>
                <td>{csomag.szabad_helyek}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default LastMinute;
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Authorization/AuthContext"; 
import styles from "./MenuPontok.module.css"


const api_base_url="http://localhost:8000";

function UjUtazas(){
    const {createCsomag}=useAuth();

    const[helyszin,setHelyszin]=useState<any[]>([]);
    const[uModok,setUmodok]=useState<any[]>([]);

    const[helyszinId,setHelyszinId]=useState(1);
    const [utazasiModId, setUtazasiModId] = useState(1);
    const[letszam,setLetszam]=useState(1);
    const[ar,setAr]=useState(0);
    const[startDate,setStartDate]=useState("");
    const[backDate,setBackDate]=useState("");



    //helyszinek+utazasi Mod lekérése:

      useEffect(() => {
        fetch(`${api_base_url}/api/helyszins`)
          .then(res => res.json())
          .then(data => setHelyszin(data));
    
        fetch(`${api_base_url}/api/utazasi_mods`)
          .then(res => res.json())
          .then(data => setUmodok(data));
      }, []);

      //h ne töltödjön ujra az oldal ha elküldjük az urlapot

      const handleSubmit=async(e: React.FormEvent)=>{ //aszinron függvény(várni tud műveletekre, pl adatküldésre a szervernek, anélkül hogy lefagyna az oldal)
        e.preventDefault(); //az oldal nem tölt újra,ha rákattint a küldés gombra


        try{
            const res =await createCsomag({
                helyszin_id:helyszinId,
                utazasi_mod_id:utazasiModId,
                ar:ar,
                letszam:letszam,
                indulasi_datum:startDate,
                visszaut_datum:backDate,
            });
            console.log("siker", res);
            alert("Csomag sikeresen létre hozva")
        }catch(err){
            console.log("Hiba", err)
            alert("Hiba történt a csomag létrehozásánál")
        }
      };

      return(
        <div >
            <form onSubmit={handleSubmit} className={styles.newPackageContainer}>
                <div >
                    <h2>Új csomag létrehozás</h2>
                    <label >Helyszin:</label>
                    <select value={helyszinId} onChange={e => setHelyszinId(Number(e.target.value))} className={styles.newPacHelySelect}>
                        {helyszin.map(h =>(
                            <option key={h.id} value={h.id}>
                                {h.orszag}-{h.varos}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Utazási mód:</label>
                    <select value={utazasiModId} onChange={e=> setUtazasiModId(Number(e.target.value))}>
                        {uModok.map(m=>(
                            <option key={m.id} value={m.id}>
                                {m.tipus}
                            </option>
                        ))}
                    </select>
                </div>


                <div>
                    <label>Ár:</label>
                    <input 
                        type="number" 
                        value={ar}
                        onChange={e => setAr(Number(e.target.value))}
                        min={1}/>
                </div>

                <div>
                    <label>Indulási dátum:</label>
                    <input 
                        type="date"
                        value={startDate} 
                        onChange={e => setStartDate(e.target.value)} />
                </div>

                
                <div>
                    <label>Visszaút dátum:</label>
                    <input 
                        type="date"
                        value={backDate} 
                        onChange={e => setBackDate(e.target.value)} />
                </div>

                <button type="submit">Létrehozás</button>




            </form>
        </div>
      )

}

export default UjUtazas;

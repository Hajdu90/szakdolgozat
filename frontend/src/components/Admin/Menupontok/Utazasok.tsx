import { table } from "console";
import { useEffect, useState } from "react";


import styles from "./MenuPontok.module.css"

const api_base_url="http://localhost:8000";





interface Csomag{
    id:number;
    helyszin_id:number;
    ar:number;
    szabad_helyek:number;
    indulasi_datum:string;
    visszaut_datum:string;
    helyszin:{
        orszag:string;
        varos:string;
    };
    utazasi_mod:{
        tipus:string

    }

}


function Utazasok(){

    const [utazasok,setUtazasok]=useState<Csomag[]>([]);

    useEffect(()=> {
        fetch(`${api_base_url}/api/utazasi_csomagoks`,{
            method:"GET",
            credentials:"include",
            headers:{
                "Accept":"application/json",
                "Contect-Type":"application/json"
            }
        })
        .then((res)=>{
            if(!res.ok) throw new Error(`HTTP hiba stat: ${res.status}`);
            return res.json();
        })

        .then((data)=>{
            const lista = Array.isArray(data) ? data : [];
            setUtazasok(lista);
        })
        .catch((err)=>{
            console.log("Hiba a Csomagok fetch-nel(Utazasok.tsx 49 sor)", err);
            setUtazasok([]);
        })
    },[]);



    

    return (
    <div className={styles.listcontainer}>
        <h2 className={styles.utazasokH2}>Utazások Lista</h2>
        <div className={styles.tableWrapper}> 
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Indulás</th>
                        <th>Vissza dátum</th>
                        <th>Ország</th>
                        <th>Város</th>
                        <th>Utazási mód</th>
                        <th>Ár</th>
                        <th>Szabad hely</th>
                    </tr>
                </thead>
                <tbody>
                    {utazasok.map((csomag) => (
                        <tr key={csomag.id}>
                            <td>{csomag.id}</td>
                            <td>{csomag.indulasi_datum}</td>
                            <td>{csomag.visszaut_datum}</td>
                            <td>{csomag.helyszin.orszag}</td>
                            <td>{csomag.helyszin.varos}</td>
                            <td>{csomag.utazasi_mod.tipus}</td>
                            <td>{csomag.ar} Ft</td>
                            <td>{csomag.szabad_helyek}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
}

export default Utazasok;
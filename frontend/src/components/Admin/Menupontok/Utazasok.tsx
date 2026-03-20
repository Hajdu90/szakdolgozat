import { table } from "console";
import { useEffect, useState } from "react";

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



    
    return(
        <div>
            <h2>Utazások Lista</h2>
            <table>

                <thead>
                    <tr>
                       <th>Orszag</th>
                       <th>varos</th>
                       <th>utazási mod</th>
                       <th>ár</th>
                       <th>szabad helyek</th>
                    </tr>
                </thead>

                <tbody>
                    {utazasok.map((csomag)=>(

                        <tr>
                         <td>{csomag.helyszin.orszag}</td>
                         <td>{csomag.helyszin.varos}</td>
                         <td>{csomag.utazasi_mod.tipus}</td>
                         <td>{csomag.ar}</td>
                         <td>{csomag.szabad_helyek}</td>
                         </tr>
                     ))}
                </tbody>
            </table>
        </div>
    )
}

export default Utazasok;
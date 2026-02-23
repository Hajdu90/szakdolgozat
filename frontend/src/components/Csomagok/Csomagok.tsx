
import { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";


import style from "./Csomagok.module.css"

import kep from "../pictures/firstPictures/hungary.jpg"




interface Csomag {
    id: number;
    helyszin_id: number;
    ar: number;

    //helyszin táblábol
    helyszin:{
    orszag:string;
    varos:string;
    }


}

function Csomagok() {

    const [csomagok, setCsomagok] = useState<Csomag[]>([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/utazasi_csomagoks")
            .then(res => res.json())
            .then(data => setCsomagok(data))
            .catch(err => console.log("Hiba a Csomagok fetch-nél:",err));
    }, []);




    return (
        
        <div className={style.csomagContainer}>

            {csomagok.map((csomag) => (
                <Link className={style.noLink} key={csomag.id} to={`/csomagok/${csomag.id}`}>
                <div className={style.divContainer} >

                    <div className={style.firstpicture}>
                         <img 
                        src={require(`../pictures/firstPictures/${csomag.helyszin.orszag.toLowerCase().replace(/ /g, "_")}.jpg`)}
                        alt={csomag.helyszin.orszag} 
                        />


                    </div>

                    <div className={style.szovegContainer}>
                    <p className={style.orszagText}>{csomag.helyszin.orszag}</p>
                    <p className={style.varosText}>{csomag.helyszin.varos}</p>
                    <p  className={style.arText}>Ár: {csomag.ar} Ft</p>
                    </div>
                </div>
                </Link>
            ))}

        </div>
    );
}

export default Csomagok;


/*
Borito kep
heyszin(orszag,varos)- a helyszin tablabol 
ár
*/
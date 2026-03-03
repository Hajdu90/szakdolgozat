
import { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";


import style from "./Csomagok.module.css"


//képek
import cape_verde from "../pictures/firstPictures/cape_verde.jpg"
import montserrat from "../pictures/firstPictures/montserrat.jpg"
import hungary from "../pictures/firstPictures/hungary.jpg"
import costa_rica from "../pictures/firstPictures/costa_rica.jpg"

//alap kep a seedeles miatt

import alap from "../pictures/alap.jpg"

const kepek: { [key: string]: string }={ 
    cape_verde,
    montserrat,
    hungary,
    costa_rica
}



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
    const [utas, setUtas] = useState(1);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/utazasi_csomagoks")
            .then(res => res.json())
            .then(data => setCsomagok(data))
            .catch(err => console.log("Hiba a Csomagok fetch-nél:",err));
    }, []);




    return (
        <div>
            {/*Kereses  */}

            <header className={style.homeHeader}>
            <select className={style.destinationSelect}>
                <option value="" disabled selected>Hova szeretne utazni?</option>
                <option value="Orszag1">Orszag1</option>
                <option value="Orszag2">Orszag2</option>
                <option value="Orszag3">Orszag3</option>
                <option value="Orszag4">Orszag4</option>
            </select>

    
          <input type="date" className={style.dateInput} />
          
          <div className={style.passengerCounter}>
            <span className={style.passengerLabel}>Utasok</span>
            <button className={style.passengerBtn} onClick={() => setUtas((prev) => Math.max(prev - 1, 1))}>-</button>

            <span className={style.passengerNumber}>{utas}</span>
            <button className={style.passengerBtn} onClick={() => setUtas((prev) => Math.min(prev + 1, 10))}>+</button>
          </div>
          <button className={style.searchBtn}>Keresés</button>

        </header>

        
        <div className={style.csomagContainer}>

            {csomagok.map((csomag) => (
                <Link className={style.noLink} key={csomag.id} to={`/csomagok/${csomag.id}`}>
                <div className={style.divContainer} >

                    <div className={style.firstpicture}>
                         <img
                        src={kepek[csomag.helyszin.orszag.toLowerCase()] || alap} 
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
        </div>
    );
}

export default Csomagok;


/*
Borito kep
heyszin(orszag,varos)- a helyszin tablabol 
ár
*/
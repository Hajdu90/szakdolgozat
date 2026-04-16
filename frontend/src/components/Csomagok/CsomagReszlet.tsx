import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Csomagok.module.css";
import { useKosar } from "../Kosar/KosarContext";

import { useAuth } from "../Authorization/AuthContext"; 

// Képek 
import kep1 from "../pictures/alap/1.jpg";
import kep2 from "../pictures/alap/2.jpg";
import kep3 from "../pictures/alap/3.jpg";


const API_BASE_URL = "http://localhost:8000";


interface Csomag {
    id: number;
    indulasi_datum: string;
    visszaut_datum: string;
    szabad_helyek: number;
    ar: number;
    helyszin: {
        orszag: string;
        varos: string;
        leiras?: string | null;
    };
    utazasi_mod: {
        tipus: string;
    };

    kepek?:{
        id:number;
        kep_eleresi_ut:string
    }[];

}


function CsomagReszlet() {
    
    const { isLoggedIn, isAdmin } = useAuth();

    const { id } = useParams();
    const [csomag, setCsomag] = useState<Csomag | null>(null);
    const navigate = useNavigate();
    const [currentImg, setCurrentImg] = useState<string>(kep1);
    const [utas, setUtas] = useState(1);
    const { kosarHozzaAd } = useKosar();

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/utazasi_csomagoks/${id}`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
         })
            .then(data => {
             setCsomag(data);
            // ← ez az új sor
             if (data.kepek && data.kepek.length > 0) {
                   setCurrentImg(data.kepek[0].kep_eleresi_ut);
             }
         })
            .catch((err) => {
             console.log("Hiba a CsomagReszlet fetch-nél:", err);
             setCsomag(null);
            });
    }, [id]);

    if (!csomag) return <div style={{ minHeight: "90vh" }}>Betöltés...</div>;;

    return (
        <div>
            <button className={styles.visszaBtn} onClick={() => navigate(-1)}>vissza</button>

            <div className={styles.sectionContainer}>
                <div className={styles.kepekBaloldal}>


                    <div className={styles.nagyKep}>
                       <img src={

                             csomag.kepek && csomag.kepek.length > 0
                            ? currentImg
                            : kep1
                            } alt="" />

                        
                    </div>

                   <div className={styles.kisKepekContainer}>
                        {csomag.kepek && csomag.kepek.length > 0
                            ? csomag.kepek.map((k) => (
                                <img
                                    key={k.id}
                                    src={`${k.kep_eleresi_ut}`}
                                    onClick={() => setCurrentImg(k.kep_eleresi_ut)}
                                    alt=""
                                />
                            ))
                            : <>
                                <img src={kep1} onClick={() => setCurrentImg(kep1)} alt="" />
                                <img src={kep2} onClick={() => setCurrentImg(kep2)} alt="" />
                                <img src={kep3} onClick={() => setCurrentImg(kep3)} alt="" />
                            </>
    }                   
                    </div>
                </div>

                <section className={styles.infoSection}>
                    <h2 className={styles.csomagTitle}>{csomag.helyszin.orszag}, {csomag.helyszin.varos}</h2>
                    <p className={styles.csLeiras}>{csomag.helyszin.leiras}</p>

                    <div>
                        <div className={styles.idopont}>
                            <p>Check-in: {csomag.indulasi_datum}</p>
                            <p>Check-out: {csomag.visszaut_datum}</p>
                        </div>
                        <div className={styles.infoContaners}>
                            <p style={{color:"#9ea8b9", fontWeight:"bold"}}>Szabad helyek:</p>
                            <p className={styles.szabadhelyPtag}> {csomag.szabad_helyek}</p>
                        </div>
                        <div className={styles.infoContaners}>
                            <p style={{color:"#9ea8b9", fontWeight:"bold"}}> Utazásimod:</p>
                            <p className={styles.utazasimodePtag} >{csomag.utazasi_mod.tipus}</p>
                        </div>
                    </div>

                    <div className={styles.sectionThreeContainer}>
                        <p className={styles.csAr}>Ár: {csomag.ar} Ft</p>

                        
                        {isLoggedIn && !isAdmin && (
                            <div className={styles.passengerCounter}>
                                <span style={{color:"#9ea8b9", fontWeight:"bold"}}>Utasok</span>
                                <button className={styles.passengerSinginBtn} onClick={() => setUtas((prev) => Math.max(prev - 1, 1))}> - </button>
                                <span style={{color:"#5785d3", fontWeight:"bold", paddingLeft:"5px", paddingRight:"5px"}}>{utas}</span>
                                <button className={styles.passengerSinginBtn} onClick={() => setUtas((prev) => Math.min(prev + 1, csomag.szabad_helyek))}>+</button>
                            </div>
                        )}
                    </div>

                    {isLoggedIn && !isAdmin && (
                        <button className={styles.kosarbaBtn} onClick={() => kosarHozzaAd({
                            csomagId: csomag.id,
                            nev: `${csomag.helyszin.orszag}, ${csomag.helyszin.varos}`,
                            utasokSzama: utas,
                            ar: csomag.ar,
                        })}>kosárba</button>
                    )}

                    {!isLoggedIn && !isAdmin &&(
                        <p className={styles.pinfo}>A foglaláshoz jelentkezz be</p>
                    )}
                </section>
            </div>
        </div>
    );
}

export default CsomagReszlet;
/*
kepek
utazasi mod- id: utazasi_csomagoks->utazasi_mod_d
helyszin: utazasi_csomagoks -> helyszin_id->helyszins.id

 */


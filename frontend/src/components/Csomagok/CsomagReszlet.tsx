import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./Csomagok.module.css"

//alapkepek egyenlőre

import kep1 from "../pictures/alap/1.jpg"
import kep2 from "../pictures/alap/2.jpg"
import kep3 from "../pictures/alap/3.jpg"

const API_BASE_URL = "http://localhost:8000";

type CsomagReszletPropsBejelentkezesUtan={
    isLoggedIn:boolean;
    isAdmin:boolean;
}

interface Csomag {
    id: number;
    indulasi_datum: string;
    visszaut_datum: string;
    szabad_helyek: number;
    ar: number;

    helyszin:{
        orszag: string;
        varos:string
    }

    utazasi_mod:{
        tipus:string;
    }
}


function CsomagReszlet({isLoggedIn,isAdmin}: CsomagReszletPropsBejelentkezesUtan) {

    const { id } = useParams();
    const [csomag, setCsomag] = useState<Csomag | null>(null);
    const navigate=useNavigate();

    const [currentImg, setCurrentImg]=useState(kep1)

     const [utas, setUtas] = useState(1);

   useEffect(() => {
    fetch(`${API_BASE_URL}/api/utazasi_csomagoks/${id}`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(data => {
            console.log("Fetched csomag:", data);
            setCsomag(data);
        })
        .catch((err) => {
            console.log("Hiba a CsomagReszlet fetch-nél:", err);
            setCsomag(null);
        });
}, [id]);

    if (!csomag) return <p>Betöltés...</p>;

    return (
        <div>
            <button className={styles.visszaBtn} onClick={()=>navigate(-1)}>vissza</button>


            <div className={styles.sectionContainer}>
                <div className={styles.kepekBaloldal}>

                    <div className={styles.nagyKep}>
                        <img src={currentImg} alt="" /> 
                    </div>

                    <div className={styles.kisKepekContainer}>
                        <img src={kep1} onClick={()=> setCurrentImg(kep1)} alt="" />
                        <img src={kep2} onClick={()=> setCurrentImg(kep2)} alt="" />
                        <img src={kep3}  onClick={()=> setCurrentImg(kep3)} alt="" />
                    </div>
                </div>


                <section className={styles.infoSection}>
                    <h2 className={styles.csomagTitle}>{csomag.helyszin.orszag}, {csomag.helyszin.varos}</h2>
                     <p className={styles.csLeiras}>Leirás: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat pariatur temporibus cupiditate? Eligendi ullam similique neque porro autem perspiciatis rem fuga sed, magni quas, eum placeat, amet qui atque optio.</p>

                    <div>
                        <div className={styles.infoContaners} >
                            <p style={{color:"#828995", fontWeight:"bold"}}>Állat barát</p>
                            <p style={{color:"#828995", fontWeight:"bold", marginLeft:"9px"}}>FreeWifi</p>
                            <p style={{color:"#828995", fontWeight:"bold", marginLeft:"9px"}}>Reggeli az árban</p>
                        </div>
                    <div className={styles.idopont}>
                        <p>Check-in: {csomag.indulasi_datum}</p>
                        <p>Check-out: {csomag.visszaut_datum}</p>
                    </div>
                  

                    <div className={styles.infoContaners}>
                        <p style={{color:"#9ea8b9", fontWeight:"bold"}}>Utazási mód:</p>
                        <p className={styles.utazasimodePtag}>{csomag.utazasi_mod?.tipus ?? "Nincs adat"}</p>
                    </div>
                    
                    

                    <div className={styles.infoContaners}>
                        <p style={{color:"#9ea8b9", fontWeight:"bold"}}>Szabad helyek:</p>
                        <p className={styles.szabadhelyPtag}> {csomag.szabad_helyek}</p>
                    </div>

                   </div>

                    
                   

                    <div className={styles.sectionThreeContainer}>
                        <p className={styles.csAr}>Ár: {csomag.ar} Ft</p>

                    {/*bejelentkezés után */}
                    {isLoggedIn&& !isAdmin &&
                    <div className={styles.passengerCounter}>
                        <span style={{color:"#9ea8b9", fontWeight:"bold"}} >Utasok</span>
                        <button className={styles.passengerSinginBtn} onClick={() => setUtas((prev) => Math.max(prev - 1, 1))}> - </button>
                        <span  style={{color:"#5785d3", fontWeight:"bold",paddingLeft:"5px", paddingRight:"5px"}}>{utas}</span>
                        <button
                        className={styles.passengerSinginBtn} onClick={() => setUtas((prev) => Math.min(prev + 1, csomag.szabad_helyek))}>+</button>
                    </div>}
                   
                    </div>
                     {isLoggedIn && !isAdmin &&
                    <button className={styles.kosarbaBtn} >kosárba</button>}


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


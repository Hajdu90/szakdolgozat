import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./Csomagok.module.css"

//alapkepek egyenlőre

import kep1 from "../pictures/alap/1.jpg"
import kep2 from "../pictures/alap/2.jpg"
import kep3 from "../pictures/alap/3.jpg"


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

function CsomagReszlet() {

    const { id } = useParams();
    const [csomag, setCsomag] = useState<Csomag | null>(null);
    const navigate=useNavigate();

    const [currentImg, setCurrentImg]=useState(kep1)

   useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/utazasi_csomagoks/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log("Fetched csomag:", data);
            setCsomag(data);
        });
}, [id]);

    if (!csomag) return <p>Betöltés...</p>;

    return (
        <div>
            <button className={styles.visszaBtn} onClick={()=>navigate("/csomagok")}>vissza</button>


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

                    
                    <p className={styles.csAr}>Ár: {csomag.ar} Ft</p>


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

{/* sari.eva@oif.gov.hu */}
import { useEffect, useState } from "react";
import styles from "./Home.module.css";

import bannerPic from "../pictures/Beach_Banner.jpg"

import alapPic from "../pictures/alap.jpg"

import { data, useNavigate, Link } from "react-router-dom";

function Home() {
 
  const navigate=useNavigate();

  //lasMin
  const [lastMin,setLastMinute]=useState<any []>([]);

  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/utazasi_csomagoks")
    .then(res => res.json())
    .then(data=>setLastMinute(data));
  }, []);

  return (
    <>
      <article>
        
       
        <div className={styles.imageContainer}>
          <img className={styles.banner} src={bannerPic} alt="" />
          <button className={styles.packageBtn} onClick={() => navigate("/csomagok")}>Csomagok</button>
        </div>
      </article>




     {/* Last Minute szekció */}
     {/* Last Minute szekció */}
<section className={styles.lastMinuteSection}>
  <h2 className={styles.lastMinuteTitle}>Last Minute</h2>

  <div className={styles.lastMinuteContainer}>

    {lastMin
      .filter(csomag => csomag.is_lastminute)
      .slice(0, 4)
      .map(csomag => (
        <Link
        key={csomag.id}
        to={`/csomagok/${csomag.id}`}
        className={styles.noLink}
        >
            <div className={styles.lastMinuteCard}>
          
          <img src={alapPic} alt="" />

          <div>
            <p>{csomag.helyszin.orszag}</p>

            <p style={{ textDecoration: "line-through", color: "gray" }}>
              {csomag.ar} Ft
            </p>

            <p style={{ color: "red", fontWeight: "bold" }}>
              {csomag.akcios_ar} Ft
            </p>

          </div>
        </div>
        </Link>
        
        
      
      ))}

  </div>
</section>
    

<section className={styles.secContainer}>
    <div className={styles.secSectionDiv} >
        <h2>Széles választék</h2>
        <p>Hazai és külföldi utazásszervezől összes kínálata egy helyen, könnyen
            összehasonlítható formában.
        </p>
    </div>
    <div className={styles.secSectionDiv} >
        <h2>Legalacsonyabb ár</h2>
        <p>Ha a megrendelt utazást az utazás- szervezőnél kezdvezőbb áron találja visszatérítjük az 
            árkülönbözetet, valamit 40.000Ft jutalommal részesítjük.
        </p>
    </div>
    <div className={styles.secSectionDiv} >
        <h2>Valós értékelések</h2>
        <p>Több mint 350.000, korábbi utasainktól származó ellenőrzött értékelés nyújt
            segítséget a döntéshozatalban.
        </p>
    </div>
</section>



      
    </>
  );
}

export default Home;
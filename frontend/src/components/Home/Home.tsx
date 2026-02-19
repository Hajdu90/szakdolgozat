import { useState } from "react";
import styles from "./Home.module.css";

import bannerPic from "../pictures/Beach_Banner.jpg"

import { useNavigate } from "react-router-dom";

function Home() {
  const [utas, setUtas] = useState(1);
  const navigate=useNavigate();

  return (
    <>
      <article>
        <header className={styles.homeHeader}>
            <select className={styles.destinationSelect}>
                <option value="" disabled selected>Hova szeretne utazni?</option>
                <option value="Orszag1">Orszag1</option>
                <option value="Orszag2">Orszag2</option>
                <option value="Orszag3">Orszag3</option>
                <option value="Orszag4">Orszag4</option>
            </select>

    
          <input type="date" className={styles.dateInput} />
          
          <div className={styles.passengerCounter}>
            <span className={styles.passengerLabel}>Utasok</span>
            <button className={styles.passengerBtn} onClick={() => setUtas((prev) => Math.max(prev - 1, 1))}>-</button>

            <span className={styles.passengerNumber}>{utas}</span>
            <button className={styles.passengerBtn} onClick={() => setUtas((prev) => Math.min(prev + 1, 10))}>+</button>
          </div>
          <button className={styles.searchBtn}>Keresés</button>

        </header>

       
        <div className={styles.imageContainer}>
          <img className={styles.banner} src={bannerPic} alt="" />
          <button className={styles.packageBtn} onClick={() => navigate("/csomagok")}>Csomagok</button>
        </div>
      </article>




     {/* Last Minute szekció */}
     <section className={styles.lastMinuteSection}>
        <h2 className={styles.lastMinuteTitle}>Last Minute</h2>

        <div className={styles.lastMinuteContainer}>

            <div className={styles.lastMinuteCard}>
                <img src="kepek/oraszag1.jpg" alt="Ország1" />
            <div>
                <p>Ország1</p>
                <p>Régió1 | *4.8</p>
            </div>
     
        </div>
        
        <div className={styles.lastMinuteCard}>
            <img src="kepek/oraszag2.jpg" alt="Ország2" />
            <div>
                <p>Ország1</p>
                <p>Régió1 | *4.8</p>
                </div>
            </div>
            
        <div className={styles.lastMinuteCard}>
            <img src="kepek/oraszag3.jpg" alt="Ország3" />
            <div>
                <p>Ország1</p>
                <p>Régió1 | *4.8</p>
            </div>
        </div>


        <div className={styles.lastMinuteCard}>
            <img src="kepek/oraszag4.jpg" alt="Ország4" />
      
            <div>
                <p>Ország1</p>
                <p>Régió1 | *4.8</p>
            </div>
        </div>
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
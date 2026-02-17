import { useState } from "react";
import styles from "./Home.module.css";

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
          <p>itt lesz egy kép</p>
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



      
    </>
  );
}

export default Home;
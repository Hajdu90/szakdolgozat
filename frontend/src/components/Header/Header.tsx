import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className={styles.headerTop}>
        <div className={styles.logoWrapper}>
            <a href="/" className={styles.logo}>Viazy</a>
        </div>
        
        <ul className={`${styles.ulLista} ${isMenuOpen ? styles.active : ""}`}>

            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Főoldal</Link></li>
            <li><Link to="/csomagok" onClick={() => setIsMenuOpen(false)}>Csomagok</Link></li>
            <li><a href="#" onClick={() => setIsMenuOpen(false)}>Rólunk</a></li>
     
            <div className={styles.mobileButtons}>
                <button className={styles.regBtn}>Regisztráció</button>
                <button className={styles.bejlnBtn}>Bejelentkezés</button>
            </div>
            
        </ul>
        
        <div className={styles.rightSide}>
            <div className={styles.desktopButtons}>
                <div className={styles.btnWrapper}>
                    <button className={styles.regBtn}>Regisztráció</button>
                    <button className={styles.bejlnBtn}>Bejelentkezés</button>
                </div>
            </div>

            <div className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span className={isMenuOpen ? styles.bar1 : ""}></span>
                <span className={isMenuOpen ? styles.bar2 : ""}></span>
                <span className={isMenuOpen ? styles.bar3 : ""}></span>
            </div>
        </div>

</header>
   
  );
}

export default Header;
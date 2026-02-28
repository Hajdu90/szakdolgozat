import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

import Bejelentkezes from "../Bejelentkezes/Bejelenkezes";
import SingUp from "../Csomagok/SingUp/SingUp";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);


  const [login,setLogin]=useState<boolean>(false);
  const [singUp,setSingUp]=useState<boolean>(false);





  return (
    <>
    <header className={styles.headerTop}>

        <div className={styles.logoWrapper}>
            <a href="/" className={styles.logo}>Viazy</a>
        </div>
        
        <ul className={`${styles.ulLista} ${isMenuOpen ? styles.active : ""}`}>

            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Főoldal</Link></li>
            <li><Link to="/csomagok" onClick={() => setIsMenuOpen(false)}>Csomagok</Link></li>
            <li><a href="#" onClick={() => setIsMenuOpen(false)}>Rólunk</a></li>
     
            <div className={styles.mobileButtons}>
                <button onClick={()=> setSingUp(prev => !prev)} className={styles.regBtn}>Regisztráció</button>
                <button onClick={()=>setLogin(prev =>!prev)} className={styles.bejlnBtn}>Bejelentkezés</button>
            </div>
            
        </ul>
        
        <div className={styles.rightSide}>
            <div className={styles.desktopButtons}>
                <div className={styles.btnWrapper}>
                    <button onClick={()=>setSingUp(prev => !prev)} className={styles.regBtn}>Regisztráció</button>
                    <button  onClick={()=>setLogin(prev => !prev)} className={styles.bejlnBtn}>Bejelentkezés</button>
                </div>
            </div>

            <div className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span className={isMenuOpen ? styles.bar1 : ""}></span>
                <span className={isMenuOpen ? styles.bar2 : ""}></span>
                <span className={isMenuOpen ? styles.bar3 : ""}></span>
            </div>
        </div>

</header>
    {login && <Bejelentkezes onClose={() => setLogin(false)} />}
    {singUp && <SingUp OnCloseSingUp={() => setSingUp(false)}/>}
</>
   
  );
}

export default Header;
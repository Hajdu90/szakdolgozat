
import styles from "./Header.module.css"


function Header(){
    return(
        <header className={styles.headerTop}>
            <a href="/" className={styles.logo}>Viazy</a>
            <button className={styles.regBtn}>Regisztració</button>
            <button className={styles.bejlnBtn}>Bejelentkezés</button>
            
        </header>
    )
}

export default Header;
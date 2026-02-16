
import styles from "./NavBar.module.css"

function NavBar(){
    return(
        <nav className={styles.navBar}>
            <ul className={styles.ulLista}>
                <li><a href="/">Főoldal</a></li>
                <li><a href="">Csomagok</a></li>
                <li><a href="">Rólunk</a></li>
            </ul>
            <button className={styles.kosar}>kosár</button>
        </nav>
    )
}

export default NavBar;
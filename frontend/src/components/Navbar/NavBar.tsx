import { Link } from "react-router-dom";
import styles from "./NavBar.module.css"

function NavBar(){
    return(
        <nav className={styles.navBar}>
            <ul className={styles.ulLista}>
                <li><Link to="/">Főoldal</Link></li>
                <li> <Link to="/csomagok">Csomagok</Link></li>
                <li><a href="">Rólunk</a></li>
            </ul>
            <button className={styles.kosar}>kosár</button>
        </nav>
    )
}

export default NavBar;
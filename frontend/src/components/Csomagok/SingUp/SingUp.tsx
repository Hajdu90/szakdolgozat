import styles from "./SingUp.module.css";


interface Props {
    OnCloseSingUp: () =>void;
}

function SingUp({OnCloseSingUp}: Props){
    return(
       <div className={styles.singUpContainer} onClick={OnCloseSingUp}>
        <form className={styles.singUpForm}>
            <button onClick={OnCloseSingUp} className={styles.closeBtn}>&times;</button>
            <input type="name" placeholder="teljes név"/>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="jelszó"/>
            <input type="password" placeholder="jelszó újra"/>
            <button type="submit" className={styles.singUpBtn}>Regisztráció</button>
        </form>

       </div>
    )
}

export default SingUp;



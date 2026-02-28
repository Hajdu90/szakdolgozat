import styles from "./Bejelentkezes.module.css";


interface Props {
  onClose: () => void;
}

function Bejelentkezes({ onClose }: Props) {
  return (
    <div className={styles.bejelenkezesContainer} onClick={onClose}>
      <form className={styles.bejelForm} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>&times;</button>
        <input className={styles.bejEmail} type="email" placeholder="Email" />
        <input className={styles.bejJelsz} type="password" placeholder="Jelszó" />
        <button className={styles.bejelBtn} type="submit">Bejelentkezés</button>
      </form>
    </div>
  );
}

export default Bejelentkezes;
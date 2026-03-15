import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useKosar } from "../Kosar/KosarContext";
import { useAuth } from "../Authorization/AuthContext"; 
import styles from "./Header.module.css";
import Fizetes from "../Fizetes/Fizetes";

function Header() {
  const { isLoggedIn, user, isAdmin, isInitialSync, loading, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wasJustLoggedIn, setWasJustLoggedIn] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigate = useNavigate();
  const { kosar, removeFromKosar } = useKosar();

  useEffect(() => {
    if (isLoggedIn && wasJustLoggedIn) {
      if (isAdmin) navigate("/admin");
      else navigate("/");
      setWasJustLoggedIn(false);
    }
  }, [isLoggedIn, isAdmin, navigate, wasJustLoggedIn]);

  // Bejelentkezés kezelése
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    try {
      await login(email.trim(), password);
      setWasJustLoggedIn(true);
    } catch {
      alert("Hiba: Ellenőrizd az adataidat!");
    }
  };

  // Login form
  const loginForm = (
    <form className={styles.loginForm} onSubmit={handleLogin}>
      <input className={styles.loginInput} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} disabled={loading} />
      <input className={styles.loginInput} type="password" placeholder="Jelszó" value={password} onChange={e => setPassword(e.target.value)} disabled={loading} />
      <button className={styles.bejlnBtn} type="submit" disabled={loading}>
        {loading ? "Bejelentkezés..." : "Bejelentkezés"}
      </button>
    </form>
  );

  // Bejelentkezett felhasználó tartalom
  const loggedInContent = (
    <div className={styles.loggedInBox}>
      <span className={styles.welcomeText}>Üdv, {user?.name || "Felhasználó"}</span>

      {!isAdmin && (
        <div className={styles.cartWrapper}>
          <button className={styles.cartBtn} onClick={() => setIsCartOpen(!isCartOpen)}>
            🛒 
          </button>
          {isCartOpen && (
            <div className={styles.cartDropdown}>
              <button className={styles.cartCloseBtn} onClick={() => setIsCartOpen(false)}>✖</button>
              {kosar.length === 0 ? (
                <p className={styles.emptyMsg}>A kosarad még üres</p>
              ) : (
                <>
                  <ul className={styles.cartList}>
                    {kosar.map(item => (
                      <li key={item.csomagId} className={styles.cartItem}>
                        <div className={styles.cartItemInfo}>
                          <span className={styles.itemName}>{item.nev}</span>
                          <span className={styles.itemMeta}>{item.utasokSzama} fő • {item.ar * item.utasokSzama} Ft</span>
                        </div>
                        <button className={styles.removeBtn} onClick={() => removeFromKosar(item.csomagId)}>✕</button>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.cartFooter}>
                    <div className={styles.totalRow}>
                      <span>Összesen:</span>
                      <strong>{kosar.reduce((acc, curr) => acc + curr.ar * curr.utasokSzama, 0)} Ft</strong>
                    </div>
                    {kosar.length > 0 && <Fizetes />}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      <button className={styles.logoutBtn} onClick={logout}>Kijelentkezés</button>
    </div>
  );

  // Skeleton a betöltéshez
  const authSkeleton = (
    <div className={styles.authSkeleton} aria-hidden="true">
      <div className={styles.skeletonBlock} />
    </div>
  );

  return (
    <header className={styles.headerTop}>
      <div className={styles.logoWrapper}>
        <Link to="/" className={styles.logo}>Viazy</Link>
      </div>

      <ul className={`${styles.ulLista} ${isMenuOpen ? styles.active : ""}`}>
        {isLoggedIn && isAdmin ? (
          <li><Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link></li>
        ) : (
          <>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Főoldal</Link></li>
            <li><Link to="/csomagok" onClick={() => setIsMenuOpen(false)}>Csomagok</Link></li>
            <li><Link to="/rolunk" onClick={() => setIsMenuOpen(false)}>Rólunk</Link></li>
            {isLoggedIn && !isAdmin && <li><Link to="/utazasaim" onClick={() => setIsMenuOpen(false)}>Utazásaim</Link></li>}
          </>
        )}

        <div className={styles.mobileButtons}>
          {isInitialSync ? authSkeleton : (isLoggedIn ? loggedInContent : <>
            {loginForm}
            <Link to="/register" className={styles.regBtn}>Regisztráció</Link>
          </>)}
        </div>
      </ul>

      <div className={styles.rightSide}>
        <div className={styles.desktopButtons}>
          {isInitialSync ? authSkeleton : (isLoggedIn ? loggedInContent : (
            <div className={styles.btnWrapper}>
              <Link to="/register" className={styles.regBtn}>Regisztráció</Link>
              {loginForm}
            </div>
          ))}
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
import { useState, Dispatch, SetStateAction, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useKosar } from "../Kosar/KosarContext";
import styles from "./Header.module.css";
import Fizetes from "../Fizetes/Fizetes";

type HeaderProps = {
  isLoggedIn: boolean;
  loggedInUserName: string;
  isLoginInProgress: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setLoggedInUserName: Dispatch<SetStateAction<string>>;
  onLogin: (email: string, password: string) => Promise<void>;
  isAdmin: boolean;
  isInitialUserSyncing: boolean;
};

function Header({
  isLoggedIn,
  loggedInUserName,
  isLoginInProgress,
  setIsLoggedIn,
  setLoggedInUserName,
  onLogin,
  isAdmin,
  isInitialUserSyncing,
}: HeaderProps) {
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

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    await onLogin(email.trim(), password);
    setWasJustLoggedIn(true);
  };

 const handleLogout = async () => {
  try {
    // kiolvasni a tokent a sütikből
    const xsrfToken = document.cookie
      .split("; ")
      .find(row => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];


   
    const tokenToSend = xsrfToken ? decodeURIComponent(xsrfToken) : null;

    const response = await fetch("http://localhost:8000/logout", {
      method: "POST",
      credentials: "include", 
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": tokenToSend || "", 
      },
    });

    if (response.ok || response.status === 204) {
      setIsLoggedIn(false);
      setLoggedInUserName("");
      setIsMenuOpen(false);
      setIsCartOpen(false); 
      navigate("/");
    } else if (response.status === 419) {
     
       setIsLoggedIn(false);
       navigate("/");
    }
  } catch (err) {
    console.error("Logout failed:", err);
  }
};
  const loginForm = (
    <form className={styles.loginForm} onSubmit={handleLogin}>
      <input
        className={styles.loginInput}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoginInProgress}
      />
      <input
        className={styles.loginInput}
        type="password"
        placeholder="Jelszó"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoginInProgress}
      />
      <button className={styles.bejlnBtn} type="submit" disabled={isLoginInProgress}>
        {isLoginInProgress ? "Bejelentkezés..." : "Bejelentkezés"}
      </button>
    </form>
  );

  // --- Skeleton rész ---
  const authSkeleton = (
    <div className={styles.authSkeleton} aria-hidden="true">
      <div className={styles.skeletonBlock} />
    </div>
  );

  const loggedInContent = (
    <div className={styles.loggedInBox}>
      <span className={styles.welcomeText}>Üdv, {loggedInUserName}</span>

      {!isAdmin && (
        <div className={styles.cartWrapper}>
          <button className={styles.cartBtn} onClick={() => setIsCartOpen(!isCartOpen)}>
            🛒 ({kosar.length})
          </button>
          {isCartOpen && (
            <div className={styles.cartDropdown}>
              <button className={styles.cartCloseBtn} onClick={() => setIsCartOpen(false)}>✖</button>
              {kosar.length === 0 ? (
                <p className={styles.emptyMsg}>A kosarad még üres</p>
              ) : (
                <>
                  <ul className={styles.cartList}>
                    {kosar.map((elem) => (
                      <li key={elem.csomagId} className={styles.cartItem}>
                        <div className={styles.cartItemInfo}>
                          <span className={styles.itemName}>{elem.nev}</span>
                          <span className={styles.itemMeta}>
                            {elem.utasokSzama} fő • {elem.ar * elem.utasokSzama} Ft
                          </span>
                        </div>
                        <button
                          className={styles.removeBtn}
                          onClick={() => removeFromKosar(elem.csomagId)}
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.cartFooter}>
                    <div className={styles.totalRow}>
                      <span>Összesen:</span>
                      <strong>{kosar.reduce((acc, curr) => acc + (curr.ar * curr.utasokSzama), 0)} Ft</strong>
                    </div>
                    {kosar.length >0 && <Fizetes/>}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      <button className={styles.logoutBtn} onClick={handleLogout}>Kijelentkezés</button>
    </div>
  );

  return (
    <header className={styles.headerTop}>
      <div className={styles.logoWrapper}>
        <Link to="/" className={styles.logo}>Viazy</Link>
      </div>

      <ul className={`${styles.ulLista} ${isMenuOpen ? styles.active : ""}`}>
        {isLoggedIn && isAdmin ? (
          <li>
            <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>
          </li>
        ) : (
          <>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Főoldal</Link></li>
            <li><Link to="/csomagok" onClick={() => setIsMenuOpen(false)}>Csomagok</Link></li>
            <li><Link to="/rolunk" onClick={() => setIsMenuOpen(false)}>Rólunk</Link></li>
            {isLoggedIn && !isAdmin && (
              <li><Link to="/utazasaim" onClick={() => setIsMenuOpen(false)}>Utazásaim</Link></li>
            )}
          </>
        )}

        <div className={styles.mobileButtons}>
          {isInitialUserSyncing ? authSkeleton : (isLoggedIn ? loggedInContent : <>
            {loginForm}
            <button className={styles.regBtn}>Regisztráció</button>
          </>)}
        </div>
      </ul>

      <div className={styles.rightSide}>
        <div className={styles.desktopButtons}>
          {isInitialUserSyncing ? authSkeleton : (isLoggedIn ? loggedInContent : (
            <div className={styles.btnWrapper}>
              <button className={styles.regBtn}>Regisztráció</button>
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
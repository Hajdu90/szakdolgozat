import { Dispatch, FormEvent, SetStateAction, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

type HeaderProps = {
  isLoggedIn: boolean;
  loggedInUserName: string;
  isLoginInProgress: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setLoggedInUserName: Dispatch<SetStateAction<string>>;
  onLogin: (email: string, password: string) => Promise<void>;
  isAdmin: boolean;
};

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()!.split(";").shift()!);
  }
  return null;
}

function Header({
  isLoggedIn,
  loggedInUserName,
  isLoginInProgress,
  setIsLoggedIn,
  setLoggedInUserName,
  onLogin,
  isAdmin
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  //bejelentkezés után történjen navigáció
  const [wasJustLoggedIn, setWasJustLoggedIn] = useState<boolean>(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && wasJustLoggedIn) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
      setWasJustLoggedIn(false); 
    }
  }, [isLoggedIn, isAdmin, navigate, wasJustLoggedIn]);

  const handleLogin = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (!email.trim() || !password) return;
    
    await onLogin(email.trim(), password);
    setWasJustLoggedIn(true); 
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await fetch("http://localhost:8000/sanctum/csrf-cookie", { credentials: "include" });
      const xsrfToken = getCookie("XSRF-TOKEN");
      if (!xsrfToken) return;

      const response = await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": xsrfToken,
        },
      });

      if (response.ok) {
        setIsLoggedIn(false);
        setLoggedInUserName("");
        setIsMenuOpen(false);
        navigate("/"); 
      }
    } catch (error) {
      console.error("Logout failed:", error);
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

  const loggedInContent = (
    <div className={styles.loggedInBox}>
      <span className={styles.welcomeText}>Üdv, {loggedInUserName}</span>
      {!isAdmin && <button className={styles.cartBtn}>🛒</button>}
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
            <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
              Admin Panel
            </Link>
          </li>
        ) : (
           
          <>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Főoldal</Link></li>
            <li><Link to="/csomagok" onClick={() => setIsMenuOpen(false)}>Csomagok</Link></li>
            <li><Link to="/rolunk" onClick={() => setIsMenuOpen(false)}>Rólunk</Link></li>
            
            {/* bejelentkezett sima felhasználónak */}
            {isLoggedIn && !isAdmin && (
              <li>
                <Link to="/utazasaim" onClick={() => setIsMenuOpen(false)}>
                  Utazásaim
                </Link>
              </li>
            )}
          </>
        )}

        {/* Mobil gombok szekciója */}
        <div className={styles.mobileButtons}>
          {!isLoggedIn ? (
            <>
              {loginForm}
              <button className={styles.regBtn}>Regisztráció</button>
            </>
          ) : loggedInContent}
        </div>
      </ul>

      <div className={styles.rightSide}>
        <div className={styles.desktopButtons}>
          {!isLoggedIn ? (
            <div className={styles.btnWrapper}>
              <button className={styles.regBtn}>Regisztráció</button>
              {loginForm}
            </div>
          ) : loggedInContent}
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
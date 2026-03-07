import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

type HeaderProps = {
  isLoggedIn: boolean;
  loggedInUserName: string;
  isLoginInProgress: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setLoggedInUserName: Dispatch<SetStateAction<string>>;
  onLogin: (email: string, password: string) => Promise<void>;
  isInitialUserSyncing: boolean;
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
  isInitialUserSyncing,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (!email.trim() || !password) {
      console.error("Email and password are required");
      return;
    }

    await onLogin(email.trim(), password);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        credentials: "include",
      });

      const xsrfToken = getCookie("XSRF-TOKEN");

      if (!xsrfToken) {
        console.error("XSRF token not found");
        return;
      }

      const response = await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": xsrfToken,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Logout failed:", response.status, errorText);
        return;
      }

      setIsLoggedIn(false);
      setLoggedInUserName("");
      setIsMenuOpen(false);
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout request failed:", error);
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
        placeholder="Jelszo"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoginInProgress}
      />
      <button className={styles.bejlnBtn} type="submit" disabled={isLoginInProgress}>
        {isLoginInProgress ? "Bejelentkezes..." : "Bejelentkezes"}
      </button>
    </form>
  );

  const loggedInContent = (
    <div className={styles.loggedInBox}>
      <span className={styles.welcomeText}>Üdvözöllek, {loggedInUserName}</span>
      {/*Kosar */}
      <button className={styles.cartBtn}>🛒</button>

      <button className={styles.logoutBtn} onClick={handleLogout}>
        Kijelentkezes
      </button>
    </div>
  );

  const authSkeleton = (
    <div className={styles.authSkeleton} aria-hidden="true">
      <span className={`${styles.skeletonBlock} ${styles.skeletonInput}`} />
      <span className={`${styles.skeletonBlock} ${styles.skeletonInput}`} />
      <span className={`${styles.skeletonBlock} ${styles.skeletonButton}`} />
    </div>
  );


  const [login,setLogin]=useState<boolean>(false);
  const [singUp,setSingUp]=useState<boolean>(false);





  return (
    <>
      <header className={styles.headerTop}>
        <div className={styles.logoWrapper}>
          <a href="/" className={styles.logo}>
            Viazy
          </a>
        </div>

        <ul className={`${styles.ulLista} ${isMenuOpen ? styles.active : ""}`}>
        <li>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Fooldal
          </Link>
        </li>
        <li>
          <Link to="/csomagok" onClick={() => setIsMenuOpen(false)}>
            Csomagok
          </Link>
        </li>
        <li>
          <a href="#" onClick={() => setIsMenuOpen(false)}>
            Rolunk
          </a>
        </li>
        <li>
           <Link to="/utazasaim" onClick={() => setIsMenuOpen(false)}>
           Utazasaim
      </Link>
        </li>

        <div className={styles.mobileButtons}>
          {isInitialUserSyncing ? (
            authSkeleton
          ) : isLoggedIn ? (
            loggedInContent
          ) : (
            <>
              <button className={styles.regBtn}>Regisztracio</button>
              {loginForm}
            </>
          )}
        </div>
      </ul>

      <div className={styles.rightSide}>
        <div className={styles.desktopButtons}>
          <div className={styles.btnWrapper}>
            {isInitialUserSyncing ? (
              authSkeleton
            ) : isLoggedIn ? (
              loggedInContent
            ) : (
              <>
                <button className={styles.regBtn}>Regisztracio</button>
                {loginForm}
              </>
            )}
          </div>
        </div>

        <div className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={isMenuOpen ? styles.bar1 : ""}></span>
          <span className={isMenuOpen ? styles.bar2 : ""}></span>
          <span className={isMenuOpen ? styles.bar3 : ""}></span>
        </div>
      </div>
    </header>
    </>
  );
}

export default Header;

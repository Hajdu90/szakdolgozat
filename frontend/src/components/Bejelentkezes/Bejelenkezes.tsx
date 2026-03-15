import { useState, FormEvent } from "react";
import { useAuth } from "../Authorization/AuthContext"; 
import styles from "./Bejelentkezes.module.css";

interface Props {
  onClose: () => void;
}

function Bejelentkezes({ onClose }: Props) {
 
  const { login, loading } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Kérlek töltsd ki mindkét mezőt!");
      return;
    }

    try {
      await login(email, password);
      onClose(); // Sikeres belépés után bezárjuk az ablakot
    } catch (err) {
      setError("Hibás email cím vagy jelszó!");
    }
  };

  return (
    <div className={styles.bejelenkezesContainer} onClick={onClose}>
      <form 
        className={styles.bejelForm} 
        onClick={(e) => e.stopPropagation()} 
        onSubmit={handleSubmit}
      >
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        
        <h2>Bejelentkezés</h2>

        <input 
          className={styles.bejEmail} 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        
        <input 
          className={styles.bejJelsz} 
          type="password" 
          placeholder="Jelszó" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        {error && <p className={styles.errorText} style={{color: 'red'}}>{error}</p>}

        <button 
          className={styles.bejelBtn} 
          type="submit" 
          disabled={loading}
        >
          {loading ? "Folyamatban..." : "Bejelentkezés"}
        </button>
      </form>
    </div>
  );
}

export default Bejelentkezes;
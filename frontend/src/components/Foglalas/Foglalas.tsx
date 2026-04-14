
import { useKosar } from "../Kosar/KosarContext";
import { useNavigate } from "react-router-dom";

function Foglalas() {
  const { kosar, clearKosar } = useKosar();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      //pecsét -biztonságos adatmodositáshoz
      await fetch("http://localhost:8000/sanctum/csrf-cookie", { 
        credentials: "include" 
      });

     //lekéri az összes sütit, amit a weboldal tárol
      const xsrfToken = document.cookie
      //megkeressük benne azt a részt, ami az XSRF-TOKEN=-nel kezdődik, azt levagjuk mert cska a szöveg masodik resze kell
        .split("; ")
        .find(row => row.startsWith("XSRF-TOKEN="))

        ?.split("=")[1];
      //pedig "lefordítja" a szöveget (Sutik neha fura karakTerekbol allnak)
      const tokenToSend = xsrfToken ? decodeURIComponent(xsrfToken) : "";

      // tényleges fizetési kérés a backendnek
      const valasz = await fetch("http://localhost:8000/api/foglalasok/checkout", {
        method: "POST",
        credentials: "include", 
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": tokenToSend, 
        },
      });

      const data = await valasz.json();

      if (valasz.ok) {
        // --- SIKERES ÁG ---
        alert("Sikeres Foglalás! Jó utat kívánunk!");
        
 
        clearKosar();
        
       
        navigate("/utazasaim");
      } else {
        // --- HIBA ÁG ---
        // Például: "Nincs kifizetendő foglalás" vagy "Elfogyott a hely"
        alert(data.message || "Valami hiba történt a foglalás során.");
      }
    } catch (err) {
      console.error("Hiba a kérés során:", err);
      alert("Nem sikerült elérni a szervert.");
    }
  };

  return (
    <div >
      <button 
        onClick={handleCheckout} 
        disabled={kosar.length === 0}>
        {kosar.length === 0 ? "Üres a kosarad" : "Foglalás"}
      </button>
    </div>
  );
}

export default Foglalas;
import { createContext, useContext, useState, ReactNode } from "react";

interface KosarElem {
  csomagId: number;
  nev: string;
  utasokSzama: number;
  ar: number;
}

interface KosarContextType {
  kosar: KosarElem[];
  kosarHozzaAd: (elem: KosarElem) => void;
  removeFromKosar: (csomagId: number) => void;
  clearKosar: ()=>void;
  
}

const KosarContext = createContext<KosarContextType | undefined>(undefined);

export const KosarProvider = ({ children }: { children: ReactNode }) => {
  const [kosar, setKosar] = useState<KosarElem[]>([]);



const kosarHozzaAd = async (elem: KosarElem) => { 
  try {
   
    const response = await fetch("http://localhost:8000/api/foglalasok", { 
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(document.cookie.split('XSRF-TOKEN=')[1]?.split(';')[0] || "")
      },
      body: JSON.stringify({
        utazasi_csomagok_id: elem.csomagId,
        letszam: elem.utasokSzama
      })
    });

    if (response.ok){
      alert("A csomag bekerült a kosárba")
    }

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "Hiba a mentés során");
      return;
    }


    setKosar((prev) => {
      const index = prev.findIndex(e => e.csomagId === elem.csomagId);
      if (index !== -1) {
        const ujKosar = [...prev];
        ujKosar[index] = { ...ujKosar[index], utasokSzama: elem.utasokSzama };
        return ujKosar;
      }
      return [...prev, elem];
    });

  } catch (error) {
    console.error("Hiba történt:", error);
  }
};

  const removeFromKosar = (csomagId: number) => {
    setKosar((prev) => prev.filter((elem) => elem.csomagId !== csomagId));
  };



  const clearKosar=()=>setKosar([]);




  return (
    <KosarContext.Provider value={{ kosar, kosarHozzaAd, removeFromKosar,clearKosar }}>
      {children}
    </KosarContext.Provider>
  );
};

// Hook 
export const useKosar = () => {
  const context = useContext(KosarContext);
  if (!context) throw new Error("useKosar must be used within a KosarProvider");
  return context;
};
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
}

const KosarContext = createContext<KosarContextType | undefined>(undefined);

export const KosarProvider = ({ children }: { children: ReactNode }) => {
  const [kosar, setKosar] = useState<KosarElem[]>([]);

const kosarHozzaAd = (elem: KosarElem) => {
  setKosar((prev) => {
    const index = prev.findIndex(e => e.csomagId === elem.csomagId);
    if (index !== -1) {
      // nem tud tul menni az elerhető helyektől
      const ujKosar = [...prev];
      ujKosar[index] = {
        ...ujKosar[index],
        utasokSzama: elem.utasokSzama,
      };
      return ujKosar;
    }
    return [...prev, elem]; 
  });
};

  const removeFromKosar = (csomagId: number) => {
    setKosar((prev) => prev.filter((elem) => elem.csomagId !== csomagId));
  };

  return (
    <KosarContext.Provider value={{ kosar, kosarHozzaAd, removeFromKosar }}>
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
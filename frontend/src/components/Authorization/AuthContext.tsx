import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    isAdmin: boolean;
    user: any;
    loading: boolean;
    isInitialSync: boolean;
    
    login: (
      email: string, 
      password: string
    ) => Promise<void>;

    register: (
      name: string, 
      email: string, 
      password: string, 
      password_confirmation: string
    ) => Promise<boolean>;

    logout: () => Promise<void>;
    
    //  ujCsomag Létrehozás
    createCsomag: (adatok: {
        helyszin_id: number;
        utazasi_mod_id: number;
        ar: number;
        letszam: number;
        indulasi_datum: string;
        visszaut_datum: string;
    }) => Promise<any>;

    //Csomag Edit
    updateCsomag: (
      id: number, 
      adatok: any
    ) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

//süti kiolvasásához
const getCookie = (name: string): string => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop()!.split(";").shift()!);
    return "";
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    
    //töltés állapot a skeletonhoz- true az alkalmazas meg tolti a felh adatait a szerverről false betöltödött
    const [isInitialSync, setIsInitialSync] = useState(true);

    const api_url = "http://localhost:8000";

    // Felhasználó adatainak szinkronizálása
    const syncUser = async () => {
        try {
            const res = await fetch(`${api_url}/api/user`, {
                method: "GET",
                credentials: "include",
                headers: { Accept: "application/json" }
            });
            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
            console.log("Hálózati hiba a szinkronizálásnál.");
        } finally {
            setIsInitialSync(false);
        }
    };

    // CSRF süti biztosítása, h a backend elfogadja a bejel kerest, Ha nem lenne CSRF->Bárki küldhetne kérést a nevedben
    const ensureCsrf = async () => {
        await fetch(`${api_url}/sanctum/csrf-cookie`, { credentials: "include" });
    };

    // BEJELENTKEZÉS 
    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            await ensureCsrf();  //Lekéri a CSRF sütit, hogy a backend elfogadja a POST kérést.
            const res = await fetch(`${api_url}/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
                },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) throw new Error("Hibás adatok");

            await syncUser(); //ha sikeres a lekérés a felh adatait elmenti a  state-ne
        } finally {
            setLoading(false);
        }
    };

    // REGISZTRÁCIÓ
    const register = async (name: string, email: string, password: string, password_confirmation: string) => {
        setLoading(true);
        try {
            await ensureCsrf();
            const res = await fetch(`${api_url}/register`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
                },
                body: JSON.stringify({ name, email, password, password_confirmation }),
            });

            if (res.ok) {
                await syncUser();
                return true;
            }
            return false;
        } catch (error) {
            console.error("Regisztrációs hiba:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // KIJELENTKEZÉS
    const logout = async () => {
        try {
            await fetch(`${api_url}/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
                },
            });
        } finally {
            setUser(null);
            window.location.href = "/";
        }
    };

    // ÚJ CSOMAG LÉTREHOZÁSA
    const createCsomag = async (adatok: any) => {
        await ensureCsrf();
        const res = await fetch(`${api_url}/api/utazasi-csomagok`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
            },
            body: JSON.stringify(adatok),
        });

        if (!res.ok) throw new Error("Nem sikerült létrehozni a csomagot");
        return await res.json();
    };

   
    const updateCsomag = async (id: number, adatok: any) => {
       
        const res = await fetch(`${api_url}/api/utazasi_csomagoks/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"), 
            },
            body: JSON.stringify(adatok),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Sikertelen módosítás");
        }
        return await res.json();
    };

    useEffect(() => {
        syncUser();
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoggedIn: !!user, //true ha van felhasznalo
            isAdmin: user?.role === "admin" || user?.roles === true, //true ha admin
            user, //userAdatai
            loading, 
            isInitialSync, //elso lekeres kesz-e
            login,
            register,
            logout,
            createCsomag,
            updateCsomag 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
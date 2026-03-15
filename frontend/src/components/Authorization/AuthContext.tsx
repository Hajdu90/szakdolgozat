import {  createContext, useContext, useEffect, useState } from "react";




interface AuthContextType{
    isLoggedIn:boolean;
    isAdmin:Boolean;
    user:any;
    loading:boolean;
    isInitialSync:boolean; //skeletonhoz
    login:(
        email:string,
        password:string
    )=>Promise<void>;
    register:(
        name:string,
        email:string,
        pass:string,
        passConf:string
    )=>Promise<boolean>
    logout:()=>Promise<void>;
}

const AuthContext= createContext<AuthContextType | undefined>(undefined);


//sutiiii

const getCookie = (name: string): string => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop()!.split(";").shift()!);
  return "";
};

export const AuthProvider=({children}: {children:React.ReactNode})=>{
    const [user,setUser]=useState<any>(null);
    const[loading,setLoading]=useState(false);

    //töltés állapot a skeletonhoz- true az alkalmazas meg tolti a felh adatait a szerverről false betöltödött
    const[isInitialSync,setIsInitialSync]=useState(true);


    //felh adatok szinkronizalasa a szerverrel

    const syncUser=async()=>{
        try{
            const res=await fetch("http://localhost:8000/api/user", {
                method:"GET",
                credentials:"include",
                headers:{
                    Accept:"application/json"
                }
            });
            if(res.ok){
                const userData=await res.json();
                setUser(userData);

            }else{
                setUser(null)
                console.log("AuthContext->62 sor :D")
            }
        }catch{
            setUser(null)
            console.log("Halozati Hiba: AuthContext->66 sor");
        }finally{
            setIsInitialSync(false)
        }
    };

    //biztonsagi suti, h a backend elfogadja a bejel kerest, Ha nem lenne CSRF->Bárki küldhetne kérést a nevedben
    const ensureCsrf = async () => {
    await fetch("http://localhost:8000/sanctum/csrf-cookie", { credentials: "include" });
    };

    //BEJELENTKEZÉS
    const login = async (email: string, password: string) => {
    setLoading(true);
    try {

      await ensureCsrf(); //Lekéri a CSRF sütit, hogy a backend elfogadja a POST kérést.

      const res = await fetch("http://localhost:8000/login", { //post kérés a szervernek a 92-adatokkal
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",  //kuldott adat json form
          Accept: "application/json",          //elfogadja a json valaszt
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

  //REGISZRACIO
  

  const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    setLoading(true);
    try {
        await ensureCsrf();
        const res = await fetch("http://localhost:8000/register", {
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

        // HA NEM OK (pl. 422), nézzük meg miért!
        if (res.status === 422) {
            const errorData = await res.json();
            console.log("Validációs hiba adatai:", errorData.errors);
            // Itt a konzolon látni fogod: pl. "email has already been taken"
        }

        return false;
    } catch (error) {
        console.error("Regisztrációs hiba:", error);
        return false;
    } finally {
        setLoading(false);
    }
};





  //KIJELENTKEZÉS

  const logout = async () => {
    try {
      await fetch("http://localhost:8000/logout", {
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

  //HOOK

  useEffect(()=>{
    syncUser(); //lekeri a felh adatait mikor az app elindul
  },[]); //ez jelenti h csak 1x fusson le


 return (
    <AuthContext.Provider value={{ 
      isLoggedIn: !!user, //true ha van felhasznalo
      isAdmin: user?.roles === true, //true ha admin
      user, //userAdatai
      loading, 
      isInitialSync, //elso lekeres kesz-e
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);//hozzáfér a AuthContext-ben tárolt adatokhoz
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};






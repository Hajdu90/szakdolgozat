import { useEffect, useState } from "react";

import UjUtazas from "./Menupontok/UjUtazas";
import Felhasznalok from "./Menupontok/Felhasznalok";
import LastMinute from "./Menupontok/LastMinute";
import Utazasok from "./Menupontok/Utazasok";

import FoglalasokAdmin from "./Menupontok/FoglalasokAdmin";


import styles from "./Menupontok/MenuPontok.module.css"



function Admin(){
    const [activeTab, setActiveTab] = useState<"utazasok" | "Létrehozás" | "felhasznalok" | "lastminute"  | "foglalások">(() => {
    return (localStorage.getItem("activeTab") as any) || "utazasok";
    });
    


useEffect(() => {
  localStorage.setItem("activeTab", activeTab);
}, [activeTab]);


    return(
        <div className={styles.adminContainer} >
        <div className={styles.adminTabButt}>
            <button onClick={()=> setActiveTab("utazasok")} className={styles.aButton}>Utazasok</button>
            <button onClick={()=> setActiveTab("Létrehozás")} className={styles.aButton}>Létrehozás</button>
            <button onClick={()=> setActiveTab("felhasznalok")} className={styles.aButton}>Felhasznalok</button>
            <button onClick={()=> setActiveTab("lastminute")}className={styles.aButton}>lastminute</button>
            <button onClick={()=> setActiveTab("foglalások")}className={styles.aButton}>Foglalások</button>
        </div>

        <div>
            {activeTab === "utazasok" && <Utazasok/>}
            {activeTab === "Létrehozás" && <UjUtazas/>}
            {activeTab === "felhasznalok" && <Felhasznalok/>}
            {activeTab === "lastminute" && <LastMinute/>}
            {activeTab === "foglalások" && <FoglalasokAdmin/>}
        </div>
        </div>
    )
}

export default Admin;
import { useState } from "react";

import UjUtazas from "./Menupontok/UjUtazas";
import AktivUtazasok from "./Menupontok/AktivUtazasok";
import LastMinute from "./Menupontok/LastMinute";
import Utazasok from "./Menupontok/Utazasok";


function Admin(){
    const [activeTab,setActiveTab]=useState<"utazasok" | "Létrehozás" | "aktiv" |"lastminute">("utazasok");



    return(
        <div>
        <div>
            <button onClick={()=> setActiveTab("utazasok")}>Utazasok</button>
            <button onClick={()=> setActiveTab("Létrehozás")}>Létrehozás</button>
            <button onClick={()=> setActiveTab("aktiv")}>aktiv</button>
            <button onClick={()=> setActiveTab("lastminute")}>lastminute</button>
        </div>

        <div>
            {activeTab === "utazasok" && <Utazasok/>}
            {activeTab === "Létrehozás" && <UjUtazas/>}
            {activeTab === "aktiv" && <AktivUtazasok/>}
            {activeTab === "lastminute" && <LastMinute/>}
        </div>
        </div>
    )
}

export default Admin;
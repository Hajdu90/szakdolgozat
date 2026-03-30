import { useEffect, useState } from "react";
import styles from "./MenuPontok.module.css";
import { useAuth } from "../../Authorization/AuthContext";

const api_base_url = "http://localhost:8000";

interface Csomag {
    id: number;
    helyszin_id: number;
    ar: number;
    letszam: number;
    indulasi_datum: string;
    visszaut_datum: string;
    utazasi_mod_id: number;
    helyszin: {
        orszag: string;
        varos: string;
    };
    utazasi_mod: {
        tipus: string;
    };
}

function Utazasok() {
    const [utazasok, setUtazasok] = useState<Csomag[]>([]);
    const [editID, setEditID] = useState<number | null>(null);
    const [editSaveForm, setEditSaveForm] = useState<Partial<Csomag>>({});
    const { updateCsomag, deleteCsomag } = useAuth();



    const [editModok, setEditModok] = useState<{id: number, tipus: string}[]>([]);

    
    const fetchUtazasok = () => {
        fetch(`${api_base_url}/api/utazasi_csomagoks`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json" 
            }
        })
        .then((res) => {
            if (!res.ok) throw new Error(`HTTP hiba stat: ${res.status}`);
            return res.json();
        })
        .then((data) => {
            const lista = Array.isArray(data) ? data : [];
            setUtazasok(lista);
        })
        .catch((err) => {
            console.log("Hiba a Csomagok fetch-nél", err);
            setUtazasok([]);
        });
    };

    useEffect(() => {
        fetchUtazasok();

        fetch(`${api_base_url}/api/utazasi_mods`)
        .then(res => res.json())
        .then(data => setEditModok(data))
        .catch(err => console.error("Hiba a az utazási módok lekérésekor", err));
    }, []);


    
    // Szerkesztés indítása: adatok betöltése a formba
    const handleEdit = (csomag: Csomag) => {
        setEditID(csomag.id);
        setEditSaveForm({
            ar: csomag.ar,
            letszam: csomag.letszam,
            indulasi_datum: csomag.indulasi_datum,
            visszaut_datum: csomag.visszaut_datum,
            helyszin_id: csomag.helyszin_id,
            utazasi_mod_id: csomag.utazasi_mod_id
        });
    };


    const handleSave = async (id: number) => {
    try {
        await updateCsomag(id, editSaveForm);
        fetchUtazasok(); // Táblázat frissítése
        setEditID(null);
        alert("Sikeres mentés!");
    } catch (err: any) {
        alert("Hiba: " + err.message);
    }
};


    const handleDelete=async(id: number)=>{
        const confirm=window.confirm("Biztosan törölni szeretnéd ezt az utazást?")
        if(!confirm) return;

        try{
            await deleteCsomag(id);
            fetchUtazasok();
            alert("Sikeres törles");
        }catch(err:any){
            alert("Hiba! az utazást nem sikerült törölni" +err.message)
        }
    }


  

    return (
        <div className={styles.listcontainer}>
            <h2 className={styles.utazasokH2}>Utazások Lista</h2>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Indulás</th>
                            <th>Vissza dátum</th>
                            <th>Ország</th>
                            <th>Város</th>
                            <th>Utazási mód</th>
                            <th>Ár</th>
                            <th>Férőhely</th>
                            <th>Műveletek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {utazasok.map((csomag) => (
                            <tr key={csomag.id}>
                                <td>{csomag.id}</td>

                                {editID === csomag.id ? (


                                    /* --- SZERKESZTŐ MÓD --- */
                                    <>
                                        <td><input type="date" value={editSaveForm.indulasi_datum} onChange={(e) => setEditSaveForm({ ...editSaveForm, indulasi_datum: e.target.value })} /></td>
                                        <td><input type="date" value={editSaveForm.visszaut_datum} onChange={(e) => setEditSaveForm({ ...editSaveForm, visszaut_datum: e.target.value })} /></td>
                                        <td>{csomag.helyszin.orszag}</td>
                                        <td>{csomag.helyszin.varos}</td>

                                        <td><select value={editSaveForm.utazasi_mod_id} onChange={(e) => setEditSaveForm({...editSaveForm,utazasi_mod_id: Number(e.target.value)})}>
                                            {editModok.map((mod) =>(
                                                <option key={mod.id} value={mod.id}>{mod.tipus}</option>
                                            ))}

                                        </select>
                                            
                                            </td>




                                        <td><input type="number" value={editSaveForm.ar} onChange={(e) => setEditSaveForm({ ...editSaveForm, ar: Number(e.target.value) })} /></td>
                                        <td><input type="number" value={editSaveForm.letszam} onChange={(e) => setEditSaveForm({ ...editSaveForm, letszam: Number(e.target.value) })} /></td>
                                        <td>
                                            <button onClick={() => handleSave(csomag.id)}>✅</button>
                                            <button onClick={() => setEditID(null)}>❌</button>
                                        </td>
                                    </>
                                ) : (
                                    /* --- MEGJELENÍTŐ MÓD --- */
                                    <>
                                        <td>{csomag.indulasi_datum}</td>
                                        <td>{csomag.visszaut_datum}</td>
                                        <td>{csomag.helyszin.orszag}</td>
                                        <td>{csomag.helyszin.varos}</td>
                                        <td>{csomag.utazasi_mod.tipus}</td>
                                        <td>{csomag.ar} Ft</td>
                                        <td>{csomag.letszam}</td>
                                        <td>
                                            <button className={styles.editBtn} onClick={() => handleEdit(csomag)}>⚙️</button>
                                            <button className={styles.deleteBtn} onClick={() => handleDelete(csomag.id)}>🗑️</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Utazasok;
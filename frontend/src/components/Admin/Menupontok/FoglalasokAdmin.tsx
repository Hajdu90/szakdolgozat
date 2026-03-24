import { useEffect, useState } from "react";
import styles from "./MenuPontok.module.css";

interface Foglalas {
    id: number;
    user_id: number;
    csomag_id: number;
    letszam: number;
    statusz: string;
    created_at: string;
   
   
    user: {
        name: string;
        email: string;
    };
    utazasi_csomag: {
        indulasi_datum: string;
        visszaut_datum: string
        ar:number;
        helyszin: {
            orszag: string;
            varos: string;
        }
    };
}

function FoglalasokAdmin() {
    const [foglalasok, setFoglalasok] = useState<Foglalas[]>([]);
    const [loading, setLoading] = useState(true);
    const api_base_url = "http://localhost:8000";

    useEffect(() => {
        fetch(`${api_base_url}/api/foglalasok`, {
            method: "GET",
            credentials: "include",
            headers: { "Accept": "application/json" }
        })
        .then(res => res.json())
        .then(data => {
            setFoglalasok(Array.isArray(data) ? data : []);
            setLoading(false);
        })
        .catch(err => {
            console.error("Hiba a foglalások lekérésekor:", err);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className={styles.loading}>Foglalások betöltése...</div>;

    return (
        <div className={styles.listcontainer}>
            <h2 className={styles.utazasokH2}>Összes Foglalás</h2>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ügyfél neve</th>
                            <th>Email</th>
                            <th>Helyszín</th>
                            <th>Dátum</th>
                            <th>Foglalt fő</th>
                            <th>Foglalás Dátuma</th>
                            <th>Összeg</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foglalasok.map((f) => (
                            <tr key={f.id}>
                                <td>{f.id}</td>
                                <td><strong>{f.user?.name || "Törölt felh."}</strong></td>
                                <td>{f.user?.email}</td>
                                <td>{f.utazasi_csomag?.helyszin?.orszag}, {f.utazasi_csomag?.helyszin?.varos}</td>
                                <td>{f.utazasi_csomag?.indulasi_datum} - {f.utazasi_csomag?.visszaut_datum}</td>
                                <td>{f.letszam} fő</td>
                                <td>{new Date(f.created_at).toLocaleDateString('hu-HU')}</td>
                               <td>
                                 <strong>
                                     {((f.utazasi_csomag?.ar || 0) * (f.letszam || 0)).toLocaleString('hu-HU')} Ft
                                 </strong>
                              </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {foglalasok.length === 0 && <p >Még nincsenek foglalások.</p>}
            </div>
        </div>
    );
}

export default FoglalasokAdmin;
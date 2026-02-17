import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Csomag {
    id: number;
    helyszin_id: number;
    indulasi_datum: string;
    visszaut_datum: string;
    letszam: number;
    szabad_helyek: number;
    ar: number;
}

function Csomagok() {

    const [csomagok, setCsomagok] = useState<Csomag[]>([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/utazasi_csomagoks")
            .then(res => res.json())
            .then(data => setCsomagok(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>Csomagok</h1>

            {csomagok.map((csomag) => (
                <Link key={csomag.id} to={`/csomagok/${csomag.id}`}>
                <div>
                    <p>Indulás: {csomag.indulasi_datum}</p>
                    <p>Visszaút: {csomag.visszaut_datum}</p>
                    <p>Szabad helyek: {csomag.szabad_helyek}</p>
                    <p>Ár: {csomag.ar} Ft</p>
                    <hr />
                </div>
                </Link>
            ))}

        </div>
    );
}

export default Csomagok;

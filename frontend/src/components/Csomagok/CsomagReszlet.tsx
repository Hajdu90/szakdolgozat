import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Csomag {
    id: number;
    indulasi_datum: string;
    visszaut_datum: string;
    szabad_helyek: number;
    ar: number;
}

function CsomagReszlet() {

    const { id } = useParams();
    const [csomag, setCsomag] = useState<Csomag | null>(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/utazasi_csomagoks/${id}`)
            .then(res => res.json())
            .then(data => setCsomag(data));
    }, [id]);

    if (!csomag) return <p>Betöltés...</p>;

    return (
        <div>
            <h1>Csomag részletek</h1>
            <p>Indulás: {csomag.indulasi_datum}</p>
            <p>Visszaút: {csomag.visszaut_datum}</p>
            <p>Szabad helyek: {csomag.szabad_helyek}</p>
            <p>Ár: {csomag.ar} Ft</p>
        </div>
    );
}

export default CsomagReszlet;

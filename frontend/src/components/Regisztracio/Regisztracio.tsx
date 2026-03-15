import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useAuth } from "../Authorization/AuthContext"; 

function Regisztacio() {
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [localErr, setLocalErr] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLocalErr(null);

        if (!name || !email || !password || !passwordConfirmation) {
            setLocalErr("Minden mező kitöltése kötelező");
            return;
        }

        const ok = await register(name, email, password, passwordConfirmation);
        if (ok) {
            navigate("/");
        } else {
            setLocalErr("A regisztráció nem sikerült.");
        }
    };

    return (
        <div>
            <h2>Regisztráció</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="név" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                <input type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
                <input type="password" placeholder="Megerősítés" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} disabled={loading} />
                <button type="submit" disabled={loading}>{loading ? "Regisztráció..." : "Regisztráció"}</button>
            </form>
            {localErr && <p style={{ color: "red" }}>{localErr}</p>}
        </div>
    );
}

export default Regisztacio;
import { useEffect, useState } from "react";
import { useAuth } from "../../Authorization/AuthContext"; 
import styles from "./MenuPontok.module.css"; 

interface User {
    id: number;
    name: string;
    email: string;
    roles: boolean; 
    created_at: string;
}

function Felhasznalok() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const api_base_url = "http://localhost:8000";

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${api_base_url}/api/users`, {
                method: "GET",
                credentials: "include", 
                headers: {
                    "Accept": "application/json",
                }
            });

            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            } else {
                console.error("Nem sikerült lekérni a felhasználókat");
            }
        } catch (err) {
            console.error("Hiba a felhasználók lekérésekor:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <div>Betöltés...</div>;

    return (
        <div className={styles.listcontainer}>
            <h2 className={styles.utazasokH2}>Regisztrált Felhasználók</h2>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Név</th>
                            <th>Email</th>
                            <th>Szerepkör</th>
                            <th>Regisztráció dátuma</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>
                                    {u.roles ? 
                                        <span className={styles.szerpkorSpan}>Admin</span> : 
                                        "Felhasználó"
                                    }
                                </td>
                                <td>{new Date(u.created_at).toLocaleDateString('hu-HU')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Felhasznalok;
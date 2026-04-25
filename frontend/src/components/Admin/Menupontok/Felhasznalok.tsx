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
    const { user: adminUser } = useAuth();

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



    const roleValtas = async (userId: number, jelenlegiRole: boolean) => {
        try {
             await fetch("http://localhost:8000/sanctum/csrf-cookie", { credentials: "include" });
              const xsrfToken = decodeURIComponent(
                 document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN="))?.split("=")[1] || ""
                  );

            
        const res = await fetch(`http://localhost:8000/api/users/${userId}/role`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": xsrfToken,
                 },
                 body: JSON.stringify({ roles: !jelenlegiRole }),
                  });

             if (res.ok) {
                 setUsers(prev => prev.map(u => 
                     u.id === userId ? { ...u, roles: !jelenlegiRole } : u
                   ));
                }
             } catch (err) {
                console.error("Hiba a szerepkör váltásnál:", err);
                 }
                };



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
                            <th>Settings</th>
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

                                <td>
                                    <label className={styles.toggleWrapper}>
                                        <div
                                         onClick={() => roleValtas(u.id, u.roles)}
                                         className={styles.toggleTrack}
                                         style={{ backgroundColor: u.roles ? "#4CAF50" : "#ccc" }}
                                         >
                                            <div className={styles.toggleThumb}
                                            style={{ left: u.roles ? "24px" : "2px" }}
                                            />
                                            </div>
                                            <span className={styles.toggleLabel}
                                             style={{ color: u.roles ? "#4CAF50" : "#999" }}>
                                                {u.roles ? "Admin" : "Tag"}
                                                  </span>
                                            </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Felhasznalok;
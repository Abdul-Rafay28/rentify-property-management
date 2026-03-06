import { useEffect, useState } from "react";
import styles from "./getUsersData.module.css";
import { useNavigate } from "react-router-dom";

function UsersData() {
    const [getData, setGetData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        const url = "http://localhost:5500/home-state/getUsersData";
        const usersData = await fetch(url, {
            method: "GET",
            credentials: "include",
        });

        const res = await usersData.json();
        if (!res.success) {
            alert(res.message);
        } else {
            setGetData(res.users);
        }
    };

    const updateUser = async (id) => {
        const url = "http://localhost:5500/home-state/updateUserData/" + id;
        const updateRes = await fetch(url, {
            method: "PUT",
            credentials: "include",
        });
        const res = await updateRes.json();
        if (!res.success) {
            alert(res.message);
        } else {
            getAllUsers();
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5500/home-state/logout";
        const logoutRes = await fetch(url, {
            method: 'POST',
            credentials: 'include',
        });
        const res = await logoutRes.json();
        if (!res.success) {
            alert(res.message);
        } else {
            navigate('/login')
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.headerTop}>
                    <div>
                        <h1 className={styles.title}>Users Management</h1>
                        <p className={styles.subtitle}>
                            View and manage registered users of Home State.
                        </p>
                    </div>

                    <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
                </div>
            </div>

            <div className={styles.card}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Account</th>
                        </tr>
                    </thead>

                    <tbody>
                        {getData.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <div className={styles.userCell}>
                                        <div className={styles.avatar}>
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span>{user.name}</span>
                                    </div>
                                </td>

                                <td className={styles.email}>{user.email}</td>

                                <td>
                                    <span
                                        className={`${styles.badge} ${user.isActive ? styles.active : styles.inactive
                                            }`}
                                    >
                                        {user.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>

                                <td>
                                    <button
                                        onClick={() => updateUser(user._id)}
                                        className={`${styles.actionBtn} ${user.isActive ? styles.deactivate : styles.activate
                                            }`}
                                    >
                                        {user.isActive ? "Deactivate" : "Activate"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {getData.length === 0 && (
                    <div className={styles.empty}>No users found</div>
                )}
            </div>
        </div>
    );
}

export default UsersData;

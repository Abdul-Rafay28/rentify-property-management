import { useEffect, useState } from "react";
import styles from "./AdminCheckProperty.module.css";
import { useNavigate } from "react-router-dom";

function UsersAllProperty() {
    const [getData, setGetData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        usersProperty();
    }, []);

    const usersProperty = async () => {
        const url = "http://localhost:5500/home-state/getUsersProperty";
        const getRes = await fetch(url, {
            method: "GET",
            credentials: "include",
        });
        const res = await getRes.json();
        if (!res.success) {
            alert(res.message);
        } else {
            setGetData(res.UsersProperty);
        }
    };

    const updateProperty = async (id) => {
        const url = "http://localhost:5500/home-state/getPropertyId/" + id;
        const updateRes = await fetch(url, {
            method: "PUT",
            credentials: "include",
        });
        const res = await updateRes.json();
        if (!res.success) {
            alert(res.message);
        } else {
            usersProperty();
        }
    };

    const handleLogout = async (e) => {
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
                        <h1 className={styles.title}>Users Properties</h1>
                        <p className={styles.subtitle}>
                            Review and manage all properties added by users.
                        </p>
                    </div>
                    <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
                </div>
            </div>

            <div className={styles.card}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Property</th>
                            <th>Location</th>
                            <th>Purpose</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {getData.map((data) => (
                            <tr key={data._id}>
                                <td className={styles.userCell}>
                                    <div className={styles.avatar}>
                                        {data.createdBy.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span>{data.createdBy.name}</span>
                                </td>

                                <td className={styles.email}>{data.createdBy.email}</td>
                                <td className={styles.property}>{data.title}</td>
                                <td>{data.location}</td>
                                <td className={styles.purpose}>{data.purpose}</td>
                                <td className={styles.price}>{data.price}</td>

                                <td>
                                    <button
                                        onClick={() => updateProperty(data._id)}
                                        className={`${styles.actionBtn} ${data.isActive ? styles.activeBtn : styles.inactiveBtn
                                            }`}
                                    >
                                        {data.isActive ? "Active" : "Deactive"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {getData.length === 0 && (
                    <div className={styles.empty}>No properties found</div>
                )}
            </div>
        </div>
    );
}

export default UsersAllProperty;

import { useNavigate } from 'react-router-dom';
import styles from './GetUsersReq.module.css';
import { useEffect, useState } from "react";

function GetUsersReq() {
    const [usersData, setUsersData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUsersReq();
    }, []);

    const getUsersReq = async () => {
        const url = "http://localhost:5500/home-state/getUsersReq";
        const getRes = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        });

        const res = await getRes.json();
        if (res.success) {
            setUsersData(res.data);
        } else {
            alert(res.message);
        }
    };

    const logoutPage = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5500/home-state/logout";
        const logoutRes = await fetch(url, {
            method: 'POST',
            credentials: 'include',
        })
        const res = await logoutRes.json();
        if (!res.success) {
            alert(res.message)
        } else {
            navigate('/login')
        }
    }

    return (
        <div className={styles.page}>
            <th><button className={styles.logoutBtn} onClick={logoutPage}>Logout</button></th>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.groupHeader}>
                        <th colSpan={6} className={styles.leftGroup}>Owner & Property</th>
                        <th colSpan={4} className={styles.rightGroup}>User Inquiry</th>
                    </tr>
                    <tr className={styles.subHeader}>
                        <th>Owner</th>
                        <th>Email</th>
                        <th>Property Title</th>
                        <th>Property Location</th>
                        <th>Property Purpose</th>
                        <th>Property Price</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message</th>
                    </tr>
                </thead>

                <tbody>
                    {usersData.map((users) => (
                        <tr key={users._id} className={styles.row}>
                            <td className={styles.left}>{users.agentId.name}</td>
                            <td className={styles.left}>{users.agentId.email}</td>
                            <td className={styles.leftTitle}>{users.propertyId.title}</td>
                            <td className={styles.left}>{users.propertyId.location}</td>
                            <td className={styles.left}>{users.propertyId.purpose}</td>
                            <td className={styles.leftPrice}>{users.propertyId.price}</td>

                            <td className={styles.rightUser}>{users.name}</td>
                            <td className={styles.right}>{users.email}</td>
                            <td className={styles.right}>{users.number}</td>
                            <td className={styles.rightMessage}>{users.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetUsersReq;

import { useNavigate } from "react-router-dom";
import styles from "./getProperty.module.css";
import { useEffect, useState } from "react";

function GetProperty() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPropertyData();
    }, []);

    const getPropertyData = async () => {
        try {
            const url = "http://localhost:5500/home-state/getProperty";
            const response = await fetch(url);
            const res = await response.json();

            if (res.success) {
                setData(res.property);
            } else {
                alert(res.message);
            }
        } catch (err) {
            alert("Internal Server error");
            console.log(err);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Home State Properties</h1>
                    <p className={styles.subtitle}>
                        Premium listings — modern living, prime locations, trusted experience.
                    </p>
                </div>

                <div className={styles.grid}>
                    {data.map((p) => (
                        <article className={styles.card} key={p._id}>
                            <div className={styles.media}>
                                {/* ✅ Listing page: only first image */}
                                <img
                                    className={styles.image}
                                    src={p.images?.[0]}
                                    alt={p.title || "property"}
                                />

                                {/* ✅ Overlay text on image (always visible on dark theme) */}
                                <div className={styles.overlay}>
                                    <div className={styles.overlayTop}>
                                        <span className={styles.purpose}>{p.purpose}</span>
                                        <span className={styles.price}>{p.price}</span>
                                    </div>

                                    <div className={styles.overlayBottom}>
                                        <h2 className={styles.cardTitle}>{p.title}</h2>
                                        <p className={styles.location}>{p.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.body}>
                                {p.description && <p className={styles.desc}>{p.description}</p>}

                                <div className={styles.actions}>
                                    <button
                                        className={styles.primaryBtn}
                                        type="button" onClick={()=>navigate(`/property/${p._id}`)}
                                    >
                                        View Details
                                    </button>

                                    <button className={styles.secondaryBtn} type="button">
                                        Contact
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GetProperty;
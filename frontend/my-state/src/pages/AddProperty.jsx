import { useEffect, useState } from "react";
import styles from "./addProperty.module.css";
import { useNavigate } from "react-router-dom";

function AddProperty() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [purpose, setPurpose] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [err, setErr] = useState("");
  const [bolean, setBolean] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    authCheck();
  }, []);

  async function authCheck() {
    const url = "http://localhost:5500/home-state/addPropertyAuth";
    const authRes = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    const res = await authRes.json();
    if (!res.success) {
      alert(res.message);
      navigate("/login");
    }
  }

  const addProperty = async (e) => {
    e.preventDefault();

    if (!title || !location || !purpose || !price || images.length === 0) {
      setErr("All fields are required!");
      return;
    }

    try {
      setBolean(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("purpose", purpose);
      formData.append("price", price);
      images.forEach((file) => formData.append("images", file));

      const res = await fetch("http://localhost:5500/home-state/addproperty", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
      } else {
        alert(data.message);
        setTitle("");
        setDescription("");
        setLocation("");
        setPurpose("");
        setPrice("");
        setImages([]);
        setErr("");
      }
    } catch {
      setErr("Check your network connection");
    } finally {
      setBolean(false);
    }
  };

  const handleLogout = async (e)=>{
    const url = "http://localhost:5500/home-state/logout";
    const logoutRes = await fetch(url, {
      method: 'POST',
      credentials: 'include',
    });
    const res = await logoutRes.json();
    if(!res.success){
      alert(res.message);
    }else {
      navigate('/login')
    }
  }
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.badge}>Admin Panel</div>

            {/* ✅ LOGOUT BUTTON */}
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </div>

          <h1 className={styles.title}>Add New Property</h1>
          <p className={styles.subtitle}>
            Upload premium listings with complete details and high-quality images.
          </p>
        </div>

        <form className={styles.card} onSubmit={addProperty}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Property Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Luxury 3 Bed Apartment"
              />
            </div>

            <div className={styles.field}>
              <label>Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="DHA Phase 6, Lahore"
              />
            </div>

            <div className={`${styles.field} ${styles.full}`}>
              <label>Description</label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label>Purpose</label>
              <div className={styles.radioRow}>
                <label className={styles.radioCard}>
                  <input
                    type="radio"
                    value="sale"
                    checked={purpose === "sale"}
                    onChange={(e) => setPurpose(e.target.value)}
                  />
                  <span>Sale</span>
                </label>

                <label className={styles.radioCard}>
                  <input
                    type="radio"
                    value="rent"
                    checked={purpose === "rent"}
                    onChange={(e) => setPurpose(e.target.value)}
                  />
                  <span>Rent</span>
                </label>
              </div>
            </div>

            <div className={styles.field}>
              <label>Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="25000000"
              />
            </div>

            <div className={`${styles.field} ${styles.full}`}>
              <label>Property Images</label>
              <div className={styles.uploadBox}>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setImages([...e.target.files])}
                />
                <div className={styles.uploadText}>
                  <div className={styles.uploadTitle}>
                    Drop files here or click to upload
                  </div>
                  <div className={styles.uploadSub}>
                    JPG / PNG • 1–6 images
                  </div>
                </div>
              </div>
            </div>
          </div>

          {err && <div className={styles.error}>{err}</div>}

          <div className={styles.actions}>
            <button disabled={bolean} className={styles.primaryBtn}>
              {bolean ? "Adding..." : "Add Property"}
            </button>

            <button type="button" className={styles.secondaryBtn}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProperty;

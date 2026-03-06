import styles from "./singleProperty.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SingleProperty() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    allPropertyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const allPropertyData = async () => {
    try {
      const url = "http://localhost:5500/home-state/getSingleProperty/" + id;
      const viewDataRes = await fetch(url);
      const res = await viewDataRes.json();

      if (res.success) {
        setProperty(res.property);

        // ✅ images are array (5-6)
        const imgs = res.property?.images || [];
        setActiveImg(imgs[0] || "");
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert("Server error");
      console.log(err);
    }
  };

  function inquiryPage(id) {
    navigate('/inquiry/' + id);

  }

  if (!property) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loadingCard}>Loading property...</div>
        </div>
      </div>
    );
  }

  const images = property.images || [];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.title}>{property.title}</h1>
            <p className={styles.location}>{property.location}</p>
          </div>

          <div className={styles.priceBox}>
            <div className={styles.purpose}>{property.purpose}</div>
            <div className={styles.price}>{property.price}</div>
          </div>
        </div>

        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImageWrap}>
            <img
              className={styles.mainImage}
              src={activeImg}
              alt="property"
            />
          </div>

          <div className={styles.thumbs}>
            {images.map((img, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.thumbBtn} ${activeImg === img ? styles.thumbActive : ""
                  }`}
                onClick={() => setActiveImg(img)}
              >
                <img className={styles.thumbImg} src={img} alt={`thumb-${index}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3 className={styles.sectionTitle}>Overview</h3>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Purpose</span>
                <span className={styles.metaValue}>{property.purpose}</span>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Price</span>
                <span className={styles.metaValue}>{property.price}</span>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Location</span>
                <span className={styles.metaValue}>{property.location}</span>
              </div>
            </div>

            {property.description && (
              <>
                <h3 className={styles.sectionTitle}>Description</h3>
                <p className={styles.description}>{property.description}</p>
              </>
            )}
          </div>

          {/* Sticky Contact Card */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardInner}>
              <div className={styles.sideTitle}>Interested?</div>
              <div className={styles.sideSub}>
                Contact Home State for viewing & details.
              </div>

              <button onClick={() => inquiryPage(property._id)} className={styles.primaryBtn} type="button">
                Contact Agent
              </button>
              <button className={styles.secondaryBtn} type="button">
                Schedule Visit
              </button>

              <div className={styles.sideNote}>
                Response within minutes • Trusted listings
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProperty;

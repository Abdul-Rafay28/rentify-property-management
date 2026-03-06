import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./signUp.module.css";

function SignUP() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ premium message box
  const [msg, setMsg] = useState("");
  const [type, setType] = useState(""); // "success" | "error"

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();

      // basic validation
      if (!name || !email || !password) {
        setType("error");
        setMsg("All fields are required!");
        return;
      }

      const url = "http://localhost:5500/home-state/userSignUp";
      const signUpRes = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const res = await signUpRes.json();

      if (res.success) {
        setType("success");
        setMsg(res.message);

        // ✅ auto redirect after 1.3s
        setTimeout(() => {
          navigate("/login");
        }, 1300);
      } else {
        setType("error");
        setMsg(res.message);

        setName("");
        setEmail("");
        setPassword("");
      }

      // ✅ auto hide message after 2.5s
      setTimeout(() => {
        setMsg("");
        setType("");
      }, 2500);
    } catch (e) {
      setType("error");
      setMsg("Check your network connection!");

      setTimeout(() => {
        setMsg("");
        setType("");
      }, 2500);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.brand}>
          <div className={styles.logo}>HS</div>
          <div>
            <h1 className={styles.title}>Create account</h1>
            <p className={styles.subtitle}>
              Join Home State to explore premium listings and manage properties.
            </p>
          </div>
        </div>

        <form className={styles.card} onSubmit={handleSignUp}>
          <div className={styles.field}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setMsg("");
              }}
              placeholder="Enter name"
              autoComplete="off"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMsg("");
              }}
              placeholder="Enter email"
              autoComplete="off"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMsg("");
              }}
              placeholder="Create password"
              autoComplete="new-password"
            />
          </div>

          {/* ✅ Premium toast message */}
          {msg && (
            <div className={`${styles.toast} ${type === "success" ? styles.success : styles.error}`}>
              {msg}
            </div>
          )}

          <button className={styles.primaryBtn} type="submit">
            Sign Up
          </button>

          <div className={styles.footerText}>
            Already have an account?{" "}
            <span className={styles.linkLike} onClick={() => navigate("/login")}>
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUP;

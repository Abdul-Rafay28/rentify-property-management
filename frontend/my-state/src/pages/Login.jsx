import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

function Login() {
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      if (!email || !password) {
        setErr("Email & password must required!");
        return;
      }

      const url = "http://localhost:5500/home-state/userLogin";
      const loginRes = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const res = await loginRes.json();

      if (!res.success) {
        setErr(res.message);
        setEmail("");
        setPassword("");
        return;
      }

      if (res.role === "sale") {
        navigate("/addProperty");
      }else if (res.role == 'admin'){
        navigate('/usersData')

      } else {
        navigate("/homeState");
      }
    } catch (err) {
      setErr("Please check your network connection!");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.brand}>
          <div className={styles.logo}>HS</div>
          <div>
            <h1 className={styles.title}>Welcome back</h1>
            <p className={styles.subtitle}>
              Sign in to manage listings and access premium features.
            </p>
          </div>
        </div>

        <form className={styles.card} autoComplete="off" onSubmit={handleLogin}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              autoComplete="off"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErr("");
              }}
              type="text"
              placeholder="Enter email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              autoComplete="new-password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErr("");
              }}
              type="password"
              placeholder="Enter password"
            />
          </div>

          {err && <div className={styles.error}>{err}</div>}

          <button className={styles.primaryBtn} type="submit">
            Login
          </button>

          <div className={styles.hint}>
            Tip: Use admin/sale account to add properties.
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

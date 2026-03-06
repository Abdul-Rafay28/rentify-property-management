import styles from './inquiry.module.css';
import { useState } from "react";
import { useParams } from "react-router-dom";

function Inquiry() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [message, setMessage] = useState('');
    const [err, setErr] = useState('')
    const [mess, setMess] = useState('')

    const { id } = useParams();

    const userReq = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5500/home-state/reqUserClient/" + id;
        const reqRes = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, number, message })
        })
        const res = await reqRes.json();
        if (!res.success) {
            setErr(res.message)
        } else {
            setMess(res.message)
        }
    }

    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={userReq}>

                <h2 className={styles.title}>Contact Agent</h2>

                <div className={styles.field}>
                    <label htmlFor="name">Enter your full name</label>
                    <input
                        id="name"
                        onChange={(e) => { setName(e.target.value); setErr('') }}
                        value={name}
                        type="text"
                        placeholder="Your full name"
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="email">Enter your email</label>
                    <input
                        id="email"
                        onChange={(e) => { setEmail(e.target.value); setErr('') }}
                        value={email}
                        type="text"
                        placeholder="you@gmail.com"
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="number">Enter phone number</label>
                    <input
                        type="tel"
                        id="number"
                        onChange={(e) => { setNumber(e.target.value); setErr('') }}
                        value={number}
                        placeholder="03xxxxxxxxxx"
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        onChange={(e) => { setMessage(e.target.value); setErr('') }}
                        value={message}
                        placeholder="Enter interest"
                        rows={4}
                    ></textarea>
                </div>

                {err && <span className={styles.error}>{err}</span>}
                {mess && <span className={styles.message}>{mess}</span>}
                <button className={styles.btn}>Send Request</button>
            </form>
        </div>
    )
}

export default Inquiry;

// Login page: handles user authentication via API and updates AuthContext
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext.jsx';
import styles from './Login.module.css';

import logo from '../../assets/Logo.svg';
import loginpicture from '../../assets/loginpicture.png';


export default function Login() {
    // Controlled inputs for username/password and a local error message
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [erreurTexte, setErreurTexte] = useState("");

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // Submit handler: POST credentials to API, call `login` on success
    const handleLogin = async (e) => {
        e.preventDefault();
        setErreurTexte("");

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: usernameInput,
                    password: passwordInput
                })
            });

            const data = await response.json();

            if (data.token) {
                login(data.token);
                navigate('/dashboard');
            } else {
                setErreurTexte(data.message || "Identifiants incorrects !");
            }
        } catch (error) {
            // log the actual error for debugging and show a user-friendly message
            console.error(error);
            setErreurTexte("Le serveur est éteint ou inaccessible !");
        }
    };

    return (
        <div className={styles.loginWrapper}>

            <div className={styles.leftColumn}>

                <img src={logo} alt="Logo SportSee" className={styles.logo} />

                <div className={styles.formContainer}>
                    <h1 className={styles.mainTitle}>
                        Transformez <br /> vos stats en résultats
                    </h1>

                    <form className={styles.formWrapper}>

                        <div className={styles.inputGroup}>
                            <label className={styles.loginLabelTitle}>Se connecter</label>
                            <label className={styles.inputLabel}>Identifiant</label>
                            <input
                                type="text"
                                value={usernameInput}
                                onChange={(e) => setUsernameInput(e.target.value)}
                                className={styles.emailInput}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Mot de passe</label>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                className={styles.passwordInput}
                            />
                        </div>

                        <button
                            onClick={handleLogin}
                            className={styles.submitButton}
                        >
                            Se connecter
                        </button>

                    </form>

                    {erreurTexte && (
                        <p className={styles.errorPassword}>
                            {erreurTexte}
                        </p>
                    )}

                    <p className={styles.forgotPassword}>
                        Mot de passe oublié ?
                    </p>
                </div>
            </div>

            <div className={styles.rightColumn}>
                <img
                    src={loginpicture}
                    alt="Course à pied"
                    className={styles.coverImage}
                />

                <div className={styles.infoBubble}>
                    Analysez vos performances en un clin d’œil,<br />
                    suivez vos progrès et atteignez vos objectifs.
                </div>

            </div>

        </div>
    );
}
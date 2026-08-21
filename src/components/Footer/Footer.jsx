import Logo2 from '../../assets/Logo2.svg';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footerContainer}>

            <div>©Sportsee Tous droits réservés</div>

            <div className={styles.rightPart}>
                <span className={styles.link}>Conditions générales</span>
                <span className={styles.link}>Contact</span>
                <div className={styles.logoContainer}>
                    <img src={Logo2} alt="Logo de SportSee" />
                </div>
            </div>
        </footer>
    );
}
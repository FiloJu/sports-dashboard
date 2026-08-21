import line from '../../assets/line.png';
import styles from './ProfileInfo.module.css';


export default function ProfilInfo({ userInfos }) {

    let genreFR = "Non précisé";
    if (userInfos.gender === 'female' || userInfos.gender === 'femme' || userInfos.gender === 'Femme') {
        genreFR = "Femme";
    } else if (userInfos.gender === 'male' || userInfos.gender === 'homme' || userInfos.gender === 'Homme') {
        genreFR = "Homme";
    }

    const tailleMetre = Math.floor(userInfos.height / 100);
    const tailleCentimetres = userInfos.height % 100; 
    const tailleFormatee = `${tailleMetre}m${tailleCentimetres}`;

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>
                Votre profil
            </h3>
            <img
                src={line}
                alt="Ligne de séparation"
                className={styles.separatorLine}
            />
            <div className={styles.infoContainer}>
                <div><span className={styles.infoLabel}>Âge :</span> {userInfos.age}</div>
                <div><span className={styles.infoLabel}>Genre :</span> {genreFR}</div>
                <div><span className={styles.infoLabel}>Taille :</span> {tailleFormatee}</div>
                <div><span className={styles.infoLabel}>Poids :</span> {userInfos.weight}kg</div>
            </div>
        </div>
    );
}
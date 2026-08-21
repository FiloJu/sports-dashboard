import styles from './ActivityCards.module.css';

// ActivityCards component renders two small summary cards:
// - total activity duration (in minutes)
// - total distance covered (in kilometers)
// Props:
// - `distance`: number or string representing total kilometers
// - `duree`: number or string representing duration in minutes
export default function ActivityCards({distance, duree}) {
    return (
        <div className={styles.container}>
            {/* Card showing total activity duration */}
            <div className={styles.card}>
                <p className={styles.cardTitle}>Durée d'activité</p>
                <p className={styles.valueContainer}>
                    {/* main numeric value */}
                    <span className={styles.durationValue}>{duree}</span>
                    {/* unit label */}
                    <span className={styles.durationUnit}>minutes</span>
                </p>
            </div>

           {/* Card showing total distance covered */}
           <div className={styles.card}>
                <p className={styles.cardTitle}>Distance totale parcourue</p>
                <p className={styles.valueContainer}>
                    {/* main numeric value */}
                    <span className={styles.distanceValue}>{distance}</span>
                    {/* unit label */}
                    <span className={styles.distanceUnit}>kilomètres</span>
                </p>
            </div>
        </div>
    );
}
import React from 'react';
import styles from './ActivityCards.module.css';

export default function ActivityCards({distance, duree}) {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <p className={styles.cardTitle}>Durée d'activité</p>
                <p className={styles.valueContainer}>
                    <span className={styles.durationValue}>{duree}</span>
                    <span className={styles.durationUnit}>minutes</span>
                </p>
            </div>

           <div className={styles.card}>
                <p className={styles.cardTitle}>Distance totale parcourue</p>
                <p className={styles.valueContainer}>
                    <span className={styles.distanceValue}>{distance}</span>
                    <span className={styles.distanceUnit}>kilomètres</span>
                </p>
            </div>
        </div>
    );
}
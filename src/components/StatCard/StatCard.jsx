import React from 'react';
import styles from './StatCard.module.css';

export default function StatCard({ titre, valeur, unite }) {
    return (
        <div className={styles.cardContainer}>
            <span className={styles.title}>{titre}</span>
            <div className={styles.valueWrapper}>
                <span className={styles.value}>{valeur}</span>
                <span className={styles.unit}>{unite}</span>
            </div>
        </div>
    );
}
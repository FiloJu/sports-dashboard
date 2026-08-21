import React from 'react';
import OUTLINE from '../../assets/OUTLINE.png';
import styles from './UserCard.module.css';

export default function UserCard({ userInfos, runningData }) {

    const totalDistance = runningData.reduce((total, jour) => total + jour.distance, 0).toFixed(1);

    const dateInscription = new Date(userInfos.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <div className={styles.cardContainer}>

            <div className={styles.leftPart}>
                <img
                    src={userInfos.profilePicture}
                    alt="Avatar de l'utilisateur"
                    className={styles.profilePic}
                />

                <div className={styles.textContainer}>
                    <h2 className={styles.userName}>
                        {userInfos.firstName} {userInfos.lastName}
                    </h2>
                    <p className={styles.memberDate}>
                        Membre depuis le {dateInscription}
                    </p>
                </div>
            </div>

            <div className={styles.rightPart}>
                <span className={styles.distanceLabel}>Distance totale parcourue</span>

                <div className={styles.blueBox}>
                    <img src={OUTLINE} alt="logo réussite" className={styles.outlineIcon} />
                    <span className={styles.distanceValue}>
                        {totalDistance} km
                    </span>
                </div>
            </div>
        </div>
    );
}
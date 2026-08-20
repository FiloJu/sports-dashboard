import React, { useContext } from 'react'; 
import { AuthContext } from '../../utils/AuthContext'; 
import { useFetch } from '../../utils/hooks';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import StatCard from '../../components/StatCard/StatCard';
import styles from './Profile.module.css';

export default function Profil() {
    const { token } = useContext(AuthContext);

    const { data, error } = useFetch('http://localhost:8000/api/user-info', token);

    if (error || !data) return null;

    const userInfos = data.profile;
    const stats = data.statistics; 

    const heures = Math.floor(stats.totalDuration / 60);
    const minutesRestantes = stats.totalDuration % 60;

    const totalDistance = stats.totalDistance; 
    const totalSessions = stats.totalSessions; 


    const totalCalories = stats.totalCalories;
    const joursDeRepos = 9;

    return (
        <div className={styles.pageWrapper}>

            <Header />

            <main className={styles.mainContent}>
                <div className={styles.contentLayout}>

                    <div className={styles.leftColumn}>

                        <div className={styles.photoBox}>
                            <img
                                src={userInfos.profilePicture} 
                                alt="Avatar de l'utilisateur"
                                className={styles.profileImage}
                            />

                            <div>
                                <h2 className={styles.userName}>
                                    {userInfos.firstName} {userInfos.lastName}
                                </h2>
                                <p className={styles.memberSince}>
                                    Membre depuis le 14 juin 2023
                                </p>
                            </div>
                        </div>

                        <ProfileInfo userInfos={userInfos} />
                    </div>

                    <div className={styles.rightColumn}>
                        <h2 className={styles.statsTitle}>
                            Vos statistiques <span className={styles.statsSubtitle}>depuis le 14 juin 2023</span>
                        </h2>

                        <div className={styles.statsGrid}>
                            <StatCard titre="Temps total couru" valeur={`${heures}h`} unite={`${minutesRestantes}min`} />
                            <StatCard titre="Calories brûlées" valeur={totalCalories} unite="cal" />
                            <StatCard titre="Distance totale parcourue" valeur={totalDistance} unite="km" />
                            <StatCard titre="Nombre de jours de repos" valeur={joursDeRepos} unite="jours" />
                            <StatCard titre="Nombre de sessions" valeur={totalSessions} unite="sessions" />
                        </div>

                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
// Dashboard page: fetches user info and activity, then renders the main
// dashboard layout (header, charts, user card and footer).
// Uses `useFetch` to retrieve API data and `AuthContext` for auth token.
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import { useFetch } from '../../utils/hooks';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import UserCard from '../../components/UserCard/UserCard';
import DistanceChart from '../../components/DistanceChart/DistanceChart';
import HeartRateChart from '../../components/HeartRateChart/HeartRateChart';
import WeeklyGoalChart from '../../components/WeeklyGoalChart/WeeklyGoalChart';
import ActivityCards from '../../components/ActivityCards/ActivityCards';
import styles from './Dashboard.module.css';

export default function Dashboard() {
    const { token } = useContext(AuthContext);

    // Fetch profile info and activity data using the token from context
    const { data: infoData, error: infoError } = useFetch('http://localhost:8000/api/user-info', token);

    const { data: activityData, error: activityError } = useFetch('http://localhost:8000/api/user-activity?startWeek=2025-05-28&endWeek=2025-06-30', token);

    if (infoError || activityError) {
        return null;
    }

    // Normalize API responses to local variables used by child components
    const userData = {
        userInfos: infoData?.profile || {},
        runningData: activityData || [] 
    };

    // Derived summary values used in summary cards and charts
    const nombreDeCourses = activityData ? activityData.length : 0; 
    const totalDistance = activityData ? activityData.reduce((total, jour) => total + jour.distance, 0).toFixed(1) : 0;
    const totalDuree = activityData ? activityData.reduce((total, jour) => total + jour.duration, 0) : 0;


    return (
        <div className={styles.dashboardWrapper}>
            <Header />
            <div className={styles.mainContent}>
                {/* User summary card (left) */}
                <UserCard userInfos={userData.userInfos} runningData={userData.runningData} />

                <div className={styles.spacer}></div>

                <div className={styles.dashboardGrid}>

                    <p className={styles.sectionTitle}>Vos dernières performances</p>

                    {/* Top row: distance and heart rate charts */}
                    <div className={styles.chartsRowOne}>
                        <DistanceChart data={userData.runningData} />
                        <HeartRateChart data={userData.runningData} />
                    </div>

                    {/* Bottom row: weekly goal and activity summary */}
                    <div>
                        <p className={styles.weekTitle}>Cette semaine</p>
                        <p className={styles.weekSubtitle}>Du 23/06/2025 au 30/06/2025</p>
                        <div className={styles.chartsRowTwo}>
                            <WeeklyGoalChart nombre={nombreDeCourses} />
                            <ActivityCards distance={totalDistance} duree={totalDuree} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
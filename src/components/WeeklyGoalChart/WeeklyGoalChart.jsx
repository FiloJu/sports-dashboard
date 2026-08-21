import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from './WeeklyGoalChart.module.css';

// WeeklyGoalChart shows progress towards a weekly goal of 6 runs
// Props:
// - `nombre`: number of runs completed this week
export default function WeeklyGoalChart({ nombre }) {
    // compute remaining runs, never negative
    const restants = 6 - nombre < 0 ? 0 : 6 - nombre;
    // data for the pie: completed vs remaining
    const data = [
        { name: 'réalisées', value: nombre, color: '#0B23F4' },
        { name: 'restants', value: restants, color: '#B6BDFC' },
    ];
    
    return (

        <div className={styles.chartContainer}>

            <div className={styles.headerContainer}>
                {/* Header shows how many runs completed and target */}
                <h3 className={styles.headerTitle}>
                    <span className={styles.headerHighlight}>x{nombre}</span> sur objectif de 6
                </h3>
                <p className={styles.headerSubtitle}>Courses hebdomadaires réalisées</p>
            </div>

            <div className={styles.chartBox}>

                <ResponsiveContainer width="100%" height="100%">
                    {/* Donut chart: first slice = completed, second = remaining */}
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%" 
                            cy="50%" 
                            innerRadius={40} 
                            outerRadius={76} 
                            startAngle={0} 
                            endAngle={-360} 
                            dataKey="value"
                            stroke="none" 
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* Top-right label: remaining runs */}
                <div className={styles.labelTopRight}>
                    <div className={styles.dotRestants}></div>
                    <span className={styles.labelText}>{restants} restants</span>
                </div>

                {/* Bottom-left label: completed runs */}
                <div className={styles.labelBottomLeft}>
                    <div className={styles.dotRealisees}></div>
                    <span className={styles.labelText}>{nombre} réalisées</span>
                </div>

            </div>
        </div>
    );
}
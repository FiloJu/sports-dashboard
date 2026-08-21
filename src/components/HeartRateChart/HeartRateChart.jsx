import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Line } from 'recharts';
import styles from './HeartRateChart.module.css';

// Custom tooltip for heart rate chart: shows min, max and average for a day
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltipWrapper}>
        <p className={styles.tooltipDay}>{payload[0].payload.jour}</p>
        <p className={styles.tooltipMin}>Min: {payload[0].payload.min} bpm</p>
        <p className={styles.tooltipMax}>Max: {payload[0].payload.max} bpm</p>
        <p className={styles.tooltipAvg}>Moy: {payload[0].payload.average} bpm</p>
      </div>
    );
  }
  return null;
};

// HeartRateChart converts daily heart rate objects into a 7-day dataset
// and renders a composed chart (bars for min/max and a line for average)
export default function HeartRateChart({ data }) {

  // Abbreviated weekday labels used on the X axis
  const jours = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  // Ensure we only take up to 7 days and map to the shape used by Recharts
  const formattedData = data.slice(0, 7).map((jour, index) => {
    return {
      jour: jours[index],
      min: jour.heartRate.min,
      max: jour.heartRate.max,
      average: jour.heartRate.average
    };
  });

  return (
    <div className={styles.chartContainer}>

      <div className={styles.headerContainer}>
        <div className={styles.headerLeft}>
          {/* Main average BPM display (static value in this UI) */}
          <h3 className={styles.bpmTitle}>163 BPM</h3>
          <p className={styles.bpmSubtitle}>Fréquence cardiaque moyenne</p>
        </div>

        <div className={styles.dateNav}>
          {/* Date navigation controls (UI only) */}
          <button className={styles.navButton}>{"<"}</button>
          <span className={styles.dateSpan}>28 mai - 04 juin</span>
          <button className={styles.navButton}>{">"}</button>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          {/* ComposedChart overlays bars for min/max and a line for average */}
          <ComposedChart data={formattedData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="jour" tick={{ fill: '#707070' }} tickLine={false} axisLine={{ stroke: '#282D30' }} tickMargin={10} />

            <YAxis tick={{ fill: '#707070' }} tickLine={false} axisLine={{ stroke: '#282D30' }} tickMargin={10} domain={['dataMin - 5', 'dataMax + 5']} />

            <Tooltip content={<CustomTooltip />} cursor={false} />

            {/* Bars for daily min and max */}
            <Bar dataKey="min" fill="#FCC1B6" radius={[30, 30, 30, 30]} barSize={14} />
            <Bar dataKey="max" fill="#F4320B" radius={[30, 30, 30, 30]} barSize={14} />

            {/* Line for average BPM across the day */}
            <Line type="monotone" dataKey="average" stroke="#F2F3FF" strokeWidth={3} dot={{ r: 4, fill: '#0B23F4' }} />

          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.legendContainer}>
        {/* Legend explaining the chart elements */}
        <div className={styles.legendItem}>
          <div className={styles.dotMin}></div> Min
        </div>
        <div className={styles.legendItem}>
          <div className={styles.dotMax}></div> Max BPM
        </div>
        <div className={styles.legendItem}>
          <div className={styles.dotAvg}></div> Moy BPM
        </div>
      </div>

    </div>
  );
}
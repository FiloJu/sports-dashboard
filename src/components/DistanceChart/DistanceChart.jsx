import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import styles from './DistanceChart.module.css';

// Custom tooltip for the distance bars: shows the week range and summed km
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltipContainer}>
        <p className={styles.tooltipDate}>{payload[0].payload.date}</p>
        <p className={styles.tooltipDistance}>{`${payload[0].value} km`}</p>
      </div>
    );
  }
  return null;
};

// DistanceChart aggregates daily distance data into four weekly bars
// Props:
// - `data`: array of daily records with a `distance` property
export default function DistanceChart({ data }) {
  // avoid runtime errors when `data` is undefined
  const safeData = data || [];

  // divide the data into 4 roughly equal chunks (weeks)
  const chunkSize = Math.ceil(safeData.length / 4) || 1;

  // build chart data by summing distances for each chunk
  const formattedData = [
    {
      nomDeLaBarre: 'S1',
      distanceEnKm: safeData.slice(0, chunkSize).reduce((total, jour) => total + jour.distance, 0).toFixed(1),
      date: '28 mai - 04 juin'
    },
    {
      nomDeLaBarre: 'S2',
      distanceEnKm: safeData.slice(chunkSize, chunkSize * 2).reduce((total, jour) => total + jour.distance, 0).toFixed(1),
      date: '05 juin - 11 juin'
    },
    {
      nomDeLaBarre: 'S3',
      distanceEnKm: safeData.slice(chunkSize * 2, chunkSize * 3).reduce((total, jour) => total + jour.distance, 0).toFixed(1),
      date: '12 juin - 18 juin'
    },
    {
      nomDeLaBarre: 'S4',
      distanceEnKm: safeData.slice(chunkSize * 3).reduce((total, jour) => total + jour.distance, 0).toFixed(1),
      date: '19 juin - 25 juin'
    }
  ];

  return (
    <div className={styles.chartWrapper}>

      <div className={styles.headerContainer}>

        <div className={styles.headerLeft}>
          {/* Summary title and subtitle */}
          <h3 className={styles.averageTitle}>18km en moyenne</h3>
          <p className={styles.averageSubtitle}>Total des kilomètres 4 dernières semaines</p>
        </div>

        <div className={styles.dateNav}>
          {/* Simple date navigation (UI only) */}
          <button className={styles.navButton}>{"<"}</button>
          <span className={styles.dateSpan}>28 mai - 25 juin</span>
          <button className={styles.navButton}>{">"}</button>
        </div>

      </div>

      <div className={styles.graphContainer}>
        <ResponsiveContainer width="100%" height="100%">
          {/* Bar chart uses `formattedData` built above */}
          <BarChart data={formattedData} margin={{ top: 0, right: 45, left: -20, bottom: 0}}>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="nomDeLaBarre" tick={{ fill: '#707070' }} tickLine={false} axisLine={{ stroke: '#282D30' }} tickMargin={10} />
            <YAxis
              tick={{ fill: '#707070' }}
              tickLine={false}
              axisLine={{ stroke: '#707070' }}
              tickMargin={10}
              tickCount={4}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />

            {/* Each bar represents the total kilometers for that weekly chunk */}
            <Bar dataKey="distanceEnKm" fill="#B6BDFC" radius={[30, 30, 30, 30]} barSize={15} />

          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.legendContainer}>
        {/* Legend indicating the unit displayed by the bars */}
        <div className={styles.legendDot}></div>
        <span className={styles.legendText}>Km</span>
      </div>

    </div>
  );
}
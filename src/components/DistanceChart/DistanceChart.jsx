import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import styles from './DistanceChart.module.css';

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

export default function DistanceChart({ data }) {
  const safeData = data || [];

  const chunkSize = Math.ceil(safeData.length / 4) || 1;

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
          <h3 className={styles.averageTitle}>18km en moyenne</h3>
          <p className={styles.averageSubtitle}>Total des kilomètres 4 dernières semaines</p>
        </div>

        <div className={styles.dateNav}>
          <button className={styles.navButton}>{"<"}</button>
          <span className={styles.dateSpan}>28 mai - 25 juin</span>
          <button className={styles.navButton}>{">"}</button>
        </div>

      </div>

      <div className={styles.graphContainer}>
        <ResponsiveContainer width="100%" height="100%">
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

            <Bar dataKey="distanceEnKm" fill="#B6BDFC" radius={[30, 30, 30, 30]} barSize={15} />

          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.legendContainer}>
        <div className={styles.legendDot}></div>
        <span className={styles.legendText}>Km</span>
      </div>

    </div>
  );
}
import React from 'react';

export default function HeartRateChart({ data }) {
  return (
    <div>
      <h4>Heart Rate Chart</h4>
      <div>Data points: {data ? data.length : 0}</div>
    </div>
  );
}

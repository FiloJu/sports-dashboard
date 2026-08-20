import React from 'react';

export default function DistanceChart({ data }) {
  return (
    <div>
      <h4>Distance Chart</h4>
      <div>Data points: {data ? data.length : 0}</div>
    </div>
  );
}

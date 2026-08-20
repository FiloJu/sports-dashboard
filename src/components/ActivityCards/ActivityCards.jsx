import React from 'react';

export default function ActivityCards({ distance, duree }) {
  return (
    <div>
      <h4>Activity Summary</h4>
      <div>Distance: {distance}</div>
      <div>Durée: {duree}</div>
    </div>
  );
}

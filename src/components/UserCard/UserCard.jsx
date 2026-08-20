import React from 'react';

export default function UserCard({ userInfos, runningData }) {
  return (
    <div>
      <h3>{userInfos?.firstName} {userInfos?.lastName}</h3>
      <div>Sessions: {runningData ? runningData.length : 0}</div>
    </div>
  );
}

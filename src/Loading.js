import React from 'react';

const Loading = ({ percentage, classes }) => {
  const { loadingWrapper, percent, loading } = classes;
  return (
    <div className={loadingWrapper}>
      <div className={percent}>{percentage}%</div>
      <div className={loading}></div>
    </div>
  );
}

export default Loading;
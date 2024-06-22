import React from 'react';
import '../styles/Shimmer.scss';

const Shimmer = ({ count }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="shimmer">
          <div className="shimmer-image" />
          <div className="shimmer-text" />
        </div>
      ))}
    </>
  );
};

export default Shimmer;

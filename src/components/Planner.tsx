import React from 'react';
import Map from './Map';
import Sidebar from './Sidebar';

const Planner: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default Planner;

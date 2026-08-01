import React from 'react';

import FetchAllRoom from './FetchAllRoom';
import CreateRoom from './CreateRoom';


const RoomDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Side: Create Room Form */}
        <CreateRoom />

        {/* Right Side: All Active Rooms List */}
        <FetchAllRoom />

      </div>
    </div>
  );
};

export default RoomDashboard;
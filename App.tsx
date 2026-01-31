
import React from 'react';
import { RoomProvider, useRooms } from './context/RoomContext';
import Router from './router';

const AppContent: React.FC = () => {
  const { isLoading } = useRooms();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#181410] flex flex-col items-center justify-center text-white p-6">
        <div className="h-20 w-20 mb-6 flex items-center justify-center bg-white/5 rounded-2xl border border-white/5 animate-pulse relative overflow-hidden">
          <img src="/logo.png" alt="PG Buddy" className="w-full h-full object-cover z-10" />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-primary opacity-40">PB</span>
        </div>
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-primary animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
        <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Syncing Listings...</p>
        <style>{`
          @keyframes loading {
            0% { width: 0%; transform: translateX(-100%); }
            50% { width: 100%; transform: translateX(0); }
            100% { width: 0%; transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  return <Router />;
};

const App: React.FC = () => {
  return (
    <RoomProvider>
      <AppContent />
    </RoomProvider>
  );
};

export default App;

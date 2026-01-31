
import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useRooms } from '../context/RoomContext';
import RoomCard from '../components/RoomCard';

const Saved: React.FC = () => {
  const { rooms, savedRoomIds } = useRooms();
  const { setExpandedImage } = useOutletContext<{ setExpandedImage: (url: string | null) => void }>();
  const navigate = useNavigate();

  const savedRooms = rooms.filter(r => savedRoomIds.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto px-5 py-12 animate-in fade-in duration-500">
      <h1 className="text-4xl font-black mb-2 tracking-tighter">Saved Rooms</h1>
      <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-12">
        {savedRooms.length} bookmarked properties
      </p>
      {savedRooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedRooms.map(room => (
            <RoomCard key={room.id} room={room} onExpandImage={setExpandedImage} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/2 rounded-3xl border border-white/5">
          <span className="material-symbols-outlined text-6xl text-gray-700 mb-4">bookmark_border</span>
          <p className="text-gray-500 font-bold">You haven't saved any rooms yet.</p>
          <button onClick={() => navigate('/listings')} className="mt-6 text-primary font-black uppercase tracking-widest text-xs">Explore listings</button>
        </div>
      )}
    </div>
  );
};

export default Saved;

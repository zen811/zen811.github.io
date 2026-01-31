
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
  onExpandImage: (url: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onExpandImage }) => {
  const navigate = useNavigate();
  const FALLBACK = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200&h=675';
  const mainPhoto = room.photos[0] || FALLBACK;

  return (
    <div 
      className={`bg-[#1e1e1e] border rounded-2xl overflow-hidden transition-all cursor-pointer group flex flex-col shadow-lg relative h-full ${
        room.isAvailable ? 'border-white/5 hover:border-primary/40' : 'border-white/10 grayscale opacity-80'
      }`}
      onClick={() => navigate(`/details/${room.id}`)}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black flex-shrink-0">
        {!room.isAvailable && (
          <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
            <div className="bg-white text-black px-3 py-1.5 rounded-md font-black text-[10px] uppercase tracking-[0.2em]">Occupied</div>
          </div>
        )}
        {room.featured && room.isAvailable && (
          <div className="absolute top-2 left-2 z-20 bg-primary text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-lg uppercase tracking-widest">Featured</div>
        )}
        <img 
          src={mainPhoto} 
          alt={room.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
        />
        <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center">
          <div className="flex items-baseline gap-0.5">
            <span className="text-white font-black text-sm tracking-tight">₹{room.price.toLocaleString()}</span>
            <span className="text-[7px] font-bold text-gray-400 uppercase">/mo</span>
          </div>
          <div className="bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded flex items-center gap-1 border border-white/5">
            <span className="material-symbols-outlined text-primary text-[10px] filled">star</span>
            <span className="text-[8px] font-black text-white">{room.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-3.5 flex flex-col flex-grow bg-[#1e1e1e]">
        <h3 className={`font-black text-xs md:text-sm mb-1 line-clamp-1 ${room.isAvailable ? 'text-white' : 'text-gray-500'}`}>{room.name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-[9px] mb-2 font-bold">
          <span className="material-symbols-outlined text-[12px]">location_on</span>
          <span className="line-clamp-1">{room.location}</span>
        </div>
        <div className="mt-auto pt-2 border-t border-white/5">
          <button className="w-full py-2 text-white text-[8px] font-black rounded-lg border border-white/5 uppercase tracking-widest bg-[#252525] group-hover:bg-primary">
            {room.isAvailable ? 'View details' : 'Currently Full'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;


import React from 'react';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
  onClick: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onClick }) => {
  const mainPhoto = room.photos[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800';

  return (
    <div 
      className="bg-[#1e1e1e] border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all cursor-pointer group flex flex-col h-full"
      onClick={() => onClick(room)}
    >
      <div className="relative aspect-video overflow-hidden bg-white/5">
        {room.featured && (
          <div className="absolute top-3 left-3 z-10 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">FEATURED</div>
        )}
        
        <img 
          src={mainPhoto} 
          alt={room.name} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
           <span className="text-white font-bold text-lg drop-shadow-md">₹{room.price.toLocaleString()}<span className="text-[10px] font-normal opacity-70">/mo</span></span>
           <div className="bg-black/50 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1 border border-white/5">
              <span className="material-symbols-outlined text-primary text-xs filled">star</span>
              <span className="text-xs font-semibold text-white">{room.rating.toFixed(1)}</span>
           </div>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-white mb-1 group-hover:text-primary transition-colors line-clamp-1">{room.name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-[11px] mb-3">
          <span className="material-symbols-outlined text-[14px]">location_on</span>
          <span className="line-clamp-1">{room.location}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
            {room.occupancyType} Sharing
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
            room.genderPreference === 'Male' ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' : 
            room.genderPreference === 'Female' ? 'text-pink-400 bg-pink-400/10 border-pink-400/20' : 
            'text-green-400 bg-green-400/10 border-green-400/20'
          }`}>
            {room.genderPreference}
          </span>
        </div>

        <div className="mt-auto">
          <button className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl transition-all border border-white/10">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;

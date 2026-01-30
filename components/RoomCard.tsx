
import React from 'react';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
  onClick: (room: Room) => void;
  onExpandImage: (url: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onClick, onExpandImage }) => {
  const FALLBACK = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200&h=675';
  const mainPhoto = room.photos[0] || FALLBACK;

  return (
    <div 
      className="bg-[#1e1e1e] border border-white/5 rounded-2xl overflow-hidden hover:border-primary/40 transition-all cursor-pointer group flex flex-col shadow-lg relative h-full"
      onClick={() => onClick(room)}
    >
      {/* Strict 16:9 Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black flex-shrink-0">
        {room.featured && (
          <div className="absolute top-2 left-2 z-20 bg-primary text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-lg uppercase tracking-widest">
            Featured
          </div>
        )}
        
        <img 
          src={mainPhoto} 
          alt={room.name} 
          loading="lazy"
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== FALLBACK) target.src = FALLBACK;
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
        
        {/* Rating and Price Overlay */}
        <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center">
           <div className="flex items-baseline gap-0.5">
              <span className="text-white font-black text-sm tracking-tight drop-shadow-md">
                ₹{room.price.toLocaleString()}
              </span>
              <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">/mo</span>
           </div>
           <div className="bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded flex items-center gap-1 border border-white/5">
              <span className="material-symbols-outlined text-primary text-[10px] filled">star</span>
              <span className="text-[8px] font-black text-white">{room.rating.toFixed(1)}</span>
           </div>
        </div>
      </div>
      
      {/* Medium-profile Content Area */}
      <div className="p-3.5 flex flex-col flex-grow bg-[#1e1e1e]">
        <h3 className="font-black text-white text-xs md:text-sm mb-1 group-hover:text-primary transition-colors line-clamp-1 tracking-tight">
          {room.name}
        </h3>
        
        <div className="flex items-center gap-1 text-gray-500 text-[8px] md:text-[9px] mb-2 font-bold">
          <span className="material-symbols-outlined text-[12px] text-gray-600">location_on</span>
          <span className="line-clamp-1">{room.location}</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          <span className="text-[7px] font-black text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20 uppercase tracking-[0.15em]">
            {room.occupancyType}
          </span>
          <span className={`text-[7px] font-black px-1.5 py-0.5 rounded border uppercase tracking-[0.15em] ${
            room.genderPreference === 'Male' ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' : 
            room.genderPreference === 'Female' ? 'text-pink-400 bg-pink-400/10 border-pink-400/20' : 
            'text-green-400 bg-green-400/10 border-green-400/20'
          }`}>
            {room.genderPreference === 'Unisex' ? 'Unisex' : room.genderPreference}
          </span>
        </div>

        <div className="mt-auto pt-2 border-t border-white/5">
          <button className="w-full py-2 bg-[#252525] group-hover:bg-primary text-white text-[7px] md:text-[8px] font-black rounded-lg transition-all border border-white/5 group-hover:border-primary uppercase tracking-[0.2em]">
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;

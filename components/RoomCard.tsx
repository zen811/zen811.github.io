
import React from 'react';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
  onClick: (room: Room) => void;
  onExpandImage: (url: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onClick, onExpandImage }) => {
  // Use a fallback with 16:9 cropping parameters if possible
  const mainPhoto = room.photos[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200&h=675&q=80';

  return (
    <div 
      className="bg-[#1e1e1e] border border-white/5 rounded-2xl overflow-hidden hover:border-primary/40 transition-all cursor-pointer group flex flex-col h-full shadow-lg relative"
      onClick={() => onClick(room)}
    >
      {/* 16:9 Standardized Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#181410]">
        {room.featured && (
          <div className="absolute top-2 left-2 z-20 bg-primary text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-lg uppercase tracking-widest">
            Featured
          </div>
        )}
        
        {/* Quick Zoom Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onExpandImage(mainPhoto);
          }}
          className="absolute top-2 right-2 z-20 w-7 h-7 bg-black/40 backdrop-blur-md rounded-lg flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/80 scale-90 hover:scale-100"
          title="Zoom Photo"
        >
          <span className="material-symbols-outlined text-[16px]">zoom_in</span>
        </button>
        
        <img 
          src={mainPhoto} 
          alt={room.name} 
          loading="lazy"
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200&h=675&q=80';
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-end">
           <div>
              <span className="text-white font-black text-lg tracking-tight drop-shadow-md">
                ₹{room.price.toLocaleString()}
              </span>
              <span className="text-[8px] font-bold text-gray-400 uppercase ml-0.5 tracking-widest">/mo</span>
           </div>
           <div className="bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded flex items-center gap-1 border border-white/5">
              <span className="material-symbols-outlined text-primary text-[12px] filled">star</span>
              <span className="text-[9px] font-black text-white">{room.rating.toFixed(1)}</span>
           </div>
        </div>
      </div>
      
      {/* Content Area - Optimized for "Medium-Small" profile */}
      <div className="p-3 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/5">
        <h3 className="font-black text-white text-sm mb-0.5 group-hover:text-primary transition-colors line-clamp-1 tracking-tight">
          {room.name}
        </h3>
        
        <div className="flex items-center gap-1 text-gray-500 text-[9px] mb-2 font-bold">
          <span className="material-symbols-outlined text-[12px] text-gray-600">location_on</span>
          <span className="line-clamp-1">{room.location}</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-1 mb-3">
          <span className="text-[7px] font-black text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20 uppercase tracking-widest">
            {room.occupancyType}
          </span>
          <span className={`text-[7px] font-black px-1.5 py-0.5 rounded border uppercase tracking-widest ${
            room.genderPreference === 'Male' ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' : 
            room.genderPreference === 'Female' ? 'text-pink-400 bg-pink-400/10 border-pink-400/20' : 
            'text-green-400 bg-green-400/10 border-green-400/20'
          }`}>
            {room.genderPreference} Only
          </span>
        </div>

        {/* Action Button - compact locked bottom */}
        <div className="mt-auto pt-1.5 border-t border-white/5">
          <button className="w-full py-1.5 bg-white/5 group-hover:bg-primary/10 group-hover:text-primary text-white text-[9px] font-black rounded transition-all border border-white/5 group-hover:border-primary/20 uppercase tracking-[0.2em]">
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;

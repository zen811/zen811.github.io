
import React from 'react';
import { Room } from '../types';

interface RoomDetailsProps {
  room: Room;
  onBack: () => void;
  onExpandImage: (url: string) => void;
  onSave: () => void;
  onShare: () => void;
  isSaved: boolean;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ room, onBack, onExpandImage, onSave, onShare, isSaved }) => {
  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200&h=675';

  const handleViewLocation = () => {
    if (room.locationLink && room.locationLink !== '#') {
      window.open(room.locationLink, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/${encodeURIComponent(room.name + ' ' + room.location)}`, '_blank');
    }
  };

  const galleryImages = room.photos.length > 0 ? room.photos : [FALLBACK_IMAGE];

  const renderGallery = () => {
    const galleryClass = `w-full overflow-hidden rounded-3xl shadow-2xl bg-[#181410] border border-white/10 relative ${!room.isAvailable ? 'grayscale opacity-75' : ''}`;
    
    if (galleryImages.length === 1) {
      return (
        <div 
          onClick={() => onExpandImage(galleryImages[0])}
          className={`${galleryClass} aspect-[16/9] mb-8 md:mb-12 group cursor-zoom-in`}
        >
          {!room.isAvailable && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40">
              <span className="bg-white text-black px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl">Currently Fully Booked</span>
            </div>
          )}
          <img 
            src={galleryImages[0]} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000" 
            alt="Room Interior" 
            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
          />
        </div>
      );
    }

    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-5 mb-8 md:mb-12 overflow-hidden rounded-3xl shadow-2xl bg-[#181410] border border-white/10 ${!room.isAvailable ? 'grayscale opacity-75' : ''}`}>
        <div 
          onClick={() => onExpandImage(galleryImages[0])}
          className="col-span-2 row-span-1 md:row-span-2 aspect-[16/9] overflow-hidden group relative cursor-zoom-in bg-black"
        >
          {!room.isAvailable && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40">
              <span className="bg-white text-black px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl">Unavailable</span>
            </div>
          )}
          <img 
            src={galleryImages[0]} 
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000" 
            alt="Main View" 
            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
          />
        </div>
        
        {galleryImages.slice(1, 5).map((img, idx) => (
          <div 
            key={idx} 
            onClick={() => onExpandImage(img)}
            className="col-span-1 aspect-[16/9] overflow-hidden group relative cursor-zoom-in bg-black"
          >
            <img 
              src={img} 
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000" 
              alt={`Gallery ${idx + 1}`} 
              onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
            />
            {idx === 3 && galleryImages.length > 4 && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none select-none">
                <span className="text-white font-black text-xl md:text-2xl">+{galleryImages.length - 4}</span>
                <span className="text-gray-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest mt-1">Photos</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-6 md:px-6 md:py-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-8 md:mb-12">
        <div className="flex-grow">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-primary text-[9px] font-black uppercase tracking-[0.2em] mb-4 md:mb-6 transition-all group"
          >
            <span className="material-symbols-outlined text-[14px] transition-transform group-hover:-translate-x-1">arrow_back</span> 
            Back to listings
          </button>
          
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
            <h1 className={`text-2xl md:text-5xl font-black tracking-tighter leading-tight ${!room.isAvailable ? 'text-gray-500' : ''}`}>{room.name}</h1>
            <span className="bg-primary/10 text-primary text-[8px] md:text-[9px] font-black px-3 py-1.5 rounded-lg border border-primary/20 uppercase tracking-[0.1em]">
              {room.flatType}
            </span>
            {!room.isAvailable && (
              <span className="bg-white text-black text-[8px] md:text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-[0.1em]">
                Currently Full
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs">
            <span className="flex items-center gap-1.5 text-primary font-black">
              <span className="material-symbols-outlined filled text-base">star</span> {room.rating.toFixed(1)} 
              <span className="text-gray-500 font-bold ml-1">({room.reviewsCount})</span>
            </span>
            <span className="flex items-center gap-1.5 text-gray-400 font-bold hover:text-primary transition-colors cursor-pointer" onClick={handleViewLocation}>
              <span className="material-symbols-outlined text-base text-primary">location_on</span> 
              <span className="line-clamp-1 max-w-[200px] md:max-w-none">{room.location}</span>
            </span>
          </div>
        </div>
        
        <div className="flex gap-2.5">
          <button 
            onClick={onShare}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
          >
            <span className="material-symbols-outlined text-lg">share</span>
            <span className="text-[10px] font-black uppercase tracking-widest md:hidden">Share</span>
          </button>
          <button 
            onClick={onSave}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 border rounded-xl transition-all group ${isSaved ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 text-white'}`}
          >
            <span className={`material-symbols-outlined text-lg ${isSaved ? 'filled' : ''}`}>favorite</span>
            <span className="text-[10px] font-black uppercase tracking-widest md:hidden">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {renderGallery()}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
        <div className="lg:col-span-2 space-y-12 md:space-y-16">
          <section>
            <h3 className="text-xl md:text-2xl font-black mb-6 md:mb-8 tracking-tight">Property Details</h3>
            <div className="bg-[#1e1e1e] p-6 md:p-8 rounded-3xl border border-white/5 shadow-xl">
              <p className={`leading-relaxed font-medium text-sm md:text-base mb-8 md:mb-10 whitespace-pre-line ${!room.isAvailable ? 'text-gray-600' : 'text-gray-400'}`}>{room.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                 {[
                   { label: 'Type', val: room.flatType, icon: 'apartment' },
                   { label: 'Occupancy', val: room.occupancyType, icon: 'group' },
                   { label: 'Status', val: room.isAvailable ? 'Available' : 'Full', icon: room.isAvailable ? 'event_available' : 'event_busy' },
                   { label: 'Trusted', val: room.isVerified ? 'Verified' : 'Unverified', icon: 'verified_user' }
                 ].map((item, i) => (
                   <div key={i} className={`bg-[#181410] p-3 md:p-4 rounded-xl border flex flex-col items-center justify-center text-center ${!room.isAvailable ? 'border-white/5 opacity-50' : 'border-white/5'}`}>
                      <span className={`material-symbols-outlined mb-1 text-xl md:text-2xl ${!room.isAvailable ? 'text-gray-500' : 'text-primary'}`}>{item.icon}</span>
                      <span className="text-[7px] md:text-[8px] text-gray-500 uppercase font-black tracking-widest mb-1">{item.label}</span>
                      <span className="text-[10px] md:text-xs font-black text-white">{item.val}</span>
                   </div>
                 ))}
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className={`bg-[#1e1e1e] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-3xl ${!room.isAvailable ? 'grayscale' : ''}`}>
              <div className="mb-6 md:mb-8 relative z-10">
                <span className="text-[8px] text-gray-500 uppercase font-black tracking-[0.3em] block mb-1">Monthly Rent</span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl md:text-5xl font-black tracking-tighter ${!room.isAvailable ? 'text-gray-500' : 'text-white'}`}>₹{room.price.toLocaleString()}</span>
                  <span className="text-gray-500 font-black text-[8px] uppercase tracking-widest">/ Mo</span>
                </div>
              </div>

              <div className="space-y-3 relative z-10">
                <button 
                  onClick={handleViewLocation}
                  className={`w-full font-black py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.2em] ${
                    room.isAvailable ? 'bg-primary hover:bg-primary/90 text-white shadow-primary/20' : 'bg-white/5 text-gray-500 cursor-not-allowed shadow-none'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">explore</span>
                  Get Directions
                </button>
                <a 
                  href={room.isAvailable ? `tel:${room.phoneNumber}` : '#'} 
                  className={`w-full border font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.2em] ${
                    room.isAvailable ? 'bg-white/5 hover:bg-white/10 text-white border-white/10' : 'bg-transparent text-gray-600 border-white/5 cursor-not-allowed'
                  }`}
                  onClick={(e) => !room.isAvailable && e.preventDefault()}
                >
                  <span className="material-symbols-outlined text-lg">contact_phone</span>
                  {room.isAvailable ? 'Call Owner' : 'Booking Closed'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;

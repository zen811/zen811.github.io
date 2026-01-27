
import React from 'react';
import { Room } from '../types';

interface RoomDetailsProps {
  room: Room;
  onBack: () => void;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ room, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Breadcrumbs & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-[#ff8000] text-sm font-medium mb-4"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span> Back to listings
          </button>
          <h1 className="text-2xl md:text-4xl font-bold mb-3">{room.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-[#ff8000] font-semibold bg-[#ff8000]/10 px-2 py-1 rounded">
              <span className="material-symbols-outlined filled text-sm">star</span> {room.rating} ({room.reviewsCount} reviews)
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <span className="material-symbols-outlined text-sm">location_on</span> {room.location}
            </span>
            {room.isVerified && (
              <span className="flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-1 rounded font-medium">
                <span className="material-symbols-outlined text-sm filled">verified</span> Verified
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-semibold">
            <span className="material-symbols-outlined text-lg">share</span> Share
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-semibold">
            <span className="material-symbols-outlined text-lg">favorite</span> Save
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[500px] mb-10 overflow-hidden rounded-3xl shadow-2xl">
        <div className="col-span-2 row-span-2 overflow-hidden group">
          <img src={room.photos[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Main" />
        </div>
        <div className="col-span-1 row-span-1 overflow-hidden group">
          <img src={room.photos[1] || room.photos[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery 1" />
        </div>
        <div className="col-span-1 row-span-1 overflow-hidden group">
          <img src={room.photos[2] || room.photos[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery 2" />
        </div>
        <div className="col-span-1 row-span-1 overflow-hidden group">
          <img src={room.photos[3] || room.photos[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery 3" />
        </div>
        <div className="col-span-1 row-span-1 relative overflow-hidden group cursor-pointer">
          <img src={room.photos[4] || room.photos[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery 4" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white font-bold text-lg">+12 photos</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h3 className="text-2xl font-bold mb-6">About this room</h3>
            <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
              <p>{room.description}</p>
              <p className="mt-4">
                This property is managed by <strong>{room.ownerName}</strong>. 
                For inquiries, contact at <span className="text-[#ff8000] font-semibold">{room.phoneNumber}</span>.
              </p>
            </div>
          </section>

          <hr className="border-white/5" />

          <section>
            <h3 className="text-2xl font-bold mb-8">Facilities & Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {room.amenities.map(item => (
                <div key={item} className="flex items-center gap-4 group">
                  <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-[#ff8000]/10 transition-all border border-white/5 group-hover:border-[#ff8000]/20">
                    <span className="material-symbols-outlined text-[#ff8000]">
                      {item.toLowerCase().includes('wi-fi') ? 'wifi' : 
                       item.toLowerCase().includes('ac') ? 'ac_unit' : 
                       item.toLowerCase().includes('meal') ? 'restaurant' : 
                       item.toLowerCase().includes('laundry') ? 'local_laundry_service' : 
                       item.toLowerCase().includes('backup') ? 'bolt' : 'task_alt'}
                    </span>
                  </div>
                  <span className="text-gray-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-white/5" />

          <section>
            <h3 className="text-2xl font-bold mb-8 text-white">House Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {room.rules.map(rule => (
                <div key={rule} className="flex items-center gap-3 text-gray-400">
                  <span className="material-symbols-outlined text-sm text-[#ff8000]">check_circle</span>
                  <span className="text-sm">{rule}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-white/5" />

          <section>
            <h3 className="text-2xl font-bold mb-8">Location</h3>
            <div className="rounded-3xl overflow-hidden h-72 w-full bg-white/5 relative border border-white/10 shadow-lg">
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale opacity-60 hover:grayscale-0 transition-all duration-700" 
                style={{ backgroundImage: 'url("https://picsum.photos/id/120/1200/400")' }}
              ></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-t from-black/80 to-transparent">
                <a 
                  href={room.locationLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#ff8000] hover:bg-[#ff8000]/90 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-xl shadow-[#ff8000]/30 flex items-center gap-2 transform hover:scale-105"
                >
                  <span className="material-symbols-outlined filled">location_on</span>
                  Open in Google Maps
                </a>
                <p className="mt-4 text-white text-center font-medium max-w-sm">{room.location}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sticky Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-[#1e1e1e] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#ff8000]"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-4xl font-black text-[#ff8000]">₹{room.price.toLocaleString()}<span className="text-sm font-normal text-gray-500"> /mo</span></p>
                  <p className="text-xs text-green-500 font-bold mt-2 tracking-wide uppercase">All inclusive: Electricity & Water</p>
                </div>
                <div className="bg-[#ff8000]/10 text-[#ff8000] text-[10px] font-black px-3 py-1.5 rounded-full border border-[#ff8000]/20 uppercase">HOT DEAL</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:border-[#ff8000]/40 transition-all">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-widest">Move-in Date</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Select Date</span>
                    <span className="material-symbols-outlined text-gray-400 text-lg">calendar_today</span>
                  </div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:border-[#ff8000]/40 transition-all">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-widest">Duration</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">6 Months</span>
                    <span className="material-symbols-outlined text-gray-400 text-lg">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-10 pb-10 border-b border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Security Deposit</span>
                  <span className="font-bold text-white">₹{(room.price * 2).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Maintenance</span>
                  <span className="font-bold text-green-500">FREE</span>
                </div>
                <div className="pt-2 flex justify-between text-lg font-black text-white">
                  <span>Total at Move-in</span>
                  <span>₹{(room.price * 3).toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-[#ff8000] hover:bg-[#ff8000]/90 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-[#ff8000]/20 flex items-center justify-center gap-2 transform active:scale-95">
                  BOOK NOW
                </button>
                <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
                  SEND INQUIRY
                </button>
              </div>

              <p className="text-center text-[10px] text-gray-500 mt-6 font-medium">
                No payment required yet. Verification follows.
              </p>
            </div>

            <div className="bg-[#ff8000]/5 border border-[#ff8000]/20 rounded-2xl p-4 flex items-center gap-4 group">
              <div className="bg-[#ff8000] text-white p-2 rounded-xl">
                <span className="material-symbols-outlined filled text-xl">verified_user</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Verified Property</p>
                <p className="text-[11px] text-gray-400">Physical inspection completed by PG Buddy Team.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;

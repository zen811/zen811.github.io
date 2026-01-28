
import React from 'react';
import { Room } from '../types';

// Placeholder URL for user enquiry form
const ENQUIRY_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScP_placeholder_enquiry_form/viewform';

interface RoomDetailsProps {
  room: Room;
  onBack: () => void;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ room, onBack }) => {
  const handleEnquiry = () => {
    // Redirecting user to Google Form to take basic info
    window.open(`${ENQUIRY_FORM_URL}?usp=pp_url&entry.123456789=${encodeURIComponent(room.name)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-[#ff8000] text-sm font-medium mb-4"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span> Back to listings
          </button>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-4xl font-bold">{room.name}</h1>
            <span className="bg-white/10 text-white text-xs font-bold px-2 py-1 rounded-lg border border-white/10 uppercase">
              {room.flatType}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-[#ff8000] font-semibold bg-[#ff8000]/10 px-2 py-1 rounded">
              <span className="material-symbols-outlined filled text-sm">star</span> {room.rating.toFixed(1)} ({room.reviewsCount} reviews)
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <span className="material-symbols-outlined text-sm">location_on</span> {room.location}
            </span>
            <span className={`flex items-center gap-1 font-medium px-2 py-1 rounded ${
              room.genderPreference === 'Male' ? 'text-blue-400 bg-blue-400/10' : 
              room.genderPreference === 'Female' ? 'text-pink-400 bg-pink-400/10' : 
              'text-green-400 bg-green-400/10'
            }`}>
              <span className="material-symbols-outlined text-sm">group</span> {room.genderPreference} Only
            </span>
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
            <span className="text-white font-bold text-lg">+{Math.max(0, room.photos.length - 4)} photos</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h3 className="text-2xl font-bold mb-6">About this {room.flatType}</h3>
            <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
              <p>{room.description}</p>
              <div className="mt-6 flex flex-wrap gap-4">
                 <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-w-[100px]">
                    <span className="material-symbols-outlined text-[#ff8000] mb-1">apartment</span>
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Flat Type</span>
                    <span className="text-sm font-bold text-white uppercase">{room.flatType}</span>
                 </div>
                 <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-w-[100px]">
                    <span className="material-symbols-outlined text-[#ff8000] mb-1">group</span>
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Occupancy</span>
                    <span className="text-sm font-bold text-white">{room.occupancyType} Sharing</span>
                 </div>
              </div>
              <p className="mt-8">
                This property is managed by <strong>{room.ownerName}</strong>. 
                For general enquiries, call at <span className="text-[#ff8000] font-semibold">{room.phoneNumber}</span>.
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
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-[#1e1e1e] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#ff8000]"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-4xl font-black text-[#ff8000]">₹{room.price.toLocaleString()}<span className="text-sm font-normal text-gray-500"> /mo</span></p>
                  <p className="text-xs text-green-500 font-bold mt-2 tracking-wide uppercase">All inclusive utilities</p>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleEnquiry}
                  className="w-full bg-[#ff8000] hover:bg-[#ff8000]/90 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-[#ff8000]/20 flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">contact_mail</span>
                  CHECK AVAILABILITY
                </button>
                <a href={`tel:${room.phoneNumber}`} className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">call</span>
                  CALL MANAGER
                </a>
              </div>
              <p className="text-[10px] text-gray-500 mt-6 text-center leading-relaxed">
                By clicking "Check Availability", you will be redirected to a contact form to provide your details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;

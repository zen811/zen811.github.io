
import React from 'react';
import { Room } from '../types';
import RoomCard from './RoomCard';

interface LandingPageProps {
  onBrowse: () => void;
  onListProperty: () => void;
  featuredRooms: Room[];
  onRoomClick: (room: Room) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onBrowse, onListProperty, featuredRooms, onRoomClick }) => {
  return (
    <div className="bg-[#181410] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-32">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#181410]/20 via-[#181410]/80 to-[#181410]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-in fade-in duration-1000">
          <h1 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight leading-[1.1]">
            Find your perfect home <br /> away from home.
          </h1>
          <p className="text-base md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Connecting property owners with students and professionals looking for the best PG accommodations across the city.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onBrowse}
              className="w-full sm:w-auto px-10 py-4 bg-[#ff8000] text-white font-bold rounded-xl shadow-lg shadow-[#ff8000]/20 hover:scale-105 transition-all"
            >
              Browse PG Listings
            </button>
            <button 
              onClick={onListProperty}
              className="w-full sm:w-auto px-10 py-4 border border-gray-600 text-white font-bold rounded-xl hover:bg-white/5 transition-all"
            >
              List Your Property
            </button>
          </div>
        </div>

        {/* Floating Search Bar */}
        <div className="relative z-20 w-full max-w-5xl px-4 mt-16 md:absolute md:-bottom-10 md:left-1/2 md:-translate-x-1/2 md:mt-0">
          <div className="bg-[#1e1e1e] border border-white/10 p-4 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-4">
            <div className="flex-grow flex items-center gap-4 px-5 py-4 bg-white/5 rounded-xl border border-white/5 w-full">
              <span className="material-symbols-outlined text-gray-500 text-xl">search</span>
              <input 
                type="text" 
                placeholder="Search by Location, Budget, or Occupancy" 
                className="bg-transparent border-none focus:ring-0 text-sm w-full text-white placeholder:text-gray-500"
                onKeyPress={(e) => e.key === 'Enter' && onBrowse()}
              />
            </div>
            <button 
              onClick={onBrowse}
              className="w-full md:w-auto px-10 py-4 bg-[#ff8000] text-white font-bold rounded-xl hover:bg-[#ff8000]/90 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">search</span>
              Find Now
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-[#ff8000] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">Our Process</span>
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-500 max-w-md">Your journey to a perfect home made simple and transparent.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: 'manage_search', title: 'Find', desc: 'Search through thousands of verified PGs tailored to your budget, preference, and lifestyle needs.' },
            { icon: 'calendar_month', title: 'Visit', desc: 'Schedule a virtual walkthrough or a physical tour at your convenience with our direct booking system.' },
            { icon: 'payments', title: 'Book', desc: 'Secure your stay instantly with easy and safe online payments. No hidden charges, total transparency.' }
          ].map((item, idx) => (
            <div 
              key={idx} 
              onClick={onBrowse}
              className="bg-[#1e1e1e] border border-white/5 p-10 rounded-3xl group hover:border-[#ff8000]/20 transition-all cursor-pointer active:scale-95 transform"
            >
              <div className="w-12 h-12 bg-[#ff8000]/10 rounded-xl flex items-center justify-center text-[#ff8000] mb-8 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-24 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Featured PG Listings</h2>
            </div>
            <button onClick={onBrowse} className="text-[#ff8000] font-bold text-sm flex items-center gap-1 hover:underline">
              View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRooms.slice(0, 3).map(room => (
              <RoomCard key={room.id} room={room} onClick={onRoomClick} />
            ))}
          </div>
        </div>
      </section>

      {/* Owner CTA Section */}
      <section className="py-32 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Are you a property owner?</h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            List your PG with us today and reach thousands of prospective residents. We handle the discovery, you handle the hospitality.
          </p>
          <button 
            onClick={onListProperty}
            className="px-12 py-5 bg-[#ff8000] text-white font-bold rounded-2xl shadow-2xl shadow-[#ff8000]/30 hover:scale-105 transition-all text-lg"
          >
            List Your Property for Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

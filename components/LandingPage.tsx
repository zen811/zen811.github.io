
import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useRooms } from '../context/RoomContext';
import RoomCard from './RoomCard';

const LIST_PROPERTY_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfnlEk8iCcgoU9uCJzbQ819ymUQTAQTIuoKpUfzfSucov0hTg/viewform?usp=sharing';

const LandingPage: React.FC = () => {
  const { featuredRooms, setFilters } = useRooms();
  const { setExpandedImage } = useOutletContext<{ setExpandedImage: (url: string | null) => void }>();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
    navigate('/listings');
  };

  return (
    <div className="bg-[#181410] text-white overflow-x-hidden">
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-10 pb-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#181410]/20 via-[#181410]/80 to-[#181410]"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-in fade-in zoom-in duration-1000">
          <h1 className="text-4xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.95] md:leading-[1]">
            Find your perfect <br className="hidden md:block" /> home away from home.
          </h1>
          <p className="text-sm md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
            Discover verified PGs and rooms curated for students and professionals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-md mx-auto">
            <button 
              onClick={() => navigate('/listings')}
              className="w-full sm:w-auto px-10 py-5 bg-[#ff8000] text-white font-black rounded-2xl shadow-2xl shadow-[#ff8000]/30 hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest"
            >
              Start Exploring
            </button>
            <button 
              onClick={() => window.open(LIST_PROPERTY_FORM_URL, '_blank')}
              className="w-full sm:w-auto px-10 py-5 border-2 border-white/10 text-white font-black rounded-2xl hover:bg-white/5 transition-all text-sm uppercase tracking-widest"
            >
              List Property
            </button>
          </div>
        </div>

        <div className="relative z-20 w-full max-w-5xl px-4 mt-20 md:mt-24">
          <div className="bg-[#1e1e1e] border border-white/10 p-2.5 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-2.5 backdrop-blur-xl">
            <div className="flex-grow flex items-center gap-4 px-6 py-4 bg-white/5 rounded-2xl border border-white/5 w-full group focus-within:border-primary/50 transition-all">
              <span className="material-symbols-outlined text-gray-500 text-2xl">search</span>
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search location, budget, or gender..." 
                className="bg-transparent border-none focus:ring-0 text-base w-full text-white placeholder:text-gray-500 font-medium"
                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
              />
            </div>
            <button 
              onClick={handleSearchSubmit}
              className="w-full md:w-14 md:h-14 aspect-square bg-primary text-white font-black rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center shadow-lg shadow-primary/20"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-2xl">search</span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white/2 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-black text-white tracking-tight">Featured Homes.</h2>
              <p className="text-gray-500 mt-2 font-medium uppercase tracking-widest text-[10px]">Premium verified picks</p>
            </div>
            <button onClick={() => navigate('/listings')} className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2">
              View all <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRooms.slice(0, 4).map(room => (
              <RoomCard key={room.id} room={room} onExpandImage={setExpandedImage} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

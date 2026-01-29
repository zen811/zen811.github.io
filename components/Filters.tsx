
import React, { useRef, useState, useEffect } from 'react';
import { FilterState } from '../types';

interface FiltersProps {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);
  
  const min = 5000;
  const max = 30000;
  
  const percentage = ((filters.priceRange[1] - min) / (max - min)) * 100;

  const toggleRoomType = (type: string) => {
    const newTypes = filters.roomTypes.includes(type)
      ? filters.roomTypes.filter(t => t !== type)
      : [...filters.roomTypes, type];
    setFilters({ ...filters, roomTypes: newTypes });
  };

  const toggleGender = (g: string) => {
    const newGenders = filters.gender.includes(g)
      ? filters.gender.filter(item => item !== g)
      : [...filters.gender, g];
    setFilters({ ...filters, gender: newGenders });
  };

  const handleClearAll = () => {
    setFilters({ 
      priceRange: [5000, 30000], 
      roomTypes: [], 
      gender: [], 
      searchQuery: '', 
      nearMe: false 
    });
  };

  return (
    <div className="w-full md:w-80 flex-shrink-0 space-y-10 md:sticky md:top-24 bg-transparent pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-black text-white tracking-tight">Filters</h3>
        <button 
          onClick={handleClearAll}
          className="text-xs font-bold text-primary hover:opacity-80 transition-opacity uppercase tracking-widest"
        >
          Clear All
        </button>
      </div>

      {/* Nearby Toggle */}
      <section className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-xl">gps_fixed</span>
          <h4 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400">Nearby</h4>
        </div>
        <button 
          onClick={() => setFilters({ ...filters, nearMe: !filters.nearMe })}
          className={`w-12 h-6 rounded-full transition-all relative ${filters.nearMe ? 'bg-primary' : 'bg-gray-800'}`}
        >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-md ${filters.nearMe ? 'right-1' : 'left-1'}`}></div>
        </button>
      </section>

      {/* Price Range Slider with Tooltip */}
      <section className="space-y-8 px-2">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-xl">payments</span>
          <h4 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400">Price Range</h4>
        </div>
        
        <div className="relative pt-6">
          {/* Tooltip */}
          <div 
            className={`absolute -top-6 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg shadow-primary/20 transition-opacity duration-200 pointer-events-none whitespace-nowrap mb-2 transform -translate-x-1/2`}
            style={{ 
              left: `${percentage}%`,
              opacity: showTooltip ? 1 : 0
            }}
          >
            ₹{filters.priceRange[1].toLocaleString()}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45"></div>
          </div>

          <div className="relative h-6 flex items-center">
            {/* Range Track Fill (Orange) */}
            <div 
              className="absolute left-0 h-1.5 bg-primary rounded-l-full pointer-events-none z-0"
              style={{ width: `${percentage}%` }}
            ></div>
            
            <input 
              ref={sliderRef}
              type="range" 
              min={min} 
              max={max} 
              step="500"
              value={filters.priceRange[1]}
              onMouseDown={() => setShowTooltip(true)}
              onMouseUp={() => setShowTooltip(false)}
              onTouchStart={() => setShowTooltip(true)}
              onTouchEnd={() => setShowTooltip(false)}
              onChange={(e) => setFilters({ ...filters, priceRange: [5000, parseInt(e.target.value)] })}
              className="w-full h-1.5 bg-gray-800 rounded-full appearance-none cursor-pointer accent-white relative z-10"
            />
          </div>
          
          <div className="flex justify-between mt-4 text-[11px] font-black text-gray-500 uppercase tracking-widest">
            <span>₹5k</span>
            <span className="text-gray-300">Max: ₹30k</span>
          </div>
        </div>
      </section>

      {/* Sharing Type */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-xl">bed</span>
          <h4 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400">Sharing Type</h4>
        </div>
        <div className="space-y-3">
          {['Single', 'Double', 'Triple'].map(type => (
            <label key={type} className="flex items-center gap-4 cursor-pointer group select-none p-2 rounded-xl hover:bg-white/5 transition-colors">
              <div 
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${filters.roomTypes.includes(type) ? 'bg-primary border-primary shadow-lg shadow-primary/20' : 'border-white/10 group-hover:border-white/20'}`}
                onClick={(e) => { e.preventDefault(); toggleRoomType(type); }}
              >
                {filters.roomTypes.includes(type) && (
                  <span className="material-symbols-outlined text-white text-[16px] font-black">check</span>
                )}
              </div>
              <span className={`text-sm font-bold transition-colors ${filters.roomTypes.includes(type) ? 'text-white' : 'text-gray-400'}`}>{type} Sharing</span>
            </label>
          ))}
        </div>
      </section>

      {/* Gender Preference */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-xl">group</span>
          <h4 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400">Gender Preference</h4>
        </div>
        <div className="flex flex-col gap-3">
          {['Male', 'Female'].map(g => (
            <button 
              key={g}
              onClick={() => toggleGender(g)}
              className={`flex items-center px-6 py-4 rounded-[20px] border-2 text-left transition-all group ${
                filters.gender.includes(g) 
                  ? 'bg-primary/5 border-primary text-white shadow-xl shadow-primary/5' 
                  : 'bg-white/5 border-white/5 text-gray-500 font-bold hover:border-white/20 hover:text-gray-300'
              }`}
            >
              <span className="flex-grow text-sm font-black uppercase tracking-wider">{g}</span>
              <span className={`material-symbols-outlined text-lg transition-transform ${filters.gender.includes(g) ? 'scale-110 text-primary filled' : 'opacity-20 scale-90'}`}>
                {g === 'Male' ? 'male' : 'female'}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Filters;

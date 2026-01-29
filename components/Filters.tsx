
import React, { useRef, useState } from 'react';
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

  /**
   * Updated to be mutually exclusive for clearer search intent.
   * Selecting 'Male' shows Male + Unisex.
   * Selecting 'Female' shows Female + Unisex.
   */
  const handleGenderSelect = (g: string) => {
    const newGenders = filters.gender.includes(g) ? [] : [g];
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
    <div className="w-full md:w-80 flex-shrink-0 space-y-8 md:sticky md:top-24 bg-transparent pb-10 animate-in fade-in slide-in-from-left-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-black text-white tracking-tight">Filters</h3>
        <button 
          onClick={handleClearAll}
          className="text-[9px] font-black text-primary hover:opacity-80 transition-opacity uppercase tracking-[0.2em]"
        >
          Reset
        </button>
      </div>

      {/* Gender Selection - High Prominence */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary text-lg">person_search</span>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Searching for</h4>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {['Male', 'Female'].map(g => (
            <button 
              key={g}
              onClick={() => handleGenderSelect(g)}
              className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all group relative overflow-hidden ${
                filters.gender.includes(g) 
                  ? 'bg-primary/10 border-primary text-white shadow-xl shadow-primary/10 scale-[1.02]' 
                  : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'
              }`}
            >
              <span className={`material-symbols-outlined text-2xl mb-2 transition-transform ${filters.gender.includes(g) ? 'filled text-primary scale-110' : 'opacity-40'}`}>
                {g === 'Male' ? 'male' : 'female'}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest">{g}</span>
              {filters.gender.includes(g) && (
                <div className="absolute top-1.5 right-1.5">
                  <span className="material-symbols-outlined text-primary text-sm font-black">check_circle</span>
                </div>
              )}
            </button>
          ))}
        </div>
        <p className="text-[9px] text-gray-600 font-bold italic text-center px-2">
          Selecting a gender shows both gender-specific and unisex rooms.
        </p>
      </section>

      {/* Price Range Slider */}
      <section className="space-y-6 px-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-lg">payments</span>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Monthly Budget</h4>
        </div>
        
        <div className="relative pt-6">
          <div 
            className={`absolute -top-6 bg-primary text-white text-[9px] font-black px-2 py-1 rounded-md shadow-lg transition-opacity duration-200 pointer-events-none whitespace-nowrap mb-2 transform -translate-x-1/2`}
            style={{ 
              left: `${percentage}%`,
              opacity: showTooltip ? 1 : 0
            }}
          >
            ₹{filters.priceRange[1].toLocaleString()}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45"></div>
          </div>

          <div className="relative h-6 flex items-center">
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
              onChange={(e) => setFilters({ ...filters, priceRange: [min, parseInt(e.target.value)] })}
              className="w-full h-1.5 bg-gray-800 rounded-full appearance-none cursor-pointer accent-white relative z-10"
            />
          </div>
          <div className="flex justify-between mt-3 text-[10px] font-black text-gray-600 uppercase tracking-widest">
            <span>₹{min/1000}k</span>
            <span className="text-gray-400">Up to ₹{filters.priceRange[1]/1000}k</span>
          </div>
        </div>
      </section>

      {/* Sharing Type */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-lg">bed</span>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Occupancy Type</h4>
        </div>
        <div className="space-y-2">
          {['Single', 'Double', 'Triple'].map(type => (
            <button 
              key={type} 
              onClick={() => toggleRoomType(type)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                filters.roomTypes.includes(type) 
                ? 'bg-white/5 border-primary text-white' 
                : 'bg-white/2 border-white/5 text-gray-500 hover:bg-white/5'
              }`}
            >
              <span className="text-xs font-black uppercase tracking-widest">{type} sharing</span>
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                filters.roomTypes.includes(type) ? 'bg-primary border-primary' : 'border-white/10'
              }`}>
                {filters.roomTypes.includes(type) && (
                  <span className="material-symbols-outlined text-white text-[14px] font-black">check</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Nearby Toggle */}
      <section className="p-6 bg-white/2 rounded-3xl border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-xl">location_on</span>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Search Nearby</h4>
        </div>
        <button 
          onClick={() => setFilters({ ...filters, nearMe: !filters.nearMe })}
          className={`w-11 h-6 rounded-full transition-all relative ${filters.nearMe ? 'bg-primary' : 'bg-gray-800'}`}
        >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-md ${filters.nearMe ? 'right-1' : 'left-1'}`}></div>
        </button>
      </section>
    </div>
  );
};

export default Filters;

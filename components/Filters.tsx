
import React from 'react';
import { FilterState } from '../types';

interface FiltersProps {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
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

  return (
    <div className="w-full md:w-64 flex-shrink-0 space-y-8 sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Filters</h3>
        <button 
          onClick={() => setFilters({ priceRange: [5000, 30000], roomTypes: [], gender: [], searchQuery: '', nearMe: false })}
          className="text-xs text-[#ff8000] hover:underline"
        >
          Clear All
        </button>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff8000] text-sm">my_location</span>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Nearby</h4>
          </div>
          <button 
            onClick={() => setFilters({ ...filters, nearMe: !filters.nearMe })}
            className={`w-10 h-5 rounded-full transition-all relative ${filters.nearMe ? 'bg-[#ff8000]' : 'bg-gray-700'}`}
          >
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${filters.nearMe ? 'right-1' : 'left-1'}`}></div>
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ff8000] text-sm">payments</span>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Price Range</h4>
        </div>
        <div className="px-2">
          <input 
            type="range" 
            min="5000" 
            max="30000" 
            step="1000"
            value={filters.priceRange[1]}
            onChange={(e) => setFilters({ ...filters, priceRange: [5000, parseInt(e.target.value)] })}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#ff8000]"
          />
          <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
            <span>₹5k</span>
            <span>₹{Math.round(filters.priceRange[1]/1000)}k</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ff8000] text-sm">bed</span>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Sharing Type</h4>
        </div>
        <div className="space-y-2">
          {['Single', 'Double', 'Triple'].map(type => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <div 
                className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${filters.roomTypes.includes(type) ? 'bg-[#ff8000] border-[#ff8000]' : 'border-gray-600 group-hover:border-gray-400'}`}
                onClick={() => toggleRoomType(type)}
              >
                {filters.roomTypes.includes(type) && <span className="material-symbols-outlined text-white text-xs font-bold">check</span>}
              </div>
              <span className="text-sm text-gray-300">{type} Sharing</span>
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ff8000] text-sm">group</span>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Gender Preference</h4>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {['Male', 'Female'].map(g => (
            <button 
              key={g}
              onClick={() => toggleGender(g)}
              className={`flex items-center justify-between px-4 py-3 text-sm rounded-xl border transition-all ${filters.gender.includes(g) ? 'bg-[#ff8000]/10 border-[#ff8000] text-[#ff8000]' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}`}
            >
              <span>{g}</span>
              {filters.gender.includes(g) && <span className="material-symbols-outlined text-xs">done</span>}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Filters;

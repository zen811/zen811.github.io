
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useRooms } from '../context/RoomContext';
import Filters from '../components/Filters';
import RoomCard from '../components/RoomCard';

const Listings: React.FC = () => {
  const { filteredRooms, filters, setFilters } = useRooms();
  const { setExpandedImage } = useOutletContext<{ setExpandedImage: (url: string | null) => void }>();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-12">
        <Filters filters={filters} setFilters={setFilters} />
        <div className="flex-grow">
          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map(room => (
                <RoomCard key={room.id} room={room} onExpandImage={setExpandedImage} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/2 rounded-3xl border border-white/5">
              <span className="material-symbols-outlined text-6xl text-gray-700 mb-4">search_off</span>
              <p className="text-gray-500 font-bold">No rooms match your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listings;

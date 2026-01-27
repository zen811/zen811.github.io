
import React, { useState, useEffect, useMemo } from 'react';
import { Room, FilterState } from './types';
import { fetchRooms } from './services/dataService';
import Header from './components/Header';
import Filters from './components/Filters';
import RoomCard from './components/RoomCard';
import RoomDetails from './components/RoomDetails';

const App: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [5000, 30000],
    roomTypes: [],
    gender: 'Unisex',
    searchQuery: ''
  });

  useEffect(() => {
    fetchRooms().then(data => {
      setRooms(data);
      setIsLoading(false);
    });
  }, []);

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const matchesPrice = room.price <= filters.priceRange[1];
      const matchesType = filters.roomTypes.length === 0 || filters.roomTypes.includes(room.occupancyType);
      const matchesGender = filters.gender === 'Unisex' || room.genderPreference === filters.gender;
      const matchesSearch = filters.searchQuery === '' || 
        room.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) || 
        room.location.toLowerCase().includes(filters.searchQuery.toLowerCase());
      
      return matchesPrice && matchesType && matchesGender && matchesSearch;
    });
  }, [rooms, filters]);

  const handleSearch = (q: string) => {
    setFilters(prev => ({ ...prev, searchQuery: q }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#181410] flex flex-col items-center justify-center text-white">
        <div className="size-16 mb-4 animate-pulse text-[#ff8000]">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
          </svg>
        </div>
        <p className="text-gray-400 font-medium tracking-widest uppercase text-xs animate-pulse">Loading PG Buddy...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />
      
      <main className="flex-grow">
        {selectedRoom ? (
          <RoomDetails room={selectedRoom} onBack={() => setSelectedRoom(null)} />
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-10">
              {/* Filter Sidebar */}
              <Filters filters={filters} setFilters={setFilters} />
              
              {/* Listings Area */}
              <div className="flex-grow">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Available Accommodations</h2>
                    <p className="text-gray-500 text-sm">Found {filteredRooms.length} results in Bangalore</p>
                  </div>
                  <div className="hidden sm:block">
                    <select className="bg-[#1e1e1e] border-white/10 rounded-lg text-sm text-white px-4 focus:ring-[#ff8000] focus:border-[#ff8000]">
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Highest Rated</option>
                    </select>
                  </div>
                </div>

                {filteredRooms.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRooms.map(room => (
                      <RoomCard key={room.id} room={room} onClick={setSelectedRoom} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-[#1e1e1e] rounded-3xl border border-white/10">
                    <span className="material-symbols-outlined text-6xl text-gray-700 mb-4">search_off</span>
                    <h3 className="text-xl font-bold text-gray-400">No rooms found matching your criteria</h3>
                    <button 
                      onClick={() => setFilters({ priceRange: [5000, 30000], roomTypes: [], gender: 'Unisex', searchQuery: '' })}
                      className="mt-6 text-[#ff8000] font-semibold hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-[#0c0c0c] mt-20 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-[#ff8000] mb-6">
              <div className="size-8">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold">PG Buddy</h2>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed">Making finding and managing PG accommodations simple, safe, and modern for everyone across India. Experience the future of co-living.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="text-sm space-y-4 text-gray-500">
              <li><a className="hover:text-[#ff8000] transition-colors" href="#">Find Rooms</a></li>
              <li><a className="hover:text-[#ff8000] transition-colors" href="#">List Property</a></li>
              <li><a className="hover:text-[#ff8000] transition-colors" href="#">Terms of Service</a></li>
              <li><a className="hover:text-[#ff8000] transition-colors" href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Support</h4>
            <ul className="text-sm space-y-4 text-gray-500">
              <li><a className="hover:text-[#ff8000] transition-colors" href="#">Help Center</a></li>
              <li><a className="hover:text-[#ff8000] transition-colors" href="#">Contact Us</a></li>
              <li><a className="hover:text-[#ff8000] transition-colors" href="#">Refund Policy</a></li>
              <li><a className="hover:text-[#ff8000] transition-colors" href="#">Trust & Safety</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-600">© 2024 PG Buddy. All rights reserved. Built for Play Store deployment.</p>
          <div className="flex gap-6">
            <span className="material-symbols-outlined text-gray-600 hover:text-[#ff8000] cursor-pointer transition-colors">language</span>
            <span className="material-symbols-outlined text-gray-600 hover:text-[#ff8000] cursor-pointer transition-colors">alternate_email</span>
            <span className="material-symbols-outlined text-gray-600 hover:text-[#ff8000] cursor-pointer transition-colors">person_pin_circle</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;


import React, { useState, useEffect, useMemo } from 'react';
import { Room, FilterState } from './types';
import { fetchRooms } from './services/dataService';
import Header from './components/Header';
import Filters from './components/Filters';
import RoomCard from './components/RoomCard';
import RoomDetails from './components/RoomDetails';
import HelpCentre from './components/HelpCentre';
import ContactUs from './components/ContactUs';
import TermsOfService from './components/TermsOfService';

type View = 'listings' | 'details' | 'help' | 'contact' | 'terms';

const App: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [currentView, setCurrentView] = useState<View>('listings');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [5000, 30000],
    roomTypes: [],
    gender: 'Unisex',
    searchQuery: ''
  });

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchRooms();
      setRooms(data);
    } catch (err) {
      setError("Unable to sync with data source.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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
    if (currentView !== 'listings') setCurrentView('listings');
  };

  const navigateToRoom = (room: Room) => {
    setSelectedRoom(room);
    setCurrentView('details');
    window.scrollTo(0, 0);
  };

  const navigateToView = (view: View) => {
    setCurrentView(view);
    setSelectedRoom(null);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#181410] flex flex-col items-center justify-center text-white">
        <div className="size-16 mb-4 animate-pulse text-[#ff8000]">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
          </svg>
        </div>
        <p className="text-gray-400 font-medium tracking-widest uppercase text-xs animate-pulse">Establishing Connection...</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'details':
        return selectedRoom ? <RoomDetails room={selectedRoom} onBack={() => navigateToView('listings')} /> : null;
      case 'help':
        return <HelpCentre onBack={() => navigateToView('listings')} />;
      case 'contact':
        return <ContactUs onBack={() => navigateToView('listings')} />;
      case 'terms':
        return <TermsOfService onBack={() => navigateToView('listings')} />;
      case 'listings':
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-10">
              <Filters filters={filters} setFilters={setFilters} />
              <div className="flex-grow">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Room Listings</h2>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-500 text-sm">
                        {rooms.length === 0 ? 'Connection established, waiting for data...' : `Found ${filteredRooms.length} verified results`}
                      </p>
                      <span className="flex items-center gap-1 text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full border border-green-500/20 font-bold uppercase tracking-tight">
                        <span className="w-1 h-1 bg-green-500 rounded-full animate-ping"></span> Live Sync
                      </span>
                    </div>
                  </div>
                </div>

                {filteredRooms.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {filteredRooms.map(room => (
                      <RoomCard key={room.id} room={room} onClick={navigateToRoom} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-[#1e1e1e] rounded-3xl border border-white/10">
                    <span className="material-symbols-outlined text-6xl text-gray-700 mb-4">cloud_off</span>
                    <h3 className="text-xl font-bold text-gray-400">
                      {rooms.length === 0 ? "No data found or access denied" : "No results match your filters"}
                    </h3>
                    {rooms.length === 0 && (
                      <div className="mt-4 max-w-md mx-auto px-6">
                        <p className="text-sm text-gray-500 mb-6">
                          Please ensure your Google Sheet is <strong>'Published to the web'</strong> and that columns are correctly filled.
                        </p>
                        <button onClick={loadData} className="px-6 py-2 bg-[#ff8000] text-white font-bold rounded-xl hover:bg-[#ff8000]/80 transition-all flex items-center gap-2 mx-auto">
                          <span className="material-symbols-outlined text-sm">refresh</span>
                          Retry Sync
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} onNavigate={navigateToView} />
      
      <main className="flex-grow">
        {renderContent()}
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
            <p className="text-gray-500 max-w-sm leading-relaxed">Direct community sync via Google Forms & Sheets. Secure, transparent, and verified co-living.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white">Quick Links</h4>
            <ul className="text-sm space-y-4 text-gray-500">
              <li><button onClick={() => navigateToView('listings')} className="hover:text-[#ff8000] transition-colors">Find Rooms</button></li>
              <li><a className="hover:text-[#ff8000] transition-colors" href="https://forms.google.com" target="_blank" rel="noopener noreferrer">List Property</a></li>
              <li><button onClick={() => navigateToView('terms')} className="hover:text-[#ff8000] transition-colors">Terms of Service</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white">Support</h4>
            <ul className="text-sm space-y-4 text-gray-500">
              <li><button onClick={() => navigateToView('help')} className="hover:text-[#ff8000] transition-colors">Help Center</button></li>
              <li><button onClick={() => navigateToView('contact')} className="hover:text-[#ff8000] transition-colors">Contact Us</button></li>
              <li><button onClick={() => navigateToView('terms')} className="hover:text-[#ff8000] transition-colors">Trust & Safety</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-600">© 2024 PG Buddy. Verified community listings.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

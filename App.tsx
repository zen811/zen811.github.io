
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
    gender: [], 
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
      
      let matchesGender = true;
      if (filters.gender.length > 0) {
        matchesGender = filters.gender.some(g => {
          if (g === 'Male') return room.genderPreference === 'Male' || room.genderPreference === 'Unisex';
          if (g === 'Female') return room.genderPreference === 'Female' || room.genderPreference === 'Unisex';
          return false;
        });
      }
      
      const matchesSearch = filters.searchQuery === '' || 
        room.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) || 
        room.location.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        room.flatType.toLowerCase().includes(filters.searchQuery.toLowerCase());
      
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
      <div className="min-h-screen bg-[#181410] flex flex-col items-center justify-center text-white p-6">
        <div className="h-24 w-auto mb-8 animate-bounce">
          <img 
            src="./logo.png" 
            alt="PG Buddy Logo" 
            className="h-full object-contain" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://i.ibb.co/3ykXJzV/logo-placeholder.png';
            }} 
          />
        </div>
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-[#ff8000] w-1/2 animate-shimmer"></div>
        </div>
        <p className="text-gray-400 font-medium tracking-widest uppercase text-[10px] animate-pulse">Syncing Community Data...</p>
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
                    <h2 className="text-3xl font-bold mb-2">Verified Listings</h2>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-500 text-sm">
                        Showing {filteredRooms.length} results matching your lifestyle
                      </p>
                      <span className="flex items-center gap-1 text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full border border-green-500/20 font-bold uppercase tracking-tight">
                        Live Sync
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
                    <span className="material-symbols-outlined text-6xl text-gray-700 mb-4">search_off</span>
                    <h3 className="text-xl font-bold text-gray-400">No rooms match these filters</h3>
                    <button 
                      onClick={() => setFilters({ priceRange: [5000, 30000], roomTypes: [], gender: [], searchQuery: '' })}
                      className="mt-6 text-[#ff8000] font-semibold hover:underline"
                    >
                      Reset all filters
                    </button>
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
            <div className="flex items-center gap-2 mb-6">
              <img 
                src="./logo.png" 
                alt="PG Buddy" 
                className="h-10 w-auto" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://i.ibb.co/3ykXJzV/logo-placeholder.png';
                }} 
              />
              <h2 className="text-2xl font-bold text-[#ff8000]">PG Buddy</h2>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed">Direct community sync via Google Forms & Sheets. Secure, transparent, and verified co-living spaces for everyone.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white">Quick Links</h4>
            <ul className="text-sm space-y-4 text-gray-500">
              <li><button onClick={() => navigateToView('listings')} className="hover:text-[#ff8000] transition-colors">Find Rooms</button></li>
              <li><button onClick={() => navigateToView('help')} className="hover:text-[#ff8000] transition-colors">Help Center</button></li>
              <li><button onClick={() => navigateToView('terms')} className="hover:text-[#ff8000] transition-colors">Terms of Service</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white">Contact</h4>
            <ul className="text-sm space-y-4 text-gray-500">
              <li><button onClick={() => navigateToView('contact')} className="hover:text-[#ff8000] transition-colors underline decoration-[#ff8000]/20">cupcake811hk@gmail.com</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/5">
          <p className="text-[10px] text-gray-700 uppercase tracking-[0.2em] font-black">Powered by Community Trust</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

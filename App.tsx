
import React, { useState, useEffect, useMemo } from 'react';
import { Room, FilterState, View } from './types';
import { fetchRooms } from './services/dataService';
import Header from './components/Header';
import Filters from './components/Filters';
import RoomCard from './components/RoomCard';
import RoomDetails from './components/RoomDetails';
import HelpCentre from './components/HelpCentre';
import ContactUs from './components/ContactUs';
import TermsOfService from './components/TermsOfService';
import LandingPage from './components/LandingPage';

const LIST_PROPERTY_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfnlEk8iCcgoU9uCJzbQ819ymUQTAQTIuoKpUfzfSucov0hTg/viewform?usp=sharing'; 
const ENQUIRY_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScGf72h7DSjeSOFjR-f8J3ww8FfeHo0rUwKexeSE9-pPJarxQ/viewform?usp=publish-editor';

// Haversine formula for distance calculation
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const App: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [currentView, setCurrentView] = useState<View>('home');
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [5000, 30000],
    roomTypes: [],
    gender: [], 
    searchQuery: '',
    nearMe: false
  });

  const loadData = async () => {
    setIsLoading(true);
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
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      }, (err) => console.log("Location access denied."));
    }
  }, []);

  const filteredRooms = useMemo(() => {
    let result = rooms.filter(room => {
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

    if (filters.nearMe && userLocation) {
      result = result.map(room => ({
        ...room,
        distance: room.coordinates ? calculateDistance(userLocation.lat, userLocation.lng, room.coordinates.lat, room.coordinates.lng) : 999
      }));
      result.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return result;
  }, [rooms, filters, userLocation]);

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
        <div className="h-16 w-16 mb-8 animate-pulse">
          <img 
            src="logo.png" 
            alt="Logo" 
            className="h-full w-full object-contain" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://i.ibb.co/3ykXJzV/logo-placeholder.png';
            }} 
          />
        </div>
        <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs">Syncing PG Buddy...</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <LandingPage 
            onBrowse={() => navigateToView('listings')} 
            onListProperty={() => window.open(LIST_PROPERTY_FORM_URL, '_blank')}
            featuredRooms={rooms.filter(r => r.featured)}
            onRoomClick={navigateToRoom}
          />
        );
      case 'details':
        return selectedRoom ? <RoomDetails room={selectedRoom} onBack={() => navigateToView('listings')} /> : null;
      case 'help':
        return <HelpCentre onBack={() => navigateToView('home')} />;
      case 'contact':
        return <ContactUs onBack={() => navigateToView('home')} />;
      case 'terms':
        return <TermsOfService onBack={() => navigateToView('home')} />;
      case 'listings':
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 py-8 mt-10">
            <div className="flex flex-col md:flex-row gap-10">
              <Filters filters={filters} setFilters={setFilters} />
              <div className="flex-grow">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      {filters.nearMe ? 'Rooms Near You' : 'Verified Listings'}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Showing {filteredRooms.length} rooms matching your search
                    </p>
                  </div>
                </div>

                {filteredRooms.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRooms.map(room => (
                      <div key={room.id} className="relative">
                        <RoomCard room={room} onClick={navigateToRoom} />
                        {room.distance && room.distance < 900 && (
                          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-white border border-white/10 z-10 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px] text-[#ff8000]">near_me</span>
                            {room.distance.toFixed(1)} km
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-[#1e1e1e] rounded-3xl border border-white/10">
                    <span className="material-symbols-outlined text-6xl text-gray-700 mb-4">search_off</span>
                    <h3 className="text-xl font-bold text-gray-400">No rooms found</h3>
                    <button 
                      onClick={() => setFilters({ priceRange: [5000, 30000], roomTypes: [], gender: [], searchQuery: '', nearMe: false })}
                      className="mt-6 text-[#ff8000] font-semibold hover:underline"
                    >
                      Clear all filters
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
    <div className="min-h-screen flex flex-col bg-[#181410] text-white">
      <Header 
        onSearch={handleSearch} 
        onNavigate={navigateToView}
        enquiryFormUrl={ENQUIRY_FORM_URL}
      />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <footer className="bg-[#0c0c0c] mt-20 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <img 
                src="logo.png" 
                alt="PG Buddy" 
                className="h-8 w-auto" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://i.ibb.co/3ykXJzV/logo-placeholder.png';
                }} 
              />
              <h2 className="text-2xl font-bold text-[#ff8000]">PG Buddy</h2>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed mb-8">
              Making PG hunting effortless for students and young professionals across India. 
              Verified listings, community-driven data.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-8 text-sm uppercase tracking-widest text-white">Quick Links</h4>
            <ul className="text-sm space-y-4 text-gray-500">
              <li><button onClick={() => navigateToView('listings')} className="hover:text-[#ff8000] transition-colors">Browse PGs</button></li>
              <li><a href={LIST_PROPERTY_FORM_URL} target="_blank" className="hover:text-[#ff8000] transition-colors">Post a Listing</a></li>
              <li><button onClick={() => navigateToView('help')} className="hover:text-[#ff8000] transition-colors">Safety Guide</button></li>
              <li><button onClick={() => navigateToView('terms')} className="hover:text-[#ff8000] transition-colors">Refund Policy</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 text-sm uppercase tracking-widest text-white">Support</h4>
            <ul className="text-sm space-y-4 text-gray-500">
              <li><button onClick={() => navigateToView('help')} className="hover:text-[#ff8000] transition-colors">Help Center</button></li>
              <li><button onClick={() => navigateToView('contact')} className="hover:text-[#ff8000] transition-colors">Contact Us</button></li>
              <li><button onClick={() => navigateToView('terms')} className="hover:text-[#ff8000] transition-colors">Terms of Service</button></li>
              <li><button onClick={() => navigateToView('terms')} className="hover:text-[#ff8000] transition-colors">Privacy Policy</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">© 2024 <span className="text-[#ff8000]">PG Buddy</span> Technologies Pvt Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

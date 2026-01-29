
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
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.pgbuddy.app';

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
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
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [5000, 30000],
    roomTypes: [],
    gender: [], 
    searchQuery: '',
    nearMe: false
  });

  // Routing Logic
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      window.scrollTo(0, 0);

      if (hash.startsWith('#/details/')) {
        const id = hash.replace('#/details/', '');
        setSelectedRoomId(id);
        setCurrentView('details');
      } else if (hash === '#/listings') {
        setCurrentView('listings');
      } else if (hash === '#/about') {
        setCurrentView('help');
      } else if (hash === '#/contact') {
        setCurrentView('contact');
      } else if (hash === '#/terms') {
        setCurrentView('terms');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchRooms();
      setRooms(data);
    } catch (err) {
      console.error("Unable to sync with data source.");
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
      
      const q = filters.searchQuery.toLowerCase();
      const matchesSearch = q === '' || 
        room.name.toLowerCase().includes(q) || 
        room.location.toLowerCase().includes(q) ||
        room.flatType.toLowerCase().includes(q) ||
        room.occupancyType.toLowerCase().includes(q) ||
        room.genderPreference.toLowerCase().includes(q) ||
        room.description.toLowerCase().includes(q);
      
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
    if (!window.location.hash.includes('listings')) {
        window.location.hash = '#/listings';
    }
  };

  const navigateToView = (view: View) => {
    switch (view) {
      case 'home': window.location.hash = '#/'; break;
      case 'listings': window.location.hash = '#/listings'; break;
      case 'help': window.location.hash = '#/about'; break;
      case 'contact': window.location.hash = '#/contact'; break;
      case 'terms': window.location.hash = '#/terms'; break;
    }
  };

  const selectedRoom = useMemo(() => 
    rooms.find(r => r.id === selectedRoomId) || null
  , [rooms, selectedRoomId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#181410] flex flex-col items-center justify-center text-white p-6">
        <div className="h-24 w-24 mb-8 flex items-center justify-center bg-white/5 rounded-[40px] border border-white/5 p-4 animate-bounce relative">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-full w-full object-contain relative z-10" 
            onError={(e) => (e.target as HTMLImageElement).style.opacity = '0'}
          />
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-black text-primary z-0 opacity-50">PB</span>
        </div>
        <p className="text-gray-500 font-black uppercase tracking-[0.4em] text-[10px]">Syncing Premium Data...</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <LandingPage 
            onBrowse={() => window.location.hash = '#/listings'} 
            onListProperty={() => window.open(LIST_PROPERTY_FORM_URL, '_blank')}
            featuredRooms={rooms.filter(r => r.featured)}
            onRoomClick={(room) => window.location.hash = `#/details/${room.id}`}
          />
        );
      case 'details':
        return selectedRoom ? <RoomDetails room={selectedRoom} onBack={() => window.history.back()} /> : <div className="p-20 text-center">Room not found</div>;
      case 'help':
        return <HelpCentre onBack={() => window.history.back()} />;
      case 'contact':
        return <ContactUs onBack={() => window.history.back()} />;
      case 'terms':
        return <TermsOfService onBack={() => window.history.back()} />;
      case 'listings':
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 py-8 mt-10 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row gap-16">
              <Filters filters={filters} setFilters={setFilters} />
              <div className="flex-grow">
                {/* Search Bar for Listings Page */}
                <div className="mb-12">
                   <div className="bg-white/5 p-2 rounded-[32px] border border-white/10 flex items-center gap-2 shadow-2xl focus-within:border-primary/40 transition-all">
                      <div className="flex-grow flex items-center gap-4 px-6 py-4">
                        <span className="material-symbols-outlined text-primary text-2xl">search</span>
                        <input 
                          type="text" 
                          value={filters.searchQuery}
                          onChange={(e) => setFilters(prev => ({...prev, searchQuery: e.target.value}))}
                          placeholder="Search Location, Gender, or Specifics..." 
                          className="bg-transparent border-none focus:ring-0 text-base w-full text-white placeholder:text-gray-500 font-medium"
                        />
                      </div>
                      <button 
                        className="px-8 py-4 bg-primary text-white font-black rounded-[24px] hover:bg-primary/90 transition-all uppercase tracking-widest text-xs"
                      >
                        Search
                      </button>
                   </div>
                </div>

                <div className="flex justify-between items-end mb-10">
                  <div>
                    <h2 className="text-4xl font-black mb-2 tracking-tight">
                      {filters.nearMe ? 'Rooms Near You' : 'Verified Listings'}
                    </h2>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                      Showing {filteredRooms.length} Curated Properties
                    </p>
                  </div>
                </div>

                {filteredRooms.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRooms.map(room => (
                      <div key={room.id} className="relative">
                        <RoomCard room={room} onClick={(r) => window.location.hash = `#/details/${r.id}`} />
                        {room.distance && room.distance < 900 && (
                          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-white border border-white/10 z-10 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-primary filled">near_me</span>
                            {room.distance.toFixed(1)} KM AWAY
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-32 bg-white/5 rounded-[40px] border border-white/5 shadow-2xl">
                    <span className="material-symbols-outlined text-7xl text-gray-800 mb-6 block">search_off</span>
                    <h3 className="text-2xl font-bold text-gray-400 mb-4 tracking-tight">No rooms found</h3>
                    <p className="text-gray-600 mb-10 max-w-sm mx-auto text-sm font-medium leading-relaxed">We couldn't find matches for your current search criteria. Try broadening your location or budget.</p>
                    <button 
                      onClick={() => setFilters({ priceRange: [5000, 30000], roomTypes: [], gender: [], searchQuery: '', nearMe: false })}
                      className="px-8 py-4 bg-primary/10 text-primary font-black rounded-2xl hover:bg-primary/20 transition-all uppercase tracking-widest text-xs"
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
    <div className="min-h-screen flex flex-col bg-[#181410] text-white selection:bg-primary selection:text-white">
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
            <div className="flex items-center gap-3 mb-8">
              <div 
                className="h-10 w-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/5 p-1 relative cursor-pointer"
                onClick={() => window.location.hash = '#/'}
              >
                <img 
                  src="/logo.png" 
                  alt="PG Buddy Logo" 
                  className="h-full w-auto relative z-10" 
                  onError={(e) => (e.target as HTMLImageElement).style.opacity = '0'}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-primary z-0 opacity-50">PB</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-primary cursor-pointer" onClick={() => window.location.hash = '#/'}>PG Buddy</h2>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed mb-8 text-sm font-medium">
              Making PG hunting effortless for students and young professionals across India. 
              Verified listings, community-driven data.
            </p>
            
            <div className="mt-10 p-8 bg-white/5 rounded-[32px] border border-white/5 max-w-sm">
              <h4 className="text-[10px] font-black text-white mb-3 uppercase tracking-[0.2em]">Available on Play Store</h4>
              <p className="text-[11px] text-gray-500 mb-8 leading-relaxed font-medium">Experience the full power of PG Buddy with our native mobile application.</p>
              <button 
                onClick={() => window.open(PLAY_STORE_URL, '_blank')}
                className="flex items-center gap-3 transition-all hover:opacity-80 active:scale-95"
              >
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-12 w-auto" 
                />
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-black mb-8 text-[10px] uppercase tracking-[0.2em] text-white/50">Discovery</h4>
            <ul className="text-sm space-y-4 text-gray-500 font-bold">
              <li><button onClick={() => window.location.hash = '#/listings'} className="hover:text-primary transition-colors">Browse PGs</button></li>
              <li><a href={LIST_PROPERTY_FORM_URL} target="_blank" className="hover:text-primary transition-colors">Post a Listing</a></li>
              <li><button onClick={() => window.location.hash = '#/about'} className="hover:text-primary transition-colors">Safety Guide</button></li>
              <li><button onClick={() => window.location.hash = '#/terms'} className="hover:text-primary transition-colors">Refund Policy</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-8 text-[10px] uppercase tracking-[0.2em] text-white/50">Company</h4>
            <ul className="text-sm space-y-4 text-gray-500 font-bold">
              <li><button onClick={() => window.location.hash = '#/about'} className="hover:text-primary transition-colors">Help Center</button></li>
              <li><button onClick={() => window.location.hash = '#/contact'} className="hover:text-primary transition-colors">Contact Us</button></li>
              <li><button onClick={() => window.location.hash = '#/terms'} className="hover:text-primary transition-colors">Terms of Service</button></li>
              <li><button onClick={() => window.location.hash = '#/terms'} className="hover:text-primary transition-colors">Privacy Policy</button></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-10 border-t border-white/5 text-center">
          <p className="text-[10px] text-gray-600 tracking-[0.3em] font-black uppercase">
            © 2024 PG Buddy • Premium Housing Discovery
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

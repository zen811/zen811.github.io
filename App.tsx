
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
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [savedRoomIds, setSavedRoomIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('pgbuddy_saved_rooms');
    return saved ? JSON.parse(saved) : [];
  });
  const [toast, setToast] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [5000, 30000],
    roomTypes: [],
    gender: [], 
    searchQuery: '',
    nearMe: false
  });

  useEffect(() => {
    localStorage.setItem('pgbuddy_saved_rooms', JSON.stringify(savedRoomIds));
  }, [savedRoomIds]);

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
      } else if (hash === '#/saved') {
        setCurrentView('saved');
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
    handleHashChange();

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
      const matchesGender = filters.gender.length === 0 || filters.gender.includes(room.genderPreference) || room.genderPreference === 'Unisex';
      
      const q = filters.searchQuery.toLowerCase();
      const matchesSearch = q === '' || 
        room.name.toLowerCase().includes(q) || 
        room.location.toLowerCase().includes(q);
      
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

  const savedRooms = useMemo(() => 
    rooms.filter(r => savedRoomIds.includes(r.id))
  , [rooms, savedRoomIds]);

  const toggleSave = (id: string) => {
    setSavedRoomIds(prev => 
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  const handleShare = (room: Room) => {
    const shareUrl = `${window.location.origin}/#/details/${room.id}`;
    if (navigator.share) {
      navigator.share({
        title: room.name,
        text: `Check out this PG on PG Buddy: ${room.name} in ${room.location}`,
        url: shareUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      setToast("Link copied to clipboard!");
      setTimeout(() => setToast(null), 3000);
    }
  };

  const navigateToView = (view: View) => {
    window.location.hash = `#/${view === 'home' ? '' : view}`;
  };

  const selectedRoom = useMemo(() => 
    rooms.find(r => r.id === selectedRoomId) || null
  , [rooms, selectedRoomId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#181410] flex flex-col items-center justify-center text-white p-6">
        <div className="h-16 w-16 mb-6 flex items-center justify-center bg-white/5 rounded-2xl border border-white/5 animate-pulse">
          <span className="text-primary font-black">PB</span>
        </div>
        <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Syncing Listings...</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <LandingPage 
            onBrowse={() => window.location.hash = '#/listings'} 
            onSearch={(q) => {
              setFilters(prev => ({ ...prev, searchQuery: q }));
              window.location.hash = '#/listings';
            }}
            onListProperty={() => window.open(LIST_PROPERTY_FORM_URL, '_blank')}
            featuredRooms={rooms.filter(r => r.featured)}
            onRoomClick={(room) => window.location.hash = `#/details/${room.id}`}
            onExpandImage={setExpandedImage}
          />
        );
      case 'details':
        return selectedRoom ? (
          <RoomDetails 
            room={selectedRoom} 
            onBack={() => window.history.back()} 
            onExpandImage={setExpandedImage}
            onSave={() => toggleSave(selectedRoom.id)}
            onShare={() => handleShare(selectedRoom)}
            isSaved={savedRoomIds.includes(selectedRoom.id)}
          />
        ) : (
          <div className="p-20 text-center text-gray-500 font-bold">Listing not found</div>
        );
      case 'saved':
        return (
          <div className="max-w-7xl mx-auto px-5 py-12 animate-in fade-in duration-500">
            <h1 className="text-4xl font-black mb-2 tracking-tighter">Saved Rooms</h1>
            <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-12">
              {savedRooms.length} bookmarked properties
            </p>
            {savedRooms.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {savedRooms.map(room => (
                  <RoomCard key={room.id} room={room} onClick={(r) => window.location.hash = `#/details/${r.id}`} onExpandImage={setExpandedImage} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/2 rounded-3xl border border-white/5">
                <span className="material-symbols-outlined text-6xl text-gray-700 mb-4">bookmark_border</span>
                <p className="text-gray-500 font-bold">You haven't saved any rooms yet.</p>
                <button onClick={() => window.location.hash = '#/listings'} className="mt-6 text-primary font-black uppercase tracking-widest text-xs">Explore listings</button>
              </div>
            )}
          </div>
        );
      case 'help': return <HelpCentre onBack={() => window.location.hash = '#/'} />;
      case 'contact': return <ContactUs onBack={() => window.location.hash = '#/'} />;
      case 'terms': return <TermsOfService onBack={() => window.location.hash = '#/'} />;
      case 'listings':
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 py-8 mt-4 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row gap-12">
              <Filters filters={filters} setFilters={setFilters} />
              <div className="flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRooms.map(room => (
                    <RoomCard key={room.id} room={room} onClick={(r) => window.location.hash = `#/details/${r.id}`} onExpandImage={setExpandedImage} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#181410] text-white">
      <Header onNavigate={navigateToView} enquiryFormUrl={ENQUIRY_FORM_URL} onSearch={() => {}} />
      
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] bg-primary text-white px-6 py-3 rounded-2xl shadow-2xl font-black text-xs uppercase tracking-widest animate-toast">
          {toast}
        </div>
      )}

      {expandedImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" onClick={() => setExpandedImage(null)}>
          <img src={expandedImage} className="max-w-full max-h-full object-contain rounded-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <main className="flex-grow">{renderContent()}</main>
    </div>
  );
};

export default App;

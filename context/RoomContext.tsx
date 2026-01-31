import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Room, FilterState } from '../types';
import { fetchRooms } from '../services/dataService';

interface RoomContextType {
  rooms: Room[];
  isLoading: boolean;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  savedRoomIds: string[];
  toggleSave: (id: string) => void;
  userLocation: { lat: number; lng: number } | null;
  filteredRooms: Room[];
  featuredRooms: Room[];
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const useRooms = () => {
  const context = useContext(RoomContext);
  if (!context) throw new Error('useRooms must be used within a RoomProvider');
  return context;
};

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [savedRoomIds, setSavedRoomIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pgbuddy_saved_rooms');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

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

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRooms();
        setRooms(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Data fetch failed:", err);
        setRooms([]);
      } finally {
        setIsLoading(false);
      }
    };
    load();

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          console.warn("Geolocation denied or failed:", err);
        }
      );
    }
  }, []);

  const toggleSave = (id: string) => {
    setSavedRoomIds(prev => prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]);
  };

  const filteredRooms = useMemo(() => {
    if (!Array.isArray(rooms)) return [];
    
    let result = [...rooms];
    result = result.filter(room => {
      const matchesPrice = room.price <= filters.priceRange[1];
      const matchesType = filters.roomTypes.length === 0 || filters.roomTypes.includes(room.occupancyType);
      
      const genderQuery = filters.gender[0];
      const matchesGender = !genderQuery || 
                           room.genderPreference === genderQuery || 
                           room.genderPreference === 'Unisex';
      
      const q = filters.searchQuery.toLowerCase();
      const matchesSearch = q === '' || 
                           room.name.toLowerCase().includes(q) || 
                           room.location.toLowerCase().includes(q);
                           
      return matchesPrice && matchesType && matchesGender && matchesSearch;
    });

    if (filters.nearMe && userLocation) {
      result = result.map(room => ({
        ...room,
        distance: room.coordinates ? calculateDistance(userLocation.lat, userLocation.lng, room.coordinates.lat, room.coordinates.lng) : 9999
      }));
    }

    result.sort((a, b) => {
      // Primary sort: Availability
      if (a.isAvailable !== b.isAvailable) return a.isAvailable ? -1 : 1;
      
      // Secondary sort: Distance if requested
      if (filters.nearMe && userLocation) {
        return (a.distance || 9999) - (b.distance || 9999);
      }
      
      // Tertiary sort: Price (lowest first)
      return a.price - b.price;
    });

    return result;
  }, [rooms, filters, userLocation]);

  const featuredRooms = useMemo(() => {
    if (!Array.isArray(rooms)) return [];
    return rooms
      .filter(r => r.featured)
      .sort((a, b) => (a.isAvailable === b.isAvailable ? 0 : a.isAvailable ? -1 : 1));
  }, [rooms]);

  return (
    <RoomContext.Provider value={{ 
      rooms, isLoading, filters, setFilters, savedRoomIds, toggleSave, userLocation, filteredRooms, featuredRooms 
    }}>
      {children}
    </RoomContext.Provider>
  );
};
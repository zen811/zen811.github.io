
export interface Room {
  id: string;
  name: string;
  ownerName: string;
  phoneNumber: string;
  price: number;
  location: string;
  locationLink: string;
  description: string;
  occupancyType: 'Single' | 'Double' | 'Triple';
  genderPreference: 'Male' | 'Female' | 'Unisex';
  flatType: string;
  photos: string[];
  amenities: string[];
  rules: string[];
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  featured?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  distance?: number; // Distance in km from user
}

// Added missing User interface to fix "Module '"../types"' has no exported member 'User'" error
export interface User {
  name: string;
  phoneNumber: string;
  password?: string;
  avatar?: string;
}

export interface FilterState {
  priceRange: [number, number];
  roomTypes: string[];
  gender: string[];
  searchQuery: string;
  nearMe: boolean;
}

export type View = 'home' | 'listings' | 'details' | 'help' | 'contact' | 'terms';


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
  photos: string[];
  amenities: string[];
  rules: string[];
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  featured?: boolean;
}

export interface FilterState {
  priceRange: [number, number];
  roomTypes: string[];
  gender: string;
  searchQuery: string;
}

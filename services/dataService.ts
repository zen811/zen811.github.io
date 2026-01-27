
import { Room } from '../types';

/**
 * In a real production scenario, you would fetch from a Google Sheet 
 * published as a CSV or via a small Google Apps Script API.
 * 
 * Example: fetch('https://docs.google.com/spreadsheets/d/ID/gviz/tq?tqx=out:json')
 */

const MOCK_ROOMS: Room[] = [
  {
    id: '1',
    name: 'Premium Single Occupancy - Sector 45',
    ownerName: 'Rahul Sharma',
    phoneNumber: '+91 9876543210',
    price: 15000,
    location: 'HSR Layout, Sector 45, Bangalore',
    locationLink: 'https://maps.google.com/?q=HSR+Layout+Sector+45',
    description: 'Experience premium living in the heart of Sector 45. This single occupancy room is designed for working professionals and students who value privacy and comfort. The room comes fully furnished with a king-sized bed, ergonomic workstation, and ample storage space.',
    occupancyType: 'Single',
    genderPreference: 'Male',
    photos: [
      'https://picsum.photos/id/20/800/600',
      'https://picsum.photos/id/21/800/600',
      'https://picsum.photos/id/22/800/600',
      'https://picsum.photos/id/23/800/600',
      'https://picsum.photos/id/24/800/600',
    ],
    amenities: ['High-speed Wi-Fi', 'Air Conditioning', 'Daily Laundry', '3 Meals Provided', '24/7 Power Backup', 'Housekeeping'],
    rules: ['No Smoking', 'No Pets', 'Visitors till 9 PM', 'Quiet Hours after 11 PM'],
    rating: 4.8,
    reviewsCount: 124,
    isVerified: true,
    featured: true
  },
  {
    id: '2',
    name: 'Luxury Double Sharing - Koramangala',
    ownerName: 'Priya Verma',
    phoneNumber: '+91 8887776665',
    price: 12500,
    location: '5th Block, Koramangala, Bangalore',
    locationLink: 'https://maps.google.com/?q=Koramangala+5th+Block',
    description: 'Spacious double sharing room in a vibrant neighborhood. Perfect for friends or siblings. Close to top tech parks and entertainment zones.',
    occupancyType: 'Double',
    genderPreference: 'Female',
    photos: [
      'https://picsum.photos/id/30/800/600',
      'https://picsum.photos/id/31/800/600',
      'https://picsum.photos/id/32/800/600',
    ],
    amenities: ['Wi-Fi', 'Fridge', 'Parking', 'Kitchen Access'],
    rules: ['No Alcohol', 'Veg Only Kitchen'],
    rating: 4.5,
    reviewsCount: 89,
    isVerified: true
  },
  {
    id: '3',
    name: 'Budget Triple Sharing - Whitefield',
    ownerName: 'Amit Gupta',
    phoneNumber: '+91 7776665554',
    price: 8000,
    location: 'Near ITPL Back Gate, Whitefield, Bangalore',
    locationLink: 'https://maps.google.com/?q=ITPL+Whitefield',
    description: 'Affordable and clean triple sharing accommodation for freshers working in ITPL. All basic facilities provided at an unbeatable price.',
    occupancyType: 'Triple',
    genderPreference: 'Male',
    photos: [
      'https://picsum.photos/id/40/800/600',
      'https://picsum.photos/id/41/800/600',
      'https://picsum.photos/id/42/800/600',
    ],
    amenities: ['Wi-Fi', 'Common TV', 'Laundry Service', 'Security'],
    rules: ['Curfew at 10:30 PM'],
    rating: 4.2,
    reviewsCount: 56,
    isVerified: false
  }
];

export const fetchRooms = async (): Promise<Room[]> => {
  // Simulating network latency
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ROOMS);
    }, 500);
  });
};

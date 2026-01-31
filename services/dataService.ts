
import { Room } from '../types';

const SHEET_ID = '1bJbWy_tJDTFStTDDKc6MAkeAIEOQhicGyS4t2o16UD0';
const GID = '1313399102';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;

const MOCK_COORDS: Record<string, { lat: number, lng: number }> = {
  'Koramangala': { lat: 12.9352, lng: 77.6245 },
  'HSR Layout': { lat: 12.9121, lng: 77.6446 },
  'Indiranagar': { lat: 12.9719, lng: 77.6412 },
  'Whitefield': { lat: 12.9698, lng: 77.7500 },
  'BTM Layout': { lat: 12.9166, lng: 77.6101 },
  'Jayanagar': { lat: 12.9308, lng: 77.5838 },
};

/**
 * Transforms Google Drive links into direct, mobile-friendly CDN URLs.
 * Uses lh3.googleusercontent.com which bypasses many mobile-specific cross-origin 
 * and tracking blocks that affect standard drive.google.com/thumbnail links.
 */
const transformDriveUrl = (url: string): string => {
  if (!url || typeof url !== 'string') return '';
  const trimmedUrl = url.trim();
  
  // Capture ID from various formats: /d/ID, ?id=ID, /file/d/ID/view, or just a raw ID
  const driveMatch = trimmedUrl.match(/(?:id=|d\/|open\?id=|^)([\w-]{25,45})(?:[/?&]|$)/);
  
  if (driveMatch) {
    const fileId = driveMatch[1];
    return `https://lh3.googleusercontent.com/d/${fileId}=w1200`;
  }
  
  return trimmedUrl;
};

export const fetchRooms = async (): Promise<Room[]> => {
  try {
    const response = await fetch(SHEET_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const text = await response.text();
    // Regex matches the JSON payload inside the google visualization response wrapper
    const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
    if (!match || !match[1]) return [];

    let jsonData;
    try {
        jsonData = JSON.parse(match[1]);
    } catch (e) {
        console.error("Failed to parse sheet JSON", e);
        return [];
    }

    const rows = jsonData?.table?.rows;
    if (!rows || !Array.isArray(rows)) return [];

    const FALLBACK_IMG = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200&h=675';

    // Added explicit return type Room | null to the map callback to resolve the type predicate mismatch in the following filter.
    return rows.map((row: any, index: number): Room | null => {
      const cols = row?.c;
      if (!cols || !Array.isArray(cols)) return null;

      const getValue = (idx: number) => cols[idx]?.v ?? '';
      const getNum = (idx: number) => {
        const val = cols[idx]?.v;
        if (typeof val === 'number') return val;
        if (typeof val === 'string') return parseFloat(val.replace(/[^0-9.]/g, '')) || 0;
        return 0;
      };

      const verificationStatus = getValue(13);
      const isVerified = Number(verificationStatus) === 1 || String(verificationStatus).toLowerCase() === 'true';
      
      // Availability is index 17 (Column 18)
      const availabilityValue = getNum(17);
      const isAvailable = availabilityValue !== 0;

      const rawPhotoString = String(getValue(10) || '');
      const rawPhotos = rawPhotoString
        .split(/[,\s\n|]+/)
        .map(p => p.trim())
        .filter(p => p.length > 10);
        
      const transformedPhotos = rawPhotos.map(transformDriveUrl).filter(p => p !== '');
      const location = String(getValue(5) || 'Bangalore');
      
      const manualRating = getNum(16);
      const manualReviews = getNum(15);

      let flatType = String(getValue(14) || 'Verified PG');
      if (flatType.includes('@')) flatType = 'Premium PG';

      let coords = undefined;
      for (const [key, value] of Object.entries(MOCK_COORDS)) {
        if (location.toLowerCase().includes(key.toLowerCase())) {
          coords = value;
          break;
        }
      }

      return {
        id: `pg-${index}`,
        name: String(getValue(1) || 'Premium Accommodation'),
        ownerName: String(getValue(2) || 'Verified Partner'),
        phoneNumber: String(getValue(3) || 'N/A'),
        price: getNum(4),
        location,
        locationLink: String(getValue(6) || '#'),
        description: String(getValue(7) || 'Contact owner for more details.'),
        occupancyType: (getValue(8) as any) || 'Single',
        genderPreference: (getValue(9) as any) || 'Unisex',
        flatType, 
        photos: transformedPhotos.length > 0 ? transformedPhotos : [FALLBACK_IMG],
        amenities: String(getValue(11)).split(',').map(a => a.trim()).filter(a => a.length > 0),
        rules: String(getValue(12)).split(',').map(r => r.trim()).filter(r => r.length > 0),
        rating: manualRating > 0 ? manualRating : 3.0, 
        reviewsCount: manualReviews > 0 ? manualReviews : 15,
        isVerified,
        isAvailable,
        coordinates: coords,
        featured: index % 5 === 0
      };
    }).filter((room): room is Room => room !== null && room.isVerified === true);
  } catch (error) {
    console.error("Error fetching room data:", error);
    return [];
  }
};


import { Room } from '../types';

const SHEET_ID = '1bJbWy_tJDTFStTDDKc6MAkeAIEOQhicGyS4t2o16UD0';
const GID = '1313399102';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;

/**
 * Converts Google Drive "open?id=" or "file/d/..." links into direct image URLs.
 * Direct images are served via https://lh3.googleusercontent.com/d/{FILE_ID}
 */
const transformDriveUrl = (url: string): string => {
  if (!url) return '';
  const driveMatch = url.match(/(?:id=|d\/|open\?id=)([\w-]+)/);
  if (driveMatch && (url.includes('drive.google.com') || url.includes('docs.google.com'))) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
  }
  return url;
};

export const fetchRooms = async (): Promise<Room[]> => {
  try {
    const response = await fetch(SHEET_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
    
    if (!match || !match[1]) {
      console.error("Format error: Ensure the sheet is 'Published to the web'.");
      return [];
    }

    const jsonData = JSON.parse(match[1]);
    
    if (jsonData.status === 'error') {
      console.error("API error:", jsonData.errors);
      return [];
    }

    const rows = jsonData.table.rows;
    if (!rows || rows.length === 0) return [];

    return rows.map((row: any, index: number) => {
      const cols = row.c;
      
      const getValue = (idx: number) => cols[idx]?.v ?? '';
      const getNum = (idx: number) => {
        const val = cols[idx]?.v;
        if (typeof val === 'number') return val;
        if (typeof val === 'string') return parseFloat(val.replace(/[^0-9.]/g, '')) || 0;
        return 0;
      };

      const verificationStatus = getValue(13);
      const isVerified = Number(verificationStatus) === 1 || String(verificationStatus).toLowerCase() === 'true';

      // Photos are often comma-separated links in the sheet
      const rawPhotos = String(getValue(10))
        .split(/[,|\s\n]+/) // Split by comma, pipe, space or newline
        .map(p => p.trim())
        .filter(p => p.length > 0);

      const transformedPhotos = rawPhotos.map(transformDriveUrl);

      return {
        id: `room-${index}-${Date.now()}`,
        name: String(getValue(1) || 'Premium Accommodation'),
        ownerName: String(getValue(2) || 'Verified Partner'),
        phoneNumber: String(getValue(3) || 'N/A'),
        price: getNum(4),
        location: String(getValue(5) || 'Bangalore'),
        locationLink: String(getValue(6) || '#'),
        description: String(getValue(7) || 'Contact owner for more details about this property.'),
        occupancyType: (getValue(8) as any) || 'Single',
        genderPreference: (getValue(9) as any) || 'Unisex',
        photos: transformedPhotos.length > 0 ? transformedPhotos : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'],
        amenities: String(getValue(11)).split(',').map(a => a.trim()).filter(a => a.length > 0),
        rules: String(getValue(12)).split(',').map(r => r.trim()).filter(r => r.length > 0),
        rating: 4.5,
        reviewsCount: Math.floor(Math.random() * 50) + 10,
        isVerified: isVerified,
      };
    }).filter((room: Room) => room.isVerified === true);

  } catch (error) {
    console.error("Error fetching room data:", error);
    return [];
  }
};

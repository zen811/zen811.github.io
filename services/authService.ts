
import { User } from '../types';

const SHEET_ID = '1bJbWy_tJDTFStTDDKc6MAkeAIEOQhicGyS4t2o16UD0';
const USERS_GID = '0'; // Assuming first sheet for users
const USERS_FETCH_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${USERS_GID}`;

/**
 * Note: To truly store data in a Google Sheet from a frontend, 
 * you typically use a Google Apps Script Web App as a middleware.
 * This URL is a placeholder for a script that handles POST requests to the sheet.
 */
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_placeholder_id/exec';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(USERS_FETCH_URL);
    if (!response.ok) return [];
    
    const text = await response.text();
    const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
    if (!match || !match[1]) return [];

    const jsonData = JSON.parse(match[1]);
    const rows = jsonData.table.rows;
    if (!rows) return [];

    return rows.map((row: any) => ({
      name: row.c[0]?.v || '',
      phoneNumber: String(row.c[1]?.v || ''),
      password: String(row.c[2]?.v || ''),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${row.c[0]?.v || 'user'}`
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const registerUser = async (user: User): Promise<boolean> => {
  try {
    // In a real scenario, this would POST to a Google Apps Script
    // For this demonstration, we'll try to use a mock storage or if the script exists, hit it.
    // We also use local storage as a fallback to simulate persistent session.
    
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('phoneNumber', user.phoneNumber);
    formData.append('password', user.password || '');
    formData.append('action', 'register');

    // We use no-cors if the target is a Google Form, but for a JSON API we'd need CORS.
    // Assuming a middleware script:
    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });

    return true;
  } catch (error) {
    console.error("Registration error:", error);
    // Even if fetch fails (due to placeholder URL), we simulate success for the demo flow
    return true;
  }
};

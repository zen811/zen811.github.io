
import React from 'react';

interface HeaderProps {
  onSearch: (q: string) => void;
  onNavigate: (view: 'home' | 'listings' | 'help' | 'contact' | 'terms') => void;
  enquiryFormUrl: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, enquiryFormUrl }) => {
  const handleFindRoom = () => {
    window.open(enquiryFormUrl, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#181410]/95 backdrop-blur-md border-b border-white/5 px-4 md:px-10 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
          <div className="h-10 w-10 flex items-center justify-center overflow-hidden">
            <img 
              src="logo.png" 
              alt="PG Buddy Logo" 
              className="h-full w-full object-contain transform group-hover:scale-110 transition-transform duration-300" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }} 
            />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-[#ff8000]">PG Buddy</h2>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <button onClick={() => onNavigate('home')} className="text-sm font-medium text-gray-300 hover:text-[#ff8000] transition-colors">Home</button>
          <button onClick={() => onNavigate('listings')} className="text-sm font-medium text-gray-300 hover:text-[#ff8000] transition-colors">Listings</button>
          <button onClick={() => onNavigate('help')} className="text-sm font-medium text-gray-300 hover:text-[#ff8000] transition-colors">About</button>
          <button onClick={() => onNavigate('contact')} className="text-sm font-medium text-gray-300 hover:text-[#ff8000] transition-colors">Contact</button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleFindRoom}
            className="bg-[#ff8000] text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-[#ff8000]/90 transition-all active:scale-95 shadow-lg shadow-[#ff8000]/10 uppercase tracking-wider"
          >
            Find a Room
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

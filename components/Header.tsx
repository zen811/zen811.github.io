
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
        {/* Logo Section with Navigation */}
        <div 
          className="flex items-center gap-3 cursor-pointer group select-none" 
          onClick={() => window.location.hash = '#/'}
        >
          <div className="h-10 w-10 flex items-center justify-center overflow-hidden bg-white/5 rounded-lg border border-white/5 relative">
            <img 
              src="/logo.png" 
              alt="PG Buddy Logo" 
              className="h-full w-full object-contain transform group-hover:scale-110 transition-transform duration-300 relative z-10" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }} 
            />
            <span className="absolute inset-0 flex items-center justify-center text-[12px] font-black text-primary z-0">PB</span>
          </div>
          <h2 className="text-xl font-black tracking-tight text-primary">PG Buddy</h2>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <button onClick={() => window.location.hash = '#/'} className="text-sm font-bold text-gray-400 hover:text-primary transition-colors">Home</button>
          <button onClick={() => window.location.hash = '#/listings'} className="text-sm font-bold text-gray-400 hover:text-primary transition-colors">Listings</button>
          <button onClick={() => window.location.hash = '#/about'} className="text-sm font-bold text-gray-400 hover:text-primary transition-colors">About</button>
          <button onClick={() => window.location.hash = '#/contact'} className="text-sm font-bold text-gray-400 hover:text-primary transition-colors">Contact</button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleFindRoom}
            className="bg-primary text-white text-xs font-black px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/10 uppercase tracking-widest"
          >
            Find a Room
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

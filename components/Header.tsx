
import React from 'react';

interface HeaderProps {
  onSearch: (q: string) => void;
  onNavigate: (view: 'listings' | 'help' | 'contact' | 'terms') => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onNavigate }) => {
  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfnlEk8iCcgoU9uCJzbQ819ymUQTAQTIuoKpUfzfSucov0hTg/viewform?usp=sharing&ouid=102818260866587255848'; 

  return (
    <header className="sticky top-0 z-50 bg-[#181410]/80 backdrop-blur-md border-b border-white/10 px-4 md:px-10 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('listings')}>
            <div className="h-10 w-auto overflow-hidden">
              <img 
                src="./logo.png" 
                alt="PG Buddy Logo" 
                className="h-full object-contain group-hover:scale-110 transition-transform" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://i.ibb.co/3ykXJzV/logo-placeholder.png'; 
                }} 
              />
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight text-[#ff8000] hidden sm:block">PG Buddy</h2>
          </div>
          <div className="hidden md:flex flex-col min-w-40 max-w-lg relative">
            <div className="flex w-full items-center rounded-lg bg-white/10 h-10 px-3 border border-transparent focus-within:border-[#ff8000] transition-all">
              <span className="material-symbols-outlined text-gray-400 text-lg">search</span>
              <input 
                className="w-full bg-transparent border-none focus:ring-0 text-sm placeholder:text-gray-400 text-white" 
                placeholder="Search area or PG name" 
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <button onClick={() => onNavigate('listings')} className="hidden lg:block text-sm font-medium hover:text-[#ff8000] transition-colors">Find Rooms</button>
            <button onClick={() => onNavigate('help')} className="hidden lg:block text-sm font-medium hover:text-[#ff8000] transition-colors">Help Centre</button>
            <a 
              href={GOOGLE_FORM_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-bold text-[#ff8000] border border-[#ff8000]/30 px-3 py-1.5 rounded-lg hover:bg-[#ff8000] hover:text-white transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">add_circle</span>
              List Your Room
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

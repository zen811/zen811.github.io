
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
          <div className="flex items-center gap-2 text-[#ff8000] cursor-pointer" onClick={() => onNavigate('listings')}>
            <div className="size-8">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight">PG Buddy</h2>
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
          <nav className="hidden lg:flex items-center gap-6">
            <button onClick={() => onNavigate('listings')} className="text-sm font-medium hover:text-[#ff8000] transition-colors">Find Rooms</button>
            <button onClick={() => onNavigate('help')} className="text-sm font-medium hover:text-[#ff8000] transition-colors">Help Centre</button>
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
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-white/10 hover:bg-white/20 transition-all">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
            <div className="h-10 w-10 rounded-full overflow-hidden border border-[#ff8000]/20 cursor-pointer">
              <img className="h-full w-full object-cover" src="https://picsum.photos/id/64/100/100" alt="User" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

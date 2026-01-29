
import React from 'react';

interface HeaderProps {
  onSearch: (q: string) => void;
  onNavigate: (view: 'home' | 'listings' | 'help' | 'contact' | 'terms' | 'saved') => void;
  enquiryFormUrl: string;
}

const Header: React.FC<HeaderProps> = ({ enquiryFormUrl, onNavigate }) => {
  const handleRegister = () => {
    window.open(enquiryFormUrl, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#181410]/95 backdrop-blur-md border-b border-white/5 px-5 md:px-10 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2.5 cursor-pointer group select-none" 
          onClick={() => window.location.hash = '#/'}
        >
          <div className="h-10 w-10 flex items-center justify-center overflow-hidden bg-white/5 rounded-lg border border-white/5 relative">
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-primary z-0 opacity-40">PB</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tighter text-primary">PG Buddy</h2>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          <button onClick={() => window.location.hash = '#/'} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">Home</button>
          <button onClick={() => window.location.hash = '#/listings'} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">Listings</button>
          <button onClick={() => window.location.hash = '#/saved'} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] filled">favorite</span> Saved
          </button>
          <button onClick={() => window.location.hash = '#/about'} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">About</button>
        </nav>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.location.hash = '#/saved'}
            className="lg:hidden w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg text-gray-400"
          >
            <span className="material-symbols-outlined filled">favorite</span>
          </button>
          <button 
            onClick={handleRegister}
            className="bg-primary text-white text-[9px] font-black px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20 uppercase tracking-[0.1em]"
          >
            Register
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

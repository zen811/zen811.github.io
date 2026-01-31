import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#181410] border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/5 relative overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="PG Buddy" 
                  className="w-full h-full object-cover z-10"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-primary opacity-40">PB</span>
              </div>
              <h2 className="text-2xl font-black tracking-tighter text-white">PG Buddy</h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">
              The city's premium room discovery platform. Finding your next home shouldn't be a hassle. Direct connections, zero brokerage.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Navigation</h4>
            <ul className="space-y-4">
              <li><button onClick={() => window.location.hash = '#/'} className="text-gray-500 hover:text-primary transition-colors text-sm font-bold">Home</button></li>
              <li><button onClick={() => window.location.hash = '#/listings'} className="text-gray-500 hover:text-primary transition-colors text-sm font-bold">Browse Listings</button></li>
              <li><button onClick={() => window.location.hash = '#/saved'} className="text-gray-500 hover:text-primary transition-colors text-sm font-bold">My Saved Rooms</button></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Support</h4>
            <ul className="space-y-4">
              <li><button onClick={() => window.location.hash = '#/about'} className="text-gray-500 hover:text-primary transition-colors text-sm font-bold">Help Centre</button></li>
              <li><button onClick={() => window.location.hash = '#/contact'} className="text-gray-500 hover:text-primary transition-colors text-sm font-bold">Contact Us</button></li>
              <li><button onClick={() => window.location.hash = '#/terms'} className="text-gray-500 hover:text-primary transition-colors text-sm font-bold">Terms of Service</button></li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Download App</h4>
            <p className="text-gray-500 text-xs font-medium mb-6">Experience PG Buddy on your mobile device for faster search and real-time alerts.</p>
            <a 
              href="https://play.google.com/store" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-black border border-white/10 px-5 py-2.5 rounded-xl hover:bg-white/5 transition-all group shadow-xl"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="h-8 md:h-9"
              />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
            © {currentYear} PG BUDDY SOLUTIONS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg">public</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg">mail</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
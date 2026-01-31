
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Fixed the missing onBack error in router by using useNavigate internally for back navigation
const TermsOfService: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-500 hover:text-[#ff8000] text-sm font-medium mb-8"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Home
      </button>
      
      <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
      <p className="text-gray-400 mb-12 tracking-wide uppercase text-xs font-bold">Last Updated: October 2024</p>

      <div className="space-y-12 prose prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-400">By accessing and using PG Buddy, you agree to comply with and be bound by these terms. If you do not agree, please do not use our services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. Listing Rooms</h2>
          <ul className="list-disc pl-5 text-gray-400 space-y-2">
            <li>Owners must provide accurate information, including price, amenities, and real photos.</li>
            <li>Misleading listings will be removed without notice.</li>
            <li>Owners are responsible for complying with local rental laws and regulations.</li>
            <li>PG Buddy reserves the right to verify any listing before it goes live.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. Accessing Rooms</h2>
          <ul className="list-disc pl-5 text-gray-400 space-y-2">
            <li>Information provided on PG Buddy is for personal, non-commercial use only.</li>
            <li>Users must respect the privacy and property of listed owners.</li>
            <li>PG Buddy does not handle payments; all transactions are strictly between the user and the owner.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
          <p className="text-gray-400">PG Buddy is a community-driven listing platform. We do not own or manage the properties. We are not liable for any disputes, financial losses, or physical harm that may occur as a result of using our platform or visiting properties listed here.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">5. Privacy</h2>
          <p className="text-gray-400">Your contact information submitted via Google Forms is used solely for verification and listing purposes as described in our privacy policy.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;

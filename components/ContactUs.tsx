
import React from 'react';

const ContactUs: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-[#ff8000] text-sm font-medium mb-8"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Home
      </button>
      
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-400 mb-12">Have questions or need assistance? Our team is here to help.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#1e1e1e] border border-white/10 rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-[#ff8000]/10 p-3 rounded-2xl text-[#ff8000]">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div>
              <h3 className="font-bold text-white">Email Us</h3>
              <p className="text-sm text-gray-500">Expect a response within 24h</p>
            </div>
          </div>
          <a 
            href="mailto:support@pgbuddy.com" 
            className="text-xl font-bold text-[#ff8000] hover:underline block mb-2"
          >
            support@pgbuddy.com
          </a>
        </div>

        <div className="bg-[#1e1e1e] border border-white/10 rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-[#ff8000]/10 p-3 rounded-2xl text-[#ff8000]">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <div>
              <h3 className="font-bold text-white">Support Hours</h3>
              <p className="text-sm text-gray-500">We're available to help</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-gray-300 font-medium">Monday - Friday: 9 AM - 6 PM</p>
            <p className="text-gray-300 font-medium">Saturday: 10 AM - 2 PM</p>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gradient-to-br from-[#ff8000]/20 to-transparent border border-[#ff8000]/20 rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Are you a property owner?</h3>
        <p className="text-gray-400 mb-6 max-w-xl mx-auto">
          If you're having trouble listing your room or need to update an existing listing, please include the PG name in your subject line.
        </p>
        <button className="bg-[#ff8000] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#ff8000]/90 transition-all">
          Email Support Team
        </button>
      </div>
    </div>
  );
};

export default ContactUs;


import React from 'react';

const HelpCentre: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const faqs = [
    {
      question: "How do I use PG Buddy to find a room?",
      answer: "PG Buddy is a premium discovery platform. Browse our verified listings, filter by your specific needs, and view details. We provide the owner's contact information so you can reach out directly to finalize your stay."
    },
    {
      question: "What is the policy on Security Deposits?",
      answer: "PG Buddy is just a platform to list and explore PGs and is not involved or responsible for any transactions. Any security deposit or rent payment is strictly between the tenant and the property owner. We strongly advise users to visit the property and sign a formal agreement before making any payments."
    },
    {
      question: "How are the listings verified?",
      answer: "Our team regularly reviews community-submitted data from our Google Forms. While we strive for 100% accuracy through digital verification and occasional physical visits, we encourage users to report any inaccuracies immediately."
    },
    {
      question: "Can I list my own property here?",
      answer: "Absolutely! Property owners can use the 'List Your Property' button to submit their details via our secure form. Our team will review the information and make it live on the platform within 24-48 hours."
    },
    {
      question: "Is there an app for PG Buddy?",
      answer: "Yes, you can download our Android app from the Google Play Store for a smoother experience, real-time notifications, and easier navigation on the go."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-[#ff8000] text-sm font-medium mb-8"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Home
      </button>
      
      <h1 className="text-4xl font-black mb-4 tracking-tight">Help Centre</h1>
      <p className="text-gray-400 mb-12">Navigating the best PG discovery experience in the city.</p>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-[#1e1e1e] border border-white/10 rounded-3xl p-8 hover:border-[#ff8000]/30 transition-all shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              {faq.question}
            </h3>
            <p className="text-gray-400 leading-relaxed pl-5 border-l border-white/10">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-primary/5 rounded-[40px] border border-primary/20 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">If you couldn't find what you were looking for, our support team is ready to assist you personally.</p>
        <button className="bg-primary text-white font-bold px-10 py-4 rounded-2xl hover:scale-105 transition-all">Contact Support</button>
      </div>
    </div>
  );
};

export default HelpCentre;

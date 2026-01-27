
import React from 'react';

const HelpCentre: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const faqs = [
    {
      question: "How do I book a room through PG Buddy?",
      answer: "Once you find a room you like, click on 'View Details'. You can then use the 'Book Now' button to start the process. Since our data is community-driven, you'll often be put in direct touch with the owner."
    },
    {
      question: "What does the 'Verified' badge mean?",
      answer: "A verified badge means our team or a trusted community member has physically visited the property to confirm that the photos and amenities listed are accurate."
    },
    {
      question: "Is my security deposit safe?",
      answer: "PG Buddy acts as a listing platform. We recommend always getting a written agreement and a receipt when paying security deposits directly to owners."
    },
    {
      question: "How can I list my own property?",
      answer: "Simply click the 'List Your Room' button in the header. It will take you to a Google Form where you can submit your details. Once verified, it will appear on our live listings."
    },
    {
      question: "What if the room doesn't match the description?",
      answer: "Please report any inaccuracies immediately via our Contact Us page. We take listing integrity very seriously and will remove deceptive posts."
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
      
      <h1 className="text-4xl font-bold mb-4">Help Centre</h1>
      <p className="text-gray-400 mb-12">Everything you need to know about finding and listing PGs on our platform.</p>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-[#1e1e1e] border border-white/10 rounded-2xl p-6 hover:border-[#ff8000]/30 transition-all">
            <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
            <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpCentre;

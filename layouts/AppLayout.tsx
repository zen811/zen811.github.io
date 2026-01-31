
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ENQUIRY_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScGf72h7DSjeSOFjR-f8J3ww8FfeHo0rUwKexeSE9-pPJarxQ/viewform?usp=publish-editor';

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  // Example of using navigate in layout as requested
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#181410] text-white">
      <Header onNavigate={(path) => navigate(path)} enquiryFormUrl={ENQUIRY_FORM_URL} />
      
      {expandedImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" onClick={() => setExpandedImage(null)}>
          <div className="relative w-full max-w-6xl aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <img src={expandedImage} className="w-full h-full object-cover" onClick={(e) => e.stopPropagation()} alt="Expanded" />
            <button onClick={() => setExpandedImage(null)} className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center"><span className="material-symbols-outlined">close</span></button>
          </div>
        </div>
      )}

      <main className="flex-grow">
        <Outlet context={{ setExpandedImage }} />
      </main>
      
      <Footer onNavigate={(path) => navigate(path)} />
    </div>
  );
};

export default AppLayout;

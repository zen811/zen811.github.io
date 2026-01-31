
import React from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { useRooms } from '../context/RoomContext';

const RoomDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rooms, savedRoomIds, toggleSave } = useRooms();
  const { setExpandedImage } = useOutletContext<{ setExpandedImage: (url: string | null) => void }>();
  
  const room = rooms.find(r => r.id === id);
  const isSaved = savedRoomIds.includes(id || '');

  if (!room) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Listing not found</h2>
        <button onClick={() => navigate('/listings')} className="text-primary font-bold uppercase tracking-widest text-xs">Back to listings</button>
      </div>
    );
  }

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({ title: room.name, text: room.location, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied!");
    }
  };

  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200&h=675';
  const galleryImages = room.photos.length > 0 ? room.photos : [FALLBACK_IMAGE];

  return (
    <div className="max-w-7xl mx-auto px-5 py-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32">
      <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
        <div>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-primary text-[9px] font-black uppercase mb-6"><span className="material-symbols-outlined text-[14px]">arrow_back</span> Back</button>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h1 className="text-2xl md:text-5xl font-black tracking-tighter">{room.name}</h1>
            <span className="bg-primary/10 text-primary text-[9px] font-black px-3 py-1.5 rounded-lg border border-primary/20">{room.flatType}</span>
          </div>
        </div>
        <div className="flex gap-2.5">
          <button onClick={handleShare} className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl"><span className="material-symbols-outlined">share</span></button>
          <button onClick={() => toggleSave(room.id)} className={`px-6 py-3.5 border rounded-xl ${isSaved ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 text-white'}`}><span className={`material-symbols-outlined ${isSaved ? 'filled' : ''}`}>favorite</span></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 mb-12 bg-black cursor-zoom-in" onClick={() => setExpandedImage(galleryImages[0])}>
            <img src={galleryImages[0]} className="w-full h-full object-cover" alt="Main" onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }} />
          </div>
          <section className="bg-[#1e1e1e] p-8 rounded-3xl border border-white/5">
             <h3 className="text-xl font-black mb-6">Description</h3>
             <p className="text-gray-400 whitespace-pre-line leading-relaxed">{room.description}</p>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-[#1e1e1e] border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="mb-8">
              <span className="text-[8px] text-gray-500 uppercase font-black tracking-[0.3em] block mb-1">Monthly Rent</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-black tracking-tighter">₹{room.price.toLocaleString()}</span>
                <span className="text-gray-500 font-black text-[8px] uppercase">/ Mo</span>
              </div>
            </div>
            <a href={`tel:${room.phoneNumber}`} className="w-full bg-primary text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest"><span className="material-symbols-outlined">contact_phone</span> Call Owner</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;

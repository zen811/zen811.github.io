
import React, { useState } from 'react';
import { User } from '../types';
import { fetchUsers, registerUser } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isRegistering) {
        if (!formData.name || !formData.phoneNumber || !formData.password) {
          throw new Error("All fields are required");
        }
        const success = await registerUser({
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          password: formData.password
        });
        if (success) {
          onLoginSuccess({
            name: formData.name,
            phoneNumber: formData.phoneNumber,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`
          });
          onClose();
        }
      } else {
        const users = await fetchUsers();
        const found = users.find(u => u.phoneNumber === formData.phoneNumber && u.password === formData.password);
        if (found) {
          onLoginSuccess(found);
          onClose();
        } else {
          // Fallback for demo: if no sheet is found, we allow "demo/123" for testing
          if (formData.phoneNumber === 'demo' && formData.password === '123') {
            onLoginSuccess({ name: 'Demo User', phoneNumber: 'demo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo' });
            onClose();
          } else {
            throw new Error("Invalid phone number or password.");
          }
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[#1e1e1e] border border-white/10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegistering && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 text-lg">person</span>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border-white/10 rounded-xl px-12 py-3.5 text-sm focus:ring-[#ff8000] focus:border-[#ff8000] text-white"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 text-lg">call</span>
                <input
                  type="text"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full bg-white/5 border-white/10 rounded-xl px-12 py-3.5 text-sm focus:ring-[#ff8000] focus:border-[#ff8000] text-white"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 text-lg">lock</span>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/5 border-white/10 rounded-xl px-12 py-3.5 text-sm focus:ring-[#ff8000] focus:border-[#ff8000] text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs font-medium">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#ff8000] hover:bg-[#ff8000]/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#ff8000]/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                isRegistering ? 'Register' : 'Login'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            {isRegistering ? (
              <p>Already have an account? <button onClick={() => setIsRegistering(false)} className="text-[#ff8000] font-bold hover:underline">Login</button></p>
            ) : (
              <p>Don't have an account? <button onClick={() => setIsRegistering(true)} className="text-[#ff8000] font-bold hover:underline">Register</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

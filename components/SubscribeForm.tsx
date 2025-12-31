import React, { useState } from 'react';
import { Loader2, Check, ArrowRight } from 'lucide-react';

export const SubscribeForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus('success');
    setEmail('');
    
    // Reset after showing success
    setTimeout(() => {
      setStatus('idle');
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative flex items-center bg-white rounded-lg p-1.5 shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-shadow duration-300 focus-within:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        <input
          type="email"
          placeholder="Deine E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'success' || status === 'loading'}
          className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 px-4 py-3 outline-none text-base min-w-0"
          required
        />
        
        <button
          type="submit"
          disabled={status !== 'idle'}
          className={`
            hidden sm:flex px-6 py-3 rounded-md font-medium text-sm text-white transition-all duration-300 items-center justify-center min-w-[140px]
            ${status === 'success' 
              ? 'bg-green-600' 
              : 'bg-black hover:bg-gray-800'
            }
          `}
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : status === 'success' ? (
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>Angemeldet</span>
            </div>
          ) : (
            'Lass uns reden'
          )}
        </button>

        {/* Mobile Icon Button */}
        <button
          type="submit"
          disabled={status !== 'idle'}
          className={`
            sm:hidden p-3 rounded-md text-white transition-all duration-300 flex items-center justify-center
            ${status === 'success' 
              ? 'bg-green-600' 
              : 'bg-black hover:bg-gray-800'
            }
          `}
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : status === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </form>
  );
};
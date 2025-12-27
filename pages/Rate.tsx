
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Star, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

const Rate: React.FC = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || rating === 0) return;
    setIsSubmitted(true);
    // Logic to save rating to D1/KV would go here
  };

  return (
    <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto min-h-[80vh] flex flex-col justify-center">
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter uppercase">Rate <span className="text-[#39FF14]">Us</span></h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Your feedback fuels our evolution. Help us build the perfect arena for the world's best editors.
        </p>
      </header>

      {!user ? (
        <div className="glass p-12 rounded-2xl text-center border border-white/5">
          <p className="text-xl text-gray-500 mb-8">Please log in on the <span className="text-white">Vote</span> page to leave a rating.</p>
          <a href="/vote" className="px-10 py-4 bg-[#39FF14] text-black font-black rounded-sm uppercase tracking-widest text-sm">Log in to Rate</a>
        </div>
      ) : isSubmitted ? (
        <div className="glass p-16 rounded-2xl text-center border border-[#39FF14]/30 animate-in zoom-in-95">
          <div className="flex justify-center mb-6 text-[#39FF14]">
            <CheckCircle2 size={64} />
          </div>
          <h2 className="text-3xl font-bold mb-4">FEEDBACK RECEIVED</h2>
          <p className="text-gray-400">Thank you, {user.name}. Your feedback helps us improve the Oryn Server experience.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass p-10 md:p-16 rounded-3xl border border-white/10 space-y-12">
          {/* Star Rating */}
          <div className="space-y-6 text-center">
            <label className="text-xs uppercase tracking-[0.3em] text-[#39FF14] font-bold">Overall Experience</label>
            <div className="flex justify-center space-x-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-all duration-300 hover:scale-125 focus:outline-none"
                >
                  <Star 
                    size={48} 
                    className={`${(hoverRating || rating) >= star ? 'fill-[#39FF14] text-[#39FF14]' : 'text-gray-700'}`} 
                    style={{ filter: (hoverRating || rating) >= star ? 'drop-shadow(0 0 10px rgba(57, 255, 20, 0.4))' : 'none' }}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm font-medium text-gray-500 italic">
              {rating === 1 && "Need massive improvements"}
              {rating === 2 && "Could be better"}
              {rating === 3 && "Decent experience"}
              {rating === 4 && "Loved it, almost perfect"}
              {rating === 5 && "Industry standard perfection"}
            </p>
          </div>

          {/* Feedback Text */}
          <div className="space-y-4">
            <label className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gray-500 font-bold">
              <MessageSquare size={14} />
              <span>Tell us more (Optional)</span>
            </label>
            <textarea 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-6 focus:border-[#39FF14] transition-colors outline-none resize-none text-lg"
              placeholder="Features you'd like to see, UI improvements, bugs..."
            />
          </div>

          <button 
            type="submit" 
            disabled={rating === 0}
            className="w-full py-5 bg-[#39FF14] text-black font-black uppercase tracking-widest text-sm rounded-sm hover:shadow-[0_0_25px_rgba(57,255,20,0.4)] transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
            <span>Submit Rating</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default Rate;

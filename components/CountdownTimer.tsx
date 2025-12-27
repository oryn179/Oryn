
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  // Set target date to exactly 4 days from now
  const [targetDate] = useState(new Date(Date.now() + 4 * 24 * 60 * 60 * 1000));
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Run once immediately

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center">
      <div className="glass neon-border w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-lg mb-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#39FF14]/5 animate-pulse" />
        <span className="text-2xl md:text-5xl font-bold neon-glow relative z-10">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-bold">{label}</span>
    </div>
  );

  return (
    <div className="flex space-x-3 md:space-x-8">
      <TimeUnit label="Days" value={timeLeft.days} />
      <TimeUnit label="Hours" value={timeLeft.hours} />
      <TimeUnit label="Mins" value={timeLeft.minutes} />
      <TimeUnit label="Secs" value={timeLeft.seconds} />
    </div>
  );
};

export default CountdownTimer;

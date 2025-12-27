
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [targetDate, setTargetDate] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Check if target date exists in storage, else create it (4 days from now)
    const storedTarget = localStorage.getItem('tournament_deadline');
    let finalTarget: number;
    
    if (storedTarget) {
      finalTarget = parseInt(storedTarget, 10);
    } else {
      finalTarget = Date.now() + 4 * 24 * 60 * 60 * 1000;
      localStorage.setItem('tournament_deadline', finalTarget.toString());
    }
    
    setTargetDate(finalTarget);

    const calculateTimeLeft = () => {
      const difference = finalTarget - Date.now();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

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

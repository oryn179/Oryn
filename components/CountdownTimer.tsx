
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 5,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center">
      <div className="glass neon-border w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-lg mb-2">
        <span className="text-2xl md:text-5xl font-bold neon-glow">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-medium">{label}</span>
    </div>
  );

  return (
    <div className="flex space-x-4 md:space-x-8">
      <TimeUnit label="Days" value={timeLeft.days} />
      <TimeUnit label="Hours" value={timeLeft.hours} />
      <TimeUnit label="Mins" value={timeLeft.minutes} />
      <TimeUnit label="Secs" value={timeLeft.seconds} />
    </div>
  );
};

export default CountdownTimer;

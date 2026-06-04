import { useState, useEffect } from 'react';

interface AuctionCountdownProps {
  endTime: string;
  onExpired?: () => void;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function getTimeLeft(endTime: string): TimeLeft {
  const total = Math.max(0, new Date(endTime).getTime() - Date.now());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor(total / 1000 / 60 / 60);
  return { hours, minutes, seconds, total };
}

export default function AuctionCountdown({ endTime, onExpired }: AuctionCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      const tl = getTimeLeft(endTime);
      setTimeLeft(tl);
      if (tl.total <= 0) {
        clearInterval(interval);
        onExpired?.();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime, onExpired]);

  if (timeLeft.total <= 0) {
    return (
      <div className="flex items-center gap-2">
        <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
        <span className="text-red-600 font-bold text-lg">Auction Ended</span>
      </div>
    );
  }

  const pad = (n: number): string => n.toString().padStart(2, '0');

  const isUrgent = timeLeft.total < 3600000; // less than 1 hour

  return (
    <div className="flex items-center gap-3">
      <span className={`inline-block w-3 h-3 rounded-full ${isUrgent ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></span>
      <div className="flex gap-1 font-mono text-lg font-bold">
        <span className={`px-2 py-1 rounded ${isUrgent ? 'bg-red-100 text-red-700' : 'bg-navy text-gold'}`}>
          {pad(timeLeft.hours)}h
        </span>
        <span className={`px-2 py-1 rounded ${isUrgent ? 'bg-red-100 text-red-700' : 'bg-navy text-gold'}`}>
          {pad(timeLeft.minutes)}m
        </span>
        <span className={`px-2 py-1 rounded ${isUrgent ? 'bg-red-100 text-red-700' : 'bg-navy text-gold'}`}>
          {pad(timeLeft.seconds)}s
        </span>
      </div>
    </div>
  );
}

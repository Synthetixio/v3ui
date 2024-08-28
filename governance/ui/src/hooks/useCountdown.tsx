import { useState, useEffect } from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
};

const calculateTimeLeft = (timestamp: number): TimeLeft => {
  const now = new Date();
  const targetDate = new Date(timestamp * 1000);
  const difference = targetDate.getTime() - now.getTime();
  let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0 };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    };
  }

  return timeLeft;
};

const useCountdown = (id: string, timestamp: number) => {
  const [countdowns, setCountdowns] = useState<{ [key: string]: TimeLeft }>({});

  useEffect(() => {
    const updateCountdown = () => {
      setCountdowns((prevCountdowns) => ({
        ...prevCountdowns,
        [id]: calculateTimeLeft(timestamp),
      }));
    };

    // Update immediately and then set an interval to update every minute
    updateCountdown();
    const timer = setInterval(updateCountdown, 60000);

    return () => clearInterval(timer);
  }, [id, timestamp]);
  return countdowns[id] || { days: 0, hours: 0, minutes: 0 };
};

export default useCountdown;

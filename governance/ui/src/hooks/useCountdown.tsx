import { useState, useEffect } from 'react';

const calculateTimeLeft = (timestamp: number) => {
  const now = new Date();
  const targetDate = new Date(timestamp * 1000);
  const difference = targetDate.getTime() - now.getTime();

  let timeLeft = {} as { days: number; minutes: number; hours: number };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    };
  } else {
    timeLeft = { days: 0, hours: 0, minutes: 0 };
  }

  return timeLeft;
};

const useCountdown = (timestamp: number) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timestamp));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(timestamp));
    }, 60000);

    return () => clearInterval(timer);
  }, [timestamp]);

  return timeLeft;
};

export default useCountdown;

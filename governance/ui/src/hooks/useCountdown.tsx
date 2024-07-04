import { useState, useEffect } from 'react';

const useCountdown = (timestamp: number) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date(timestamp * 1000); // Convert timestamp from seconds to milliseconds
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [timestamp]);

  return timeLeft;
};

export default useCountdown;

import { useEffect, useState } from 'react';
import { Car } from 'lucide-react';

const SpeedDisplay = () => {
  const [speed, setSpeed] = useState(0);
  const [isDriving, setIsDriving] = useState(false);

  // Simulate more realistic speed changes
  useEffect(() => {
    let currentSpeed = 0;
    const interval = setInterval(() => {
      // Simulate more natural speed changes
      const speedChange = Math.random() * 2 - 1; // Random change between -1 and 1
      currentSpeed = Math.max(0, Math.min(60, currentSpeed + speedChange * 5));
      setSpeed(currentSpeed);
      setIsDriving(currentSpeed > 30);
    }, 500); // Update more frequently for smoother animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <Car className={`w-8 h-8 ${isDriving ? 'text-success' : 'text-gray-400'}`} />
        <span className={`text-sm font-medium ${isDriving ? 'text-success' : 'text-gray-500'}`}>
          {isDriving ? 'Driving' : 'Stationary'}
        </span>
      </div>
      <div className="text-4xl font-bold text-secondary mb-2">
        {Math.round(speed)} km/h
      </div>
      <div className={`text-sm ${isDriving ? 'text-destructive' : 'text-gray-500'}`}>
        {isDriving ? 'Selected Apps Blocked' : 'Safe to Use Apps'}
      </div>
    </div>
  );
};

export default SpeedDisplay;
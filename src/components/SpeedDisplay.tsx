import { useEffect, useState } from 'react';
import { Car } from 'lucide-react';

const SpeedDisplay = () => {
  const [speed, setSpeed] = useState(0);
  const [isDriving, setIsDriving] = useState(false);

  // Simulate speed detection (in a real app, this would use device sensors)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate speed changes for demo
      const newSpeed = Math.random() * 60;
      setSpeed(newSpeed);
      setIsDriving(newSpeed > 30);
    }, 2000);

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
      <div className={`text-sm ${isDriving ? 'text-success' : 'text-gray-500'}`}>
        {isDriving ? 'Drive Safe - Apps Blocked' : 'Safe to Use Phone'}
      </div>
    </div>
  );
};

export default SpeedDisplay;
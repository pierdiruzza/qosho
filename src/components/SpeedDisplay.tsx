import { useEffect, useState } from 'react';
import { Car } from 'lucide-react';
import { toast } from "sonner";

const SpeedDisplay = () => {
  const [speed, setSpeed] = useState(0);
  const [isDriving, setIsDriving] = useState(false);

  useEffect(() => {
    let watchId: number;

    const startWatchingSpeed = () => {
      if ('geolocation' in navigator) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            if (position.coords.speed !== null) {
              // Convert m/s to km/h
              const speedKmh = (position.coords.speed * 3.6);
              setSpeed(speedKmh);
              setIsDriving(speedKmh > 30);
            }
          },
          (error) => {
            toast.error("Unable to access GPS. Using simulation mode.");
            // Fallback to simulation if GPS fails
            startSpeedSimulation();
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
          }
        );
      } else {
        toast.error("GPS not available. Using simulation mode.");
        startSpeedSimulation();
      }
    };

    const startSpeedSimulation = () => {
      const interval = setInterval(() => {
        const speedChange = Math.random() * 2 - 1;
        setSpeed(prevSpeed => {
          const newSpeed = Math.max(0, Math.min(60, prevSpeed + speedChange * 5));
          setIsDriving(newSpeed > 30);
          return newSpeed;
        });
      }, 500);
      return () => clearInterval(interval);
    };

    startWatchingSpeed();

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <Car className={`w-8 h-8 ${isDriving ? 'text-success' : 'text-gray-400'}`} />
        <span className={`text-sm font-medium ${isDriving ? 'text-success' : 'text-gray-500'}`}>
          {isDriving ? 'Driving' : 'Stationary'}
        </span>
      </div>
      <h2 className="text-lg font-medium text-secondary mb-2">Your current speed</h2>
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
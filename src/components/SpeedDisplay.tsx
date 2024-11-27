import { useEffect, useState } from 'react';
import { Car, AlertTriangle } from 'lucide-react';
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
              setIsDriving(speedKmh >= 20);
            }
          },
          (error) => {
            toast.error("Unable to access GPS. Using simulation mode.");
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
          setIsDriving(newSpeed >= 20);
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
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-full ${isDriving ? 'bg-destructive/10' : 'bg-success/10'}`}>
            <Car className={`w-6 h-6 ${isDriving ? 'text-destructive' : 'text-success'}`} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Current Speed</h2>
            <p className={`text-sm ${isDriving ? 'text-destructive' : 'text-success'}`}>
              {isDriving ? 'Driving Mode Active' : 'Safe to Use Apps'}
            </p>
          </div>
        </div>
        {isDriving && (
          <AlertTriangle className="w-6 h-6 text-destructive animate-pulse" />
        )}
      </div>
      <div className={`text-4xl font-bold ${isDriving ? 'text-destructive' : 'text-success'}`}>
        {Math.round(speed)} km/h
      </div>
    </div>
  );
};

export default SpeedDisplay;
import { useEffect, useState } from 'react';
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
          const newSpeed = Math.max(0, Math.min(120, prevSpeed + speedChange * 5));
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
    <div className={`rounded-2xl p-6 shadow-sm ${isDriving ? 'bg-red-500' : 'bg-green-500'}`}>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-white/60" />
        </div>
        <div className="text-white">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            You're at {Math.round(speed)}km/h!
            {isDriving && <span role="img" aria-label="fire">🔥</span>}
          </h3>
          <p className="text-white/90">
            {isDriving 
              ? "For that reason, Qosho blocks your app for you."
              : "Safe speed for using apps."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpeedDisplay;
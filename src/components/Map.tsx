
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

interface MapProps {
  pickup?: { latitude: number; longitude: number };
  dropoff?: { latitude: number; longitude: number };
  driverLocation?: { latitude: number; longitude: number };
  isRideActive: boolean;
}

export function Map({ pickup, dropoff, driverLocation, isRideActive }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Card className="w-full h-full min-h-[300px] overflow-hidden bg-gray-100 relative">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-taxi-blue border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-sm text-gray-500">Loading map...</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full">
          {/* This would use a real mapping API in a production app */}
          <div className="relative w-full h-full bg-[#e8eef1]">
            {/* Simplified map visualization */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
              {/* Map grid lines */}
              {Array.from({ length: 10 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={i * 30}
                  x2="400"
                  y2={i * 30}
                  stroke="#d1d5db"
                  strokeWidth="1"
                />
              ))}
              {Array.from({ length: 13 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={i * 30}
                  y1="0"
                  x2={i * 30}
                  y2="300"
                  stroke="#d1d5db"
                  strokeWidth="1"
                />
              ))}
              
              {/* Major roads */}
              <line x1="50" y1="0" x2="50" y2="300" stroke="#c2c9d1" strokeWidth="5" />
              <line x1="200" y1="0" x2="200" y2="300" stroke="#c2c9d1" strokeWidth="5" />
              <line x1="350" y1="0" x2="350" y2="300" stroke="#c2c9d1" strokeWidth="5" />
              <line x1="0" y1="50" x2="400" y2="50" stroke="#c2c9d1" strokeWidth="5" />
              <line x1="0" y1="150" x2="400" y2="150" stroke="#c2c9d1" strokeWidth="5" />
              <line x1="0" y1="250" x2="400" y2="250" stroke="#c2c9d1" strokeWidth="5" />
              
              {/* If we have pickup and dropoff, show them */}
              {pickup && (
                <circle
                  cx={(pickup.longitude + 74.01) * 5000}
                  cy={(40.72 - pickup.latitude) * 5000}
                  r="8"
                  fill="#4C6FFF"
                  stroke="white"
                  strokeWidth="2"
                />
              )}
              
              {dropoff && (
                <circle
                  cx={(dropoff.longitude + 74.01) * 5000}
                  cy={(40.72 - dropoff.latitude) * 5000}
                  r="8"
                  fill="#FFD166"
                  stroke="white"
                  strokeWidth="2"
                />
              )}
              
              {/* If ride is active and we have pickup and dropoff, draw a path */}
              {isRideActive && pickup && dropoff && (
                <path
                  d={`M${(pickup.longitude + 74.01) * 5000},${(40.72 - pickup.latitude) * 5000} 
                     C${(pickup.longitude + 74.01) * 5000 + 40},${(40.72 - pickup.latitude) * 5000 - 40} 
                      ${(dropoff.longitude + 74.01) * 5000 - 40},${(40.72 - dropoff.latitude) * 5000 + 40} 
                      ${(dropoff.longitude + 74.01) * 5000},${(40.72 - dropoff.latitude) * 5000}`}
                  fill="none"
                  stroke="#4C6FFF"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                />
              )}
              
              {/* Driver location */}
              {isRideActive && driverLocation && (
                <g className="animate-pulse">
                  <circle
                    cx={(driverLocation.longitude + 74.01) * 5000}
                    cy={(40.72 - driverLocation.latitude) * 5000}
                    r="10"
                    fill="#4C6FFF"
                    fillOpacity="0.3"
                  />
                  <circle
                    cx={(driverLocation.longitude + 74.01) * 5000}
                    cy={(40.72 - driverLocation.latitude) * 5000}
                    r="6"
                    fill="#4C6FFF"
                  />
                </g>
              )}
            </svg>
            
            {/* Map labels */}
            <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-md shadow-md text-sm font-medium">
              Interactive Map
            </div>
            
            {pickup && (
              <div 
                className="absolute transform -translate-x-1/2 bg-taxi-blue text-white text-xs px-2 py-1 rounded shadow-md"
                style={{ 
                  left: `${(pickup.longitude + 74.01) * 5000}px`, 
                  top: `${(40.72 - pickup.latitude) * 5000 - 25}px`
                }}
              >
                Pickup
              </div>
            )}
            
            {dropoff && (
              <div 
                className="absolute transform -translate-x-1/2 bg-taxi-yellow text-taxi-dark text-xs px-2 py-1 rounded shadow-md"
                style={{ 
                  left: `${(dropoff.longitude + 74.01) * 5000}px`, 
                  top: `${(40.72 - dropoff.latitude) * 5000 - 25}px`
                }}
              >
                Dropoff
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

export default Map;

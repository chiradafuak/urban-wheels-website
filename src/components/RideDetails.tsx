
import { useState, useEffect } from "react";
import { Driver } from "@/api/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface RideDetailsProps {
  driver: Driver;
  pickup: { latitude: number; longitude: number; address: string };
  dropoff: { latitude: number; longitude: number; address: string };
  estimatedTime: number;
  estimatedFare: number;
  rideType: string;
  onCancel: () => void;
}

export function RideDetails({
  driver,
  pickup,
  dropoff,
  estimatedTime,
  estimatedFare,
  rideType,
  onCancel,
}: RideDetailsProps) {
  const [arrivalTime, setArrivalTime] = useState(estimatedTime);
  const [rideStatus, setRideStatus] = useState<'arriving' | 'picking_up' | 'in_progress'>('arriving');
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Simulate driver arrival countdown
    const timer = setInterval(() => {
      setArrivalTime((prev) => {
        if (prev <= 1) {
          setRideStatus('picking_up');
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate ride progress after driver arrives
    const rideProgressTimer = setTimeout(() => {
      setRideStatus('in_progress');
    }, estimatedTime * 1000 + 5000); // After driver arrives + 5 seconds
    
    return () => {
      clearInterval(timer);
      clearTimeout(rideProgressTimer);
    };
  }, [estimatedTime]);

  const getRideStatusText = () => {
    switch (rideStatus) {
      case 'arriving':
        return `Driver arriving in ${arrivalTime} ${arrivalTime === 1 ? 'minute' : 'minutes'}`;
      case 'picking_up':
        return 'Driver has arrived';
      case 'in_progress':
        return 'Ride in progress';
      default:
        return '';
    }
  };

  return (
    <Card className="w-full shadow-lg animate-fade-in">
      <CardHeader className="bg-taxi-blue text-white">
        <CardTitle className="text-xl flex items-center justify-between">
          <span>{getRideStatusText()}</span>
          <span className="text-sm font-normal bg-white/20 rounded-full px-3 py-1">
            {rideType.charAt(0).toUpperCase() + rideType.slice(1)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 border-b">
          <div className="flex items-start space-x-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-taxi-blue">
              <img 
                src={driver.photo} 
                alt={driver.name}
                className="h-full w-full object-cover" 
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{driver.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">{driver.carModel}</span>
                <span className="font-semibold px-2 py-0.5 bg-taxi-light rounded text-taxi-dark">
                  {driver.licensePlate}
                </span>
              </div>
              <div className="flex items-center mt-1">
                <div className="flex items-center text-yellow-500">
                  {'★'.repeat(Math.floor(driver.rating))}
                  {'☆'.repeat(5 - Math.floor(driver.rating))}
                </div>
                <span className="ml-1 text-sm font-medium">{driver.rating.toFixed(1)}</span>
              </div>
            </div>
            <Button 
              size="icon" 
              variant="outline" 
              className="rounded-full h-10 w-10 border-taxi-blue text-taxi-blue"
            >
              <Phone className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex space-x-4">
            <div className="min-w-6 flex flex-col items-center">
              <div className="h-6 w-6 rounded-full bg-taxi-blue flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-white"></div>
              </div>
              <div className="w-0.5 h-10 bg-gray-300 my-1"></div>
              <div className="h-6 w-6 rounded-full bg-taxi-yellow flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs text-gray-500">PICKUP</p>
                <p className="font-medium">{pickup.address}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">DROPOFF</p>
                <p className="font-medium">{dropoff.address}</p>
              </div>
            </div>
          </div>
          
          <div className="pt-3 border-t flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">ESTIMATED FARE</p>
              <p className="text-lg font-semibold">${estimatedFare.toFixed(2)}</p>
            </div>
            <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50" onClick={onCancel}>
              Cancel Ride
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RideDetails;

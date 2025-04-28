
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Clock, DollarSign, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type Location = {
  address: string;
  latitude: number;
  longitude: number;
};

type RideOption = {
  id: string;
  name: string;
  description: string;
  multiplier: number;
  estimatedTime: number;
  icon: string;
};

const rideOptions: RideOption[] = [
  {
    id: "standard",
    name: "Standard",
    description: "Affordable everyday rides",
    multiplier: 1.0,
    estimatedTime: 5,
    icon: "🚗"
  },
  {
    id: "comfort",
    name: "Comfort",
    description: "Extra legroom and top drivers",
    multiplier: 1.5,
    estimatedTime: 8,
    icon: "🚙"
  },
  {
    id: "premium",
    name: "Premium",
    description: "High-end cars with top drivers",
    multiplier: 2.0,
    estimatedTime: 10,
    icon: "🏎️"
  }
];

const baseFare = 5;
const ratePerMile = 2;
const ratePerMinute = 0.5;

interface RideFormProps {
  onSubmit: (rideDetails: {
    pickup: Location;
    dropoff: Location;
    rideType: string;
    fare: number;
    estimatedTime: number;
  }) => void;
}

export function RideForm({ onSubmit }: RideFormProps) {
  const [pickup, setPickup] = useState<string>("");
  const [dropoff, setDropoff] = useState<string>("");
  const [selectedRide, setSelectedRide] = useState<string>("standard");
  const [estimatedFare, setEstimatedFare] = useState<number>(0);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const isMobile = useIsMobile();

  // Simulate location lookup
  const lookupLocation = (address: string): Promise<Location> => {
    // This would be a geocoding API call in a real app
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          address,
          latitude: 40.7128 + Math.random() * 0.01,
          longitude: -74.006 + Math.random() * 0.01
        });
      }, 500);
    });
  };

  // Calculate estimated fare based on locations and selected ride
  useEffect(() => {
    if (pickup && dropoff) {
      const calculateFare = async () => {
        // This is a simplified distance calculation
        // In a real app, you would use a routing API
        
        const pickupLocation = await lookupLocation(pickup);
        const dropoffLocation = await lookupLocation(dropoff);
        
        // Very simple distance calculation (not accurate for real-world use)
        const distance = Math.sqrt(
          Math.pow(dropoffLocation.latitude - pickupLocation.latitude, 2) +
          Math.pow(dropoffLocation.longitude - pickupLocation.longitude, 2)
        ) * 69; // Rough miles conversion
        
        const selectedOption = rideOptions.find(option => option.id === selectedRide);
        const multiplier = selectedOption ? selectedOption.multiplier : 1;
        const time = selectedOption ? selectedOption.estimatedTime : 5;
        
        // Calculate fare: base + (distance * rate) + (time * rate)
        const fare = (baseFare + (distance * ratePerMile) + (time * ratePerMinute)) * multiplier;
        
        setEstimatedFare(Math.round(fare * 100) / 100);
        setEstimatedTime(time + Math.round(distance * 2)); // Simple time calculation
      };
      
      calculateFare();
    }
  }, [pickup, dropoff, selectedRide]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    try {
      const pickupLocation = await lookupLocation(pickup);
      const dropoffLocation = await lookupLocation(dropoff);
      
      // Wait for a moment to simulate processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSubmit({
        pickup: pickupLocation,
        dropoff: dropoffLocation,
        rideType: selectedRide,
        fare: estimatedFare,
        estimatedTime
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Book a Ride</CardTitle>
        <CardDescription>Enter your pickup and destination</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <MapPin className="absolute left-2.5 top-2.5 h-5 w-5 text-taxi-blue" />
              <Input
                type="text"
                placeholder="Pickup location"
                className="pl-10"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                required
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-2.5 top-2.5 h-5 w-5 text-taxi-yellow" />
              <Input
                type="text"
                placeholder="Dropoff location"
                className="pl-10"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Select Ride Type</Label>
            <RadioGroup
              value={selectedRide}
              onValueChange={setSelectedRide}
              className="grid grid-cols-1 gap-2"
            >
              {rideOptions.map(option => (
                <label
                  key={option.id}
                  className={`flex items-center space-x-2 p-3 rounded-md border transition-all ${
                    selectedRide === option.id 
                      ? 'border-taxi-blue bg-taxi-blue/5' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{option.icon}</span>
                        <span className="font-medium">{option.name}</span>
                      </div>
                      {pickup && dropoff && (
                        <span className="font-semibold">
                          ${(estimatedFare * option.multiplier / rideOptions.find(o => o.id === selectedRide)?.multiplier!).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>
          
          {pickup && dropoff && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between mb-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Estimated arrival</span>
                </div>
                <span className="font-medium">{estimatedTime} min</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>Estimated fare</span>
                </div>
                <span className="font-medium">${estimatedFare.toFixed(2)}</span>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex-col space-y-2">
          <Button 
            type="submit" 
            className="w-full bg-taxi-blue hover:bg-taxi-blue/90" 
            disabled={!pickup || !dropoff || isSearching}
          >
            {isSearching ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Finding drivers...
              </div>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" /> Book Now
              </>
            )}
          </Button>
          
          <p className="text-xs text-center text-gray-500 px-6">
            By booking a ride, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

export default RideForm;

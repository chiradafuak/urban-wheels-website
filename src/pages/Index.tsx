
import { useState } from "react";
import { api, mockDrivers, Driver } from "@/api/api";
import Navbar from "@/components/Navbar";
import RideForm from "@/components/RideForm";
import Map from "@/components/Map";
import RideDetails from "@/components/RideDetails";
import SafetyFeatures from "@/components/SafetyFeatures";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

type Location = {
  address: string;
  latitude: number;
  longitude: number;
};

type RideState = {
  pickup: Location;
  dropoff: Location;
  rideType: string;
  estimatedFare: number;
  estimatedTime: number;
  driver: Driver | null;
};

const Index = () => {
  const [ride, setRide] = useState<RideState | null>(null);
  const [rideActive, setRideActive] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleRideSubmit = async (rideDetails: {
    pickup: Location;
    dropoff: Location;
    rideType: string;
    fare: number;
    estimatedTime: number;
  }) => {
    try {
      // In a real app, we would call the API to create a ride and match with a driver
      const drivers = await api.getNearbyDrivers();
      
      // Select a random driver
      const selectedDriver = drivers[Math.floor(Math.random() * drivers.length)];
      
      setRide({
        pickup: rideDetails.pickup,
        dropoff: rideDetails.dropoff,
        rideType: rideDetails.rideType,
        estimatedFare: rideDetails.fare,
        estimatedTime: rideDetails.estimatedTime,
        driver: selectedDriver,
      });
      
      setRideActive(true);
      
      toast({
        title: "Driver found!",
        description: `${selectedDriver.name} is on the way to pick you up.`,
      });
    } catch (error) {
      console.error("Error creating ride:", error);
      toast({
        title: "Error booking ride",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleCancelRide = () => {
    toast({
      title: "Ride cancelled",
      description: "Your ride has been cancelled successfully.",
    });
    setRideActive(false);
    setRide(null);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-12 gap-6'}`}>
          {/* Left side - Booking form or ride details */}
          <div className={isMobile ? 'col-span-1' : 'col-span-5'}>
            <div className="space-y-6">
              {!rideActive ? (
                <RideForm onSubmit={handleRideSubmit} />
              ) : ride && ride.driver ? (
                <RideDetails 
                  driver={ride.driver} 
                  pickup={ride.pickup}
                  dropoff={ride.dropoff}
                  estimatedTime={ride.estimatedTime}
                  estimatedFare={ride.estimatedFare}
                  rideType={ride.rideType}
                  onCancel={handleCancelRide}
                />
              ) : null}
              
              <SafetyFeatures 
                rideActive={rideActive}
                driverName={ride?.driver?.name}
                rideDetails={ride ? { 
                  pickup: ride.pickup, 
                  dropoff: ride.dropoff 
                } : undefined}
              />
            </div>
          </div>
          
          {/* Right side - Map */}
          <div className={isMobile ? 'col-span-1' : 'col-span-7'}>
            <div className="h-[600px]">
              <Map 
                pickup={ride?.pickup}
                dropoff={ride?.dropoff}
                driverLocation={ride?.driver?.location}
                isRideActive={rideActive}
              />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-taxi-dark text-white py-6">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold mb-4">UrbanWheels</h3>
              <p className="text-gray-400 text-sm">
                Safe, reliable rides at your fingertips. Book a ride anytime, anywhere.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Safety</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Get in Touch</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-400">Email: support@urbanwheels.com</li>
                <li className="text-gray-400">Phone: +1 (123) 456-7890</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} UrbanWheels. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

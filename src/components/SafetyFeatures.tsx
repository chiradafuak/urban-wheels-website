
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShieldCheck, User, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SafetyFeaturesProps {
  rideActive: boolean;
  driverName?: string;
  rideDetails?: {
    pickup: { address: string };
    dropoff: { address: string };
  };
}

export function SafetyFeatures({ rideActive, driverName, rideDetails }: SafetyFeaturesProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const handleShareRide = () => {
    // In a real app, this would send an SMS or email
    toast({
      title: "Ride details shared",
      description: `Ride details have been sent to ${phoneNumber}`,
    });
    setShareDialogOpen(false);
  };
  
  return (
    <div className="w-full animate-fade-in">
      <Tabs defaultValue="safety" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
        </TabsList>
        
        <TabsContent value="safety" className="space-y-4 pt-4">
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Verified Rides</h3>
                <p className="text-sm text-gray-500">All drivers are background checked</p>
              </div>
            </div>
          </div>
          
          <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full flex justify-between items-center"
                disabled={!rideActive}
              >
                <span>Share ride details</span>
                <span className="text-taxi-blue">→</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share your ride details</DialogTitle>
                <DialogDescription>
                  Send your current trip and driver information to a trusted contact.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                
                {rideActive && rideDetails && (
                  <div className="bg-taxi-light rounded-md p-3 text-sm">
                    <p className="font-medium">Ride information that will be shared:</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex">
                        <User className="h-4 w-4 mr-2 text-taxi-blue" />
                        <span>Driver: {driverName}</span>
                      </div>
                      <div className="flex">
                        <MapPin className="h-4 w-4 mr-2 text-taxi-blue" />
                        <div>
                          <p>From: {rideDetails.pickup.address}</p>
                          <p>To: {rideDetails.dropoff.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShareDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleShareRide} disabled={!phoneNumber}>Share</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="outline" 
            className="w-full flex justify-between items-center"
          >
            <span>Safety toolkit</span>
            <span className="text-taxi-blue">→</span>
          </Button>
          
          <div className="bg-white rounded-lg p-4 border">
            <h3 className="font-medium mb-2">Safety Tips</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Verify your driver's identity and car details before entering</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Always wear your seatbelt during the ride</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Share your trip details with a trusted contact</span>
              </li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="help" className="space-y-4 pt-4">
          <div className="bg-white rounded-lg p-4 border">
            <h3 className="font-medium mb-2">Common Questions</h3>
            <ul className="space-y-3">
              <li>
                <Button variant="link" className="p-0 h-auto text-left justify-start text-taxi-blue">
                  How do I update my payment method?
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-left justify-start text-taxi-blue">
                  I left an item in my ride
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-left justify-start text-taxi-blue">
                  How do I request a receipt?
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-left justify-start text-taxi-blue">
                  Report an issue with my ride
                </Button>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border">
            <h3 className="font-medium mb-2">Contact Support</h3>
            <p className="text-sm text-gray-500 mb-3">Need more help? Our team is here for you.</p>
            <Button className="w-full">Chat with Support</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="emergency" className="space-y-4 pt-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <h3 className="font-bold text-lg text-red-700 mb-2">Emergency Services</h3>
            <p className="text-red-600 mb-4">In case of emergency, please call local emergency services.</p>
            <Button className="w-full bg-red-600 hover:bg-red-700">Call 911</Button>
          </div>
          
          <div className="bg-white rounded-lg p-4 border">
            <h3 className="font-medium mb-3">Emergency Contacts</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                <span>Add Emergency Contact</span>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SafetyFeatures;

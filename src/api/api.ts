
// API service for handling data fetching and mutation

type LocationData = {
  latitude: number;
  longitude: number;
  address: string;
};

export type RideRequest = {
  id?: string;
  userId: string;
  pickupLocation: LocationData;
  dropoffLocation: LocationData;
  rideType: string;
  estimatedFare: number;
  estimatedTime: number;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  driverId?: string;
  createdAt: string;
};

export type Driver = {
  id: string;
  name: string;
  rating: number;
  carModel: string;
  licensePlate: string;
  photo: string;
  location: LocationData;
  isAvailable: boolean;
};

const API_URL = 'http://localhost:3001';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Fetch nearby drivers
  async getNearbyDrivers(): Promise<Driver[]> {
    try {
      // In a real app, this would be a server request
      // For the MVP, we'll use local data
      const response = await fetch(`${API_URL}/drivers`);
      const data = await response.json();
      await delay(800); // Simulate network delay
      return data;
    } catch (error) {
      console.error('Error fetching drivers:', error);
      // Return mock data when the server isn't available
      return mockDrivers;
    }
  },

  // Create a ride request
  async createRide(rideRequest: Omit<RideRequest, 'id' | 'createdAt' | 'status'>): Promise<RideRequest> {
    try {
      const response = await fetch(`${API_URL}/rides`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...rideRequest,
          status: 'pending',
          createdAt: new Date().toISOString(),
        }),
      });
      const data = await response.json();
      await delay(1000); // Simulate network delay
      return data;
    } catch (error) {
      console.error('Error creating ride:', error);
      // Return mock response when the server isn't available
      return {
        id: 'mock-ride-' + Date.now(),
        userId: rideRequest.userId,
        pickupLocation: rideRequest.pickupLocation,
        dropoffLocation: rideRequest.dropoffLocation,
        rideType: rideRequest.rideType,
        estimatedFare: rideRequest.estimatedFare,
        estimatedTime: rideRequest.estimatedTime,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
    }
  },
};

// Mock data for when the server isn't available
export const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'John Smith',
    rating: 4.8,
    carModel: 'Toyota Camry',
    licensePlate: 'ABC 123',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
    location: {
      latitude: 40.7128,
      longitude: -74.006,
      address: 'Near Downtown',
    },
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    rating: 4.9,
    carModel: 'Honda Civic',
    licensePlate: 'XYZ 789',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
    location: {
      latitude: 40.714,
      longitude: -74.0089,
      address: 'Central Park Area',
    },
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Robert Johnson',
    rating: 4.7,
    carModel: 'Ford Escape',
    licensePlate: 'DEF 456',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    location: {
      latitude: 40.7159,
      longitude: -74.0031,
      address: 'Brooklyn Heights',
    },
    isAvailable: true,
  },
];

export interface CarListing {
  id: string;
  user_id: string;
  title: string;
  year: number;
  make: string;
  model: string;
  trim_level: string;
  body_style: string;
  exterior_color: string;
  interior_color: string;
  mileage: number;
  engine_type: string;
  engine_size: string;
  cylinders: string;
  transmission: string;
  drivetrain: string;
  fuel_type: string;
  vin: string;
  price: number;
  condition: string;
  description: string;
  features: string[];
  images: string[];
  location_city: string;
  location_state: string;
  location_zip: string;
  seller_name: string;
  seller_phone: string;
  seller_email: string;
  seller_type: string;
  status: string;
  created_at: string;
  doors: string;
  seats: string;
  horsepower: string;
  torque: string;
  weight: string;
  top_speed: string;
  zero_to_sixty: string;
  mpg_city: string;
  mpg_highway: string;
  title_status: string;
  accident_history: string;
  owners_count: string;
  service_records: boolean;
  original_paint: boolean;
  matching_numbers: boolean;
}

export interface Auction {
  id: string;
  user_id: string;
  car_id: string;
  car?: CarListing;
  title: string;
  description: string;
  reserve_price: number;
  starting_bid: number;
  current_bid: number;
  highest_bidder_id: string;
  highest_bidder_name: string;
  duration_hours: number;
  start_time: string;
  end_time: string;
  status: string;
  bid_count: number;
  created_at: string;
  images: string[];
  year: number;
  make: string;
  model: string;
}

export interface Bid {
  id: string;
  auction_id: string;
  user_id: string;
  bidder_name: string;
  amount: number;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  display_name: string;
}

export type BodyStyle = 'Sedan' | 'Coupe' | 'Convertible' | 'Wagon' | 'Truck' | 'SUV' | 'Van' | 'Roadster' | 'Limousine' | 'Hatchback' | 'Other';
export type Condition = 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor' | 'Project' | 'Barn Find';
export type FuelType = 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid' | 'Other';
export type Transmission = 'Manual' | 'Automatic' | 'Semi-Automatic' | 'CVT' | 'Other';
export type Drivetrain = 'RWD' | 'FWD' | 'AWD' | '4WD' | 'Other';
export type SellerType = 'Private' | 'Dealer' | 'Auction House' | 'Estate Sale';
export type TitleStatus = 'Clean' | 'Rebuilt' | 'Salvage' | 'Bonded' | 'Parts Only';
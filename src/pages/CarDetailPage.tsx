import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { ArrowLeft } from 'lucide-react';

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { listings } = useData();
  const car = listings.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Car Not Found</h1>
        <Link to="/browse" className="text-gold hover:underline">Back to Browse</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-6">
      <Link to="/browse" className="flex items-center gap-1 text-gold mb-6 no-underline hover:underline">
        <ArrowLeft size={16} /> Back to Browse
      </Link>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="h-80 bg-gray-200 rounded mb-6 flex items-center justify-center overflow-hidden">
          {car.images?.[0] ? (
            <img src={car.images[0]} alt={car.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 text-lg">No Image Available</span>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">{car.year} {car.make} {car.model}</h1>
        {car.trim_level && <p className="text-gray-500 mb-4">{car.trim_level}</p>}
        <p className="text-gold text-3xl font-bold mb-6">${car.price.toLocaleString()}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div><span className="font-bold">Condition:</span> {car.condition}</div>
          <div><span className="font-bold">Mileage:</span> {car.mileage.toLocaleString()} mi</div>
          <div><span className="font-bold">Body:</span> {car.body_style}</div>
          <div><span className="font-bold">Exterior:</span> {car.exterior_color}</div>
          <div><span className="font-bold">Interior:</span> {car.interior_color}</div>
          <div><span className="font-bold">Transmission:</span> {car.transmission}</div>
          <div><span className="font-bold">Drivetrain:</span> {car.drivetrain}</div>
          <div><span className="font-bold">Fuel:</span> {car.fuel_type}</div>
          <div><span className="font-bold">Engine:</span> {car.engine_size} {car.cylinders}cyl</div>
        </div>
        {car.description && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="whitespace-pre-wrap">{car.description}</p>
          </div>
        )}
        {car.features && car.features.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Features</h2>
            <div className="flex flex-wrap gap-2">
              {car.features.map((f) => (
                <span key={f} className="bg-cream px-3 py-1 rounded text-sm">{f}</span>
              ))}
            </div>
          </div>
        )}
        <div className="border-t pt-4">
          <h2 className="text-xl font-bold mb-2">Seller Information</h2>
          <p>{car.seller_name} ({car.seller_type})</p>
          <p>{car.location_city}, {car.location_state} {car.location_zip}</p>
          {car.seller_email && <p>Email: {car.seller_email}</p>}
          {car.seller_phone && <p>Phone: {car.seller_phone}</p>}
        </div>
      </div>
    </div>
  );
}

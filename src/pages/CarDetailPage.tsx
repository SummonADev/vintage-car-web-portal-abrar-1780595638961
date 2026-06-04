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

  const detailRow = (label: string, value: string | number | boolean | undefined) => {
    if (value === undefined || value === '' || value === false) return null;
    const display = typeof value === 'boolean' ? 'Yes' : String(value);
    return (
      <div className="flex justify-between py-2 border-b border-gray-100">
        <span className="font-bold text-gray-600">{label}</span>
        <span>{display}</span>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-6">
      <Link to="/browse" className="flex items-center gap-1 text-gold mb-6 no-underline hover:underline">
        <ArrowLeft size={16} /> Back to Browse
      </Link>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="h-80 bg-gray-200 flex items-center justify-center overflow-hidden">
          {car.images?.[0] ? (
            <img src={car.images[0]} alt={car.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 text-lg">No Image Available</span>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              car.condition === 'Excellent' ? 'bg-green-100 text-green-700' :
              car.condition === 'Very Good' ? 'bg-blue-100 text-blue-700' :
              car.condition === 'Good' ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-700'
            }`}>{car.condition}</span>
            <span className="text-sm text-gray-500">{car.title_status && `Title: ${car.title_status}`}</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{car.year} {car.make} {car.model}</h1>
          {car.trim_level && <p className="text-gray-500 mb-4">{car.trim_level}</p>}
          <p className="text-gold text-3xl font-bold mb-6">${car.price.toLocaleString()}</p>

          {/* Key Specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-cream rounded p-3 text-center">
              <p className="text-xs text-gray-500">Mileage</p>
              <p className="font-bold">{car.mileage.toLocaleString()} mi</p>
            </div>
            <div className="bg-cream rounded p-3 text-center">
              <p className="text-xs text-gray-500">Transmission</p>
              <p className="font-bold">{car.transmission || 'N/A'}</p>
            </div>
            <div className="bg-cream rounded p-3 text-center">
              <p className="text-xs text-gray-500">Drivetrain</p>
              <p className="font-bold">{car.drivetrain || 'N/A'}</p>
            </div>
            <div className="bg-cream rounded p-3 text-center">
              <p className="text-xs text-gray-500">Engine</p>
              <p className="font-bold">{car.engine_size || 'N/A'}</p>
            </div>
          </div>

          {/* Full Details */}
          <h2 className="text-xl font-bold mb-3">Vehicle Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-6">
            {detailRow('Body Style', car.body_style)}
            {detailRow('Exterior Color', car.exterior_color)}
            {detailRow('Interior Color', car.interior_color)}
            {detailRow('Doors', car.doors)}
            {detailRow('Seats', car.seats)}
            {detailRow('Cylinders', car.cylinders)}
            {detailRow('Fuel Type', car.fuel_type)}
            {detailRow('Horsepower', car.horsepower ? `${car.horsepower} hp` : '')}
            {detailRow('Torque', car.torque ? `${car.torque} lb-ft` : '')}
            {detailRow('Weight', car.weight ? `${car.weight} lbs` : '')}
            {detailRow('Top Speed', car.top_speed ? `${car.top_speed} mph` : '')}
            {detailRow('0-60 mph', car.zero_to_sixty ? `${car.zero_to_sixty}s` : '')}
            {detailRow('MPG City', car.mpg_city)}
            {detailRow('MPG Highway', car.mpg_highway)}
            {detailRow('VIN', car.vin)}
            {detailRow('Title Status', car.title_status)}
            {detailRow('Accident History', car.accident_history)}
            {detailRow('Previous Owners', car.owners_count)}
            {detailRow('Service Records', car.service_records)}
            {detailRow('Original Paint', car.original_paint)}
            {detailRow('Matching Numbers', car.matching_numbers)}
          </div>

          {car.description && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Description</h2>
              <p className="whitespace-pre-wrap text-gray-700">{car.description}</p>
            </div>
          )}
          {car.features && car.features.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Features & Equipment</h2>
              <div className="flex flex-wrap gap-2">
                {car.features.map((f) => (
                  <span key={f} className="bg-cream px-3 py-1 rounded text-sm border border-gold/30">{f}</span>
                ))}
              </div>
            </div>
          )}
          <div className="border-t pt-4">
            <h2 className="text-xl font-bold mb-2">Seller Information</h2>
            <p className="font-bold">{car.seller_name} <span className="text-sm font-normal text-gray-500">({car.seller_type || 'Private'})</span></p>
            <p className="text-gray-600">{car.location_city}, {car.location_state} {car.location_zip}</p>
            {car.seller_email && <p className="text-gray-600">Email: <a href={`mailto:${car.seller_email}`} className="text-gold hover:underline">{car.seller_email}</a></p>}
            {car.seller_phone && <p className="text-gray-600">Phone: {car.seller_phone}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

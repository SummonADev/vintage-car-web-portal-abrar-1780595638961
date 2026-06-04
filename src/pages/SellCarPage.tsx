import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import {
  MAKES, BODY_STYLES, CONDITIONS, TRANSMISSIONS, DRIVETRAINS,
  FUEL_TYPES, EXTERIOR_COLORS, INTERIOR_COLORS, CYLINDERS,
  SELLER_TYPES, TITLE_STATUSES, DOORS, SEATS, ACCIDENT_HISTORY, FEATURES
} from '@/data/constants';
import { CarListing } from '@/types';

export default function SellCarPage() {
  const { user } = useAuth();
  const { setListings } = useData();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [trimLevel, setTrimLevel] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [condition, setCondition] = useState<string>('');
  const [bodyStyle, setBodyStyle] = useState<string>('');
  const [exteriorColor, setExteriorColor] = useState<string>('');
  const [interiorColor, setInteriorColor] = useState<string>('');
  const [mileage, setMileage] = useState<string>('');
  const [transmission, setTransmission] = useState<string>('');
  const [drivetrain, setDrivetrain] = useState<string>('');
  const [fuelType, setFuelType] = useState<string>('');
  const [engineSize, setEngineSize] = useState<string>('');
  const [cylinders, setCylinders] = useState<string>('');
  const [vin, setVin] = useState<string>('');
  const [doors, setDoors] = useState<string>('');
  const [seats, setSeats] = useState<string>('');
  const [horsepower, setHorsepower] = useState<string>('');
  const [torque, setTorque] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [topSpeed, setTopSpeed] = useState<string>('');
  const [zeroToSixty, setZeroToSixty] = useState<string>('');
  const [mpgCity, setMpgCity] = useState<string>('');
  const [mpgHighway, setMpgHighway] = useState<string>('');
  const [titleStatus, setTitleStatus] = useState<string>('');
  const [accidentHistory, setAccidentHistory] = useState<string>('');
  const [ownersCount, setOwnersCount] = useState<string>('');
  const [serviceRecords, setServiceRecords] = useState<boolean>(false);
  const [originalPaint, setOriginalPaint] = useState<boolean>(false);
  const [matchingNumbers, setMatchingNumbers] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sellerName, setSellerName] = useState<string>('');
  const [sellerEmail, setSellerEmail] = useState<string>('');
  const [sellerPhone, setSellerPhone] = useState<string>('');
  const [sellerType, setSellerType] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zip, setZip] = useState<string>('');

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to list a car</h1>
        <Link to="/login" className="text-gold hover:underline">Sign In</Link>
      </div>
    );
  }

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: CarListing = {
      id: crypto.randomUUID(),
      user_id: user.id,
      title: title || `${year} ${make} ${model}`,
      year: parseInt(year),
      make,
      model,
      trim_level: trimLevel,
      body_style: bodyStyle,
      exterior_color: exteriorColor,
      interior_color: interiorColor,
      mileage: parseInt(mileage) || 0,
      engine_type: '',
      engine_size: engineSize,
      cylinders,
      transmission,
      drivetrain,
      fuel_type: fuelType,
      vin,
      price: parseFloat(price) || 0,
      condition,
      description,
      features: selectedFeatures,
      images: [],
      location_city: city,
      location_state: state,
      location_zip: zip,
      seller_name: sellerName,
      seller_phone: sellerPhone,
      seller_email: sellerEmail,
      seller_type: sellerType,
      status: 'active',
      created_at: new Date().toISOString(),
      doors,
      seats,
      horsepower,
      torque,
      weight,
      top_speed: topSpeed,
      zero_to_sixty: zeroToSixty,
      mpg_city: mpgCity,
      mpg_highway: mpgHighway,
      title_status: titleStatus,
      accident_history: accidentHistory,
      owners_count: ownersCount,
      service_records: serviceRecords,
      original_paint: originalPaint,
      matching_numbers: matchingNumbers,
    };
    setListings((prev) => [...prev, newListing]);
    navigate(`/car/${newListing.id}`);
  };

  const selectClass = 'border border-gray-300 rounded px-4 py-2 w-full bg-white';
  const inputClass = 'border border-gray-300 rounded px-4 py-2 w-full';
  const labelClass = 'block text-sm font-bold text-gray-600 mb-1';

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold mb-6">Sell Your Vintage Car</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-gold">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Listing Title</label>
              <input className={inputClass} placeholder="e.g. 1967 Ford Mustang Fastback GT" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><label className={labelClass}>Year *</label><input className={inputClass} type="number" placeholder="1967" value={year} onChange={(e) => setYear(e.target.value)} required /></div>
              <div><label className={labelClass}>Make *</label><select className={selectClass} value={make} onChange={(e) => setMake(e.target.value)} required><option value="">Select</option>{MAKES.map((m) => <option key={m} value={m}>{m}</option>)}</select></div>
              <div><label className={labelClass}>Model *</label><input className={inputClass} placeholder="Mustang" value={model} onChange={(e) => setModel(e.target.value)} required /></div>
              <div><label className={labelClass}>Trim</label><input className={inputClass} placeholder="GT Fastback" value={trimLevel} onChange={(e) => setTrimLevel(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelClass}>Price ($) *</label><input className={inputClass} type="number" placeholder="85000" value={price} onChange={(e) => setPrice(e.target.value)} required /></div>
              <div><label className={labelClass}>Mileage</label><input className={inputClass} type="number" placeholder="78500" value={mileage} onChange={(e) => setMileage(e.target.value)} /></div>
            </div>
          </div>
        </div>

        {/* Exterior & Interior */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-gold">Appearance & Body</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><label className={labelClass}>Condition</label><select className={selectClass} value={condition} onChange={(e) => setCondition(e.target.value)}><option value="">Select</option>{CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className={labelClass}>Body Style</label><select className={selectClass} value={bodyStyle} onChange={(e) => setBodyStyle(e.target.value)}><option value="">Select</option>{BODY_STYLES.map((b) => <option key={b} value={b}>{b}</option>)}</select></div>
            <div><label className={labelClass}>Exterior Color</label><select className={selectClass} value={exteriorColor} onChange={(e) => setExteriorColor(e.target.value)}><option value="">Select</option>{EXTERIOR_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className={labelClass}>Interior Color</label><select className={selectClass} value={interiorColor} onChange={(e) => setInteriorColor(e.target.value)}><option value="">Select</option>{INTERIOR_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className={labelClass}>Doors</label><select className={selectClass} value={doors} onChange={(e) => setDoors(e.target.value)}><option value="">Select</option>{DOORS.map((d) => <option key={d} value={d}>{d}</option>)}</select></div>
            <div><label className={labelClass}>Seats</label><select className={selectClass} value={seats} onChange={(e) => setSeats(e.target.value)}><option value="">Select</option>{SEATS.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
          </div>
        </div>

        {/* Engine & Drivetrain */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-gold">Engine & Drivetrain</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><label className={labelClass}>Engine Size</label><input className={inputClass} placeholder="289ci" value={engineSize} onChange={(e) => setEngineSize(e.target.value)} /></div>
            <div><label className={labelClass}>Cylinders</label><select className={selectClass} value={cylinders} onChange={(e) => setCylinders(e.target.value)}><option value="">Select</option>{CYLINDERS.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className={labelClass}>Transmission</label><select className={selectClass} value={transmission} onChange={(e) => setTransmission(e.target.value)}><option value="">Select</option>{TRANSMISSIONS.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
            <div><label className={labelClass}>Drivetrain</label><select className={selectClass} value={drivetrain} onChange={(e) => setDrivetrain(e.target.value)}><option value="">Select</option>{DRIVETRAINS.map((d) => <option key={d} value={d}>{d}</option>)}</select></div>
            <div><label className={labelClass}>Fuel Type</label><select className={selectClass} value={fuelType} onChange={(e) => setFuelType(e.target.value)}><option value="">Select</option>{FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}</select></div>
            <div><label className={labelClass}>VIN</label><input className={inputClass} placeholder="Vehicle ID Number" value={vin} onChange={(e) => setVin(e.target.value)} /></div>
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-gold">Performance</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><label className={labelClass}>Horsepower</label><input className={inputClass} placeholder="225" value={horsepower} onChange={(e) => setHorsepower(e.target.value)} /></div>
            <div><label className={labelClass}>Torque (lb-ft)</label><input className={inputClass} placeholder="305" value={torque} onChange={(e) => setTorque(e.target.value)} /></div>
            <div><label className={labelClass}>Weight (lbs)</label><input className={inputClass} placeholder="2800" value={weight} onChange={(e) => setWeight(e.target.value)} /></div>
            <div><label className={labelClass}>Top Speed (mph)</label><input className={inputClass} placeholder="120" value={topSpeed} onChange={(e) => setTopSpeed(e.target.value)} /></div>
            <div><label className={labelClass}>0-60 mph (sec)</label><input className={inputClass} placeholder="7.5" value={zeroToSixty} onChange={(e) => setZeroToSixty(e.target.value)} /></div>
            <div><label className={labelClass}>MPG City</label><input className={inputClass} placeholder="12" value={mpgCity} onChange={(e) => setMpgCity(e.target.value)} /></div>
            <div><label className={labelClass}>MPG Highway</label><input className={inputClass} placeholder="18" value={mpgHighway} onChange={(e) => setMpgHighway(e.target.value)} /></div>
          </div>
        </div>

        {/* History & Title */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-gold">History & Title</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><label className={labelClass}>Title Status</label><select className={selectClass} value={titleStatus} onChange={(e) => setTitleStatus(e.target.value)}><option value="">Select</option>{TITLE_STATUSES.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
            <div><label className={labelClass}>Accident History</label><select className={selectClass} value={accidentHistory} onChange={(e) => setAccidentHistory(e.target.value)}><option value="">Select</option>{ACCIDENT_HISTORY.map((a) => <option key={a} value={a}>{a}</option>)}</select></div>
            <div><label className={labelClass}>Number of Owners</label><input className={inputClass} placeholder="3" value={ownersCount} onChange={(e) => setOwnersCount(e.target.value)} /></div>
          </div>
          <div className="flex flex-wrap gap-6 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={serviceRecords} onChange={(e) => setServiceRecords(e.target.checked)} className="w-4 h-4" />
              <span className="text-sm">Service Records Available</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={originalPaint} onChange={(e) => setOriginalPaint(e.target.checked)} className="w-4 h-4" />
              <span className="text-sm">Original Paint</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={matchingNumbers} onChange={(e) => setMatchingNumbers(e.target.checked)} className="w-4 h-4" />
              <span className="text-sm">Matching Numbers</span>
            </label>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-gold">Features & Equipment</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {FEATURES.map((feature) => (
              <label key={feature} className="flex items-center gap-2 cursor-pointer text-sm py-1">
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(feature)}
                  onChange={() => toggleFeature(feature)}
                  className="w-4 h-4"
                />
                {feature}
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-gold">Description</h2>
          <textarea className={inputClass + ' h-40'} placeholder="Tell buyers everything about this vehicle — its history, condition, restoration details, provenance, awards, etc." value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        {/* Seller Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-gold">Seller Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>Name</label><input className={inputClass} placeholder="Your name or business" value={sellerName} onChange={(e) => setSellerName(e.target.value)} /></div>
            <div><label className={labelClass}>Seller Type</label><select className={selectClass} value={sellerType} onChange={(e) => setSellerType(e.target.value)}><option value="">Select</option>{SELLER_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
            <div><label className={labelClass}>Email</label><input className={inputClass} type="email" placeholder="your@email.com" value={sellerEmail} onChange={(e) => setSellerEmail(e.target.value)} /></div>
            <div><label className={labelClass}>Phone</label><input className={inputClass} placeholder="(555) 555-0123" value={sellerPhone} onChange={(e) => setSellerPhone(e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div><label className={labelClass}>City</label><input className={inputClass} placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} /></div>
            <div><label className={labelClass}>State</label><input className={inputClass} placeholder="State" value={state} onChange={(e) => setState(e.target.value)} /></div>
            <div><label className={labelClass}>ZIP</label><input className={inputClass} placeholder="ZIP Code" value={zip} onChange={(e) => setZip(e.target.value)} /></div>
          </div>
        </div>

        <button type="submit" className="bg-gold text-navy px-8 py-4 rounded font-bold hover:bg-gold-dark transition-colors w-full text-lg">
          Publish Listing
        </button>
      </form>
    </div>
  );
}

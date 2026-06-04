import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { MAKES, BODY_STYLES, CONDITIONS, TRANSMISSIONS, DRIVETRAINS, FUEL_TYPES, EXTERIOR_COLORS, INTERIOR_COLORS, CYLINDERS, SELLER_TYPES, TITLE_STATUSES } from '@/data/constants';
import { CarListing } from '@/types';

export default function SellCarPage() {
  const { user } = useAuth();
  const { listings, setListings } = useData();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [bodyStyle, setBodyStyle] = useState('');
  const [exteriorColor, setExteriorColor] = useState('');
  const [interiorColor, setInteriorColor] = useState('');
  const [mileage, setMileage] = useState('');
  const [transmission, setTransmission] = useState('');
  const [drivetrain, setDrivetrain] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [engineSize, setEngineSize] = useState('');
  const [cylinders, setCylinders] = useState('');
  const [description, setDescription] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [sellerType, setSellerType] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to list a car</h1>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: CarListing = {
      id: crypto.randomUUID(),
      user_id: user.id,
      title: title || `${year} ${make} ${model}`,
      year: parseInt(year),
      make,
      model,
      trim_level: '',
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
      vin: '',
      price: parseFloat(price) || 0,
      condition,
      description,
      features: [],
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
      doors: '',
      seats: '',
      horsepower: '',
      torque: '',
      weight: '',
      top_speed: '',
      zero_to_sixty: '',
      mpg_city: '',
      mpg_highway: '',
      title_status: '',
      accident_history: '',
      owners_count: '',
      service_records: false,
      original_paint: false,
      matching_numbers: false,
    };
    setListings([...listings, newListing]);
    navigate(`/car/${newListing.id}`);
  };

  const selectClass = "border border-gray-300 rounded px-4 py-2 w-full";
  const inputClass = "border border-gray-300 rounded px-4 py-2 w-full";

  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold mb-6">Sell Your Vintage Car</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className={inputClass} placeholder="Listing Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <input className={inputClass} placeholder="Year" type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
          <select className={selectClass} value={make} onChange={(e) => setMake(e.target.value)} required>
            <option value="">Make</option>
            {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <input className={inputClass} placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input className={inputClass} placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <input className={inputClass} placeholder="Mileage" type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <select className={selectClass} value={condition} onChange={(e) => setCondition(e.target.value)}>
            <option value="">Condition</option>
            {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className={selectClass} value={bodyStyle} onChange={(e) => setBodyStyle(e.target.value)}>
            <option value="">Body Style</option>
            {BODY_STYLES.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <select className={selectClass} value={transmission} onChange={(e) => setTransmission(e.target.value)}>
            <option value="">Transmission</option>
            {TRANSMISSIONS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select className={selectClass} value={drivetrain} onChange={(e) => setDrivetrain(e.target.value)}>
            <option value="">Drivetrain</option>
            {DRIVETRAINS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className={selectClass} value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
            <option value="">Fuel Type</option>
            {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          <select className={selectClass} value={cylinders} onChange={(e) => setCylinders(e.target.value)}>
            <option value="">Cylinders</option>
            {CYLINDERS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className={selectClass} value={exteriorColor} onChange={(e) => setExteriorColor(e.target.value)}>
            <option value="">Exterior Color</option>
            {EXTERIOR_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className={selectClass} value={interiorColor} onChange={(e) => setInteriorColor(e.target.value)}>
            <option value="">Interior Color</option>
            {INTERIOR_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input className={inputClass} placeholder="Engine Size" value={engineSize} onChange={(e) => setEngineSize(e.target.value)} />
        </div>
        <textarea className={inputClass + " h-32"} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <h2 className="text-xl font-bold">Seller Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <input className={inputClass} placeholder="Name" value={sellerName} onChange={(e) => setSellerName(e.target.value)} />
          <select className={selectClass} value={sellerType} onChange={(e) => setSellerType(e.target.value)}>
            <option value="">Seller Type</option>
            {SELLER_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input className={inputClass} placeholder="Email" value={sellerEmail} onChange={(e) => setSellerEmail(e.target.value)} />
          <input className={inputClass} placeholder="Phone" value={sellerPhone} onChange={(e) => setSellerPhone(e.target.value)} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <input className={inputClass} placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <input className={inputClass} placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
          <input className={inputClass} placeholder="ZIP" value={zip} onChange={(e) => setZip(e.target.value)} />
        </div>
        <button type="submit" className="bg-gold text-navy px-8 py-3 rounded font-bold hover:bg-gold-dark transition-colors w-full">
          Create Listing
        </button>
      </form>
    </div>
  );
}

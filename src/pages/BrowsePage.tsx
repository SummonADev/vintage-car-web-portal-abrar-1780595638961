import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { MAKES, BODY_STYLES, CONDITIONS } from '@/data/constants';

export default function BrowsePage() {
  const { listings } = useData();
  const [search, setSearch] = useState('');
  const [makeFilter, setMakeFilter] = useState('');
  const [bodyFilter, setBodyFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');

  const filtered = listings.filter((car) => {
    const matchesSearch = !search || car.title.toLowerCase().includes(search.toLowerCase()) || car.make.toLowerCase().includes(search.toLowerCase()) || car.model.toLowerCase().includes(search.toLowerCase());
    const matchesMake = !makeFilter || car.make === makeFilter;
    const matchesBody = !bodyFilter || car.body_style === bodyFilter;
    const matchesCondition = !conditionFilter || car.condition === conditionFilter;
    return matchesSearch && matchesMake && matchesBody && matchesCondition && car.status === 'active';
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold mb-6">Browse Vintage Cars</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <select value={makeFilter} onChange={(e) => setMakeFilter(e.target.value)} className="border border-gray-300 rounded px-4 py-2">
          <option value="">All Makes</option>
          {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={bodyFilter} onChange={(e) => setBodyFilter(e.target.value)} className="border border-gray-300 rounded px-4 py-2">
          <option value="">All Body Styles</option>
          {BODY_STYLES.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        <select value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)} className="border border-gray-300 rounded px-4 py-2">
          <option value="">All Conditions</option>
          {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No listings found. Be the first to list a vintage car!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((car) => (
            <Link key={car.id} to={`/car/${car.id}`} className="no-underline text-inherit">
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {car.images?.[0] ? (
                    <img src={car.images[0]} alt={car.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{car.year} {car.make} {car.model}</h3>
                  <p className="text-gold font-bold text-xl">${car.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{car.condition} &middot; {car.mileage.toLocaleString()} miles</p>
                  <p className="text-sm text-gray-500">{car.location_city}, {car.location_state}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

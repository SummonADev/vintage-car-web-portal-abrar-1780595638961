import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { MAKES, AUCTION_DURATIONS } from '@/data/constants';
import { Auction } from '@/types';

export default function CreateAuctionPage() {
  const { user } = useAuth();
  const { auctions, setAuctions } = useData();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [reservePrice, setReservePrice] = useState('');
  const [duration, setDuration] = useState('72');

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to create an auction</h1>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const endTime = new Date(now.getTime() + parseInt(duration) * 60 * 60 * 1000);
    const newAuction: Auction = {
      id: crypto.randomUUID(),
      user_id: user.id,
      car_id: '',
      title: title || `${year} ${make} ${model}`,
      description,
      reserve_price: parseFloat(reservePrice) || 0,
      starting_bid: parseFloat(startingBid) || 0,
      current_bid: parseFloat(startingBid) || 0,
      highest_bidder_id: '',
      highest_bidder_name: '',
      duration_hours: parseInt(duration),
      start_time: now.toISOString(),
      end_time: endTime.toISOString(),
      status: 'active',
      bid_count: 0,
      created_at: now.toISOString(),
      images: [],
      year: parseInt(year),
      make,
      model,
    };
    setAuctions([...auctions, newAuction]);
    navigate(`/auction/${newAuction.id}`);
  };

  const inputClass = "border border-gray-300 rounded px-4 py-2 w-full";
  const selectClass = "border border-gray-300 rounded px-4 py-2 w-full";

  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold mb-6">Create Auction</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className={inputClass} placeholder="Auction Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="grid grid-cols-3 gap-4">
          <input className={inputClass} placeholder="Year" type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
          <select className={selectClass} value={make} onChange={(e) => setMake(e.target.value)} required>
            <option value="">Make</option>
            {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <input className={inputClass} placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <input className={inputClass} placeholder="Starting Bid" type="number" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} required />
          <input className={inputClass} placeholder="Reserve Price" type="number" value={reservePrice} onChange={(e) => setReservePrice(e.target.value)} />
          <select className={selectClass} value={duration} onChange={(e) => setDuration(e.target.value)}>
            {AUCTION_DURATIONS.map((d) => <option key={d} value={d}>{d} hours</option>)}
          </select>
        </div>
        <textarea className={inputClass + " h-32"} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit" className="bg-gold text-navy px-8 py-3 rounded font-bold hover:bg-gold-dark transition-colors w-full">
          Create Auction
        </button>
      </form>
    </div>
  );
}

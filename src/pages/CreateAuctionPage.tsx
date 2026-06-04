import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { MAKES, AUCTION_DURATIONS } from '@/data/constants';
import { Auction } from '@/types';
import { Link } from 'react-router-dom';

export default function CreateAuctionPage() {
  const { user } = useAuth();
  const { setAuctions } = useData();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startingBid, setStartingBid] = useState<string>('');
  const [reservePrice, setReservePrice] = useState<string>('');
  const [duration, setDuration] = useState<string>('72');

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to create an auction</h1>
        <Link to="/login" className="text-gold hover:underline">Sign In</Link>
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
    setAuctions((prev) => [...prev, newAuction]);
    navigate(`/auction/${newAuction.id}`);
  };

  const inputClass = 'border border-gray-300 rounded px-4 py-2 w-full';
  const selectClass = 'border border-gray-300 rounded px-4 py-2 w-full';

  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold mb-6">Create Auction</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg shadow p-6">
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">Auction Title</label>
          <input className={inputClass} placeholder="e.g. 1967 Shelby GT500" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Year *</label>
            <input className={inputClass} placeholder="1965" type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Make *</label>
            <select className={selectClass} value={make} onChange={(e) => setMake(e.target.value)} required>
              <option value="">Select Make</option>
              {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Model *</label>
            <input className={inputClass} placeholder="Mustang" value={model} onChange={(e) => setModel(e.target.value)} required />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Starting Bid ($) *</label>
            <input className={inputClass} placeholder="50000" type="number" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Reserve Price ($)</label>
            <input className={inputClass} placeholder="75000" type="number" value={reservePrice} onChange={(e) => setReservePrice(e.target.value)} />
            <p className="text-xs text-gray-400 mt-1">Hidden from bidders</p>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Duration</label>
            <select className={selectClass} value={duration} onChange={(e) => setDuration(e.target.value)}>
              {AUCTION_DURATIONS.map((d) => <option key={d} value={d}>{d} hour{d !== 1 ? 's' : ''}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">Description</label>
          <textarea className={inputClass + ' h-32'} placeholder="Describe the vehicle, its history, condition, provenance..." value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit" className="bg-gold text-navy px-8 py-3 rounded font-bold hover:bg-gold-dark transition-colors w-full text-lg">
          Launch Auction
        </button>
      </form>
    </div>
  );
}

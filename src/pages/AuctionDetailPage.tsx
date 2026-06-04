import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Gavel } from 'lucide-react';
import { Bid } from '@/types';

export default function AuctionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { auctions, setAuctions, bids, setBids } = useData();
  const { user } = useAuth();
  const [bidAmount, setBidAmount] = useState('');

  const auction = auctions.find((a) => a.id === id);
  const auctionBids = bids.filter((b) => b.auction_id === id).sort((a, b) => b.amount - a.amount);

  if (!auction) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Auction Not Found</h1>
        <Link to="/auctions" className="text-gold hover:underline">Back to Auctions</Link>
      </div>
    );
  }

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= auction.current_bid) return;

    const newBid: Bid = {
      id: crypto.randomUUID(),
      auction_id: auction.id,
      user_id: user.id,
      bidder_name: user.display_name,
      amount,
      created_at: new Date().toISOString(),
    };
    setBids([...bids, newBid]);
    setAuctions(auctions.map((a) => a.id === auction.id ? { ...a, current_bid: amount, highest_bidder_id: user.id, highest_bidder_name: user.display_name, bid_count: a.bid_count + 1 } : a));
    setBidAmount('');
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-6">
      <Link to="/auctions" className="flex items-center gap-1 text-gold mb-6 no-underline hover:underline">
        <ArrowLeft size={16} /> Back to Auctions
      </Link>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="h-80 bg-gray-200 rounded mb-6 flex items-center justify-center overflow-hidden">
          {auction.images?.[0] ? (
            <img src={auction.images[0]} alt={auction.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 text-lg">No Image Available</span>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">{auction.title}</h1>
        <p className="text-gray-500 mb-4">{auction.year} {auction.make} {auction.model}</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-cream rounded p-4">
            <p className="text-sm text-gray-500">Current Bid</p>
            <p className="text-gold text-3xl font-bold">${auction.current_bid.toLocaleString()}</p>
          </div>
          <div className="bg-cream rounded p-4">
            <p className="text-sm text-gray-500">Bids</p>
            <p className="text-2xl font-bold">{auction.bid_count}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">Ends: {new Date(auction.end_time).toLocaleString()}</p>
        {auction.description && <p className="mb-6 whitespace-pre-wrap">{auction.description}</p>}
        {user && auction.status === 'active' && (
          <form onSubmit={handleBid} className="flex gap-2 mb-6">
            <input
              type="number"
              step="0.01"
              placeholder={`Min bid: $${(auction.current_bid + 1).toLocaleString()}`}
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 flex-1"
            />
            <button type="submit" className="bg-gold text-navy px-6 py-2 rounded font-bold hover:bg-gold-dark transition-colors flex items-center gap-1">
              <Gavel size={16} /> Place Bid
            </button>
          </form>
        )}
        {!user && <p className="text-gray-500 mb-6">Sign in to place a bid.</p>}
        <h2 className="text-xl font-bold mb-3">Bid History</h2>
        {auctionBids.length === 0 ? (
          <p className="text-gray-500">No bids yet. Be the first!</p>
        ) : (
          <div className="space-y-2">
            {auctionBids.map((bid) => (
              <div key={bid.id} className="flex justify-between bg-cream rounded px-4 py-2">
                <span>{bid.bidder_name}</span>
                <span className="font-bold">${bid.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

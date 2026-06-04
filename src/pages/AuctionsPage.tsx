import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Gavel, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AuctionsPage() {
  const { auctions } = useData();
  const { user } = useAuth();
  const activeAuctions = auctions.filter((a) => a.status === 'active');

  return (
    <div className="max-w-7xl mx-auto py-8 px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2"><Gavel size={28} /> Live Auctions</h1>
        {user && (
          <Link to="/auction/create" className="bg-gold text-navy px-6 py-2 rounded font-bold no-underline hover:bg-gold-dark transition-colors flex items-center gap-1">
            <Plus size={16} /> Create Auction
          </Link>
        )}
      </div>
      {activeAuctions.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No active auctions. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeAuctions.map((auction) => (
            <Link key={auction.id} to={`/auction/${auction.id}`} className="no-underline text-inherit">
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {auction.images?.[0] ? (
                    <img src={auction.images[0]} alt={auction.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{auction.title}</h3>
                  <p className="text-gold font-bold text-xl">Current Bid: ${auction.current_bid.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{auction.bid_count} bids</p>
                  <p className="text-sm text-gray-500">Ends: {new Date(auction.end_time).toLocaleString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

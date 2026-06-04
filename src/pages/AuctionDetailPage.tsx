import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Gavel, Shield, AlertTriangle } from 'lucide-react';
import { Bid } from '@/types';
import AuctionCountdown from '@/components/AuctionCountdown';

export default function AuctionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { auctions, setAuctions, bids, setBids, expireAuction } = useData();
  const { user } = useAuth();
  const [bidAmount, setBidAmount] = useState<string>('');
  const [bidError, setBidError] = useState<string>('');

  const auction = auctions.find((a) => a.id === id);
  const auctionBids = bids.filter((b) => b.auction_id === id).sort((a, b) => b.amount - a.amount);

  const handleExpired = useCallback(() => {
    if (id) {
      expireAuction(id);
    }
  }, [id, expireAuction]);

  if (!auction) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Auction Not Found</h1>
        <Link to="/auctions" className="text-gold hover:underline">Back to Auctions</Link>
      </div>
    );
  }

  const isActive = auction.status === 'active' && new Date(auction.end_time).getTime() > Date.now();
  const reserveMet = auction.current_bid >= auction.reserve_price;
  const minBid = auction.current_bid + (auction.current_bid >= 1000000 ? 50000 : auction.current_bid >= 100000 ? 5000 : auction.current_bid >= 10000 ? 500 : 100);

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    setBidError('');
    if (!user) {
      setBidError('You must be signed in to bid.');
      return;
    }
    if (user.id === auction.user_id) {
      setBidError('You cannot bid on your own auction.');
      return;
    }
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount < minBid) {
      setBidError(`Minimum bid is $${minBid.toLocaleString()}`);
      return;
    }

    const newBid: Bid = {
      id: crypto.randomUUID(),
      auction_id: auction.id,
      user_id: user.id,
      bidder_name: user.display_name,
      amount,
      created_at: new Date().toISOString(),
    };
    setBids((prev) => [...prev, newBid]);
    setAuctions((prev) =>
      prev.map((a) =>
        a.id === auction.id
          ? { ...a, current_bid: amount, highest_bidder_id: user.id, highest_bidder_name: user.display_name, bid_count: a.bid_count + 1 }
          : a
      )
    );
    setBidAmount('');
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-6">
      <Link to="/auctions" className="flex items-center gap-1 text-gold mb-6 no-underline hover:underline">
        <ArrowLeft size={16} /> Back to Auctions
      </Link>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="h-80 bg-gray-200 flex items-center justify-center overflow-hidden">
          {auction.images?.[0] ? (
            <img src={auction.images[0]} alt={auction.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 text-lg">No Image Available</span>
          )}
        </div>
        <div className="p-6">
          {/* Status badge */}
          <div className="flex items-center gap-3 mb-4">
            {isActive ? (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">Live Auction</span>
            ) : auction.status === 'sold' ? (
              <span className="bg-gold text-navy px-3 py-1 rounded-full text-sm font-bold">Sold</span>
            ) : (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">Ended</span>
            )}
            {reserveMet ? (
              <span className="flex items-center gap-1 text-green-600 text-sm font-bold"><Shield size={14} /> Reserve Met</span>
            ) : (
              <span className="flex items-center gap-1 text-orange-500 text-sm font-bold"><AlertTriangle size={14} /> Reserve Not Met</span>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-2">{auction.title}</h1>
          <p className="text-gray-500 mb-4">{auction.year} {auction.make} {auction.model}</p>

          {/* Countdown */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-1">Time Remaining</p>
            <AuctionCountdown endTime={auction.end_time} onExpired={handleExpired} />
          </div>

          {/* Bid stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-cream rounded p-4">
              <p className="text-sm text-gray-500">Current Bid</p>
              <p className="text-gold text-2xl font-bold">${auction.current_bid.toLocaleString()}</p>
            </div>
            <div className="bg-cream rounded p-4">
              <p className="text-sm text-gray-500">Bids</p>
              <p className="text-2xl font-bold">{auction.bid_count}</p>
            </div>
            <div className="bg-cream rounded p-4">
              <p className="text-sm text-gray-500">Starting Bid</p>
              <p className="text-2xl font-bold">${auction.starting_bid.toLocaleString()}</p>
            </div>
            <div className="bg-cream rounded p-4">
              <p className="text-sm text-gray-500">Highest Bidder</p>
              <p className="text-lg font-bold truncate">{auction.highest_bidder_name || 'None yet'}</p>
            </div>
          </div>

          {auction.description && <p className="mb-6 whitespace-pre-wrap text-gray-700">{auction.description}</p>}

          {/* Bid form */}
          {isActive && user && user.id !== auction.user_id && (
            <div className="bg-cream rounded-lg p-4 mb-6">
              <h3 className="font-bold mb-2">Place Your Bid</h3>
              <p className="text-sm text-gray-500 mb-3">Minimum bid: ${minBid.toLocaleString()}</p>
              {bidError && <p className="text-red-600 text-sm mb-2">{bidError}</p>}
              <form onSubmit={handleBid} className="flex gap-2">
                <input
                  type="number"
                  step="1"
                  placeholder={`$${minBid.toLocaleString()}`}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 flex-1"
                />
                <button type="submit" className="bg-gold text-navy px-6 py-2 rounded font-bold hover:bg-gold-dark transition-colors flex items-center gap-1">
                  <Gavel size={16} /> Bid
                </button>
              </form>
            </div>
          )}
          {isActive && user && user.id === auction.user_id && (
            <p className="text-gray-500 mb-6 italic">This is your auction. You cannot bid on it.</p>
          )}
          {isActive && !user && (
            <div className="bg-cream rounded-lg p-4 mb-6 text-center">
              <p className="text-gray-600 mb-2">You must be signed in to place a bid.</p>
              <Link to="/login" className="text-gold font-bold hover:underline">Sign In →</Link>
            </div>
          )}

          {/* Bid History */}
          <h2 className="text-xl font-bold mb-3">Bid History</h2>
          {auctionBids.length === 0 ? (
            <p className="text-gray-500">No bids yet. Be the first!</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {auctionBids.map((bid, idx) => (
                <div key={bid.id} className={`flex justify-between items-center rounded px-4 py-2 ${idx === 0 ? 'bg-gold/10 border border-gold' : 'bg-cream'}`}>
                  <div>
                    <span className="font-bold">{bid.bidder_name}</span>
                    {idx === 0 && <span className="ml-2 text-xs bg-gold text-navy px-2 py-0.5 rounded-full">Highest</span>}
                  </div>
                  <div className="text-right">
                    <span className="font-bold">${bid.amount.toLocaleString()}</span>
                    <p className="text-xs text-gray-400">{new Date(bid.created_at).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

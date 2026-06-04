import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';

export default function MyListingsPage() {
  const { user } = useAuth();
  const { listings, auctions } = useData();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your listings</h1>
        <Link to="/login" className="text-gold hover:underline">Sign In</Link>
      </div>
    );
  }

  const myListings = listings.filter((l) => l.user_id === user.id);
  const myAuctions = auctions.filter((a) => a.user_id === user.id);

  return (
    <div className="max-w-7xl mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold mb-6">My Listings</h1>

      <h2 className="text-2xl font-bold mb-4">Car Listings</h2>
      {myListings.length === 0 ? (
        <p className="text-gray-500 mb-8">You haven't listed any cars yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {myListings.map((car) => (
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
                  <p className="text-sm text-gray-500">Status: {car.status}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">My Auctions</h2>
      {myAuctions.length === 0 ? (
        <p className="text-gray-500">You haven't created any auctions yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myAuctions.map((auction) => (
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
                  <p className="text-sm text-gray-500">{auction.bid_count} bids &middot; {auction.status}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

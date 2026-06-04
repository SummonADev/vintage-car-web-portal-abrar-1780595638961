import { Link } from 'react-router-dom';
import { Gavel, Search } from 'lucide-react';
import { useData } from '@/context/DataContext';
import VCCPLogo from '@/components/VCCPLogo';
import AuctionCountdown from '@/components/AuctionCountdown';

export default function HomePage() {
  const { listings, auctions } = useData();
  const activeListings = listings.filter((l) => l.status === 'active').slice(0, 3);
  const activeAuctions = auctions.filter((a) => a.status === 'active').slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy text-cream py-20 px-6 text-center">
        <div className="flex justify-center mb-6">
          <VCCPLogo size={96} />
        </div>
        <h1 className="text-5xl font-bold text-gold mb-2">VCCP</h1>
        <p className="text-lg text-cream opacity-80 mb-4 tracking-widest">Vintage Car Collective Portal</p>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Discover, buy, sell, and auction classic and vintage automobiles from every era.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/browse"
            className="bg-gold text-navy px-8 py-3 rounded font-bold no-underline hover:bg-gold-dark transition-colors flex items-center gap-2"
          >
            <Search size={20} /> Browse Cars
          </Link>
          <Link
            to="/auctions"
            className="border-2 border-gold text-gold px-8 py-3 rounded font-bold no-underline hover:bg-gold hover:text-navy transition-colors flex items-center gap-2"
          >
            <Gavel size={20} /> Live Auctions
          </Link>
        </div>
      </section>

      {/* Featured Listings */}
      {activeListings.length > 0 && (
        <section className="max-w-7xl mx-auto py-16 px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Listings</h2>
            <Link to="/browse" className="text-gold font-bold no-underline hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeListings.map((car) => (
              <Link key={car.id} to={`/car/${car.id}`} className="no-underline text-inherit">
                <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {car.images?.[0] ? (
                      <img src={car.images[0]} alt={car.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <VCCPLogo size={48} />
                        <span className="text-xs mt-1">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{car.year} {car.make} {car.model}</h3>
                    <p className="text-gold font-bold text-xl">${car.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{car.condition} · {car.mileage.toLocaleString()} miles</p>
                    <p className="text-sm text-gray-500">{car.location_city}, {car.location_state}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Live Auctions */}
      {activeAuctions.length > 0 && (
        <section className="bg-navy-light py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gold">🔴 Live Auctions</h2>
              <Link to="/auctions" className="text-gold font-bold no-underline hover:underline">View All →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeAuctions.map((auction) => (
                <Link key={auction.id} to={`/auction/${auction.id}`} className="no-underline text-inherit">
                  <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      {auction.images?.[0] ? (
                        <img src={auction.images[0]} alt={auction.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <VCCPLogo size={48} />
                          <span className="text-xs mt-1">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{auction.title}</h3>
                      <p className="text-gold font-bold text-xl">${auction.current_bid.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mb-2">{auction.bid_count} bids</p>
                      <AuctionCountdown endTime={auction.end_time} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-navy text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">List Your Car</h3>
            <p className="text-gray-600">Create a detailed listing with photos, specs, and history for your vintage vehicle.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-navy text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Find Your Dream Car</h3>
            <p className="text-gray-600">Browse classic cars with advanced filtering by make, year, condition, and more.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-navy text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Bid at Auction</h3>
            <p className="text-gray-600">Participate in live auctions with real-time bidding on rare and collectible automobiles.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

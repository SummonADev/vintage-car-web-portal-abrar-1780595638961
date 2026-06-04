import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Gavel, Search } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      <section className="bg-navy text-cream py-20 px-6 text-center">
        <h1 className="text-5xl font-bold text-gold mb-4">Vintage Car Collective</h1>
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
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <Car size={48} className="mx-auto mb-4 text-gold" />
            <h3 className="text-xl font-bold mb-2">List Your Car</h3>
            <p>Create a detailed listing with photos, specs, and history for your vintage vehicle.</p>
          </div>
          <div className="text-center p-6">
            <Search size={48} className="mx-auto mb-4 text-gold" />
            <h3 className="text-xl font-bold mb-2">Find Your Dream Car</h3>
            <p>Browse thousands of classic cars with advanced filtering and search tools.</p>
          </div>
          <div className="text-center p-6">
            <Gavel size={48} className="mx-auto mb-4 text-gold" />
            <h3 className="text-xl font-bold mb-2">Bid at Auction</h3>
            <p>Participate in live auctions with real-time bidding on rare and collectible automobiles.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

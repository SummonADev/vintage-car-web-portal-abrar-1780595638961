import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Car, Gavel, LogIn, LogOut, Plus, List } from 'lucide-react';

export default function Layout() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-navy text-cream py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gold text-2xl font-bold no-underline">
            <Car size={32} />
            <span>Vintage Car Collective</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/browse" className="text-cream no-underline hover:text-gold transition-colors">Browse</Link>
            <Link to="/auctions" className="text-cream no-underline hover:text-gold transition-colors flex items-center gap-1">
              <Gavel size={16} /> Auctions
            </Link>
            {user ? (
              <>
                <Link to="/sell" className="text-cream no-underline hover:text-gold transition-colors flex items-center gap-1">
                  <Plus size={16} /> Sell
                </Link>
                <Link to="/my-listings" className="text-cream no-underline hover:text-gold transition-colors flex items-center gap-1">
                  <List size={16} /> My Listings
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-cream hover:text-gold transition-colors flex items-center gap-1 bg-transparent border-none cursor-pointer font-inherit text-base"
                >
                  <LogOut size={16} /> Sign Out
                </button>
                <span className="text-gold text-sm">{user.display_name}</span>
              </>
            ) : (
              <Link to="/login" className="text-cream no-underline hover:text-gold transition-colors flex items-center gap-1">
                <LogIn size={16} /> Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-navy text-cream py-6 px-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Vintage Car Collective. All rights reserved.</p>
      </footer>
    </div>
  );
}

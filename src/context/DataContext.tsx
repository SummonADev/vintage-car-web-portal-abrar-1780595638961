import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CarListing, Auction, Bid } from '@/types';

interface DataContextType {
  listings: CarListing[];
  setListings: React.Dispatch<React.SetStateAction<CarListing[]>>;
  auctions: Auction[];
  setAuctions: React.Dispatch<React.SetStateAction<Auction[]>>;
  bids: Bid[];
  setBids: React.Dispatch<React.SetStateAction<Bid[]>>;
}

const DataContext = createContext<DataContextType>({
  listings: [],
  setListings: () => {},
  auctions: [],
  setAuctions: () => {},
  bids: [],
  setBids: () => {},
});

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<CarListing[]>([]);
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);

  return (
    <DataContext.Provider value={{ listings, setListings, auctions, setAuctions, bids, setBids }}>
      {children}
    </DataContext.Provider>
  );
}

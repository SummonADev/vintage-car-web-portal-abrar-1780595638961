import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CarListing, Auction, Bid } from '@/types';
import { SAMPLE_LISTINGS, SAMPLE_AUCTIONS, SAMPLE_BIDS } from '@/data/sampleData';

interface DataContextType {
  listings: CarListing[];
  setListings: React.Dispatch<React.SetStateAction<CarListing[]>>;
  auctions: Auction[];
  setAuctions: React.Dispatch<React.SetStateAction<Auction[]>>;
  bids: Bid[];
  setBids: React.Dispatch<React.SetStateAction<Bid[]>>;
  expireAuction: (auctionId: string) => void;
}

const DataContext = createContext<DataContextType>({
  listings: [],
  setListings: () => {},
  auctions: [],
  setAuctions: () => {},
  bids: [],
  setBids: () => {},
  expireAuction: () => {},
});

export function useData(): DataContextType {
  return useContext(DataContext);
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<CarListing[]>(SAMPLE_LISTINGS);
  const [auctions, setAuctions] = useState<Auction[]>(SAMPLE_AUCTIONS);
  const [bids, setBids] = useState<Bid[]>(SAMPLE_BIDS);

  const expireAuction = useCallback((auctionId: string) => {
    setAuctions((prev) =>
      prev.map((a) => {
        if (a.id !== auctionId) return a;
        const reserveMet = a.current_bid >= a.reserve_price;
        return {
          ...a,
          status: reserveMet ? 'sold' : 'ended_no_reserve',
        };
      })
    );
  }, []);

  return (
    <DataContext.Provider value={{ listings, setListings, auctions, setAuctions, bids, setBids, expireAuction }}>
      {children}
    </DataContext.Provider>
  );
}

import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import BrowsePage from '@/pages/BrowsePage';
import CarDetailPage from '@/pages/CarDetailPage';
import SellCarPage from '@/pages/SellCarPage';
import AuctionsPage from '@/pages/AuctionsPage';
import AuctionDetailPage from '@/pages/AuctionDetailPage';
import CreateAuctionPage from '@/pages/CreateAuctionPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import MyListingsPage from '@/pages/MyListingsPage';
import AuthCallback from '@/pages/AuthCallback';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/car/:id" element={<CarDetailPage />} />
            <Route path="/sell" element={<SellCarPage />} />
            <Route path="/auctions" element={<AuctionsPage />} />
            <Route path="/auction/:id" element={<AuctionDetailPage />} />
            <Route path="/auction/create" element={<CreateAuctionPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/my-listings" element={<MyListingsPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Route>
        </Routes>
      </DataProvider>
    </AuthProvider>
  );
}

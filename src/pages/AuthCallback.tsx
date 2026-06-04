import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // After Supabase processes the auth callback, redirect to home
    const timer = setTimeout(() => {
      navigate('/');
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto py-16 px-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Authenticating...</h1>
      <p className="text-gray-500">Please wait while we complete your sign-in.</p>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import VCCPLogo from '@/components/VCCPLogo';

export default function LoginPage() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to sign in');
      }
    } finally {
      setLoading(false);
    }
  };

  if (user) return null;

  return (
    <div className="max-w-md mx-auto py-16 px-6">
      <div className="text-center mb-6">
        <VCCPLogo size={64} className="mx-auto mb-3" />
        <h1 className="text-3xl font-bold">Sign In</h1>
      </div>
      {error && <p className="text-red-600 mb-4 text-center bg-red-50 py-2 rounded">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gold text-navy px-8 py-3 rounded font-bold hover:bg-gold-dark transition-colors w-full disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p className="text-center mt-4">
        Don't have an account? <Link to="/register" className="text-gold hover:underline">Register</Link>
      </p>
    </div>
  );
}

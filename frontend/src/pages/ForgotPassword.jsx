import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('/api/auth/forgotpassword', { email }).catch(() => {});
      toast.success('If an account exists, a reset link has been sent.');
      setEmail('');
    } catch (error) {
      toast.error('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white p-6 border border-gray-200 rounded">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">Reset Password</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your email to receive a reset link.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full border border-gray-300 rounded p-2 focus:border-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded py-2 font-medium hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 border-t pt-4 text-center">
          <div className="text-sm">
            <Link to="/login" className="text-blue-600 hover:underline">Back to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

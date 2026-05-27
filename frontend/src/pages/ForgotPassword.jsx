import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }
    
    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/forgotpassword', { email, password: newPassword });
      toast.success(data.message || 'Password changed successfully!');
      setEmail('');
      setNewPassword('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white p-6 border border-gray-200 rounded">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">Reset Password</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your email and your new password.
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
          
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              required
              className="w-full border border-gray-300 rounded p-2 focus:border-blue-500 focus:outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded py-2 font-medium hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? 'Changing...' : 'Change Password'}
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

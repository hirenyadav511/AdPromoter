import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';
import { CheckCircle2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Reusable Plan Card Component
const PlanCard = ({ title, price, features, isPopular, onBuy }) => (
  <div className={`relative flex flex-col rounded-lg border ${isPopular ? 'border-blue-600 shadow-md' : 'border-gray-200 dark:border-gray-800'} bg-white dark:bg-gray-900 p-6 shadow-sm`}>
    {isPopular && (
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
        Most Popular
      </div>
    )}
    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
    <div className="mt-4 flex items-baseline text-4xl font-extrabold text-gray-900 dark:text-gray-100">
      ₹{price}
      <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400">/mo</span>
    </div>
    <ul className="mt-6 flex-1 space-y-4">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start">
          <CheckCircle2 className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
        </li>
      ))}
    </ul>
    <button
      onClick={() => onBuy(title)}
      className={`mt-8 block w-full rounded py-2 text-center text-sm font-semibold transition-colors ${
        isPopular
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40'
      }`}
    >
      Buy Now
    </button>
  </div>
);

const Pricing = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  // Card details state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleBuyClick = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.nameOnCard) {
      return toast.error('Please fill in all card details');
    }
    
    if (cardDetails.cardNumber.length !== 16) {
      return toast.error('Card number must be exactly 16 digits');
    }

    setLoading(true);

    // Simulate payment gateway delay (2-3 seconds)
    setTimeout(async () => {
      try {
        await axios.post('/api/payment/demo-success', { plan: selectedPlan });
        
        // Refresh global user state to show new plan
        await refreshUser();
        
        toast.success('Payment Successful ✅ Subscription updated!');
        setShowModal(false);
        navigate('/dashboard'); // Redirect to dashboard
      } catch (error) {
        toast.error('Payment failed. Please try again.');
        setLoading(false);
      }
    }, 2500);
  };

  return (
    <DashboardLayout>
      <div className="py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Choose Your Plan</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Select the best plan for your advertising needs.</p>
          <div className="mt-4 inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-sm px-4 py-2 rounded-md font-medium border border-yellow-200 dark:border-yellow-800/50">
            Note: This is a demo payment system (No real payment will be processed)
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4">
          <PlanCard
            title="Basic"
            price="199"
            features={['Up to 5 Campaigns', 'Basic Analytics', 'Email Support']}
            onBuy={handleBuyClick}
          />
          <PlanCard
            title="Pro"
            price="499"
            isPopular={true}
            features={['Unlimited Campaigns', 'Advanced Analytics', 'Priority Support', 'Custom Targeting']}
            onBuy={handleBuyClick}
          />
          <PlanCard
            title="Premium"
            price="999"
            features={['Everything in Pro', 'Dedicated Account Manager', 'API Access', 'White-label Reports']}
            onBuy={handleBuyClick}
          />
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 shadow-2xl relative border border-gray-200 dark:border-gray-800">
            <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Complete Payment - {selectedPlan}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handlePaymentSubmit} className="p-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs p-3 rounded-lg mb-6 text-center border border-blue-100 dark:border-blue-800/50">
                Demo Mode: Enter any random 16-digit number to proceed.
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name on Card</label>
                  <input
                    type="text"
                    name="nameOnCard"
                    required
                    value={cardDetails.nameOnCard}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    maxLength="16"
                    value={cardDetails.cardNumber}
                    onChange={(e) => {
                      // Only allow numbers
                      const value = e.target.value.replace(/\D/g, '');
                      setCardDetails({ ...cardDetails, cardNumber: value });
                    }}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all"
                    placeholder="1234 5678 9101 1121"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      required
                      placeholder="MM/YY"
                      maxLength="5"
                      value={cardDetails.expiryDate}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      required
                      maxLength="3"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setCardDetails({ ...cardDetails, cvv: value });
                      }}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:bg-blue-400 shadow-lg shadow-blue-500/20 transition-all flex justify-center items-center h-12"
                >
                  {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    `Pay Now (Demo)`
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Pricing;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import CreateCampaign from './pages/CreateCampaign';
import Analytics from './pages/Analytics';
import WhyChooseUs from './pages/WhyChooseUs';
import Pricing from './pages/Pricing';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaigns/new" element={<CreateCampaign />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/pricing" element={<Pricing />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </ThemeProvider>
  );
}

export default App;

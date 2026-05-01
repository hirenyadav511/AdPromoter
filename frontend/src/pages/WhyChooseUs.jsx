import { Link } from 'react-router-dom';
import { Target, TrendingUp, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

const BenefitCard = ({ icon: Icon, title, description }) => (
  <div className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 p-6 shadow-sm">
    <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3 text-blue-600 dark:text-blue-400">
      <Icon size={24} />
    </div>
    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
  </div>
);

const WhyChooseUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Navbar */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">AdPromoter</Link>
          <div className="space-x-6 flex items-center">
            <Link to="/why-choose-us" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Why Us</Link>
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Log in</Link>
            <Link to="/signup" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <header className="bg-white dark:bg-gray-900 py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl">
            Why Choose AdPromoter?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We provide a transparent, straightforward platform to handle all your advertising needs without the usual complexity or hidden fees.
          </p>
        </div>
      </header>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Core Benefits</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Everything you need, nothing you don't.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <BenefitCard
              icon={Target}
              title="Precise Targeting"
              description="Reach audiences based on exact demographics, interests, and behaviors to maximize your conversion rates."
            />
            <BenefitCard
              icon={TrendingUp}
              title="Data-Driven ROI"
              description="Our dashboard provides clear, actionable metrics so you know exactly how every dollar is performing."
            />
            <BenefitCard
              icon={ShieldCheck}
              title="Brand Safety"
              description="We ensure your ads are only placed on verified, high-quality platforms to protect your brand's reputation."
            />
            <BenefitCard
              icon={Clock}
              title="Time Saving"
              description="Automated campaign rules and single-click multi-platform publishing save you hours of manual work."
            />
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="bg-white dark:bg-gray-900 py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Trusted by Professionals</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">99.9% Uptime SLA</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Our infrastructure guarantees your ads keep running 24/7 without interruption.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Transparent Pricing</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pay exactly what is listed. No setup fees, no hidden platform charges.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Dedicated Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get answers quickly with our 24/5 email and chat support teams.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Industry Standard Security</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your billing and campaign data are secured using top-tier encryption protocols.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-blue-50 dark:bg-blue-900/10 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Experience the difference today</h2>
        <Link
          to="/signup"
          className="inline-block rounded bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors mt-4"
        >
          Create Free Account
        </Link>
      </section>
      
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} AdPromoter. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WhyChooseUs;

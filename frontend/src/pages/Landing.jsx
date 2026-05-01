import { Link } from 'react-router-dom';

const FeatureCard = ({ title, description }) => (
  <div className="border border-gray-200 rounded-lg bg-white p-6">
    <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TestimonialCard = ({ name, role, company, content }) => (
  <div className="border border-gray-200 rounded-lg bg-white p-6">
    <p className="mb-4 text-gray-700">"{content}"</p>
    <div>
      <h4 className="font-semibold text-gray-900">{name}</h4>
      <p className="text-sm text-gray-500">{role}, {company}</p>
    </div>
  </div>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Navbar */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold text-blue-600">AdPromoter</Link>
          <div className="space-x-6 flex items-center">
            <Link to="/why-choose-us" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Why Us</Link>
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Log in</Link>
            <Link to="/signup" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-20 text-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Promote Your Ads Everywhere
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
            The simplest way to manage and scale your advertising campaigns across multiple platforms.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/signup" className="rounded bg-blue-600 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20">
              Get Started for Free
            </Link>
            <Link to="/why-choose-us" className="rounded border border-gray-300 dark:border-gray-700 px-8 py-3 text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800">
              Learn More
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">Simple but Powerful Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              title="Easy Setup"
              description="Create and launch your first campaign in less than 5 minutes."
            />
            <FeatureCard
              title="Real-time Stats"
              description="Monitor your clicks, impressions, and CTR with our simple dashboard."
            />
            <FeatureCard
              title="Multi-Platform"
              description="Run ads on Google, Facebook, Instagram, and more from one place."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Testimonials</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <TestimonialCard
              name="Sarah Jenkins"
              role="CMO"
              company="TechGrowth"
              content="AdPromoter is incredibly easy to use. No confusing menus or overwhelming dashboards."
            />
            <TestimonialCard
              name="David Chen"
              role="Growth Lead"
              company="StartupX"
              content="The best basic ad platform. It does exactly what it promises without the bloat."
            />
            <TestimonialCard
              name="Emma Williams"
              role="Director"
              company="Retail Co"
              content="I love the simplicity. I can check my stats in 2 minutes and get back to work."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">Ready to get started?</h2>
        <p className="mb-8 text-blue-100">Join thousands of users promoting their ads today.</p>
        <Link
          to="/signup"
          className="rounded bg-white px-6 py-3 text-lg font-semibold text-blue-600 hover:bg-gray-100"
        >
          Create an Account
        </Link>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} AdPromoter. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;

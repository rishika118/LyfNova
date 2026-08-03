import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Sparkles, TrendingUp, DollarSign, RefreshCw, BarChart2, ShieldCheck, ChevronRight, HelpCircle } from 'lucide-react';

export const LandingPage = () => {
  const { navigateTo, addToast } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('medicine'); // 'medicine' or 'test'
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  const popularMedicines = ['Dolo 650mg', 'Uprise-D3 60K', 'Combiflam', 'Montair LC', 'Pan 40mg'];
  const popularTests = ['Complete Blood Count (CBC)', 'Vitamin D (25-Hydroxy)', 'HbA1c', 'Lipid Profile', 'Thyroid Profile'];

  const suggestions = category === 'medicine' ? popularMedicines : popularTests;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query) {
      addToast('Please enter a search query', 'warning');
      return;
    }
    navigateTo(category === 'medicine' ? 'medicines' : 'tests', query, category);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    navigateTo(category === 'medicine' ? 'medicines' : 'tests', suggestion, category);
  };

  const stats = [
    { label: 'Medicines Compared', value: '50,000+' },
    { label: 'Healthcare Platforms', value: '8+' },
    { label: 'Price Checks Done', value: '100,000+' },
    { label: 'Total User Savings', value: '₹10L+' }
  ];

  const features = [
    {
      icon: <RefreshCw size={24} style={{ color: 'var(--color-primary)' }} />,
      title: 'Real-time Comparison',
      desc: 'Live price indexing updates cost info within seconds of pharmacy listing adjustments.'
    },
    {
      icon: <Sparkles size={24} style={{ color: 'var(--color-secondary)' }} />,
      title: 'Smart Basket Optimization',
      desc: 'Our AI engine splits your list across vendors to compute the absolute lowest order cost.'
    },
    {
      icon: <TrendingUp size={24} style={{ color: '#8b5cf6' }} />,
      title: 'Price Trend Prediction',
      desc: 'Leverage machine learning forecasting to stock up on recurring drugs before price hikes.'
    },
    {
      icon: <BarChart2 size={24} style={{ color: '#f59e0b' }} />,
      title: 'Savings Analytics',
      desc: 'Interactive visual dashboards mapping your monthly savings metrics and medical spend splits.'
    }
  ];

  const platformsList = [
    { name: 'Tata 1mg', type: 'Pharmacy' },
    { name: 'Netmeds', type: 'Pharmacy' },
    { name: 'Apollo Pharmacy', type: 'Pharmacy' },
    { name: 'PharmEasy', type: 'Pharmacy' },
    { name: 'Practo', type: 'Consultation & Rx' },
    { name: 'Thyrocare', type: 'Diagnostics' },
    { name: 'Metropolis', type: 'Diagnostics' },
    { name: 'Dr. Lal PathLabs', type: 'Diagnostics' }
  ];

  const howItWorks = [
    { step: '01', title: 'Search', desc: 'Type medicine names or required lab diagnostic panels.' },
    { step: '02', title: 'Compare', desc: 'Instantly view prices, discounts, and delivery speeds.' },
    { step: '03', title: 'Optimize', desc: 'Run optimization to automatically group/split order items.' },
    { step: '04', title: 'Save', desc: 'Redirect to checkout on partner stores or schedule bookings.' }
  ];

  const faqs = [
    { q: 'How does LyfNova source prices?', a: 'LyfNova uses real-time, HIPAA-compliant pricing APIs and localized scanners that crawl authorized Indian pharmacy networks to display exact current medicine and test prices.' },
    { q: 'What is Smart Basket Optimization?', a: 'Prescriptions often have multiple medicines. Instead of buying all from one store, our AI checks if splitting the order (e.g., 2 medicines from Apollo and 1 from 1mg) is cheaper, accounting for delivery costs, to maximize savings.' },
    { q: 'Can I purchase medicines directly on LyfNova?', a: 'LyfNova is an price comparison search engine. We do not sell drugs or collect payment. We redirect you to selected platforms (1mg, Netmeds, etc.) with pre-filled baskets, saving you transaction hassles.' }
  ];

  return (
    <div>
      {/* Background circles */}
      <div className="glow-bg">
        <div className="glow-circle-1"></div>
        <div className="glow-circle-2"></div>
      </div>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '80px 0 60px 0', position: 'relative', zIndex: '1' }}>
        <div className="flex-center" style={{ marginBottom: '24px' }}>
          <span className="badge badge-success" style={{ gap: '6px', padding: '6px 14px', fontSize: '12px' }}>
            <Sparkles size={12} /> AI-Powered Price Intelligence
          </span>
        </div>
        
        <h1 className="heading-display title-gradient" style={{ fontSize: '48px', lineHeight: '1.15', maxWidth: '850px', margin: '0 auto 24px auto' }}>
          Compare Medicine & Lab Test Prices Across India's Top Healthcare Platforms
        </h1>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '680px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
          Stop overpaying for medical supplies. Instantly find the lowest prices, compare delivery times, and optimize your prescription basket across Apollo, 1mg, Netmeds, Thyrocare, and more.
        </p>

        {/* Search Bar Block */}
        <div className="glass-panel" style={{ maxWidth: '720px', margin: '0 auto 48px auto', padding: '24px', borderRadius: 'var(--radius-xl)' }}>
          {/* Toggles */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', justifyContent: 'center' }}>
            <button
              onClick={() => { setCategory('medicine'); setQuery(''); }}
              className="btn btn-sm"
              style={{
                borderRadius: 'var(--radius-full)',
                background: category === 'medicine' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                borderColor: category === 'medicine' ? 'var(--color-primary)' : 'var(--border-color)',
                color: category === 'medicine' ? 'var(--color-primary)' : 'var(--text-secondary)'
              }}
            >
              Compare Medicines
            </button>
            <button
              onClick={() => { setCategory('test'); setQuery(''); }}
              className="btn btn-sm"
              style={{
                borderRadius: 'var(--radius-full)',
                background: category === 'test' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                borderColor: category === 'test' ? 'var(--color-secondary)' : 'var(--border-color)',
                color: category === 'test' ? 'var(--color-secondary)' : 'var(--text-secondary)'
              }}
            >
              Compare Lab Tests
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
            <div className="input-wrapper" style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                className="input-field"
                placeholder={category === 'medicine' ? 'Search medicines (e.g. Dolo 650mg, Uprise D3, Combiflam)...' : 'Search diagnostic tests (e.g. CBC, Thyroid Profile, HbA1c)...'}
                style={{ paddingLeft: '48px', height: '54px', borderRadius: 'var(--radius-lg)' }}
              />
              <Search className="input-icon" size={20} style={{ left: '18px' }} />
              
              <button type="submit" className="btn btn-primary" style={{ padding: '0 28px', height: '54px', borderRadius: 'var(--radius-lg)' }}>
                Search
              </button>
            </div>

            {/* Autocomplete Suggestions */}
            {showSuggestions && query.length > 0 && (
              <div className="glass-panel" style={{
                position: 'absolute',
                top: '60px',
                left: 0,
                right: 0,
                zIndex: 100,
                borderRadius: 'var(--radius-md)',
                padding: '8px 0',
                textAlign: 'left',
                overflow: 'hidden'
              }}>
                <div style={{ padding: '6px 16px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
                  Popular Searches
                </div>
                {suggestions
                  .filter(s => s.toLowerCase().includes(query.toLowerCase()))
                  .map((suggestion, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      style={{
                        padding: '10px 16px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        color: 'var(--text-primary)',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      {suggestion}
                    </div>
                  ))}
              </div>
            )}
          </form>
        </div>

        {/* Statistics Grid */}
        <div className="grid-4" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {stats.map((stat, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'var(--font-display)', background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '500' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted Platform strip */}
      <section style={{ padding: '40px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', margin: '40px 0' }}>
        <p style={{ textAlign: 'center', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '24px', fontWeight: '600' }}>
          Aggregating Price Logs From India's Trusted Healthcare Giants
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px 40px', alignItems: 'center' }}>
          {platformsList.map((platform, idx) => (
            <div key={idx} style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'rgba(255,255,255,0.02)',
              fontSize: '14px',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              color: 'var(--text-secondary)'
            }}>
              {platform.name}
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '60px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 className="heading-display" style={{ fontSize: '32px', marginBottom: '12px' }}>Why Choose LyfNova?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>AI-powered tools ensuring healthcare diagnostics and drugs remain affordable for everyone.</p>
        </div>
        <div className="grid-2" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {features.map((f, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '32px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)'
              }}>
                {f.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '60px 0', background: 'rgba(255,255,255,0.01)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', padding: '48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 className="heading-display" style={{ fontSize: '32px', marginBottom: '12px' }}>Optimize & Save In 4 Steps</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Getting drugs delivered cheaper doesn't need to be complex.</p>
        </div>
        <div className="grid-4">
          {howItWorks.map((item, idx) => (
            <div key={idx} style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{
                fontSize: '64px',
                fontWeight: '800',
                color: 'rgba(16, 185, 129, 0.08)',
                fontFamily: 'var(--font-display)',
                position: 'absolute',
                top: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: '0'
              }}>
                {item.step}
              </div>
              <div style={{ position: 'relative', zIndex: '1', marginTop: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: 'var(--text-primary)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6', maxWidth: '220px', margin: '0 auto' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '60px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 className="heading-display" style={{ fontSize: '32px', marginBottom: '12px' }}>What Patients Say</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Helping thousands of Indian families cut down monthly medicine bills.</p>
        </div>
        <div className="grid-3" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)', italic: 'true', marginBottom: '18px' }}>
              "My father takes medicines for diabetes and blood pressure monthly. LyfNova Smart Basket optimizer splits our order between Apollo & PharmEasy, saving us almost ₹800 every single month!"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600' }}>Amit Sharma</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Gurugram, Haryana</div>
              </div>
            </div>
          </div>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)', italic: 'true', marginBottom: '18px' }}>
              "I needed Vitamin D and CBC tests. LyfNova compared Thyrocare and Metropolis prices side-by-side. Booked home collection at ₹499 instead of paying ₹1200 at my local clinic!"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))' }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600' }}>Dr. Priya Iyer</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Chennai, Tamil Nadu</div>
              </div>
            </div>
          </div>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)', italic: 'true', marginBottom: '18px' }}>
              "The price trend forecast feature is amazing. It warned me that the asthma inhaler price was trending upward, allowing me to order a 3-month supply beforehand."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-accent), var(--color-primary))' }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600' }}>Rahul Varma</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Bengaluru, Karnataka</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '40px 0', maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="heading-display" style={{ fontSize: '28px', textAlign: 'center', marginBottom: '32px' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{ padding: '18px', cursor: 'pointer', overflow: 'hidden' }}
              onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '600', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HelpCircle size={16} style={{ color: 'var(--color-primary)' }} /> {faq.q}
                </span>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                  {faqOpen === idx ? '−' : '+'}
                </span>
              </div>
              {faqOpen === idx && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '12px', lineHeight: '1.6', paddingLeft: '24px' }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default LandingPage;

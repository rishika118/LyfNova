import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { labTests } from '../data/mockData';
import { Search, Filter, Plus, Check, Clock, Home, Info, ArrowUpDown } from 'lucide-react';

export const LabTestSearchPage = () => {
  const { searchQuery, setSearchQuery, addToBasket, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState(searchQuery || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [homeCollectionOnly, setHomeCollectionOnly] = useState(false);
  const [sortBy, setSortBy] = useState('price-asc');
  const [expandedTest, setExpandedTest] = useState(null);

  // Sync state if global query changes
  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const categories = ['All', 'General Screening', 'Vitamins / Minerals', 'Diabetes Screening', 'Cardiac Wellness', 'Hormonal Screening'];

  const filteredTests = labTests.filter((test) => {
    const matchesSearch =
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;

    // Filters providers by home collection if active
    if (homeCollectionOnly) {
      const hasHomeCollection = test.providers.some(p => p.homeCollection);
      return matchesSearch && matchesCategory && hasHomeCollection;
    }

    return matchesSearch && matchesCategory;
  });

  const getSortedProviders = (providers) => {
    return [...providers].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount-desc') return b.discount - a.discount;
      return 0;
    });
  };

  const getCheapestProvider = (providers) => {
    return [...providers].reduce((min, p) => (p.price < min.price ? p : min), providers[0]);
  };

  const handleBookDirect = (testName, platformName, price) => {
    addToast(`Booking scheduled for ${testName} with ${platformName} (₹${price})! A health agent will contact you shortly.`, 'success');
  };

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="heading-display" style={{ fontSize: '32px', marginBottom: '8px' }}>Compare Lab Diagnostic Prices</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Instantly search for blood panels and scans. Compare certified diagnostic laboratories for rates, delivery speed, and home collection slots.</p>
      </div>

      {/* Search and sorting bar */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <div className="input-wrapper" style={{ flex: 1, minWidth: '280px' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Search by test name (e.g. CBC, Vitamin D3, HbA1c, Cholesterol)..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSearchQuery(e.target.value);
            }}
            style={{ height: '48px' }}
          />
          <Search className="input-icon" size={18} />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', marginRight: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowUpDown size={14} /> Sort By
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                padding: '8px 16px',
                fontSize: '13px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="price-asc">Cheapest First</option>
              <option value="price-desc">Highest Price First</option>
              <option value="discount-desc">Highest Discount %</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
        gap: '24px'
      }}>
        {/* Filters Left Sidebar */}
        <aside className="glass-panel" style={{ padding: '20px', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px' }}>
            <Filter size={16} style={{ color: 'var(--color-primary)' }} />
            <span style={{ fontWeight: '600', fontSize: '15px' }}>Filters</span>
          </div>

          {/* Categories */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Test Category</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: selectedCategory === cat ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px 10px',
                    fontSize: '13px',
                    color: selectedCategory === cat ? 'var(--color-secondary)' : 'var(--text-secondary)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontWeight: selectedCategory === cat ? '600' : '400',
                    transition: 'all 0.15s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Home collection toggle */}
          <div>
            <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Parameters</h4>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-primary)' }}>
              <input
                type="checkbox"
                checked={homeCollectionOnly}
                onChange={() => setHomeCollectionOnly(!homeCollectionOnly)}
                style={{
                  accentColor: 'var(--color-primary)',
                  width: '16px',
                  height: '16px',
                  borderRadius: 'var(--radius-sm)'
                }}
              />
              <span>Home Sample Collection</span>
            </label>
          </div>
        </aside>

        {/* Lab Tests Comparison List */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredTests.length === 0 ? (
            <div className="empty-state">
              <Search className="empty-state-icon" />
              <h3>No Lab Tests Found</h3>
              <p>We couldn't find diagnostic panels matching "{searchTerm}". Try a different spelling or refine filters.</p>
            </div>
          ) : (
            filteredTests.map((test) => {
              const cheapest = getCheapestProvider(test.providers);

              return (
                <div key={test.id} className="glass-panel" style={{ padding: '24px', overflow: 'hidden' }}>
                  {/* Test header information */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 className="heading-display" style={{ fontSize: '20px', color: 'var(--text-primary)' }}>{test.name}</h3>
                        <span style={{ fontSize: '11px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '2px 8px', borderRadius: 'var(--radius-sm)', color: 'var(--color-secondary)' }}>{test.category}</span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px' }}>
                        Includes <strong style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{test.parametersCount} key test parameters</strong> • Diagnostic blood draw
                      </p>
                    </div>

                    <button
                      onClick={() => setExpandedTest(expandedTest === test.id ? null : test.id)}
                      className="btn btn-secondary btn-sm"
                    >
                      {expandedTest === test.id ? 'Hide Details' : 'View Parameters'}
                    </button>
                  </div>

                  {/* Expanded Parameter details */}
                  {expandedTest === test.id && (
                    <div style={{
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      padding: '16px',
                      marginBottom: '20px',
                      fontSize: '13px',
                      lineHeight: '1.6',
                      color: 'var(--text-secondary)'
                    }}>
                      <h4 style={{ color: 'var(--text-primary)', marginBottom: '6px', fontWeight: '600' }}>Test Overview & Preparation</h4>
                      <p>{test.description}</p>
                      <div style={{ marginTop: '10px', fontSize: '11px', display: 'flex', gap: '20px' }}>
                        <span>Sample Type: <strong>Blood (Serum)</strong></span>
                        <span>Patient Preparation: <strong>Fasting required (8-12 hours)</strong></span>
                      </div>
                    </div>
                  )}

                  {/* Providers Pricing list */}
                  <div>
                    <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: '600' }}>Diagnostic Provider Comparisons</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {getSortedProviders(test.providers).map((prov, index) => {
                        const isCheapest = prov.platformId === cheapest.platformId;
                        const savings = prov.mrp - prov.price;
                        
                        let platformName = '';
                        let logoBg = '';
                        if (prov.platformId === 'thyrocare') { platformName = 'Thyrocare Technologies'; logoBg = '#f37021'; }
                        else if (prov.platformId === 'metropolis') { platformName = 'Metropolis Healthcare'; logoBg = '#005b82'; }
                        else if (prov.platformId === 'lalpath') { platformName = 'Dr. Lal PathLabs'; logoBg = '#d21f3c'; }
                        else if (prov.platformId === '1mg') { platformName = 'Tata 1mg Labs'; logoBg = '#ff6f61'; }
                        else if (prov.platformId === 'apollo') { platformName = 'Apollo Diagnostics'; logoBg = '#fcb813'; }

                        return (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '14px 20px',
                              borderRadius: 'var(--radius-md)',
                              border: isCheapest ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid var(--border-color)',
                              background: isCheapest ? 'rgba(59, 130, 246, 0.03)' : 'rgba(255,255,255,0.01)',
                              flexWrap: 'wrap',
                              gap: '16px'
                            }}
                          >
                            {/* Provider brand */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '180px' }}>
                              <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '11px',
                                fontWeight: '800',
                                color: 'white',
                                background: logoBg,
                                textAlign: 'center',
                                lineHeight: '32px',
                                paddingLeft: '4px'
                              }}>
                                {prov.platformId.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{platformName}</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Clock size={12} /> Reports in {prov.reportTime}
                                </div>
                              </div>
                            </div>

                            {/* Service Type icons */}
                            <div style={{ display: 'flex', gap: '12px' }}>
                              {prov.homeCollection && (
                                <span className="badge badge-success" style={{ gap: '4px', textTransform: 'none', padding: '4px 10px', fontSize: '11px' }}>
                                  <Home size={10} /> Home collection
                                </span>
                              )}
                            </div>

                            {/* Prices */}
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>
                                ₹{prov.price}
                                <span style={{ fontSize: '12px', textDecoration: 'line-through', color: 'var(--text-muted)', marginLeft: '6px', fontWeight: '400' }}>₹{prov.mrp}</span>
                              </div>
                              <div style={{ fontSize: '11px', color: 'var(--color-primary)', fontWeight: '600' }}>
                                Save {prov.discount}% (₹{savings})
                              </div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                              {isCheapest && (
                                <span className="badge badge-info" style={{ padding: '4px 10px', fontSize: '10px' }}>
                                  Best Price
                                </span>
                              )}
                              <button
                                onClick={() => addToBasket(test, 'test')}
                                className="btn btn-secondary btn-sm"
                                style={{ gap: '6px' }}
                              >
                                <Plus size={14} /> Add to Basket
                              </button>
                              <button
                                onClick={() => handleBookDirect(test.name, platformName, prov.price)}
                                className={`btn btn-sm ${isCheapest ? 'btn-primary' : 'btn-secondary'}`}
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </div>
    </div>
  );
};
export default LabTestSearchPage;

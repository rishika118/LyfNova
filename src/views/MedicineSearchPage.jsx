import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { medicines } from '../data/mockData';
import { Search, Filter, ArrowUpDown, ShoppingCart, Heart, Plus, Check, Star } from 'lucide-react';

export const MedicineSearchPage = () => {
  const { searchQuery, setSearchQuery, addToBasket, favorites, toggleFavorite } = useApp();
  const [searchTerm, setSearchTerm] = useState(searchQuery || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('price-asc');
  const [expandedMedicine, setExpandedMedicine] = useState(null);

  // Sync state if global query changes
  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const categories = ['All', 'Analgesics / Fever', 'Vitamins & Supplements', 'Cardiac / Cholesterol', 'Diabetes', 'Gastrointestinal / Antacid', 'Anti-infectives / Antibiotics', 'Respiratory / Allergy'];
  const brands = ['All', 'Cipla Ltd', 'Micro Labs Ltd', 'Alkem Laboratories Ltd', 'Sanofi India Ltd', 'USV Pvt Ltd', 'Alembic Pharmaceuticals Ltd'];

  // Filter medicines
  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || med.manufacturer === selectedBrand;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  // Helper to get providers sorted by sort option
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

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="heading-display" style={{ fontSize: '32px', marginBottom: '8px' }}>Compare Medicine Prices</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Instantly compare prices of medicines across Tata 1mg, Apollo Pharmacy, Netmeds, PharmEasy, and Practo.</p>
      </div>

      {/* Search and Sort panel */}
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
            placeholder="Search by medicine name, chemical (e.g. Paracetamol, Metformin)..."
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
            <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: selectedCategory === cat ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px 10px',
                    fontSize: '13px',
                    color: selectedCategory === cat ? 'var(--color-primary)' : 'var(--text-secondary)',
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

          {/* Brands */}
          <div>
            <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Manufacturer</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {brands.map((brand, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedBrand(brand)}
                  style={{
                    background: selectedBrand === brand ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px 10px',
                    fontSize: '13px',
                    color: selectedBrand === brand ? 'var(--color-primary)' : 'var(--text-secondary)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontWeight: selectedBrand === brand ? '600' : '400',
                    transition: 'all 0.15s'
                  }}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Medicines Comparison List */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredMedicines.length === 0 ? (
            <div className="empty-state">
              <Search className="empty-state-icon" />
              <h3>No Medicines Found</h3>
              <p>We couldn't find matches for "{searchTerm}". Check the spelling or browse categories.</p>
            </div>
          ) : (
            filteredMedicines.map((med) => {
              const cheapest = getCheapestProvider(med.providers);
              const isFav = favorites.includes(med.id);

              return (
                <div key={med.id} className="glass-panel" style={{ padding: '24px', overflow: 'hidden' }}>
                  {/* Medicine basic info */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 className="heading-display" style={{ fontSize: '20px', color: 'var(--text-primary)' }}>{med.name}</h3>
                        <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)' }}>{med.strength}</span>
                        <span style={{ fontSize: '11px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '2px 8px', borderRadius: 'var(--radius-sm)', color: 'var(--color-primary)' }}>{med.category}</span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px' }}>
                        Generic: <strong style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{med.genericName}</strong> • Manufacturer: {med.manufacturer} • Pack Size: {med.packSize}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => toggleFavorite(med.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '8px', borderRadius: 'var(--radius-full)' }}
                        title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                      >
                        <Heart size={16} style={{ fill: isFav ? '#ef4444' : 'transparent', color: isFav ? '#ef4444' : 'var(--text-secondary)' }} />
                      </button>
                      <button
                        onClick={() => setExpandedMedicine(expandedMedicine === med.id ? null : med.id)}
                        className="btn btn-secondary btn-sm"
                      >
                        {expandedMedicine === med.id ? 'Hide Details' : 'View Details'}
                      </button>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {expandedMedicine === med.id && (
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
                      <h4 style={{ color: 'var(--text-primary)', marginBottom: '6px', fontWeight: '600' }}>Drug Description</h4>
                      <p>{med.description}</p>
                      <div style={{ marginTop: '10px', fontSize: '11px', display: 'flex', gap: '20px' }}>
                        <span>Prescription Required: <strong style={{ color: '#ef4444' }}>Yes (Rx)</strong></span>
                        <span>Dosage Form: Oral Tablet</span>
                      </div>
                    </div>
                  )}

                  {/* Platform comparisons */}
                  <div>
                    <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: '600' }}>Platform Pricing Comparisons</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {getSortedProviders(med.providers).map((prov, index) => {
                        const isCheapest = prov.platformId === cheapest.platformId;
                        const savings = prov.mrp - prov.price;
                        
                        return (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '14px 20px',
                              borderRadius: 'var(--radius-md)',
                              border: isCheapest ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
                              background: isCheapest ? 'rgba(16, 185, 129, 0.03)' : 'rgba(255,255,255,0.01)',
                              flexWrap: 'wrap',
                              gap: '16px'
                            }}
                          >
                            {/* Platform branding */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '150px' }}>
                              <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: '800',
                                color: 'white',
                                background: prov.platformId === '1mg' ? '#ff6f61' : prov.platformId === 'netmeds' ? '#00a896' : prov.platformId === 'pharmeasy' ? '#10847e' : prov.platformId === 'apollo' ? '#fcb813' : '#0070ea'
                              }}>
                                {prov.platformId.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                                  {prov.platformId === '1mg' ? 'Tata 1mg' : prov.platformId === 'netmeds' ? 'Netmeds' : prov.platformId === 'pharmeasy' ? 'PharmEasy' : prov.platformId === 'apollo' ? 'Apollo Pharmacy' : 'Practo Care'}
                                </div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Delivered in {prov.delivery}</div>
                              </div>
                            </div>

                            {/* Stock status */}
                            <div>
                              <span className={`badge ${prov.stock === 'In Stock' ? 'badge-success' : 'badge-warning'}`}>
                                {prov.stock}
                              </span>
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

                            {/* Action */}
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                              {isCheapest && (
                                <span className="badge badge-success" style={{ padding: '4px 10px', fontSize: '10px' }}>
                                  Cheapest
                                </span>
                              )}
                              <button
                                onClick={() => addToBasket(med, 'medicine')}
                                className={`btn btn-sm ${isCheapest ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ gap: '6px' }}
                              >
                                <Plus size={14} /> Add to Basket
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
export default MedicineSearchPage;

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Sparkles, AlertTriangle, ArrowRight, CheckCircle, Package, Truck, Info, HelpCircle } from 'lucide-react';

export const SmartBasketPage = () => {
  const { basket, removeFromBasket, clearBasket, addToast, navigateTo } = useApp();
  const [optimizationMode, setOptimizationMode] = useState('split'); // 'split' or 'single'
  const [checkedOut, setCheckedOut] = useState(false);

  if (basket.length === 0) {
    return (
      <div className="empty-state" style={{ margin: '80px auto', maxWidth: '600px' }}>
        <Package className="empty-state-icon" style={{ width: '64px', height: '64px' }} />
        <h3>Your Optimization Basket is Empty</h3>
        <p style={{ marginBottom: '24px' }}>Add medicines from the Medicines Search page or Diagnostic Tests from the Lab Tests page to compute your AI optimization split.</p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary" onClick={() => navigateTo('medicines')}>Browse Medicines</button>
          <button className="btn btn-secondary" onClick={() => navigateTo('tests')}>Browse Lab Tests</button>
        </div>
      </div>
    );
  }

  // Delivery fee rules
  const deliveryFees = {
    '1mg': 40,
    'netmeds': 35,
    'pharmeasy': 39,
    'apollo': 25,
    'practo': 30,
    'thyrocare': 0,
    'metropolis': 0,
    'lalpath': 0
  };

  // 1. Calculate Original Cost (Sum of MRPs)
  const totalMrp = basket.reduce((acc, item) => {
    // If it's a medicine, take MRP from the first provider
    // If it's a test, take MRP from the first provider
    const providers = item.originalItem.providers;
    return acc + providers[0].mrp;
  }, 0);

  // 2. Split Platform Optimization (AI Recommendation)
  // For each item, find its cheapest provider
  const splitItems = basket.map(item => {
    const cheapestProvider = item.originalItem.providers.reduce((min, p) => p.price < min.price ? p : min, item.originalItem.providers[0]);
    return {
      ...item,
      platformId: cheapestProvider.platformId,
      price: cheapestProvider.price,
      mrp: cheapestProvider.mrp,
      discount: cheapestProvider.discount
    };
  });

  // Calculate active platforms in split to add delivery fees
  const splitActivePlatforms = [...new Set(splitItems.map(item => item.platformId))];
  const splitDeliveryTotal = splitActivePlatforms.reduce((acc, platformId) => acc + (deliveryFees[platformId] || 0), 0);
  const splitItemsSubtotal = splitItems.reduce((acc, item) => acc + item.price, 0);
  const splitTotalCost = splitItemsSubtotal + splitDeliveryTotal;
  const splitSavings = totalMrp - splitTotalCost;
  const splitSavingsPercent = Math.round((splitSavings / totalMrp) * 100);

  // 3. Single Platform Optimization (Convenience Order)
  // We want to buy ALL medicines from the single cheapest pharmacy, and ALL tests from the single cheapest diagnostic lab.
  // Group basket by type
  const medicineItems = basket.filter(item => item.type === 'medicine');
  const testItems = basket.filter(item => item.type === 'test');

  // Find pharmacy that supports all medicine items and has lowest combined price
  const pharmacies = ['1mg', 'netmeds', 'pharmeasy', 'apollo', 'practo'];
  let bestPharmacy = '1mg';
  let bestPharmacySubtotal = Infinity;

  pharmacies.forEach(pharm => {
    let subtotal = 0;
    let available = true;
    medicineItems.forEach(item => {
      const pData = item.originalItem.providers.find(p => p.platformId === pharm);
      if (pData) {
        subtotal += pData.price;
      } else {
        available = false; // Pharmacy doesn't sell this drug
      }
    });
    if (available && subtotal < bestPharmacySubtotal) {
      bestPharmacySubtotal = subtotal;
      bestPharmacy = pharm;
    }
  });

  // Find diagnostics provider that supports all test items and has lowest combined price
  const diagnosticLabs = ['thyrocare', 'metropolis', 'lalpath', '1mg', 'apollo'];
  let bestLab = 'thyrocare';
  let bestLabSubtotal = Infinity;

  diagnosticLabs.forEach(lab => {
    let subtotal = 0;
    let available = true;
    testItems.forEach(item => {
      const pData = item.originalItem.providers.find(p => p.platformId === lab);
      if (pData) {
        subtotal += pData.price;
      } else {
        available = false;
      }
    });
    if (available && subtotal < bestLabSubtotal) {
      bestLabSubtotal = subtotal;
      bestLab = lab;
    }
  });

  // Build items list for single platform order
  const singleItems = basket.map(item => {
    const platformId = item.type === 'medicine' ? bestPharmacy : bestLab;
    const pData = item.originalItem.providers.find(p => p.platformId === platformId);
    return {
      ...item,
      platformId,
      price: pData ? pData.price : item.originalItem.providers[0].price,
      mrp: pData ? pData.mrp : item.originalItem.providers[0].mrp,
      discount: pData ? pData.discount : item.originalItem.providers[0].discount
    };
  });

  const singleActivePlatforms = [...new Set(singleItems.map(item => item.platformId))];
  const singleDeliveryTotal = singleActivePlatforms.reduce((acc, platformId) => acc + (deliveryFees[platformId] || 0), 0);
  const singleItemsSubtotal = singleItems.reduce((acc, item) => acc + item.price, 0);
  const singleTotalCost = singleItemsSubtotal + singleDeliveryTotal;
  const singleSavings = totalMrp - singleTotalCost;
  const singleSavingsPercent = Math.round((singleSavings / totalMrp) * 100);

  // Active calculations based on selected mode
  const activeItems = optimizationMode === 'split' ? splitItems : singleItems;
  const activeSubtotal = optimizationMode === 'split' ? splitItemsSubtotal : singleItemsSubtotal;
  const activeDelivery = optimizationMode === 'split' ? splitDeliveryTotal : singleDeliveryTotal;
  const activeTotal = optimizationMode === 'split' ? splitTotalCost : singleTotalCost;
  const activeSavings = optimizationMode === 'split' ? splitSavings : singleSavings;
  const activeSavingsPercent = optimizationMode === 'split' ? splitSavingsPercent : singleSavingsPercent;

  const handleCheckout = () => {
    setCheckedOut(true);
    addToast('Optimization Order Placed Successfully! Prescriptions dispatched.', 'success');
    setTimeout(() => {
      clearBasket();
      setCheckedOut(false);
      navigateTo('dashboard');
    }, 3000);
  };

  if (checkedOut) {
    return (
      <div className="glass-panel flex-center" style={{ margin: '80px auto', maxWidth: '600px', flexDirection: 'column', padding: '48px', textAlign: 'center' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'rgba(16,185,129,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-primary)',
          marginBottom: '24px',
          boxShadow: '0 0 20px rgba(16,185,129,0.2)'
        }}>
          <CheckCircle size={32} />
        </div>
        <h2 className="heading-display" style={{ fontSize: '24px', marginBottom: '8px' }}>Dispatched to Partner Labs & Pharmacies</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '400px', lineHeight: '1.6', marginBottom: '24px' }}>
          LyfNova AI has successfully split your order and populated pre-filled checkouts on Tata 1mg, Apollo Pharmacy, and Thyrocare. You will receive booking SMS confirmations directly.
        </p>
        <div className="skeleton" style={{ width: '100%', height: '8px', borderRadius: '4px', maxWidth: '300px' }} />
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>Routing to Patient Dashboard...</span>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="flex-between" style={{ marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="heading-display" style={{ fontSize: '32px', marginBottom: '8px' }}>Smart Basket Optimization</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Our AI dynamically searches across providers to discover the absolute cheapest procurement structure.</p>
        </div>
        <button className="btn btn-secondary" onClick={clearBasket} style={{ gap: '6px' }}>
          <Trash2 size={16} /> Clear Basket
        </button>
      </div>

      {/* Main split grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '24px'
      }}>
        {/* Left Side: Basket items checklist and recommendations comparison */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Optimization Mode selector cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {/* Split Mode (AI Recommended) */}
            <div
              className={`glass-panel premium-border-glow`}
              onClick={() => setOptimizationMode('split')}
              style={{
                padding: '20px',
                cursor: 'pointer',
                border: optimizationMode === 'split' ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
                background: optimizationMode === 'split' ? 'rgba(16,185,129,0.03)' : 'rgba(255,255,255,0.01)',
                transition: 'all 0.25s'
              }}
            >
              <div className="flex-between" style={{ marginBottom: '12px' }}>
                <span className="badge badge-success" style={{ gap: '4px', textTransform: 'none' }}>
                  <Sparkles size={10} /> AI Splitting Pick
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: '600' }}>Save {splitSavingsPercent}%</span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>Multi-Vendor Optimization</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '12px' }}>
                Splits your medicines and tests across different stores to capture the absolute lowest rate for each item. Includes delivery fees.
              </p>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)' }}>
                ₹{splitTotalCost}
                <span style={{ fontSize: '13px', textDecoration: 'line-through', color: 'var(--text-muted)', marginLeft: '8px', fontWeight: '400' }}>₹{totalMrp}</span>
              </div>
            </div>

            {/* Single Mode (Convenience) */}
            <div
              className="glass-panel"
              onClick={() => setOptimizationMode('single')}
              style={{
                padding: '20px',
                cursor: 'pointer',
                border: optimizationMode === 'single' ? '2px solid var(--color-secondary)' : '1px solid var(--border-color)',
                background: optimizationMode === 'single' ? 'rgba(59,130,246,0.03)' : 'rgba(255,255,255,0.01)',
                transition: 'all 0.25s'
              }}
            >
              <div className="flex-between" style={{ marginBottom: '12px' }}>
                <span className="badge badge-info" style={{ textTransform: 'none' }}>Convenience Pick</span>
                <span style={{ fontSize: '12px', color: 'var(--color-secondary)', fontWeight: '600' }}>Save {singleSavingsPercent}%</span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>Cheapest Single Vendor</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '12px' }}>
                Orders all medicines from one optimal pharmacy, and tests from one optimal lab. Minimizes packages to simplify delivery.
              </p>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)' }}>
                ₹{singleTotalCost}
                <span style={{ fontSize: '13px', textDecoration: 'line-through', color: 'var(--text-muted)', marginLeft: '8px', fontWeight: '400' }}>₹{totalMrp}</span>
              </div>
            </div>
          </div>

          {/* Checklist showing items inside optimized configuration */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Your Optimization Checklist ({basket.length} items)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {activeItems.map((item) => {
                const logoName = item.platformId === '1mg' ? 'Tata 1mg' : item.platformId === 'netmeds' ? 'Netmeds' : item.platformId === 'pharmeasy' ? 'PharmEasy' : item.platformId === 'apollo' ? 'Apollo Pharmacy' : item.platformId === 'practo' ? 'Practo' : item.platformId === 'thyrocare' ? 'Thyrocare' : item.platformId === 'metropolis' ? 'Metropolis' : 'Lal PathLabs';
                const logoColor = item.platformId === '1mg' ? '#ff6f61' : item.platformId === 'netmeds' ? '#00a896' : item.platformId === 'pharmeasy' ? '#10847e' : item.platformId === 'apollo' ? '#fcb813' : item.platformId === 'practo' ? '#0070ea' : item.platformId === 'thyrocare' ? '#f37021' : item.platformId === 'metropolis' ? '#005b82' : '#d21f3c';

                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 18px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'rgba(255,255,255,0.01)',
                      animation: 'slideDown 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <button
                        onClick={() => removeFromBasket(item.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                      >
                        <Trash2 size={16} />
                      </button>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{item.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          Category: {item.type === 'medicine' ? 'Medicine' : 'Diagnostic Lab Test'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      {/* Platform Routing Badge */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Route:</span>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-sm)',
                          color: 'white',
                          background: logoColor
                        }}>
                          {logoName}
                        </span>
                      </div>

                      {/* Item Pricing info */}
                      <div style={{ textAlign: 'right', minWidth: '90px' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700' }}>₹{item.price}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>MRP ₹{item.mrp}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Price Summary & Checkout */}
        <aside className="glass-panel" style={{ padding: '24px', height: 'fit-content' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>Order Optimization Summary</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', marginBottom: '20px' }}>
            <div className="flex-between">
              <span style={{ color: 'var(--text-secondary)' }}>Total Items</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{basket.length}</span>
            </div>
            <div className="flex-between">
              <span style={{ color: 'var(--text-secondary)' }}>Base MRP</span>
              <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{totalMrp}</span>
            </div>
            <div className="flex-between">
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal (Optimized)</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>₹{activeSubtotal}</span>
            </div>
            <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Truck size={14} /> Total Delivery Fees
              </span>
              <span style={{ color: 'var(--text-primary)' }}>{activeDelivery > 0 ? `₹${activeDelivery}` : 'FREE'}</span>
            </div>
            <div className="flex-between" style={{ fontSize: '18px', fontWeight: '800' }}>
              <span>Total Cost</span>
              <span style={{ color: 'var(--text-primary)' }}>₹{activeTotal}</span>
            </div>
          </div>

          {/* Savings Badge */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '13px', color: 'var(--color-primary)', fontWeight: '600', marginBottom: '2px' }}>
              Smart Basket Total Savings
            </div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
              ₹{activeSavings} ({activeSavingsPercent}%)
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={handleCheckout}
            style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-lg)', gap: '8px' }}
          >
            Buy Optimized Basket <ArrowRight size={16} />
          </button>

          <div style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-muted)', display: 'flex', gap: '6px', alignItems: 'flex-start', lineHeight: '1.4' }}>
            <Info size={12} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>
              By clicking purchase, LyfNova automatically dispatches code instructions to set up pre-filled carts on partner storefronts under your registered mobile number.
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
};
export default SmartBasketPage;

import React, { useState } from 'react';
import { userSpendData } from '../data/mockData';
import { TrendingUp, DollarSign, Calendar, Sparkles, AlertCircle, ArrowUpRight, Percent } from 'lucide-react';

export const AnalyticsDashboard = () => {
  const { monthlySavings, platformDistribution, categoryBreakdown, priceTrends } = userSpendData;
  const [hoveredMonth, setHoveredMonth] = useState(monthlySavings[monthlySavings.length - 1]);
  const [hoveredPlatform, setHoveredPlatform] = useState(platformDistribution[0]);
  const [hoveredCategory, setHoveredCategory] = useState(categoryBreakdown[0]);

  // Statistics summaries
  const totalSpentOriginal = monthlySavings.reduce((acc, d) => acc + d.spent, 0);
  const totalSpentOptimized = monthlySavings.reduce((acc, d) => acc + d.optimized, 0);
  const totalSavings = totalSpentOriginal - totalSpentOptimized;
  const averageSavingsPercent = Math.round((totalSavings / totalSpentOriginal) * 100);

  // SVG dimensions for Line Chart
  const lineChartWidth = 600;
  const lineChartHeight = 250;
  const padding = 40;

  // Map values to coordinates
  const pointsOriginal = monthlySavings.map((d, i) => {
    const x = padding + (i * (lineChartWidth - padding * 2)) / (monthlySavings.length - 1);
    // scale y between padding and height-padding
    const y = lineChartHeight - padding - (d.spent / 2500) * (lineChartHeight - padding * 2);
    return { x, y, ...d };
  });

  const pointsOptimized = monthlySavings.map((d, i) => {
    const x = padding + (i * (lineChartWidth - padding * 2)) / (monthlySavings.length - 1);
    const y = lineChartHeight - padding - (d.optimized / 2500) * (lineChartHeight - padding * 2);
    return { x, y, ...d };
  });

  // Build SVG Path strings
  const buildPathString = (points) => {
    return points.reduce((acc, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, '');
  };

  const buildAreaPathString = (points) => {
    if (points.length === 0) return '';
    const first = points[0];
    const last = points[points.length - 1];
    const linePath = buildPathString(points);
    return `${linePath} L ${last.x} ${lineChartHeight - padding} L ${first.x} ${lineChartHeight - padding} Z`;
  };

  // Donut Chart calculations
  let accumulatedAngle = 0;

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="heading-display" style={{ fontSize: '32px', marginBottom: '8px' }}>Savings Analytics</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Track your medicine costs, platform splits, and real-time savings realized via LyfNova AI optimization.</p>
      </div>

      {/* Top Level Cards */}
      <div className="grid-4" style={{ marginBottom: '32px' }}>
        {/* Metric 1 */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div className="flex-between" style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>Total Original Spent</span>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContext: 'center' }}>
              <DollarSign size={14} style={{ color: 'var(--text-secondary)' }} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-display)' }}>₹{totalSpentOriginal}</div>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Sum of non-optimized drug list MRPs</p>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '2px solid var(--color-primary)' }}>
          <div className="flex-between" style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>Total Optimized Cost</span>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContext: 'center' }}>
              <Sparkles size={14} style={{ color: 'var(--color-primary)' }} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>₹{totalSpentOptimized}</div>
          <p style={{ fontSize: '11px', color: 'var(--color-primary)', marginTop: '4px', fontWeight: '500' }}>Procured via AI routes</p>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '2px solid var(--color-secondary)' }}>
          <div className="flex-between" style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>Cumulative Savings</span>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContext: 'center' }}>
              <TrendingUp size={14} style={{ color: 'var(--color-secondary)' }} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--color-secondary)' }}>₹{totalSavings}</div>
          <p style={{ fontSize: '11px', color: 'var(--color-secondary)', marginTop: '4px', fontWeight: '500' }}>Average of {averageSavingsPercent}% savings index</p>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div className="flex-between" style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>Active Rx Reminders</span>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContext: 'center' }}>
              <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-display)' }}>3 Active</div>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Ensuring zero stockout drops</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: '24px',
        marginBottom: '24px'
      }}>
        {/* Savings Over Time: Line Chart */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div className="flex-between" style={{ marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Monthly Spending Comparison</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Comparing original costs (MRP) vs Optimized cost on LyfNova</p>
            </div>
            {/* Interactive Tooltip indicator */}
            {hoveredMonth && (
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 12px',
                fontSize: '12px',
                textAlign: 'right'
              }}>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{hoveredMonth.month}</span>: Spent <strong style={{ color: '#ef4444' }}>₹{hoveredMonth.spent}</strong> vs <strong style={{ color: 'var(--color-primary)' }}>₹{hoveredMonth.optimized}</strong> (Saved <strong style={{ color: 'var(--color-secondary)' }}>₹{hoveredMonth.savings}</strong>)
              </div>
            )}
          </div>

          {/* SVG Render */}
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <svg viewBox={`0 0 ${lineChartWidth} ${lineChartHeight}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
              {/* Definitions for gradients */}
              <defs>
                <linearGradient id="colorOriginalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOptimizedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 500, 1000, 1500, 2000, 2500].map((gridVal, idx) => {
                const y = lineChartHeight - padding - (gridVal / 2500) * (lineChartHeight - padding * 2);
                return (
                  <g key={idx}>
                    <line x1={padding} y1={y} x2={lineChartWidth - padding} y2={y} stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3 3" />
                    <text x={padding - 10} y={y + 4} fill="var(--text-muted)" fontSize="9" textAnchor="end">₹{gridVal}</text>
                  </g>
                );
              })}

              {/* Paths Area */}
              <path d={buildAreaPathString(pointsOriginal)} fill="url(#colorOriginalGrad)" />
              <path d={buildAreaPathString(pointsOptimized)} fill="url(#colorOptimizedGrad)" />

              {/* Path Lines */}
              <path d={buildPathString(pointsOriginal)} fill="none" stroke="#ef4444" strokeWidth="2.5" />
              <path d={buildPathString(pointsOptimized)} fill="none" stroke="#10b981" strokeWidth="2.5" />

              {/* Interaction circles */}
              {pointsOriginal.map((p, idx) => (
                <g key={idx}>
                  {/* Original spent dots */}
                  <circle cx={p.x} cy={p.y} r="4" fill="#ef4444" />
                  {/* Optimized spent dots */}
                  <circle
                    cx={pointsOptimized[idx].x}
                    cy={pointsOptimized[idx].y}
                    r={hoveredMonth.month === p.month ? "6" : "4"}
                    fill="#10b981"
                    stroke="var(--bg-app)"
                    strokeWidth="1.5"
                    style={{ cursor: 'pointer', transition: 'all 0.1s' }}
                    onMouseEnter={() => setHoveredMonth(p)}
                  />
                  {/* Vertical bar on hover */}
                  {hoveredMonth.month === p.month && (
                    <line x1={p.x} y1={padding} x2={p.x} y2={lineChartHeight - padding} stroke="var(--border-color-hover)" strokeWidth="1" strokeDasharray="2 2" />
                  )}
                  {/* X Axis labels */}
                  <text x={p.x} y={lineChartHeight - padding + 16} fill="var(--text-secondary)" fontSize="10" textAnchor="middle">{p.month}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Platform Share: Donut Chart */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Platform Allocation</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Order routing distributions across digital platforms</p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, position: 'relative', minHeight: '160px' }}>
            <svg width="150" height="150" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="var(--border-color)" strokeWidth="4"></circle>
              {platformDistribution.map((item, idx) => {
                const strokeDashVal = item.share;
                const offset = 100 - accumulatedAngle;
                accumulatedAngle += item.share;

                // Color mappings
                let color = '#8b5cf6'; // Others
                if (idx === 0) color = '#ff6f61'; // 1mg
                else if (idx === 1) color = '#10847e'; // pharmeasy
                else if (idx === 2) color = '#00a896'; // netmeds
                else if (idx === 3) color = '#fcb813'; // apollo

                return (
                  <circle
                    key={idx}
                    cx="21"
                    cy="21"
                    r="15.91549430918954"
                    fill="transparent"
                    stroke={color}
                    strokeWidth={hoveredPlatform.platform === item.platform ? "5.2" : "4"}
                    strokeDasharray={`${strokeDashVal} ${100 - strokeDashVal}`}
                    strokeDashoffset={offset}
                    style={{ transition: 'stroke-width 0.2s', cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredPlatform(item)}
                  />
                );
              })}
            </svg>

            {/* Inner details */}
            {hoveredPlatform && (
              <div style={{
                position: 'absolute',
                textAlign: 'center',
                width: '100px'
              }}>
                <div style={{ fontSize: '20px', fontWeight: '800' }}>{hoveredPlatform.share}%</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '2px' }}>{hoveredPlatform.platform}</div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 14px', fontSize: '11px', marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            {platformDistribution.map((item, idx) => {
              let color = '#8b5cf6';
              if (idx === 0) color = '#ff6f61';
              else if (idx === 1) color = '#10847e';
              else if (idx === 2) color = '#00a896';
              else if (idx === 3) color = '#fcb813';

              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{item.platform}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
      }}>
        {/* Spend Category Split: Bar Chart */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>Category Distribution</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Spend volume across therapeutic and diagnostic domains</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {categoryBreakdown.map((item, idx) => {
              const maxSpent = Math.max(...categoryBreakdown.map(i => i.spent));
              const percentWidth = (item.spent / maxSpent) * 100;
              const isHovered = hoveredCategory.category === item.category;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredCategory(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex-between" style={{ fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: isHovered ? '600' : '400', color: isHovered ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{item.category}</span>
                    <span style={{ fontWeight: '700' }}>₹{item.spent}</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'var(--border-color)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${percentWidth}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                      borderRadius: 'var(--radius-full)',
                      opacity: isHovered ? 1 : 0.75,
                      transition: 'all 0.3s ease'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Drug Index Price Inflation: Line Chart */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>Drug Price Trend Index</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Average index price of tracked chronic medicines (Base ₹100)</p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '120px', padding: '0 20px', borderBottom: '1px solid var(--border-color)', marginBottom: '16px' }}>
            {priceTrends.map((trend, idx) => {
              const heightPercent = ((trend.avgPrice - 110) / (150 - 110)) * 100;
              
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-primary)' }}>₹{trend.avgPrice}</div>
                  <div style={{
                    width: '24px',
                    height: `${heightPercent}px`,
                    background: 'rgba(59, 130, 246, 0.15)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
                  }}
                  />
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{trend.month}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '11px', color: 'var(--text-secondary)' }}>
            <AlertCircle size={14} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
            <span>
              Prices have decreased by 11.2% overall since January due to platform discount conflicts. High competition keeps prices low.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnalyticsDashboard;

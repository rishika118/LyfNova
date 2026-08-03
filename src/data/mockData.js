// Mock data for LyfNova Platform

export const platforms = {
  '1mg': { id: '1mg', name: 'Tata 1mg', logo: '1mg', rating: 4.5, color: '#ff6f61', baseDelivery: 40 },
  'netmeds': { id: 'netmeds', name: 'Netmeds', logo: 'netmeds', rating: 4.3, color: '#00a896', baseDelivery: 35 },
  'pharmeasy': { id: 'pharmeasy', name: 'PharmEasy', logo: 'pharmeasy', rating: 4.2, color: '#10847e', baseDelivery: 39 },
  'apollo': { id: 'apollo', name: 'Apollo Pharmacy', logo: 'apollo', rating: 4.6, color: '#fcb813', baseDelivery: 25 },
  'practo': { id: 'practo', name: 'Practo Care', logo: 'practo', rating: 4.4, color: '#0070ea', baseDelivery: 30 },
  'thyrocare': { id: 'thyrocare', name: 'Thyrocare', logo: 'thyrocare', rating: 4.7, color: '#f37021', baseDelivery: 0 },
  'metropolis': { id: 'metropolis', name: 'Metropolis Lab', logo: 'metropolis', rating: 4.6, color: '#005b82', baseDelivery: 0 },
  'lalpath': { id: 'lalpath', name: 'Dr. Lal PathLabs', logo: 'lalpath', rating: 4.5, color: '#d21f3c', baseDelivery: 0 }
};

export const medicines = [
  {
    id: 'med-dolo',
    name: 'Dolo 650mg',
    genericName: 'Paracetamol',
    manufacturer: 'Micro Labs Ltd',
    strength: '650 mg',
    packSize: '15 Tablets',
    category: 'Analgesics / Fever',
    description: 'Dolo 650 Tablet helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain.',
    image: 'dolo_650',
    popular: true,
    providers: [
      { platformId: '1mg', price: 28, mrp: 34, discount: 17, delivery: '4-6 hours', stock: 'In Stock' },
      { platformId: 'netmeds', price: 29, mrp: 34, discount: 14, delivery: 'Next Day', stock: 'In Stock' },
      { platformId: 'pharmeasy', price: 26, mrp: 34, discount: 23, delivery: 'Same Day', stock: 'In Stock' },
      { platformId: 'apollo', price: 31, mrp: 34, discount: 8, delivery: '2 hours', stock: 'In Stock' },
      { platformId: 'practo', price: 27, mrp: 34, discount: 20, delivery: 'Next Day', stock: 'In Stock' }
    ]
  },
  {
    id: 'med-uprise-d3',
    name: 'Uprise-D3 60K',
    genericName: 'Cholecalciferol (Vitamin D3)',
    manufacturer: 'Alkem Laboratories Ltd',
    strength: '60000 IU',
    packSize: '4 Capsules',
    category: 'Vitamins & Supplements',
    description: 'Helps in absorption of calcium, essential for maintaining strong bones and teeth.',
    image: 'uprise_d3',
    popular: true,
    providers: [
      { platformId: '1mg', price: 112, mrp: 140, discount: 20, delivery: 'Next Day', stock: 'In Stock' },
      { platformId: 'netmeds', price: 105, mrp: 140, discount: 25, delivery: '2 Days', stock: 'In Stock' },
      { platformId: 'pharmeasy', price: 108, mrp: 140, discount: 22, delivery: 'Next Day', stock: 'In Stock' },
      { platformId: 'apollo', price: 120, mrp: 140, discount: 14, delivery: '2-4 hours', stock: 'In Stock' },
      { platformId: 'practo', price: 110, mrp: 140, discount: 21, delivery: 'Next Day', stock: 'In Stock' }
    ]
  },
  {
    id: 'med-combiflam',
    name: 'Combiflam',
    genericName: 'Ibuprofen + Paracetamol',
    manufacturer: 'Sanofi India Ltd',
    strength: '400mg + 325mg',
    packSize: '20 Tablets',
    category: 'Analgesics / Pain Relief',
    description: 'Combiflam Tablet contains two pain relieving medicines. They work together to reduce pain, inflammation, and fever.',
    image: 'combiflam',
    popular: true,
    providers: [
      { platformId: '1mg', price: 38, mrp: 48, discount: 20, delivery: 'Same Day', stock: 'In Stock' },
      { platformId: 'netmeds', price: 40, mrp: 48, discount: 16, delivery: 'Next Day', stock: 'In Stock' },
      { platformId: 'pharmeasy', price: 37, mrp: 48, discount: 22, delivery: 'Same Day', stock: 'In Stock' },
      { platformId: 'apollo', price: 42, mrp: 48, discount: 12, delivery: '2 hours', stock: 'In Stock' },
      { platformId: 'practo', price: 39, mrp: 48, discount: 18, delivery: 'Next Day', stock: 'In Stock' }
    ]
  },
  {
    id: 'med-lipvas',
    name: 'Lipvas 10',
    genericName: 'Atorvastatin',
    manufacturer: 'Cipla Ltd',
    strength: '10 mg',
    packSize: '15 Tablets',
    category: 'Cardiac / Cholesterol',
    description: 'Used to lower lipid levels (cholesterol and triglycerides) in blood, helping reduce the risk of heart disease.',
    image: 'lipvas',
    popular: false,
    providers: [
      { platformId: '1mg', price: 62, mrp: 78, discount: 20, delivery: 'Next Day', stock: 'In Stock' },
      { platformId: 'netmeds', price: 58, mrp: 78, discount: 25, delivery: 'Next Day', stock: 'In Stock' },
      { platformId: 'pharmeasy', price: 55, mrp: 78, discount: 29, delivery: 'Next Day', stock: 'In Stock' },
      { platformId: 'apollo', price: 68, mrp: 78, discount: 12, delivery: '2-4 hours', stock: 'In Stock' },
      { platformId: 'practo', price: 60, mrp: 78, discount: 23, delivery: '2 Days', stock: 'In Stock' }
    ]
  },
  {
    id: 'med-glycomet',
    name: 'Glycomet 500 SR',
    genericName: 'Metformin',
    manufacturer: 'USV Pvt Ltd',
    strength: '500 mg',
    packSize: '15 Tablets',
    category: 'Diabetes',
    description: 'Helps control blood sugar levels in adults with Type 2 diabetes mellitus.',
    image: 'glycomet',
    popular: true,
    providers: [
      { platformId: '1mg', price: 21, mrp: 26, discount: 19, delivery: '4-6 hours', stock: 'In Stock' },
      { platformId: 'netmeds', price: 22, mrp: 26, discount: 15, delivery: 'Next Day', stock: 'In Stock' },
      { platformId: 'pharmeasy', price: 19, mrp: 26, discount: 26, delivery: 'Same Day', stock: 'In Stock' },
      { platformId: 'apollo', price: 23, mrp: 26, discount: 11, delivery: '2 hours', stock: 'In Stock' },
      { platformId: 'practo', price: 20, mrp: 26, discount: 23, delivery: 'Next Day', stock: 'Out of Stock' }
    ]
  },
  {
    id: 'med-pan40',
    name: 'Pan 40mg',
    genericName: 'Pantoprazole',
    manufacturer: 'Alkem Laboratories Ltd',
    strength: '40 mg',
    packSize: '15 Tablets',
    category: 'Gastrointestinal / Antacid',
    description: 'Reduces the amount of acid produced by the stomach and helps relieve symptoms of acid reflux and heartburn.',
    image: 'pan_40',
    popular: true,
    providers: [
      { platformId: '1mg', price: 135, mrp: 168, discount: 19, delivery: 'Same Day', stock: 'In Stock' },
      { platformId: 'netmeds', price: 126, mrp: 168, discount: 25, delivery: 'Next Day', stock: 'In Stock' },
      { platformId: 'pharmeasy', price: 122, mrp: 168, discount: 27, delivery: 'Same Day', stock: 'In Stock' },
      { platformId: 'apollo', price: 145, mrp: 168, discount: 13, delivery: '2 hours', stock: 'In Stock' },
      { platformId: 'practo', price: 130, mrp: 168, discount: 22, delivery: 'Next Day', stock: 'In Stock' }
    ]
  },
  {
    id: 'med-azithral',
    name: 'Azithral 500',
    genericName: 'Azithromycin',
    manufacturer: 'Alembic Pharmaceuticals Ltd',
    strength: '500 mg',
    packSize: '5 Tablets',
    category: 'Anti-infectives / Antibiotics',
    description: 'An antibiotic used to treat various bacterial infections of the respiratory tract, ear, nose, throat, lungs, and skin.',
    image: 'azithral',
    popular: false,
    providers: [
      { platformId: '1mg', price: 104, mrp: 130, discount: 20, delivery: 'Next Day', stock: 'In Stock' },
      { platformId: 'netmeds', price: 98, mrp: 130, discount: 24, delivery: 'Next Day', stock: 'In Stock' },
      { platformId: 'pharmeasy', price: 95, mrp: 130, discount: 26, delivery: 'Same Day', stock: 'In Stock' },
      { platformId: 'apollo', price: 112, mrp: 130, discount: 13, delivery: '2-4 hours', stock: 'In Stock' },
      { platformId: 'practo', price: 100, mrp: 130, discount: 23, delivery: 'Next Day', stock: 'In Stock' }
    ]
  },
  {
    id: 'med-montair-lc',
    name: 'Montair LC',
    genericName: 'Montelukast + Levocetirizine',
    manufacturer: 'Cipla Ltd',
    strength: '10mg + 5mg',
    packSize: '15 Tablets',
    category: 'Respiratory / Allergy',
    description: 'Used to treat allergic symptoms such as runny nose, stuffy nose, sneezing, itching, swelling, and watery eyes.',
    image: 'montair_lc',
    popular: true,
    providers: [
      { platformId: '1mg', price: 255, mrp: 318, discount: 20, delivery: 'Same Day', stock: 'In Stock' },
      { platformId: 'netmeds', price: 238, mrp: 318, discount: 25, delivery: 'Next Day', stock: 'In Stock' },
      { platformId: 'pharmeasy', price: 229, mrp: 318, discount: 28, delivery: 'Same Day', stock: 'In Stock' },
      { platformId: 'apollo', price: 275, mrp: 318, discount: 13, delivery: '2 hours', stock: 'In Stock' },
      { platformId: 'practo', price: 242, mrp: 318, discount: 23, delivery: 'Next Day', stock: 'In Stock' }
    ]
  }
];

export const labTests = [
  {
    id: 'lab-cbc',
    name: 'Complete Blood Count (CBC)',
    description: 'A comprehensive blood panel that screens for anemia, infection, inflammation, leukemia, and platelet disorders.',
    parametersCount: 24,
    popular: true,
    category: 'General Screening',
    providers: [
      { platformId: 'thyrocare', price: 299, mrp: 600, discount: 50, homeCollection: true, reportTime: '12 hours' },
      { platformId: 'metropolis', price: 349, mrp: 500, discount: 30, homeCollection: true, reportTime: '8 hours' },
      { platformId: 'lalpath', price: 399, mrp: 450, discount: 11, homeCollection: true, reportTime: '6 hours' },
      { platformId: '1mg', price: 280, mrp: 499, discount: 43, homeCollection: true, reportTime: '12 hours' },
      { platformId: 'apollo', price: 320, mrp: 400, discount: 20, homeCollection: true, reportTime: '10 hours' }
    ]
  },
  {
    id: 'lab-vitd',
    name: 'Vitamin D (25-Hydroxy)',
    description: 'Measures level of Vitamin D in your blood, crucial for bone and muscle health as well as immune function.',
    parametersCount: 1,
    popular: true,
    category: 'Vitamins / Minerals',
    providers: [
      { platformId: 'thyrocare', price: 499, mrp: 1200, discount: 58, homeCollection: true, reportTime: '24 hours' },
      { platformId: 'metropolis', price: 699, mrp: 1500, discount: 53, homeCollection: true, reportTime: '12 hours' },
      { platformId: 'lalpath', price: 799, mrp: 1100, discount: 27, homeCollection: true, reportTime: '8 hours' },
      { platformId: '1mg', price: 450, mrp: 999, discount: 54, homeCollection: true, reportTime: '18 hours' },
      { platformId: 'apollo', price: 550, mrp: 850, discount: 35, homeCollection: true, reportTime: '12 hours' }
    ]
  },
  {
    id: 'lab-hba1c',
    name: 'HbA1c (Glycated Haemoglobin)',
    description: 'Indicates average blood sugar levels over the past 2-3 months. Ideal for monitoring diabetes.',
    parametersCount: 1,
    popular: true,
    category: 'Diabetes Screening',
    providers: [
      { platformId: 'thyrocare', price: 279, mrp: 550, discount: 49, homeCollection: true, reportTime: '12 hours' },
      { platformId: 'metropolis', price: 349, mrp: 490, discount: 28, homeCollection: true, reportTime: '8 hours' },
      { platformId: 'lalpath', price: 380, mrp: 450, discount: 15, homeCollection: true, reportTime: '6 hours' },
      { platformId: '1mg', price: 260, mrp: 450, discount: 42, homeCollection: true, reportTime: '12 hours' },
      { platformId: 'apollo', price: 299, mrp: 399, discount: 25, homeCollection: true, reportTime: '8 hours' }
    ]
  },
  {
    id: 'lab-lipid',
    name: 'Lipid Profile (Cholesterol & Triglycerides)',
    description: 'Analyzes blood lipids (Total Cholesterol, HDL, LDL, VLDL, Triglycerides) to evaluate cardiovascular risk.',
    parametersCount: 8,
    popular: true,
    category: 'Cardiac Wellness',
    providers: [
      { platformId: 'thyrocare', price: 399, mrp: 900, discount: 55, homeCollection: true, reportTime: '12 hours' },
      { platformId: 'metropolis', price: 499, mrp: 800, discount: 37, homeCollection: true, reportTime: '12 hours' },
      { platformId: 'lalpath', price: 550, mrp: 750, discount: 26, homeCollection: true, reportTime: '8 hours' },
      { platformId: '1mg', price: 380, mrp: 799, discount: 52, homeCollection: true, reportTime: '12 hours' },
      { platformId: 'apollo', price: 450, mrp: 650, discount: 30, homeCollection: true, reportTime: '10 hours' }
    ]
  },
  {
    id: 'lab-thyroid',
    name: 'Thyroid Profile (T3, T4, TSH)',
    description: 'Assesses the levels of thyroid hormones in blood, checking for hypo- or hyper-thyroidism.',
    parametersCount: 3,
    popular: true,
    category: 'Hormonal Screening',
    providers: [
      { platformId: 'thyrocare', price: 249, mrp: 600, discount: 58, homeCollection: true, reportTime: '12 hours' },
      { platformId: 'metropolis', price: 349, mrp: 550, discount: 36, homeCollection: true, reportTime: '10 hours' },
      { platformId: 'lalpath', price: 399, mrp: 500, discount: 20, homeCollection: true, reportTime: '8 hours' },
      { platformId: '1mg', price: 239, mrp: 499, discount: 52, homeCollection: true, reportTime: '12 hours' },
      { platformId: 'apollo', price: 299, mrp: 450, discount: 33, homeCollection: true, reportTime: '8 hours' }
    ]
  }
];

export const userReminders = [
  { id: 'rem-1', name: 'Montair LC (10mg)', time: '09:00 PM', freq: 'Daily', active: true, dosage: '1 Tablet' },
  { id: 'rem-2', name: 'Glycomet 500 SR', time: '08:30 AM', freq: 'Daily (Post Breakfast)', active: true, dosage: '1 Tablet' },
  { id: 'rem-3', name: 'Lipvas 10', time: '10:00 PM', freq: 'Daily', active: true, dosage: '1 Tablet' }
];

export const userAlerts = [
  { id: 'alt-1', type: 'price-drop', name: 'Uprise-D3 60K', message: 'Price dropped by 12% on Netmeds! Now ₹105 (was ₹120)', date: 'Today' },
  { id: 'alt-2', type: 'back-in-stock', name: 'Glycomet 500 SR', message: 'Back in stock at Apollo Pharmacy (2 hours delivery)', date: 'Yesterday' },
  { id: 'alt-3', type: 'test-discount', name: 'Thyroid Profile', message: 'Flash sale: Thyrocare price dropped to ₹249 (58% off)', date: '3 days ago' }
];

export const userSpendData = {
  monthlySavings: [
    { month: 'Jan', spent: 1250, optimized: 850, savings: 400 },
    { month: 'Feb', spent: 1400, optimized: 920, savings: 480 },
    { month: 'Mar', spent: 1800, optimized: 1100, savings: 700 },
    { month: 'Apr', spent: 1150, optimized: 750, savings: 400 },
    { month: 'May', spent: 2100, optimized: 1250, savings: 850 },
    { month: 'Jun', spent: 1950, optimized: 1180, savings: 770 }
  ],
  platformDistribution: [
    { platform: 'Tata 1mg', count: 18, share: 35 },
    { platform: 'PharmEasy', count: 12, share: 23 },
    { platform: 'Netmeds', count: 10, share: 19 },
    { platform: 'Apollo Pharmacy', count: 8, share: 15 },
    { platform: 'Others', count: 4, share: 8 }
  ],
  categoryBreakdown: [
    { category: 'Chronic Care', spent: 2800 },
    { category: 'Vitamins & Supps', spent: 1600 },
    { category: 'Lab Diagnostics', spent: 3400 },
    { category: 'OTC / Acute Care', spent: 1200 }
  ],
  priceTrends: [
    { month: 'Jan', avgPrice: 145 },
    { month: 'Feb', avgPrice: 142 },
    { month: 'Mar', avgPrice: 138 },
    { month: 'Apr', avgPrice: 134 },
    { month: 'May', avgPrice: 135 },
    { month: 'Jun', avgPrice: 129 }
  ]
};

export const adminLogs = [
  { id: 'log-1', timestamp: '2026-07-03 19:40:02', event: 'Price update batch processed (Tata 1mg)', status: 'Success' },
  { id: 'log-2', timestamp: '2026-07-03 19:15:30', event: 'API Sync with Apollo Pharmacy Catalog', status: 'Success' },
  { id: 'log-3', timestamp: '2026-07-03 18:50:11', event: 'Price Alert Dispatched: Uprise-D3 60K', status: 'Sent' },
  { id: 'log-4', timestamp: '2026-07-03 18:22:45', event: 'Basket Optimization Model re-trained', status: 'Active' }
];

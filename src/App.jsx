import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import LandingPage from './views/LandingPage';
import MedicineSearchPage from './views/MedicineSearchPage';
import LabTestSearchPage from './views/LabTestSearchPage';
import SmartBasketPage from './views/SmartBasketPage';
import AnalyticsDashboard from './views/AnalyticsDashboard';
import UserDashboard from './views/UserDashboard';
import ProfilePage from './views/ProfilePage';
import AdminDashboard from './views/AdminDashboard';

const AppContent = () => {
  const { currentPage } = useApp();

  // Route resolver
  const renderView = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'medicines':
        return <MedicineSearchPage />;
      case 'tests':
        return <LabTestSearchPage />;
      case 'basket':
        return <SmartBasketPage />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'dashboard':
        return <UserDashboard />;
      case 'profile':
        return <ProfilePage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        {renderView()}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;

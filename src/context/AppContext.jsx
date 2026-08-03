import React, { createContext, useContext, useState } from 'react';
import { userAlerts as initialAlerts, medicines as initialMedicines, labTests as initialLabTests } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('medicine'); // 'medicine' or 'test'
  
  // Basket stores items in the format: { id, name, type: 'medicine' | 'test', originalItem }
  const [basket, setBasket] = useState([
    {
      id: 'med-dolo',
      name: 'Dolo 650mg',
      type: 'medicine',
      originalItem: initialMedicines.find(m => m.id === 'med-dolo')
    },
    {
      id: 'med-uprise-d3',
      name: 'Uprise-D3 60K',
      type: 'medicine',
      originalItem: initialMedicines.find(m => m.id === 'med-uprise-d3')
    },
    {
      id: 'med-combiflam',
      name: 'Combiflam',
      type: 'medicine',
      originalItem: initialMedicines.find(m => m.id === 'med-combiflam')
    },
    {
      id: 'lab-cbc',
      name: 'Complete Blood Count (CBC)',
      type: 'test',
      originalItem: initialLabTests.find(t => t.id === 'lab-cbc')
    }
  ]);

  const [notifications, setNotifications] = useState(initialAlerts);
  const [toasts, setToasts] = useState([]);
  const [favorites, setFavorites] = useState(['med-dolo', 'lab-vitd']);
  const [reminders, setReminders] = useState([
    { id: 'rem-1', name: 'Montair LC (10mg)', time: '09:00 PM', freq: 'Daily', active: true, dosage: '1 Tablet' },
    { id: 'rem-2', name: 'Glycomet 500 SR', time: '08:30 AM', freq: 'Daily (Post Breakfast)', active: true, dosage: '1 Tablet' }
  ]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const addToBasket = (item, type) => {
    if (basket.some((i) => i.id === item.id)) {
      addToast(`${item.name} is already in your basket.`, 'info');
      return;
    }
    setBasket((prev) => [...prev, { id: item.id, name: item.name, type, originalItem: item }]);
    addToast(`${item.name} added to optimized basket!`, 'success');
  };

  const removeFromBasket = (itemId) => {
    const item = basket.find((i) => i.id === itemId);
    setBasket((prev) => prev.filter((i) => i.id !== itemId));
    if (item) {
      addToast(`${item.name} removed from basket.`, 'info');
    }
  };

  const clearBasket = () => {
    setBasket([]);
    addToast('Basket cleared.', 'info');
  };

  const toggleFavorite = (itemId) => {
    setFavorites((prev) => {
      const isFav = prev.includes(itemId);
      if (isFav) {
        addToast('Removed from favorites.', 'info');
        return prev.filter((id) => id !== itemId);
      } else {
        addToast('Added to favorites!', 'success');
        return [...prev, itemId];
      }
    });
  };

  const toggleReminder = (reminderId) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === reminderId ? { ...r, active: !r.active } : r))
    );
    addToast('Reminder status updated.', 'success');
  };

  const addReminder = (name, time, freq, dosage) => {
    const newReminder = { id: `rem-${Date.now()}`, name, time, freq, active: true, dosage };
    setReminders((prev) => [...prev, newReminder]);
    addToast('Medicine reminder set successfully!', 'success');
  };

  const removeReminder = (reminderId) => {
    setReminders((prev) => prev.filter((r) => r.id !== reminderId));
    addToast('Reminder deleted.', 'info');
  };

  // Simulates AI monitoring of real-time price drops across pharmacy platforms
  const triggerPriceUpdateSimulation = () => {
    const medNames = ['Dolo 650mg', 'Uprise-D3 60K', 'Combiflam', 'Pan 40mg', 'Lipvas 10'];
    const providers = ['Tata 1mg', 'Netmeds', 'PharmEasy', 'Apollo Pharmacy'];
    
    const randomMed = medNames[Math.floor(Math.random() * medNames.length)];
    const randomProvider = providers[Math.floor(Math.random() * providers.length)];
    const priceDropPercent = Math.floor(Math.random() * 15) + 5; // 5% to 20%
    const currentPrice = Math.floor(Math.random() * 50) + 20;

    const message = `Price drop detected! ${randomMed} is now ${priceDropPercent}% cheaper on ${randomProvider} (₹${currentPrice})`;
    
    const newAlert = {
      id: `alt-${Date.now()}`,
      type: 'price-drop',
      name: randomMed,
      message,
      date: 'Just Now'
    };

    setNotifications((prev) => [newAlert, ...prev]);
    addToast(`AI Alert: Price drop on ${randomMed}!`, 'warning');
  };

  const navigateTo = (page, query = '', category = 'medicine') => {
    setCurrentPage(page);
    if (query !== '') {
      setSearchQuery(query);
      setSearchCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        searchQuery,
        setSearchQuery,
        searchCategory,
        setSearchCategory,
        basket,
        setBasket,
        addToBasket,
        removeFromBasket,
        clearBasket,
        notifications,
        setNotifications,
        toasts,
        addToast,
        favorites,
        toggleFavorite,
        reminders,
        toggleReminder,
        addReminder,
        removeReminder,
        triggerPriceUpdateSimulation,
        navigateTo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
export default AppContext;

// src/App.jsx
import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import AuthContainer from './components/AuthContainer'
import ContactModal from './components/ContactModal'
import Listings from './components/Listings' // 1. Import the new component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [myListings, setMyListings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/auth/status', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  function onLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setMyListings(false);
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="animate-pulse">Verifying session...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {!isLoggedIn ? (
        <div className="flex-grow flex items-center justify-center px-6">
          <AuthContainer onLoginClick={() => setIsLoggedIn(true)} />
        </div>
      ) : (
        <>
          <Header setMyListings={setMyListings} onLogout={onLogout} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <main className="flex-grow px-[50px] py-10">
            <Listings onSelectItem={(item) => setSelectedItem(item)} myListings={myListings} searchTerm={searchTerm} />
          </main>

          <Footer />

          <ContactModal
            isOpen={!!selectedItem}
            onClose={() => setSelectedItem(null)}
            email={selectedItem?.owner_email || selectedItem?.seller_email || selectedItem?.email}
            title={selectedItem?.title}
          />
        </>
      )}
    </div>
  )
}

export default App
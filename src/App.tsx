import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NewProjectFlow from './pages/NewProjectFlow'; 
import { trackEvent } from './lib/trackingApi';
import './App.css';

function PageTracker(): null {
  const location = useLocation();
  const { user, loading } = useAuth();

  React.useEffect(() => {
    if (loading) return;
    trackEvent('page_view', location.pathname, {
      path: location.pathname,
      userEmail: user?.email || 'anonymous',
    }).catch(() => undefined);
  }, [location.pathname, loading, user?.email]);

  return null;
}

function App(): React.ReactNode {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <PageTracker />
          
          {/* Background Effects — Ensure any broken image strings are pulled out of these classes in App.css */}
          <div className="aurora-bg">
            <div className="aurora-kashmir" />
          </div>
          <div className="noise-overlay" />

          {/* Layout Shell */}
          <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Dashboard */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                {/* New Project Flow */}
                <Route
                  path="/projects/new"
                  element={
                    <ProtectedRoute>
                      <NewProjectFlow />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
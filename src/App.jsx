import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Crypto from "./pages/Crypto";
import Stocks from "./pages/Stocks";
import News from "./pages/News";
import Pricing from "./pages/Pricing";
import API from "./pages/API";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Documentation from "./pages/Documentation";
import Help from "./pages/Help";
import Community from "./pages/Community";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Platforms from "./pages/Platforms";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";
import FavoriteToast from "./components/FavoriteToast";
import ConnectionStatus from "./components/ConnectionStatus";

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {!isLoginPage && <Navbar />}
      <ScrollToTopOnRouteChange />
      <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/crypto"
                    element={
                      <ProtectedRoute>
                        <Crypto />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/stocks"
                    element={
                      <ProtectedRoute>
                        <Stocks />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/news"
                    element={
                      <ProtectedRoute>
                        <News />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/platforms"
                    element={
                      <ProtectedRoute>
                        <Platforms />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pricing"
                    element={
                      <ProtectedRoute>
                        <Pricing />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/features"
                    element={
                      <ProtectedRoute>
                        <Features />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <ProtectedRoute>
                        <Contact />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/api"
                    element={
                      <ProtectedRoute>
                        <API />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/about"
                    element={
                      <ProtectedRoute>
                        <About />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/blog"
                    element={
                      <ProtectedRoute>
                        <Blog />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/careers"
                    element={
                      <ProtectedRoute>
                        <Careers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/docs"
                    element={
                      <ProtectedRoute>
                        <Documentation />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/help"
                    element={
                      <ProtectedRoute>
                        <Help />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/community"
                    element={
                      <ProtectedRoute>
                        <Community />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/privacy"
                    element={
                      <ProtectedRoute>
                        <Privacy />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/terms"
                    element={
                      <ProtectedRoute>
                        <Terms />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cookies"
                    element={
                      <ProtectedRoute>
                        <Cookies />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
      </main>
      <FavoriteToast />
      <ConnectionStatus />
      <ScrollToTop />
      {!isLoginPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppProvider>
          <Router>
            <AppContent />
          </Router>
        </AppProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

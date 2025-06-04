import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import Layout from "./Layout";
import Home from "./Pages/Home/Home";
import ProjectDetail from "./Pages/OurProjectDetails/OurProjectDetails";
import Projects from "./Pages/Projects/Projects";
import Services from "./Pages/Services/Services";
import About from "./Pages/AboutUs/About";
import ContactForm from "./Pages/ContactUs/ContactUs";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <Router>
        {showSplash ? <SplashScreen /> : (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="contact" element={<ContactForm />} />
              <Route path="about" element={<About />} />
              <Route path="ourwork" element={<Projects />} />
              <Route path="ourwork/:slug" element={<ProjectDetail />} />
            </Route>
          </Routes>
        )}
      </Router>
    </HelmetProvider>
  );
}

function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center px-4 w-full max-w-md">
        {/* Logo Container with Elegant Animation */}
        <div className="relative mb-8 flex justify-center">
          <div className="relative">
            {/* Logo with 3D Flip Effect */}
            <div className="w-40 h-40 md:w-48 md:h-48 mx-auto relative animate-flipIn">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_xnQHTc9jCNvHR8zchGy65ysBii6XB4Zg&s"
                alt="Vastushobha Construction Logo"
                className="w-full h-full object-contain rounded-lg shadow-xl border-4 border-red-100"
              />
            </div>
            
            {/* Radiating Circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-48 h-48 md:w-56 md:h-56 rounded-full border-2 border-red-200 animate-radiate delay-500"></div>
              <div className="absolute w-56 h-56 md:w-64 md:h-64 rounded-full border-2 border-red-100 animate-radiate delay-700"></div>
            </div>
            
            {/* Floating Red Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-red-500 rounded-full animate-float"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 1.5}s`,
                    opacity: 0.7
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Brand Title with Elegant Typography */}
        <div className="overflow-hidden">
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 animate-slideInDown">
            <span className="inline-block">
              Vastushobha
            </span>
            <span className="inline-block ml-2 text-red-700 animate-pulseSlow">
              Construction
            </span>
          </h1>
        </div>

        {/* Subtitle with Delayed Animation */}
        <div className="overflow-hidden">
          <h2 className="text-lg md:text-xl font-medium text-gray-600 mt-3 animate-slideInUp">
            <span className="inline-block bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              Building Excellence, Crafting Visions
            </span>
          </h2>
        </div>

        {/* Elegant Loader */}
        <div className="mt-10 animate-fadeIn delay-1000">
          <div className="flex justify-center items-center space-x-2">
            <div className="relative">
              <div className="w-12 h-1 bg-gradient-to-r from-red-200 to-red-500 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 animate-progressBar"></div>
              </div>
              <div className="absolute -top-3 left-0 w-3 h-3 bg-red-600 rounded-full animate-bounceHorizontal"></div>
            </div>
          </div>
          <p className="mt-4 text-red-500 text-sm tracking-wider font-medium">
            Initializing your construction vision...
          </p>
        </div>

        {/* Construction Elements Animation */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-8 opacity-30">
          {['🏗️', '🔨', '🏠', '📐', '🧱'].map((icon, i) => (
            <span 
              key={i} 
              className="text-2xl animate-float delay-1000"
              style={{ animationDelay: `${i * 0.3 + 0.5}s` }}
            >
              {icon}
            </span>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx="true">{`
        @keyframes flipIn {
          0% { transform: rotateY(90deg) scale(0.8); opacity: 0; }
          60% { transform: rotateY(-10deg) scale(1.05); }
          100% { transform: rotateY(0deg) scale(1); opacity: 1; }
        }
        
        @keyframes radiate {
          0% { transform: scale(0.8); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        
        @keyframes slideInDown {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        
        @keyframes progressBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes bounceHorizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(36px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-flipIn {
          animation: flipIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-radiate {
          animation: radiate 2s ease-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-slideInDown {
          animation: slideInDown 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s forwards;
        }
        
        .animate-pulseSlow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
        
        .animate-progressBar {
          animation: progressBar 2s ease-out forwards;
        }
        
        .animate-bounceHorizontal {
          animation: bounceHorizontal 2s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .delay-700 {
          animation-delay: 0.7s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}

export default App;
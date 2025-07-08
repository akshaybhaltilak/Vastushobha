import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BadgeIndianRupee, Clock, Star, Users, ChevronRight, Play, Award, Shield, Zap, Phone, MapPin, Mail } from 'lucide-react';
import Services from '../Services/Services';
import Stats from '../Stats/Stats';
import Projects from '../Projects/Projects';
import Contactform from '../ContactUs/ContactUs';
import About from '../AboutUs/About';
import { NavLink } from 'react-router-dom';

const services = [
  {
    name: "Planning & Design",
    href: "/services/planning",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2089&q=80",
    description: "Strategic architectural planning with innovative design solutions that bring your vision to life with precision and modern aesthetics.",
    stats: "500+ Projects",
    gradient: "from-blue-500/20 to-purple-500/20"
  },
  {
    name: "Legal Sanctioning",
    href: "/services/sanctioning", 
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    description: "Complete legal compliance and approval services ensuring seamless construction process with all regulatory requirements.",
    stats: "100% Approval Rate",
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    name: "Premium Construction",
    href: "/services/buildingconstruction",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    description: "World-class construction services using cutting-edge technology and premium materials for lasting quality.",
    stats: "25+ Years Experience",
    gradient: "from-orange-500/20 to-red-500/20"
  },
  {
    name: "3D Visualization",
    href: "/services/3dmodeling",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    description: "Photorealistic 3D modeling and virtual tours that let you experience your dream project before construction begins.",
    stats: "Ultra HD Quality",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    name: "Luxury Interiors",
    href: "/services/interiordesigning",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2058&q=80",
    description: "Bespoke interior design solutions that blend functionality with aesthetic excellence for modern living spaces.",
    stats: "Award Winning",
    gradient: "from-rose-500/20 to-pink-500/20"
  },
  {
    name: "Smart Renovation",
    href: "/services/renovation",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
    description: "Transform existing spaces with smart renovation solutions that enhance value and modernize your property.",
    stats: "Zero Waste Policy",
    gradient: "from-teal-500/20 to-cyan-500/20"
  }
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && !isAnimating) {
        handleNext();
      }
    }, isMobile ? 4000 : 6000); // Faster on mobile

    return () => clearInterval(interval);
  }, [isHovered, isAnimating, isMobile]);

  const handleMouseMove = (e) => {
    if (isMobile) return; // Disable on mobile
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === services.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleDotClick = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Enhanced slide animation with mobile optimization
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: isMobile ? 1 : 1.05
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: isMobile ? 0.6 : 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: isMobile ? 1 : 0.95,
      transition: {
        duration: isMobile ? 0.6 : 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  // Content animation variants with mobile optimization
  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: isMobile ? 30 : 60,
      scale: isMobile ? 1 : 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.5 : 0.8,
        ease: "easeOut",
        staggerChildren: isMobile ? 0.05 : 0.1,
        delayChildren: isMobile ? 0.1 : 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: isMobile ? 15 : 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: isMobile ? 0.4 : 0.6, ease: "easeOut" }
    }
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: isMobile ? [-5, 5, -5] : [-10, 10, -10],
      transition: {
        duration: isMobile ? 4 : 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const renderIndicators = () => {
    return (
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-2 sm:gap-3 z-30 px-4">
        {services.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`relative overflow-hidden rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? "bg-red-500 w-8 sm:w-10 md:w-12 h-2 sm:h-2.5 md:h-3" 
                : "bg-white/40 hover:bg-white/60 w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3"
            }`}
            whileHover={{ scale: isMobile ? 1.1 : 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: isMobile ? 4 : 6, ease: 'linear' }}
              />
            )}
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Emerge Construction - Premier Construction Company in Akola</title>
        <meta name="description" content="Emerge Construction offers top-quality construction services in Akola, Maharashtra. Commercial and residential building solutions with expert craftsmanship." />
        <meta name="keywords" content="emerge construction akola, construction in akola, building contractor akola" />
        <link rel="canonical" href="https://emergeconstruction.in/" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      <div className="relative text-gray-900 overflow-hidden bg-white" id="home">
        {/* Hero Carousel Section */}
        <section
          className="relative min-h-screen w-full overflow-hidden"
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Enhanced animated background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-red-50">
            <div className="absolute inset-0 opacity-10">
              <motion.div 
                className="absolute top-10 sm:top-20 left-4 sm:left-20 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-red-500 rounded-full blur-2xl sm:blur-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute top-32 sm:top-60 right-8 sm:right-40 w-12 sm:w-18 md:w-24 h-12 sm:h-18 md:h-24 bg-red-400 rounded-full blur-xl sm:blur-2xl"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div 
                className="absolute bottom-20 sm:bottom-40 left-1/4 sm:left-1/3 w-20 sm:w-28 md:w-40 h-20 sm:h-28 md:h-40 bg-red-300 rounded-full blur-2xl sm:blur-3xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait" custom={currentIndex}>
            <motion.div
              key={currentIndex}
              custom={currentIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <div className="grid lg:grid-cols-2 min-h-screen items-center">
                {/* Content Side */}
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-12 lg:py-0 order-2 lg:order-1 h-full flex flex-col justify-center relative z-10"
                >
                  <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-50 text-red-600 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                      <Award className="w-3 sm:w-4 h-3 sm:h-4" />
                      <span>Premium Quality Since 1999</span>
                    </div>
                    <div className="text-xs sm:text-sm font-semibold tracking-widest text-red-500 mb-2">
                      {String(currentIndex + 1).padStart(2, '0')}/{String(services.length).padStart(2, '0')} • {services[currentIndex].stats}
                    </div>
                  </motion.div>

                  <motion.h1
                    variants={itemVariants}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight"
                  >
                    <span className="text-red-500">{services[currentIndex].name.split(' ')[0]}</span>{' '}
                    <span className="block sm:inline">{services[currentIndex].name.split(' ').slice(1).join(' ')}</span>
                  </motion.h1>

                  <motion.p
                    variants={itemVariants}
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-xl leading-relaxed"
                  >
                    {services[currentIndex].description}
                  </motion.p>

                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8"
                  >
                    <motion.div
                      whileHover={{ scale: isMobile ? 1.02 : 1.05, y: isMobile ? 0 : -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <NavLink
                        to="#projects"
                        className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto text-sm sm:text-base"
                      >
                        <Play className="w-4 sm:w-5 h-4 sm:h-5 group-hover:scale-110 transition-transform" />
                        View Our Portfolio
                        <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </NavLink>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: isMobile ? 1.02 : 1.05, y: isMobile ? 0 : -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <NavLink
                        to="#contact"
                        className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto text-sm sm:text-base"
                      >
                        <Zap className="w-4 sm:w-5 h-4 sm:h-5 group-hover:scale-110 transition-transform" />
                        Get Free Quote
                      </NavLink>
                    </motion.div>
                  </motion.div>

                  {/* Feature highlights */}
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Shield className="w-3 sm:w-4 h-3 sm:h-4 text-red-500 flex-shrink-0" />
                      <span>Licensed & Insured</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Star className="w-3 sm:w-4 h-3 sm:h-4 text-red-500 flex-shrink-0" />
                      <span>5-Star Rated</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Users className="w-3 sm:w-4 h-3 sm:h-4 text-red-500 flex-shrink-0" />
                      <span>1000+ Happy Clients</span>
                    </div>
                  </motion.div>

                  {/* Mobile contact quick actions */}
                  <motion.div
                    variants={itemVariants}
                    className="flex gap-2 sm:gap-3 mt-6 sm:mt-8 lg:hidden"
                  >
                    <motion.a
                      href="tel:+911234567890"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium text-sm flex-1 transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </motion.a>
                    <motion.a
                      href="mailto:info@emergeconstruction.in"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-sm flex-1 transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </motion.a>
                  </motion.div>
                </motion.div>

                {/* Image Side */}
                <motion.div
                  className="relative h-64 sm:h-80 md:h-96 lg:h-full order-1 lg:order-2 min-h-[40vh] lg:min-h-full"
                  variants={floatingVariants}
                  initial="initial"
                  animate="animate"
                >
                  <div className={`absolute inset-0 bg-gradient-to-bl ${services[currentIndex].gradient} rounded-2xl sm:rounded-3xl m-2 sm:m-4`}></div>
                  <motion.div
                    className="relative h-full overflow-hidden rounded-2xl sm:rounded-3xl m-2 sm:m-4 shadow-xl sm:shadow-2xl"
                    style={!isMobile ? {
                      transform: `perspective(1000px) rotateY(${mousePosition.x * 2 - 1}deg) rotateX(${mousePosition.y * -2 + 1}deg)`
                    } : {}}
                  >
                    <img
                      src={services[currentIndex].image}
                      alt={services[currentIndex].name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 via-transparent to-transparent"></div>
                    
                    {/* Floating stats card */}
                  

                    {/* Floating quality badge */}
                    <motion.div
                      className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 bg-red-500 text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg sm:shadow-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Award className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5" />
                        <span className="font-semibold text-xs sm:text-sm">Premium Quality</span>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {renderIndicators()}

          {/* Enhanced Navigation buttons - Desktop only */}
          <div className="hidden lg:block">
            <motion.button
              onClick={handlePrev}
              className="absolute left-4 xl:left-6 top-1/2 -translate-y-1/2 p-3 xl:p-4 rounded-full bg-white/90 backdrop-blur-sm text-red-500 z-30 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 xl:h-6 w-5 xl:w-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <motion.button
              onClick={handleNext}
              className="absolute right-4 xl:right-6 top-1/2 -translate-y-1/2 p-3 xl:p-4 rounded-full bg-white/90 backdrop-blur-sm text-red-500 z-30 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 xl:h-6 w-5 xl:w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Mobile swipe areas with improved feedback */}
          <motion.button
            onClick={handlePrev}
            className="absolute left-0 top-0 h-full w-1/4 z-20 lg:hidden"
            whileTap={{ backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
            aria-label="Previous slide"
          />
          <motion.button
            onClick={handleNext}
            className="absolute right-0 top-0 h-full w-1/4 z-20 lg:hidden"
            whileTap={{ backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
            aria-label="Next slide"
          />

          {/* Enhanced progress bar */}
          <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gray-200 z-30">
            <motion.div
              className="h-full bg-gradient-to-r from-red-400 via-red-500 to-red-600"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: isMobile ? 4 : 6, ease: 'linear' }}
              key={currentIndex}
            />
          </div>
        </section>

        {/* Enhanced floating elements - Desktop only */}
        <div className="fixed top-16 sm:top-20 right-4 sm:right-8 z-40 hidden xl:block">
          
        </div>

        {/* Mobile floating contact button */}
        <motion.div
          className="fixed bottom-6 right-4 z-50 lg:hidden"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, duration: 0.5, type: "spring" }}
        >
          <motion.a
            href="tel:+911234567890"
            className="flex items-center justify-center w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              boxShadow: [
                "0 4px 20px rgba(239, 68, 68, 0.3)",
                "0 8px 30px rgba(239, 68, 68, 0.5)",
                "0 4px 20px rgba(239, 68, 68, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Phone className="w-6 h-6" />
          </motion.a>
        </motion.div>

        <Stats id="stats" />
        <Services id="services" />
        <Projects id="projects" />
        <About />
        <Contactform />
      </div>
    </>
  );
};

export default Home;
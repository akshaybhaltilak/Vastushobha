import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BadgeIndianRupee, Clock, Star, Users } from 'lucide-react';
import Services from '../Services/Services';
import Stats from '../Stats/Stats';
import Projects from '../Projects/Projects';
import Contactform from '../ContactUs/ContactUs';
import About from '../AboutUs/About';
import { NavLink } from 'react-router-dom';

const services = [
  {
    name: "Planning",
    href: "/services/planning",
    image: "https://i.pinimg.com/1200x/74/54/04/745404d12e92abd7c73cfaac6e25d915.jpg",
    description: "Strategic planning to bring your vision to life with precision and efficiency."
  },
  {
    name: "Sanctioning",
    href: "/services/sanctioning",
    image: "https://www.freshbooks.com/wp-content/uploads/2022/03/approve-an-invoice-payment.jpg",
    description: "Ensuring legal approvals and compliance for a seamless construction process."
  },
  {
    name: "Building Construction",
    href: "/services/buildingconstruction",
    image: "https://images.pexels.com/photos/18162495/pexels-photo-18162495/free-photo-of-crane-near-concrete-buidling-under-construction.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "High-quality construction services for residential and commercial spaces."
  },
  {
    name: "3D Modeling",
    href: "/services/3dmodeling",
    image: "https://img.freepik.com/free-photo/view-3d-house-model_23-2150761166.jpg?t=st=1744894707~exp=1744898307~hmac=cd83b8e9c868b1338cebb026bc3b93d8d6bf463d0b8698c111ffe3087258368d&w=826",
    description: "Realistic 3D visualizations to preview your dream project before construction."
  },
  {
    name: "Interior Designing",
    href: "/services/interiordesigning",
    image: "https://images.pexels.com/photos/31491025/pexels-photo-31491025/free-photo-of-elegant-rooftop-restaurant-interior-with-city-view.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Creative interior solutions that enhance aesthetics and functionality."
  },
  {
    name: "Renovation",
    href: "/services/renovation",
    image: "https://images.pexels.com/photos/3562689/pexels-photo-3562689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Transforming spaces with modern upgrades and high-quality renovations."
  },
  {
    name: "Estimation",
    href: "/services/estimation",
    image: "https://images.pexels.com/photos/5466809/pexels-photo-5466809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Accurate cost estimation to keep your project within budget."
  },
  {
    name: "Land Sub-division",
    href: "/services/landsubdivision",
    image: "https://images.pexels.com/photos/7937301/pexels-photo-7937301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Expert solutions for dividing land into plots with legal approvals."
  }
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && !isAnimating) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, isAnimating]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === services.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleDotClick = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // Simplified fade animation
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 1 } }
  };

  // Text animation
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const textItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 }
  };

  const renderIndicators = () => {
    return (
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white w-6" : "bg-white/30"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
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
      </Helmet>
      <div className="relative text-gray-100 overflow-hidden bg-gray-900" id="home">
        {/* Hero Carousel Section */}
        <section
          className="relative h-screen w-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${services[currentIndex].image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                {/* White glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 ">
                  {/* Content container */}
                  <div className="absolute inset-0 flex flex-col justify-end pb-16 px-6 sm:px-8 bg-black/5">
                    <motion.div
                      variants={textContainerVariants}
                      initial="hidden"
                      animate="visible"
                      className="max-w-4xl mx-auto w-full"
                    >
                      <motion.div
                        variants={textItemVariants}
                        className="text-sm font-medium tracking-wider text-white/80 mb-1"
                      >
                        {String(currentIndex + 1).padStart(2, '0')}/{String(services.length).padStart(2, '0')}
                      </motion.div>

                      <motion.h1
                        variants={textItemVariants}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white"
                      >
                        {services[currentIndex].name}
                      </motion.h1>

                      <motion.p
                        variants={textItemVariants}
                        className="text-lg sm:text-xl text-white/90 mb-6 max-w-2xl"
                      >
                        {services[currentIndex].description}
                      </motion.p>

                      <motion.div
                        variants={textItemVariants}
                        className="flex flex-wrap gap-3"
                      >
                        <motion.div
                          variants={buttonVariants}
                          initial="rest"
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <NavLink
                            to="#projects"
                            className="inline-block px-6 py-3 bg-white text-gray-900 font-medium rounded-lg transition-all"
                          >
                            Explore Our Work
                          </NavLink>
                        </motion.div>
                        <motion.div
                          variants={buttonVariants}
                          initial="rest"
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <NavLink
                            to="#contact"
                            className="inline-block px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg transition-all hover:bg-white/10"
                          >
                            Get Quote
                          </NavLink>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {renderIndicators()}

          {/* Navigation buttons - visible on desktop, hidden on mobile */}
          <div className="hidden sm:block">
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white z-20 hover:bg-white/20 transition-all"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white z-20 hover:bg-white/20 transition-all"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Invisible touch areas for mobile navigation */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-0 h-full w-1/4 z-10 sm:hidden"
            aria-label="Previous slide"
          />
          <button
            onClick={handleNext}
            className="absolute right-0 top-0 h-full w-1/4 z-10 sm:hidden"
            aria-label="Next slide"
          />
        </section>

        <Stats id="stats" />
        <Services id="services" />
        <Projects id="project" />
        <About />
        <Contactform />
      </div>
    </>
  );
};

export default Home;
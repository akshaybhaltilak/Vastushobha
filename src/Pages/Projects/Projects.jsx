import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Mock data for demonstration
const mockProjects = [
    {
        id: 1,
        title: "Modern Residential Complex",
        category: "Residential",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
        address: "Akola, Maharashtra",
        shortDescription: "A contemporary residential complex featuring modern amenities and sustainable design principles.",
        timeline: "18 months",
        totalArea: "50,000 sq ft",
        budget: "₹2.5 Cr",
        client: "Green Valley Developers",
        year: "2023",
        slug: "modern-residential-complex"
    },
    {
        id: 2,
        title: "Corporate Office Tower",
        category: "Commercial",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
        address: "Nagpur, Maharashtra",
        shortDescription: "A state-of-the-art corporate office building with smart building technologies.",
        timeline: "24 months",
        totalArea: "75,000 sq ft",
        budget: "₹5.2 Cr",
        client: "Tech Solutions Ltd",
        year: "2023",
        slug: "corporate-office-tower"
    },
    {
        id: 3,
        title: "Luxury Villa Estate",
        category: "Residential",
        imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500",
        address: "Mumbai, Maharashtra",
        shortDescription: "Exclusive luxury villas with premium finishes and landscaped gardens.",
        timeline: "12 months",
        totalArea: "25,000 sq ft",
        budget: "₹8.5 Cr",
        client: "Elite Homes",
        year: "2024",
        slug: "luxury-villa-estate"
    },
    {
        id: 4,
        title: "Shopping Mall Complex",
        category: "Commercial",
        imageUrl: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=500",
        address: "Pune, Maharashtra",
        shortDescription: "Multi-level shopping complex with entertainment zones and food courts.",
        timeline: "30 months",
        totalArea: "120,000 sq ft",
        budget: "₹15 Cr",
        client: "Metro Mall Group",
        year: "2024",
        slug: "shopping-mall-complex"
    }
];

const Projects = () => {
    const ref = useRef(null);
    const projectsRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const controls = useAnimation();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);

    const [activeCategory, setActiveCategory] = useState('all');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [categories, setCategories] = useState(['all']);

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    useEffect(() => {
        if (projectsRef.current) {
            setMaxScroll(projectsRef.current.scrollWidth - projectsRef.current.clientWidth);
        }
    }, [projectsRef, filteredProjects]);

    useEffect(() => {
        const allCategories = mockProjects.map(project => project.category);
        const uniqueCategories = ['all', ...new Set(allCategories.filter(Boolean))];
        setCategories(uniqueCategories);
        setFilteredProjects(mockProjects);
    }, []);

    const handleScroll = (direction) => {
        if (projectsRef.current) {
            const scrollAmount = window.innerWidth > 768 ? 400 : 300;
            const newPosition = direction === 'right'
                ? Math.min(scrollPosition + scrollAmount, maxScroll)
                : Math.max(scrollPosition - scrollAmount, 0);

            projectsRef.current.scrollTo({
                left: newPosition,
                behavior: 'smooth'
            });
            setScrollPosition(newPosition);
        }
    };

    const handleProjectsScroll = () => {
        if (projectsRef.current) {
            setScrollPosition(projectsRef.current.scrollLeft);
        }
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);

        if (category === 'all') {
            setFilteredProjects(mockProjects);
        } else {
            const filtered = mockProjects.filter(project => project.category === category);
            setFilteredProjects(filtered);
        }

        if (projectsRef.current) {
            projectsRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            setScrollPosition(0);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { y: 60, opacity: 0, scale: 0.9 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: i * 0.1
            }
        }),
        hover: {
            y: -15,
            scale: 1.02,
            rotateY: 5,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hover: {
            scale: 1.1,
            rotate: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const overlayVariants = {
        hover: {
            background: "linear-gradient(135deg, rgba(220, 38, 38, 0.9), rgba(239, 68, 68, 0.8))",
            transition: {
                duration: 0.4
            }
        }
    };

    const buttonVariants = {
        initial: {
            background: "linear-gradient(135deg, #dc2626, #ef4444)",
            color: "#ffffff",
            scale: 1
        },
        hover: {
            background: "linear-gradient(135deg, #ffffff, #f8fafc)",
            color: "#dc2626",
            scale: 1.05,
            boxShadow: "0 0 30px rgba(220, 38, 38, 0.4)",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        tap: {
            scale: 0.95
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative" ref={ref}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        rotate: 360,
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                        duration: 20, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                    className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/40 to-pink-200/40 rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{ 
                        rotate: -360,
                        scale: [1.2, 1, 1.2],
                    }}
                    transition={{ 
                        duration: 25, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{ 
                        y: [-20, 20, -20],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-bl from-yellow-200/30 to-orange-200/30 rounded-full blur-2xl"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Enhanced Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative inline-block"
                    >
                        <motion.h2
                            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-red-600 to-gray-800 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Our Projects
                        </motion.h2>
                        
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={isInView ? { width: "100%", opacity: 1 } : {}}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-full mx-auto shadow-lg"
                            style={{ maxWidth: "200px" }}
                        />
                    </motion.div>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto mt-8 leading-relaxed"
                    >
                        Discover our portfolio of exceptional projects that showcase innovation, craftsmanship, and architectural excellence.
                    </motion.p>
                </motion.div>

                {/* Enhanced Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-16"
                >
                    <div className="flex flex-wrap justify-center gap-4 px-4">
                        {categories.map((category, index) => (
                            <motion.button
                                key={category}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ 
                                    scale: 1.05,
                                    y: -2
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleCategoryChange(category)}
                                className={`relative px-8 py-3.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                                    activeCategory === category
                                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-xl shadow-red-500/25'
                                        : 'bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200 hover:bg-white hover:shadow-lg hover:border-red-200'
                                }`}
                            >
                                {activeCategory === category && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">
                                    {category === 'all' ? 'All Projects' : category}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Enhanced Projects Grid */}
                {filteredProjects.length > 0 && (
                    <div className="relative">
                        {/* Navigation Buttons */}
                        <div className="hidden lg:block">
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.1, x: -5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleScroll('left')}
                                disabled={scrollPosition <= 0}
                                className={`absolute left-0 top-1/2 z-20 transform -translate-y-1/2 p-4 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-gray-100 transition-all duration-300 ${
                                    scrollPosition <= 0 ? 'opacity-30 cursor-not-allowed' : 'hover:shadow-2xl hover:bg-white'
                                }`}
                            >
                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </motion.button>
                            
                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.1, x: 5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleScroll('right')}
                                disabled={scrollPosition >= maxScroll}
                                className={`absolute right-0 top-1/2 z-20 transform -translate-y-1/2 p-4 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-gray-100 transition-all duration-300 ${
                                    scrollPosition >= maxScroll ? 'opacity-30 cursor-not-allowed' : 'hover:shadow-2xl hover:bg-white'
                                }`}
                            >
                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.button>
                        </div>

                        {/* Projects Container */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={controls}
                            className="flex overflow-x-auto snap-x snap-mandatory pb-8 px-4 lg:px-12 space-x-8 scrollbar-hide"
                            ref={projectsRef}
                            onScroll={handleProjectsScroll}
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    custom={index}
                                    variants={cardVariants}
                                    whileHover="hover"
                                    className="flex-shrink-0 w-[350px] sm:w-[400px] snap-center group"
                                >
                                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/50 h-full">
                                        {/* Enhanced Image Container */}
                                        <div className="relative h-64 overflow-hidden">
                                            <motion.img
                                                variants={imageVariants}
                                                src={project.imageUrl}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                            
                                            {/* Animated Overlay */}
                                            <motion.div
                                                variants={overlayVariants}
                                                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                                            />
                                            
                                            {/* Floating Category Badge */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                className="absolute top-4 left-4 z-10"
                                            >
                                                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-red-600 text-sm font-bold rounded-full shadow-lg border border-white/50">
                                                    {project.category}
                                                </span>
                                            </motion.div>
                                            
                                            {/* Floating Stats */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                whileHover={{ opacity: 1, y: 0 }}
                                                className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            >
                                                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                                                    <div className="flex items-center space-x-2 text-sm">
                                                        <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="font-semibold text-gray-700">{project.timeline}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Enhanced Content */}
                                        <div className="p-6 space-y-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                                                    {project.title}
                                                </h3>
                                                <div className="flex items-center text-gray-600 text-sm mb-3">
                                                    <svg className="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    </svg>
                                                    {project.address}
                                                </div>
                                                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                                                    {project.shortDescription}
                                                </p>
                                            </div>

                                            {/* Enhanced Stats Grid */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl p-3 border border-red-100"
                                                >
                                                    <div className="flex items-center">
                                                        <div className="p-2 bg-red-500 rounded-lg mr-3">
                                                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-600 font-medium">Area</p>
                                                            <p className="text-sm font-bold text-gray-900">{project.totalArea}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>

                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-3 border border-green-100"
                                                >
                                                    <div className="flex items-center">
                                                        <div className="p-2 bg-green-500 rounded-lg mr-3">
                                                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-600 font-medium">Budget</p>
                                                            <p className="text-sm font-bold text-gray-900">{project.budget}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </div>

                                            {/* Client & Year */}
                                            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium">Client</p>
                                                    <p className="text-sm font-semibold text-gray-700">{project.client}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-500 font-medium">Year</p>
                                                    <p className="text-sm font-semibold text-gray-700">{project.year}</p>
                                                </div>
                                            </div>

                                            {/* Enhanced CTA Button */}
                                            <motion.button
                                                variants={buttonVariants}
                                                initial="initial"
                                                whileHover="hover"
                                                whileTap="tap"
                                                className="w-full py-3.5 px-6 rounded-xl font-semibold text-center relative overflow-hidden border border-red-200 group"
                                            >
                                                <motion.span
                                                    className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    initial={{ scale: 0 }}
                                                    whileHover={{ scale: 1 }}
                                                />
                                                <span className="relative z-10 flex items-center justify-center">
                                                    View Details
                                                    <motion.svg 
                                                        className="ml-2 h-4 w-4"
                                                        initial={{ x: 0 }}
                                                        whileHover={{ x: 5 }}
                                                        fill="none" 
                                                        viewBox="0 0 24 24" 
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </motion.svg>
                                                </span>
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Mobile Scroll Indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-center mt-6 lg:hidden"
                        >
                            <motion.div
                                animate={{ 
                                    x: [0, 10, 0],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="flex items-center text-red-600 text-sm font-medium"
                            >
                                <span>Swipe to explore</span>
                                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.div>
                        </motion.div>
                    </div>
                )}

                {/* Enhanced Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {[
                        { value: "50+", label: "Projects Completed", icon: "🏗️", color: "from-blue-500 to-blue-600" },
                        { value: "8+", label: "Years Experience", icon: "⏰", color: "from-green-500 to-green-600" },
                        { value: "100+", label: "Happy Clients", icon: "😊", color: "from-purple-500 to-purple-600" },
                        { value: "15", label: "Awards Won", icon: "🏆", color: "from-yellow-500 to-yellow-600" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ 
                                scale: 1.05,
                                y: -5,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                            }}
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 200
                            }}
                            viewport={{ once: true }}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300"
                        >
                            <motion.div
                                className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg`}
                                whileHover={{ rotate: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {stat.icon}
                            </motion.div>
                            <motion.h3
                                className="text-3xl font-bold text-gray-900 mb-2"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                {stat.value}
                            </motion.h3>
                           <p className="text-gray-600 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Call to Action Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <motion.div
                        className="bg-gradient-to-r from-red-600 to-red-500 rounded-3xl p-12 shadow-2xl relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {/* Background Animation */}
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-xl"
                        />
                        <motion.div
                            animate={{
                                rotate: [360, 0],
                                scale: [1.2, 1, 1.2],
                            }}
                            transition={{
                                duration: 25,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-xl"
                        />
                        
                        <div className="relative z-10">
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-3xl md:text-4xl font-bold text-white mb-4"
                            >
                                Ready to Start Your Project?
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-xl text-red-100 mb-8 max-w-2xl mx-auto"
                            >
                                Let's bring your vision to life with our expertise and innovative approach
                            </motion.p>
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 0 40px rgba(255,255,255,0.3)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                            >
                                Get Started Today
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Projects;
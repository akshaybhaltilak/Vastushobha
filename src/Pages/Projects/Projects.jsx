import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ourProjects } from '../../Data/OurProjects';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Projects = () => {
    // For viewport detection
    const ref = useRef(null);
    const projectsRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const controls = useAnimation();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);

    // State for category filtering
    const [activeCategory, setActiveCategory] = useState('all');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [categories, setCategories] = useState(['all']);

    // Handle animation when in view
    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    // Update max scroll value when projects are filtered
    useEffect(() => {
        if (projectsRef.current) {
            setMaxScroll(projectsRef.current.scrollWidth - projectsRef.current.clientWidth);
        }
    }, [projectsRef, filteredProjects]);

    // Extract categories and set initial filtered projects
    useEffect(() => {
        // Extract unique categories
        const allCategories = ourProjects.map(project => project.category || project.industry);
        const uniqueCategories = ['all', ...new Set(allCategories.filter(Boolean))];
        setCategories(uniqueCategories);

        // Initialize with all projects
        setFilteredProjects(ourProjects);
    }, []);

    // Handle scroll navigation
    const handleScroll = (direction) => {
        if (projectsRef.current) {
            const scrollAmount = window.innerWidth > 768 ? 600 : 300;
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

    // Track scroll position for navigation button states
    const handleProjectsScroll = () => {
        if (projectsRef.current) {
            setScrollPosition(projectsRef.current.scrollLeft);
        }
    };

    // Handle category change
    const handleCategoryChange = (category) => {
        setActiveCategory(category);

        // Filter projects based on selected category
        if (category === 'all') {
            setFilteredProjects(ourProjects);
        } else {
            const filtered = ourProjects.filter(project =>
                (project.category === category) || (project.industry === category)
            );
            setFilteredProjects(filtered);
        }

        // Reset scroll position when changing category
        if (projectsRef.current) {
            projectsRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
            setScrollPosition(0);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: i * 0.1
            }
        }),
        hover: {
            y: -10,
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const buttonVariants = {
        initial: {
            scale: 1,
            backgroundColor: "#dc2626", // Red-600
            color: "#ffffff",
            boxShadow: "0 0 0 rgba(220, 38, 38, 0.1)"
        },
        hover: {
            scale: 1.03,
            backgroundColor: "#ffffff",
            color: "#dc2626", // Red-600
            border: "1px solid #dc2626",
            boxShadow: "0 0 15px rgba(220, 38, 38, 0.4)",
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        },
        tap: {
            scale: 0.97
        }
    };

    const headingVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const statVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                delay: 0.2 + (i * 0.1),
                type: "spring",
                stiffness: 100
            }
        }),
        hover: {
            scale: 1.05,
            y: -5,
            transition: {
                type: "spring",
                stiffness: 300
            }
        }
    };

    const navButtonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                type: "spring",
                stiffness: 200
            }
        },
        hover: {
            scale: 1.1,
            boxShadow: "0 0 15px rgba(220, 38, 38, 0.5)",
            transition: {
                type: "spring",
                stiffness: 400
            }
        },
        tap: {
            scale: 0.95
        }
    };

    const filterContainerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.05
            }
        }
    };

    const filterItemVariants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        },
        active: {
            scale: 1.05,
            backgroundColor: "#dc2626", // Red-600
            color: "#ffffff",
            boxShadow: "0 5px 15px rgba(220, 38, 38, 0.5)"
        },
        tap: { scale: 0.95 }
    };

    return (
        <>
            <Helmet>
                <title>Construction Projects in Akola | Emerge Construction Portfolio</title>
                <meta name="description" content="Explore Emerge Construction's showcase of successful construction projects in Akola including residential buildings, commercial complexes, and renovation projects across Maharashtra." />
                <meta name="keywords" content="construction projects akola, emerge construction portfolio, building projects akola, construction work akola, construction company projects akola" />
                <link rel="canonical" href="https://emergeconstruction.in/ourwork" />

                {/* Open Graph tags for better social sharing */}
                <meta property="og:title" content="Construction Projects in Akola | Emerge Construction Portfolio" />
                <meta property="og:description" content="Explore Emerge Construction's showcase of successful construction projects in Akola including residential buildings, commercial complexes, and renovation projects." />
                <meta property="og:image" content="https://emergeconstruction.in/projects-og-image.jpg" />
                <meta property="og:url" content="https://emergeconstruction.in/ourwork" />
                <meta property="og:type" content="website" />
            </Helmet>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white"
                id='projects'
                ref={ref}
            >
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
                    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                </div>

                <div className="max-w-7xl mx-auto relative">
                    {/* Heading Section with enhanced animation */}
                    <motion.div
                        variants={headingVariants}
                        initial="hidden"
                        animate={controls}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={isInView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="relative inline-block"
                        >
                            <motion.h2
                                className="text-3xl md:text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-red-600"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                viewport={{ once: true }}
                            >
                                Our Projects
                            </motion.h2>
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={isInView ? { width: "100%" } : {}}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="h-1 bg-gradient-to-r from-red-600 to-gray-800 rounded-full mx-auto mt-1"
                                style={{ maxWidth: "120px" }}
                            />
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mt-4 px-4"
                        >
                            Explore our curated selection of exceptional projects that showcase our expertise and commitment to excellence.
                        </motion.p>
                    </motion.div>

                    {/* Category Filter Tabs - Enhanced with pill design */}
                    <motion.div
                        variants={filterContainerVariants}
                        initial="hidden"
                        animate={controls}
                        className="mb-12"
                    >
                        <div className="w-full text-center mb-5">
                            <h3 className="text-lg font-medium text-gray-800">Browse by category</h3>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3 px-2 max-w-4xl mx-auto">
                            {categories.map((category, index) => (
                                <motion.button
                                    key={category}
                                    variants={filterItemVariants}
                                    initial="hidden"
                                    animate={activeCategory === category ? "active" : "visible"}
                                    whileHover={activeCategory !== category ? { scale: 1.05, backgroundColor: "rgba(220, 38, 38, 0.1)" } : {}}
                                    whileTap="tap"
                                    onClick={() => handleCategoryChange(category)}
                                    className={`px-5 py-2.5 text-sm rounded-full border transition-all duration-300 ${activeCategory === category
                                            ? 'bg-red-600 text-white border-red-600 shadow-md font-medium'
                                            : 'bg-white text-gray-800 border-gray-200 hover:border-gray-400'
                                        }`}
                                >
                                    {category === 'all' ? 'All Projects' : category}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Empty state for when no projects match the filter */}
                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16 px-4"
                        >
                            <div className="bg-white rounded-xl p-8 max-w-md mx-auto shadow-lg border border-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">No projects found</h3>
                                <p className="text-gray-600 mb-5">We couldn't find any projects matching this category.</p>
                                <motion.button
                                    onClick={() => handleCategoryChange('all')}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
                                >
                                    View all projects
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Projects - With horizontal scroll navigation */}
                    {filteredProjects.length > 0 && (
                        <div className="relative -mx-4">
                            {/* Desktop Navigation Buttons */}
                            <div className="hidden sm:block">
                                <motion.button
                                    variants={navButtonVariants}
                                    initial="hidden"
                                    animate={controls}
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={() => handleScroll('left')}
                                    disabled={scrollPosition <= 0}
                                    className={`absolute left-2 top-1/2 z-10 transform -translate-y-1/2 p-3 rounded-full bg-white backdrop-blur-sm shadow-lg border border-gray-200 ${scrollPosition <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    aria-label="Scroll left"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </motion.button>
                                <motion.button
                                    variants={navButtonVariants}
                                    initial="hidden"
                                    animate={controls}
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={() => handleScroll('right')}
                                    disabled={scrollPosition >= maxScroll}
                                    className={`absolute right-2 top-1/2 z-10 transform -translate-y-1/2 p-3 rounded-full bg-white backdrop-blur-sm shadow-lg border border-gray-200 ${scrollPosition >= maxScroll ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    aria-label="Scroll right"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.button>
                            </div>

                            {/* Project Cards - Horizontal Scrolling Container */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate={controls}
                                className="flex overflow-x-auto snap-x snap-mandatory scrolling-touch pb-8 px-4 no-scrollbar"
                                ref={projectsRef}
                                onScroll={handleProjectsScroll}
                                style={{
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none'
                                }}
                            >
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        custom={index}
                                        variants={cardVariants}
                                        whileHover="hover"
                                        className="flex-shrink-0 w-[320px] sm:w-[380px] mx-3 sm:mx-4 snap-center bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
                                        style={{
                                            scrollSnapAlign: 'center',
                                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.8)'
                                        }}
                                    >
                                        {/* Project Image with enhanced overlay */}
                                        <div className="h-56 sm:h-60 overflow-hidden relative group">
                                            <motion.img
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.5 }}
                                                src={project.imageUrl || project.mainImage}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                            {/* Category Badge */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: 0.2 }}
                                                className="absolute bottom-3 left-3 flex gap-2"
                                            >
                                                <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
                                                    {project.category || project.industry}
                                                </span>
                                            </motion.div>
                                        </div>

                                        {/* Project Details */}
                                        <div className="p-5 relative">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{project.title}</h3>
                                            </div>

                                            {/* Location with icon */}
                                            <div className="flex items-center text-gray-700 text-xs mb-3">
                                                <span className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {project.address || project.location}
                                                </span>
                                            </div>

                                            {/* Project description */}
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {project.shortDescription || project.summary}
                                            </p>

                                            {/* Project Stats Grid */}
                                            <div className="grid grid-cols-2 gap-3 mt-4 mb-4">
                                                {/* Timeline */}
                                                <motion.div
                                                    whileHover={{ scale: 1.03 }}
                                                    className="bg-gray-50 rounded-lg p-3 shadow-sm border border-gray-100 flex items-center"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-xs text-gray-500 font-medium">Timeline</p>
                                                        <p className="text-sm font-bold text-gray-900">{project.timeline}</p>
                                                    </div>
                                                </motion.div>

                                                {/* Category */}
                                                <motion.div
                                                    whileHover={{ scale: 1.03 }}
                                                    className="bg-gray-50 rounded-lg p-3 shadow-sm border border-gray-100 flex items-center"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-xs text-gray-500 font-medium">Category</p>
                                                        <p className="text-sm font-bold text-gray-900">{project.category}</p>
                                                    </div>
                                                </motion.div>

                                                {/* Total Area */}
                                                <motion.div
                                                    whileHover={{ scale: 1.03 }}
                                                    className="bg-gray-50 rounded-lg p-3 shadow-sm border border-gray-100 flex items-center"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-xs text-gray-500 font-medium">Total Area</p>
                                                        <p className="text-sm font-bold text-gray-900">{project.totalArea || project.totalSqFt || "N/A"}</p>
                                                    </div>
                                                </motion.div>

                                                {/* Budget */}
                                                <motion.div
                                                    whileHover={{ scale: 1.03 }}
                                                    className="bg-gray-50 rounded-lg p-3 shadow-sm border border-gray-100 flex items-center"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-xs text-gray-500 font-medium">Budget</p>
                                                        <p className="text-sm font-bold text-gray-900">{project.budget || project.totalCost || "N/A"}</p>
                                                    </div>
                                                </motion.div>
                                            </div>

                                            {/* Client and Year */}
                                            <div className="flex justify-between items-center text-gray-800 mb-5">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-xs text-gray-500 font-medium">Client</p>
                                                        <p className="text-sm font-medium">{project.client}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-xs text-gray-500 font-medium">Year</p>
                                                        <p className="text-sm font-medium">{project.year || (project.startDate && project.endDate ? `${project.startDate} - ${project.endDate}` : "N/A")}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Enhanced Button with Pulse Effect */}
                                            <Link to={`/ourwork/${project.slug}`} className="block">
                                                <motion.button
                                                    variants={buttonVariants}
                                                    initial="initial"
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                    className="w-full block text-center border border-red-600 py-3 px-4 rounded-lg font-medium relative overflow-hidden"
                                                >
                                                    <motion.span
                                                        initial={{ opacity: 0 }}
                                                        whileHover={{
                                                            opacity: [0, 0.5, 0],
                                                            scale: [1, 1.5],
                                                            transition: { duration: 1.5, repeat: Infinity, repeatType: "loop" }
                                                        }}
                                                        className="absolute inset-0 bg-red-400/20 rounded-lg"
                                                    />
                                                    View Project Details
                                                </motion.button>
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Extra blank space at end for better UX */}
                                <div className="flex-shrink-0 w-4 sm:w-8 h-1"></div>
                            </motion.div>

                            {/* Scroll Indicator for Mobile */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0.4, 0.8, 0.4],
                                    x: [0, 10, 0]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: "loop"
                                }}
                                className="flex items-center justify-center mt-2 sm:hidden"
                            >
                                <span className="text-xs text-red-600 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Swipe to view more
                                </span>
                            </motion.div>
                        </div>
                    )}

                    {/* Stats Section with Enhanced Glassmorphism */}
                    <motion.div
                        initial="hidden"
                        animate={controls}
                        variants={containerVariants}
                        className="mt-16 sm:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
                    >
                        {[
                            {
                                value: "20+",
                                label: "Projects Completed",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                ),
                            },
                            {
                                value: "5+",
                                label: "Years of Experience",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                            },
                            {
                                value: "30+",
                                label: "Happy Clients",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                            },
                            {
                                value: "7",
                                label: "Design Awards",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                ),
                            },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={statVariants}
                                whileHover="hover"
                                className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg"
                            >
                                <div className="flex flex-col items-center justify-center text-center space-y-3">
                                    <div className="p-3 bg-red-50 rounded-full">
                                        {stat.icon}
                                    </div>
                                    <motion.h3
                                        className="text-2xl sm:text-3xl font-bold text-gray-900"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        {stat.value}
                                    </motion.h3>
                                    <motion.p
                                        className="text-sm text-gray-700"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        {stat.label}
                                    </motion.p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mt-16 sm:mt-24"
                    >
                        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-xl max-w-4xl mx-auto relative overflow-hidden">
                            {/* Decorative elements */}
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                            
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 relative z-10">Ready to discuss your project?</h3>
                            <p className="text-gray-700 mb-8 max-w-2xl mx-auto relative z-10">
                                Let's collaborate to turn your vision into reality. Our team of experts is ready to help you create something extraordinary.
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative z-10"
                            >
                                <NavLink to="#contact" className="inline-block bg-red-600 text-white py-3 px-8 rounded-lg font-medium shadow-lg hover:bg-red-700 transition-colors">
                                    Contact Us
                                </NavLink>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default Projects;
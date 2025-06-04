import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

function About() {
    const [showFullMission, setShowFullMission] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null);

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    // Engineer data
    const engineers = [
        {
            id: 1,
            name: "Er. Eng first",
            title: "Co-Founder",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_xnQHTc9jCNvHR8zchGy65ysBii6XB4Zg&s",
            shortBio: "Structural design expert bringing innovative engineering solutions to complex projects.",
            fullBio: "With expertise in structural design and analysis, Purvesh brings innovative engineering solutions to our most complex projects. His leadership ensures all structures exceed safety standards while maintaining architectural integrity.",
            quote: "Engineering isn't just about calculations—it's about creating structures that elevate human experience.",
            stats: [
                { value: "5+", label: "Years Exp." },
                { value: "M.E", label: "Structural Eng." },
                { value: "30+", label: "Projects" }
            ]
        },
        {
            id: 2,
            name: "Er. eng sec",
            title: "Co-Founder",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_xnQHTc9jCNvHR8zchGy65ysBii6XB4Zg&s",
            shortBio: "Sustainable construction specialist with focus on eco-friendly design practices.",
            fullBio: "Bhushan specializes in sustainable construction practices and eco-friendly design. His innovative approach to civil engineering has earned our company multiple green building certifications and industry recognition.",
            quote: "The best engineering solutions work with nature, not against it—balancing progress with preservation.",
            stats: [
                { value: "5+", label: "Years Exp" },
                { value: "B.E", label: "Civil" },
                { value: "5+", label: "Awards" }
            ]
        }
    ];

    return (
        <>
            <Helmet>
                <title>About Vastushobha Construction | Leading Construction Company</title>
                <meta name="description" content="Vastushobha Construction is a trusted construction company with expertise in residential, commercial and industrial building projects. Learn about our experience, team and construction approach." />
                <meta name="keywords" content="about vastushobha construction, construction company history, best construction company, construction team, building contractors experience" />
                <link rel="canonical" href="https://vastushobhaconstruction.in/about" />

                {/* Open Graph tags for better social sharing */}
                <meta property="og:title" content="About Vastushobha Construction | Leading Construction Company" />
                <meta property="og:description" content="Vastushobha Construction is a trusted construction company with expertise in residential, commercial and industrial building projects." />
                <meta property="og:image" content="https://vastushobhaconstruction.in/about-og-image.jpg" />
                <meta property="og:url" content="https://vastushobhaconstruction.in/about" />
                <meta property="og:type" content="website" />

                {/* Company schema for About page */}
                <script type="application/ld+json">
                    {`
                    {
                      "@context": "https://schema.org",
                      "@type": "Organization",
                      "name": "Vastushobha Construction",
                      "url": "https://vastushobhaconstruction.in",
                      "logo": "https://vastushobhaconstruction.in/logo.png",
                      "description": "Vastushobha Construction is a leading construction company offering residential and commercial building services with Vastu principles.",
                      "foundingDate": "2020", 
                      "founders": [
                        {
                          "@type": "Person",
                          "name": "Er. First Eng"
                        },
                        {
                          "@type": "Person",
                          "name": "Er. Sec Eng."
                        }
                      ],
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Your Street Address",
                        "addressLocality": "Akola",
                        "addressRegion": "Maharashtra",
                        "postalCode": "444001",
                        "addressCountry": "IN"
                      },
                      "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+91XXXXXXXXXX",
                        "contactType": "customer service"
                      }
                    }
                    `}
                </script>
            </Helmet>
            
            <div className="min-h-screen bg-white" id='about'>
                {/* Hero Section with Red and White Theme */}
                <motion.div
                    className="relative py-16 md:py-24 bg-gradient-to-r from-red-800 to-red-600 overflow-hidden"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                        <motion.h1
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6"
                            variants={fadeIn}
                        >
                            Building <span className="text-white/90">with Tradition,</span> <span className="block">Crafting with Modernity</span>
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
                            variants={fadeIn}
                        >
                            Combining Vastu principles with modern construction techniques to create harmonious living spaces.
                        </motion.p>
                    </div>
                </motion.div>

                {/* Content Section */}
                <div className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
                    <div className="container mx-auto max-w-6xl">
                        <motion.div
                            className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerChildren}
                        >
                            {/* Image Section */}
                            <motion.div
                                className="w-full md:w-5/12 relative mb-8 md:mb-0"
                                variants={fadeIn}
                            >
                                <div className="absolute inset-0 bg-red-700 rounded-xl transform rotate-2 scale-105"></div>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_xnQHTc9jCNvHR8zchGy65ysBii6XB4Zg&s"
                                    alt="Vastushobha Construction Team"
                                    className="relative w-full h-full object-cover rounded-xl border-4 border-white z-10"
                                />
                                <motion.div
                                    className="absolute -bottom-4 -right-4 bg-red-700 text-white px-4 py-2 rounded-md z-20 text-sm font-bold shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Vastu Compliant Designs
                                </motion.div>
                            </motion.div>

                            {/* About Text */}
                            <motion.div
                                className="w-full md:w-7/12 space-y-6"
                                variants={fadeIn}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                                    <span className="text-red-700">About</span> Vastushobha
                                </h2>

                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Founded in 2020, <span className="font-semibold text-red-700">Vastushobha Construction</span> combines traditional Vastu principles with modern construction techniques to create harmonious living and working spaces.
                                </p>

                                {/* Mission & Vision */}
                                <motion.div
                                    className="bg-white p-6 rounded-lg border-l-4 border-red-700 shadow-sm hover:shadow-md transition-shadow"
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission & Vision</h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        {showFullMission ? (
                                            <>
                                                To create structures that harmonize ancient Vastu wisdom with contemporary architectural excellence. We strive to build spaces that promote positive energy flow while meeting modern living standards. Our vision is to become the preferred choice for Vastu-compliant construction, known for our integrity, quality craftsmanship, and client-centric approach.
                                            </>
                                        ) : (
                                            <>
                                                To create structures that harmonize ancient Vastu wisdom with contemporary architectural excellence. We strive to build spaces that promote positive energy flow...
                                            </>
                                        )}
                                    </p>
                                    <motion.button
                                        className="mt-4 text-red-700 text-base font-medium flex items-center hover:text-red-900 group"
                                        onClick={() => setShowFullMission(!showFullMission)}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        {showFullMission ? 'Show Less' : 'Read More'}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            {showFullMission ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            )}
                                        </svg>
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Engineers Section */}
                        <motion.div
                            className="mt-16 md:mt-20"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerChildren}
                        >
                            <motion.h2
                                className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10 md:mb-12"
                                variants={fadeIn}
                            >
                                <span className="text-red-700">Meet</span> Our Expert Team
                            </motion.h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {engineers.map((engineer) => (
                                    <motion.div
                                        key={engineer.id}
                                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all"
                                        variants={fadeIn}
                                        whileHover={{ y: -8 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="relative h-64">
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"></div>
                                            <img
                                                src={engineer.image}
                                                alt={engineer.name}
                                                className="w-full h-full object-cover object-center"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                                                <h3 className="text-2xl font-bold mb-1">{engineer.name}</h3>
                                                <p className="text-sm font-medium bg-red-700/90 inline-block px-3 py-1 rounded-full">
                                                    {engineer.title}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex gap-4 mb-4">
                                                {engineer.stats.map((stat, index) => (
                                                    <div key={index} className="text-center">
                                                        <div className="text-xl font-bold text-red-700">{stat.value}</div>
                                                        <div className="text-xs text-gray-500">{stat.label}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <p className="text-gray-700 text-base mb-4 leading-relaxed">
                                                {expandedCard === engineer.id ? engineer.fullBio : engineer.shortBio}
                                            </p>

                                            {expandedCard === engineer.id && (
                                                <motion.div
                                                    className="mt-4 pt-4 border-t border-gray-200"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <p className="italic text-red-700 text-base">
                                                        "{engineer.quote}"
                                                    </p>
                                                </motion.div>
                                            )}

                                            <motion.button
                                                className="mt-4 text-red-700 text-base font-medium flex items-center hover:text-red-900"
                                                onClick={() => setExpandedCard(expandedCard === engineer.id ? null : engineer.id)}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                {expandedCard === engineer.id ? 'Show Less' : 'Read More'}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    {expandedCard === engineer.id ? (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                    ) : (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    )}
                                                </svg>
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Vastu Principles Section */}
                        <motion.div 
                            className="mt-20 bg-red-50 rounded-xl p-8 md:p-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeIn}
                        >
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    <span className="text-red-700">Vastu</span> Principles We Follow
                                </h2>
                                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                                    Our construction incorporates time-tested Vastu principles for positive energy flow
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    {
                                        title: "Direction Alignment",
                                        desc: "Proper orientation of buildings according to cardinal directions",
                                        icon: "🧭"
                                    },
                                    {
                                        title: "Energy Flow",
                                        desc: "Designing spaces to enhance positive energy circulation",
                                        icon: "🌀"
                                    },
                                    {
                                        title: "Element Balance",
                                        desc: "Harmonizing the five elements in architectural design",
                                        icon: "⚖️"
                                    },
                                    {
                                        title: "Sacred Geometry",
                                        desc: "Incorporating auspicious proportions and measurements",
                                        icon: "📐"
                                    }
                                ].map((item, index) => (
                                    <motion.div 
                                        key={index}
                                        className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                                        whileHover={{ y: -5 }}
                                        variants={fadeIn}
                                    >
                                        <div className="text-4xl mb-4">{item.icon}</div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
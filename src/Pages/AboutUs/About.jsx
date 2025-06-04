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
            name: "Er. Purvesh R. Sakarkar",
            title: "Co-Founder",
            image: "/nande.JPG",
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
            name: "Er. Bhushan V. Kale",
            title: "Co-Founder",
            image: "/nande.JPG",
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
                <title>About Emerge Construction | Leading Construction Company in Akola</title>
                <meta name="description" content="Emerge Construction is a trusted construction company in Akola with expertise in residential, commercial and industrial building projects. Learn about our experience, team and construction approach." />
                <meta name="keywords" content="about emerge construction akola, construction company history akola, best construction company akola, construction team akola, building contractors akola experience" />
                <link rel="canonical" href="https://emergeconstruction.in/about" />

                {/* Open Graph tags for better social sharing */}
                <meta property="og:title" content="About Emerge Construction | Leading Construction Company in Akola" />
                <meta property="og:description" content="Emerge Construction is a trusted construction company in Akola with expertise in residential, commercial and industrial building projects." />
                <meta property="og:image" content="https://emergeconstruction.in/about-og-image.jpg" />
                <meta property="og:url" content="https://emergeconstruction.in/about" />
                <meta property="og:type" content="website" />

                {/* Company schema for About page */}
                <script type="application/ld+json">
                    {`
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Emerge Construction",
      "url": "https://emergeconstruction.in",
      "logo": "https://emergeconstruction.in/logo.png",
      "description": "Emerge Construction is a leading construction company in Akola offering residential and commercial building services.",
      "foundingDate": "YYYY", 
      "founders": [
        {
          "@type": "Person",
          "name": "Founder Name"
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
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" id='about'>
                {/* Hero Section with Clean Professional Design */}
                <motion.div
                    className="relative py-16 md:py-24 bg-gradient-to-r from-gray-900 to-stone-800 overflow-hidden"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                        <motion.h1
                            className="text-3xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6"
                            variants={fadeIn}
                        >
                            Building Dreams, <span className="text-stone-400">Crafting Reality</span>
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl text-stone-200 max-w-3xl mx-auto"
                            variants={fadeIn}
                        >
                            With over 5 years of excellence in construction, we transform visions into lasting structures.
                        </motion.p>
                    </div>

                    {/* Subtle decorative element without shadow */}
                    {/* <div className="absolute bottom-0 left-0 w-full h-12 md:h-16 bg-gradient-to-t from-gray-50 to-transparent"></div> */}
                </motion.div>

                {/* Content Section with Refined Design */}
                <div className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
                    <div className="container mx-auto max-w-6xl">
                        <motion.div
                            className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerChildren}
                        >
                            {/* Image Section with Refined Styling */}
                            <motion.div
                                className="w-full md:w-5/12 relative mb-8 md:mb-0"
                                variants={fadeIn}
                            >
                                <div className="absolute inset-0 bg-stone-700 rounded-xl transform rotate-2 scale-105"></div>
                                <img
                                    src="/nande.JPG"
                                    alt="Construction Professional"
                                    className="relative w-full h-full object-cover rounded-xl border-2 border-white z-10"
                                />
                                <motion.div
                                    className="absolute -bottom-4 -right-4 bg-stone-800 text-white px-4 py-2 rounded-md z-20 text-sm font-bold"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    5+ Years Excellence
                                </motion.div>
                            </motion.div>

                            {/* About Text with Refined Design */}
                            <motion.div
                                className="w-full md:w-7/12 space-y-6"
                                variants={fadeIn}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                                    <span className="text-stone-700">About</span> Our Firm
                                </h2>

                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Founded in 2020, <span className="font-semibold text-stone-700">Emerge Construction </span> has been at the forefront of construction excellence, delivering high-quality residential and commercial projects across the region.
                                </p>

                                {/* Mission & Vision with Refined Design */}
                                <motion.div
                                    className="bg-white p-6 rounded-lg border-l-4 border-stone-700 shadow-md"
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission & Vision</h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        {showFullMission ? (
                                            <>
                                                To build sustainable, safe, and aesthetically pleasing structures while maintaining the highest standards of quality and client satisfaction. We aim to be the region's most trusted construction partner, known for integrity, innovation, and excellence in every project we undertake. Our vision encompasses creating spaces that positively impact communities while embracing cutting-edge construction technologies.
                                            </>
                                        ) : (
                                            <>
                                                To build sustainable, safe, and aesthetically pleasing structures while maintaining the highest standards of quality and client satisfaction...
                                            </>
                                        )}
                                    </p>
                                    <motion.button
                                        className="mt-4 text-stone-800 text-base font-medium flex items-center hover:text-stone-600 group"
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

                        {/* Engineers Section - Professional Card Design with Stone/Gray Color Scheme */}
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
                                <span className="text-stone-700">Meet</span> Our Lead Engineers
                            </motion.h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {engineers.map((engineer) => (
                                    <motion.div
                                        key={engineer.id}
                                        className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100"
                                        variants={fadeIn}
                                        whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
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
                                                <p className="text-sm font-medium bg-stone-800/80 inline-block px-3 py-1 rounded-full">
                                                    {engineer.title}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-6">


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
                                                    <p className="italic text-stone-700 text-base">
                                                        "{engineer.quote}"
                                                    </p>
                                                </motion.div>
                                            )}

                                            <motion.button
                                                className="mt-4 text-stone-700 text-base font-medium flex items-center hover:text-stone-900"
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
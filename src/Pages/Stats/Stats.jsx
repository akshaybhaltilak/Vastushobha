import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    FiHome, FiCheckCircle, FiTool,
    FiUsers, FiClock, FiMapPin,
    FiSettings, FiTrendingUp, FiShield, FiAward,
} from 'react-icons/fi';
import { FaRuler, FaHardHat, FaTruck } from 'react-icons/fa';
import { Hammer, Building, PaintBucket, Zap } from 'lucide-react';

const Stats = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [activePhase, setActivePhase] = useState(0);
    const [progress, setProgress] = useState(0);
    const [animationSpeed, setAnimationSpeed] = useState(1);
    const [isPlaying, setIsPlaying] = useState(true);

    // Construction phases with detailed information
    const constructionPhases = [
        {
            id: 0,
            name: 'Site Preparation',
            duration: '1-2 weeks',
            color: '#8b5cf6',
            icon: <FiMapPin className="text-xl" />,
            activities: ['Land survey', 'Soil testing', 'Site clearing', 'Temporary facilities'],
            progress: 100,
            status: 'completed'
        },
        {
            id: 1,
            name: 'Foundation',
            duration: '2-3 weeks',
            color: '#f59e0b',
            icon: <FaHardHat className="text-xl" />,
            activities: ['Excavation', 'Concrete pouring', 'Reinforcement', 'Curing'],
            progress: 85,
            status: 'active'
        },
        {
            id: 2,
            name: 'Structure',
            duration: '4-6 weeks',
            color: '#10b981',
            icon: <Building className="text-xl" />,
            activities: ['Frame construction', 'Walls', 'Roofing', 'Windows & doors'],
            progress: 45,
            status: 'upcoming'
        },
        {
            id: 3,
            name: 'MEP Installation',
            duration: '3-4 weeks',
            color: '#3b82f6',
            icon: <Zap className="text-xl" />,
            activities: ['Electrical wiring', 'Plumbing', 'HVAC systems', 'Safety systems'],
            progress: 0,
            status: 'upcoming'
        },
        {
            id: 4,
            name: 'Finishing',
            duration: '3-5 weeks',
            color: '#ef4444',
            icon: <PaintBucket className="text-xl" />,
            activities: ['Interior painting', 'Flooring', 'Fixtures', 'Final touches'],
            progress: 0,
            status: 'upcoming'
        },
        {
            id: 5,
            name: 'Handover',
            duration: '1 week',
            color: '#06b6d4',
            icon: <FiAward className="text-xl" />,
            activities: ['Final inspection', 'Quality check', 'Documentation', 'Key handover'],
            progress: 0,
            status: 'upcoming'
        }
    ];

    // Auto-cycle through phases
    useEffect(() => {
        if (!isPlaying) return;
        
        const interval = setInterval(() => {
            setActivePhase((prev) => (prev + 1) % constructionPhases.length);
        }, 3000 / animationSpeed);

        return () => clearInterval(interval);
    }, [constructionPhases.length, animationSpeed, isPlaying]);

    // Update progress animation
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev + 1) % 101);
        }, 100 / animationSpeed);

        return () => clearInterval(interval);
    }, [animationSpeed]);

    const stats = [
        {
            value: "35K+",
            label: "Total Square Foot Completed",
            description: "Successfully delivered projects",
            icon: <FaRuler className="text-2xl sm:text-3xl" />
        },
        {
            value: "10+",
            label: "Ongoing Projects",
            description: "Currently under construction",
            icon: <FiHome className="text-2xl sm:text-3xl" />
        },
        {
            value: "20+",
            label: "Completed Projects",
            description: "Successfully delivered",
            icon: <FiCheckCircle className="text-2xl sm:text-3xl" />
        },
        {
            value: "100%",
            label: "Quality Assurance",
            description: "Premium construction standards",
            icon: <FiShield className="text-2xl sm:text-3xl" />
        },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <div className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden text-gray-900 bg-white">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-r from-orange-100 to-orange-50 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-gradient-to-r from-gray-100 to-gray-100 rounded-full opacity-10 blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Title Section */}
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="text-center mb-12 lg:mb-16"
                >
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-orange-600"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Interactive Construction Process
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-gray-600 max-w-3xl mx-auto"
                    >
                        Experience our step-by-step construction methodology with real-time progress tracking
                    </motion.p>
                </motion.div>

                {/* Main Content - Desktop Layout */}
                <div className="hidden lg:flex flex-row items-center justify-between gap-12">
                    {/* Left Side - Interactive Construction Timeline */}
                    <motion.div
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={containerVariants}
                        className="w-1/2 flex flex-col"
                    >
                        {/* Control Panel */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Construction Timeline</h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                                    >
                                        {isPlaying ? 'Pause' : 'Play'}
                                    </button>
                                    <select
                                        value={animationSpeed}
                                        onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                                    >
                                        <option value={0.5}>0.5x</option>
                                        <option value={1}>1x</option>
                                        <option value={2}>2x</option>
                                        <option value={3}>3x</option>
                                    </select>
                                </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <motion.div
                                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-orange-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(activePhase / (constructionPhases.length - 1)) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            <div className="text-sm text-gray-600">
                                Phase {activePhase + 1} of {constructionPhases.length}
                            </div>
                        </div>

                        {/* Construction Timeline */}
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                            
                            {constructionPhases.map((phase, index) => (
                                <motion.div
                                    key={phase.id}
                                    className={`relative flex items-start mb-8 cursor-pointer transition-all duration-300 ${
                                        activePhase === index ? 'scale-105' : 'hover:scale-102'
                                    }`}
                                    onClick={() => setActivePhase(index)}
                                    whileHover={{ x: 5 }}
                                >
                                    {/* Phase Icon */}
                                    <motion.div
                                        className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full shadow-lg ${
                                            activePhase === index 
                                                ? 'ring-4 ring-white ring-opacity-60' 
                                                : ''
                                        }`}
                                        style={{ backgroundColor: phase.color }}
                                        animate={activePhase === index ? {
                                            scale: [1, 1.1, 1],
                                            boxShadow: [`0 0 0 0 ${phase.color}40`, `0 0 0 10px ${phase.color}00`, `0 0 0 0 ${phase.color}00`]
                                        } : {}}
                                        transition={{ duration: 1.5, repeat: activePhase === index ? Infinity : 0 }}
                                    >
                                        <div className="text-white">
                                            {phase.icon}
                                        </div>
                                    </motion.div>

                                    {/* Phase Content */}
                                    <div className="ml-6 flex-1">
                                        <div className={`p-4 rounded-lg shadow-sm border transition-all duration-300 ${
                                            activePhase === index 
                                                ? 'bg-white border-gray-300 shadow-md' 
                                                : 'bg-gray-50 border-gray-200'
                                        }`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className={`font-semibold ${
                                                    activePhase === index ? 'text-gray-900' : 'text-gray-700'
                                                }`}>
                                                    {phase.name}
                                                </h4>
                                                <span className="text-sm text-gray-500">
                                                    {phase.duration}
                                                </span>
                                            </div>
                                            
                                            {/* Activities */}
                                            <div className="grid grid-cols-2 gap-1 mb-3">
                                                {phase.activities.map((activity, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="text-xs text-gray-600 flex items-center"
                                                    >
                                                        <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                                                        {activity}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Progress Bar for Active Phase */}
                                            {activePhase === index && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="w-full bg-gray-200 rounded-full h-1.5"
                                                >
                                                    <motion.div
                                                        className="h-1.5 rounded-full"
                                                        style={{ backgroundColor: phase.color }}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${progress}%` }}
                                                        transition={{ duration: 0.1 }}
                                                    />
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side - Stats Cards */}
                    <motion.div
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={containerVariants}
                        className="w-1/2 grid grid-cols-2 gap-6"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{
                                    y: -5,
                                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                                }}
                                className="bg-white p-6 rounded-xl shadow-md border border-gray-200 group transition-all duration-300 hover:border-blue-300 hover:shadow-lg"
                            >
                                <div className="relative z-10">
                                    <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                                        {React.cloneElement(stat.icon, {
                                            className: `${stat.icon.props.className} text-blue-600 group-hover:text-blue-700`
                                        })}
                                    </div>

                                    <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {stat.value}
                                    </h3>
                                    <p className="text-lg font-medium text-gray-800 mb-2 leading-tight">
                                        {stat.label}
                                    </p>
                                    <p className="text-sm text-gray-600 leading-snug">
                                        {stat.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden">
                    {/* Control Panel - Mobile */}
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Construction Timeline</h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                                >
                                    {isPlaying ? 'Pause' : 'Play'}
                                </button>
                            </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <motion.div
                                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-orange-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${(activePhase / (constructionPhases.length - 1)) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                        <div className="text-sm text-gray-600">
                            Phase {activePhase + 1} of {constructionPhases.length}
                        </div>
                    </div>

                    {/* Timeline - Mobile */}
                    <motion.div
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={containerVariants}
                        className="mb-12"
                    >
                        <div className="relative">
                            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                            
                            {constructionPhases.map((phase, index) => (
                                <motion.div
                                    key={phase.id}
                                    className={`relative flex items-start mb-6 cursor-pointer transition-all duration-300 ${
                                        activePhase === index ? 'scale-105' : ''
                                    }`}
                                    onClick={() => setActivePhase(index)}
                                >
                                    <motion.div
                                        className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full shadow-lg ${
                                            activePhase === index ? 'ring-2 ring-white ring-opacity-60' : ''
                                        }`}
                                        style={{ backgroundColor: phase.color }}
                                        animate={activePhase === index ? {
                                            scale: [1, 1.1, 1],
                                        } : {}}
                                        transition={{ duration: 1.5, repeat: activePhase === index ? Infinity : 0 }}
                                    >
                                        <div className="text-white text-sm">
                                            {phase.icon}
                                        </div>
                                    </motion.div>

                                    <div className="ml-4 flex-1">
                                        <div className={`p-3 rounded-lg shadow-sm border transition-all duration-300 ${
                                            activePhase === index 
                                                ? 'bg-white border-gray-300 shadow-md' 
                                                : 'bg-gray-50 border-gray-200'
                                        }`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className={`font-semibold text-sm ${
                                                    activePhase === index ? 'text-gray-900' : 'text-gray-700'
                                                }`}>
                                                    {phase.name}
                                                </h4>
                                                <span className="text-xs text-gray-500">
                                                    {phase.duration}
                                                </span>
                                            </div>
                                            
                                            {activePhase === index && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="grid grid-cols-1 gap-1 mb-3">
                                                        {phase.activities.map((activity, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="text-xs text-gray-600 flex items-center"
                                                            >
                                                                <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                                                                {activity}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-1">
                                                        <motion.div
                                                            className="h-1 rounded-full"
                                                            style={{ backgroundColor: phase.color }}
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${progress}%` }}
                                                            transition={{ duration: 0.1 }}
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Stats Cards - Mobile */}
                    <motion.div
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={containerVariants}
                        className="grid grid-cols-2 gap-4"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                            >
                                <div className="mb-3 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                                    {React.cloneElement(stat.icon, {
                                        className: 'text-xl text-blue-600'
                                    })}
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                    {stat.value}
                                </h3>
                                <p className="text-sm font-medium text-gray-800 mb-1 leading-tight">
                                    {stat.label}
                                </p>
                                <p className="text-xs text-gray-600 leading-snug">
                                    {stat.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
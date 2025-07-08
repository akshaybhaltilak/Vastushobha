import React, { useState, useEffect } from 'react';
import { FiHome, FiCheckCircle, FiTrendingUp, FiClock, FiUsers, FiPlay, FiPause, FiRotateCcw, FiLayers, FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { FaHardHat, FaTruck, FaCube, FaRuler, FaChartLine } from 'react-icons/fa';

const Stats = () => {
    const [activeTab, setActiveTab] = useState('visualizer');
    const [buildingHeight, setBuildingHeight] = useState(5);
    const [buildingType, setBuildingType] = useState('residential');
    const [animationSpeed, setAnimationSpeed] = useState(1);
    const [isBuilding, setIsBuilding] = useState(false);
    const [buildProgress, setBuildProgress] = useState(0);
    const [currentFloor, setCurrentFloor] = useState(0);
    const [selectedProject, setSelectedProject] = useState(0);
    const [timelineProgress, setTimelineProgress] = useState(0);

    const stats = [
        {
            value: "15+",
            label: "Active Sites",
            description: "Currently under construction",
            icon: <FaHardHat className="text-2xl" />,
            color: "from-orange-500 to-orange-400"
        },
        {
            value: "98%",
            label: "On Time",
            description: "Projects completed on schedule",
            icon: <FiClock className="text-2xl" />,
            color: "from-blue-500 to-blue-400"
        },
        {
            value: "50+",
            label: "Team Members",
            description: "Skilled professionals working",
            icon: <FiUsers className="text-2xl" />,
            color: "from-green-500 to-green-400"
        },
        {
            value: "25+",
            label: "Projects Delivered",
            description: "Happy clients served",
            icon: <FiCheckCircle className="text-2xl" />,
            color: "from-purple-500 to-purple-400"
        },
    ];

    const buildingTypes = {
        residential: {
            name: 'Residential Complex',
            color: 'bg-blue-500',
            windowColor: 'bg-yellow-200',
            maxFloors: 12,
            cost: '₹2.5M per floor',
            time: '3 weeks per floor'
        },
        commercial: {
            name: 'Commercial Tower',
            color: 'bg-gray-600',
            windowColor: 'bg-blue-200',
            maxFloors: 20,
            cost: '₹4.2M per floor',
            time: '4 weeks per floor'
        },
        industrial: {
            name: 'Industrial Facility',
            color: 'bg-red-600',
            windowColor: 'bg-orange-200',
            maxFloors: 8,
            cost: '₹3.8M per floor',
            time: '5 weeks per floor'
        }
    };

    const projects = [
        {
            name: "Skyline Residences",
            type: "Residential",
            phases: ["Foundation", "Structure", "Electrical", "Plumbing", "Finishing", "Handover"],
            duration: "18 months",
            progress: [100, 85, 60, 40, 20, 0]
        },
        {
            name: "Tech Hub Plaza",
            type: "Commercial",
            phases: ["Planning", "Excavation", "Framework", "Systems", "Interior", "Testing"],
            duration: "24 months",
            progress: [100, 100, 75, 50, 25, 10]
        },
        {
            name: "Green Factory",
            type: "Industrial",
            phases: ["Site Prep", "Foundation", "Steel Frame", "Roofing", "Equipment", "Commissioning"],
            duration: "15 months",
            progress: [100, 90, 70, 45, 15, 0]
        }
    ];

    // Building animation effect
    useEffect(() => {
        let interval;
        if (isBuilding) {
            interval = setInterval(() => {
                setBuildProgress(prev => {
                    const newProgress = prev + (animationSpeed * 2);
                    if (newProgress >= 100) {
                        setIsBuilding(false);
                        return 100;
                    }
                    return newProgress;
                });
                setCurrentFloor(prev => {
                    const newFloor = Math.floor((buildProgress / 100) * buildingHeight);
                    return Math.min(newFloor, buildingHeight);
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isBuilding, animationSpeed, buildingHeight, buildProgress]);

    // Timeline animation
    useEffect(() => {
        const interval = setInterval(() => {
            setTimelineProgress(prev => (prev + 1) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const startBuilding = () => {
        setIsBuilding(true);
        setBuildProgress(0);
        setCurrentFloor(0);
    };

    const resetBuilding = () => {
        setIsBuilding(false);
        setBuildProgress(0);
        setCurrentFloor(0);
    };

    const renderBuilding = () => {
        const floors = [];
        const currentType = buildingTypes[buildingType];
        
        for (let i = 0; i < buildingHeight; i++) {
            const isBuilt = i < currentFloor || buildProgress >= 100;
            const isCurrentlyBuilding = i === currentFloor && isBuilding;
            
            floors.push(
                <div
                    key={i}
                    className={`relative border-2 border-gray-400 transition-all duration-300 ${
                        isBuilt ? currentType.color : 'bg-gray-200'
                    } ${isCurrentlyBuilding ? 'animate-pulse' : ''}`}
                    style={{
                        height: '30px',
                        width: '120px',
                        opacity: isBuilt ? 1 : 0.3,
                        transform: isCurrentlyBuilding ? 'scale(1.05)' : 'scale(1)'
                    }}
                >
                    {/* Windows */}
                    {isBuilt && (
                        <div className="absolute inset-2 grid grid-cols-4 gap-1">
                            {[...Array(4)].map((_, j) => (
                                <div
                                    key={j}
                                    className={`${currentType.windowColor} border border-gray-500 rounded-sm`}
                                    style={{ height: '18px' }}
                                />
                            ))}
                        </div>
                    )}
                    
                    {/* Construction equipment on current floor */}
                    {isCurrentlyBuilding && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-yellow-500 animate-bounce">
                            🏗️
                        </div>
                    )}
                </div>
            );
        }
        
        return floors.reverse();
    };

    return (
        <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Title Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
                        Building With Excellence
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Experience our construction process through interactive visualization and real-time project tracking
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:scale-105"
                        >
                            <div className={`flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-gradient-to-r ${stat.color}`}>
                                <div className="text-white">
                                    {stat.icon}
                                </div>
                            </div>
                            
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                {stat.value}
                            </h3>
                            <p className="text-lg font-medium text-gray-800 mb-2">
                                {stat.label}
                            </p>
                            <p className="text-gray-600">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Interactive Section */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-8">
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setActiveTab('visualizer')}
                                className={`px-6 py-3 rounded-md font-medium transition-all ${
                                    activeTab === 'visualizer'
                                        ? 'bg-blue-500 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                🏗️ 3D Building Visualizer
                            </button>
                            <button
                                onClick={() => setActiveTab('timeline')}
                                className={`px-6 py-3 rounded-md font-medium transition-all ${
                                    activeTab === 'timeline'
                                        ? 'bg-blue-500 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                📊 Project Timeline
                            </button>
                        </div>
                    </div>

                    {/* 3D Building Visualizer */}
                    {activeTab === 'visualizer' && (
                        <div>
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Interactive Building Visualizer
                                </h3>
                                <p className="text-gray-600">
                                    Design and watch your building come to life with real-time construction simulation
                                </p>
                            </div>

                            {/* Building Controls */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Building Type
                                    </label>
                                    <select
                                        value={buildingType}
                                        onChange={(e) => setBuildingType(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {Object.entries(buildingTypes).map(([key, type]) => (
                                            <option key={key} value={key}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Number of Floors: {buildingHeight}
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max={buildingTypes[buildingType].maxFloors}
                                        value={buildingHeight}
                                        onChange={(e) => setBuildingHeight(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Build Speed: {animationSpeed}x
                                    </label>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="3"
                                        step="0.5"
                                        value={animationSpeed}
                                        onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Building Visualization */}
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Building Display */}
                                <div className="flex-1">
                                    <div className="bg-gradient-to-b from-blue-200 via-blue-100 to-green-200 h-96 rounded-lg border-4 border-gray-300 flex items-end justify-center p-8 overflow-hidden">
                                        <div className="relative">
                                            {/* Building Structure */}
                                            <div className="flex flex-col items-center">
                                                {renderBuilding()}
                                                
                                                {/* Foundation */}
                                                <div className="w-32 h-8 bg-gray-700 border-2 border-gray-500 rounded-sm mb-2">
                                                    <div className="w-full h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded-sm flex items-center justify-center">
                                                        <span className="text-white text-xs font-bold">FOUNDATION</span>
                                                    </div>
                                                </div>
                                                
                                                {/* Ground */}
                                                <div className="w-48 h-4 bg-green-400 border-2 border-green-500 rounded-sm"></div>
                                            </div>

                                            {/* Construction Stats */}
                                            <div className="absolute -right-32 top-0 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                                                <h4 className="font-bold text-gray-800 mb-2">Project Stats</h4>
                                                <div className="space-y-1 text-sm">
                                                    <div className="flex justify-between">
                                                        <span>Progress:</span>
                                                        <span className="font-semibold">{Math.round(buildProgress)}%</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Floor:</span>
                                                        <span className="font-semibold">{currentFloor}/{buildingHeight}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Cost:</span>
                                                        <span className="font-semibold">{buildingTypes[buildingType].cost}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Time:</span>
                                                        <span className="font-semibold">{buildingTypes[buildingType].time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Controls */}
                                    <div className="flex justify-center gap-4 mt-6">
                                        <button
                                            onClick={startBuilding}
                                            disabled={isBuilding}
                                            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <FiPlay /> Start Construction
                                        </button>
                                        <button
                                            onClick={resetBuilding}
                                            className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                        >
                                            <FiRotateCcw /> Reset
                                        </button>
                                    </div>
                                </div>

                                {/* Building Info */}
                                <div className="lg:w-80">
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h4 className="text-lg font-bold text-gray-800 mb-4">
                                            {buildingTypes[buildingType].name}
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <FiLayers className="text-blue-500" />
                                                <span className="text-sm">
                                                    <strong>Floors:</strong> {buildingHeight}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FaCube className="text-green-500" />
                                                <span className="text-sm">
                                                    <strong>Type:</strong> {buildingTypes[buildingType].name}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FaRuler className="text-purple-500" />
                                                <span className="text-sm">
                                                    <strong>Height:</strong> {buildingHeight * 3}m
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FaChartLine className="text-orange-500" />
                                                <span className="text-sm">
                                                    <strong>Total Cost:</strong> ₹{(parseFloat(buildingTypes[buildingType].cost.replace('₹', '').replace('M per floor', '')) * buildingHeight).toFixed(1)}M
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Project Timeline */}
                    {activeTab === 'timeline' && (
                        <div>
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Live Project Timeline
                                </h3>
                                <p className="text-gray-600">
                                    Track real-time progress across all our active construction projects
                                </p>
                            </div>

                            {/* Project Selector */}
                            <div className="flex justify-center mb-8">
                                <div className="flex bg-gray-100 rounded-lg p-1">
                                    {projects.map((project, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedProject(index)}
                                            className={`px-4 py-2 rounded-md font-medium transition-all ${
                                                selectedProject === index
                                                    ? 'bg-blue-500 text-white shadow-sm'
                                                    : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                        >
                                            {project.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Timeline Visualization */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="mb-6">
                                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                                        {projects[selectedProject].name}
                                    </h4>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span>Type: {projects[selectedProject].type}</span>
                                        <span>Duration: {projects[selectedProject].duration}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {projects[selectedProject].phases.map((phase, index) => {
                                        const progress = projects[selectedProject].progress[index];
                                        const isActive = progress > 0 && progress < 100;
                                        const isCompleted = progress === 100;
                                        
                                        return (
                                            <div key={index} className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                    isCompleted ? 'bg-green-500 text-white' :
                                                    isActive ? 'bg-blue-500 text-white' :
                                                    'bg-gray-300 text-gray-600'
                                                }`}>
                                                    {isCompleted ? '✓' : index + 1}
                                                </div>
                                                
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="font-medium text-gray-800">{phase}</span>
                                                        <span className="text-sm text-gray-600">{progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className={`h-2 rounded-full transition-all duration-1000 ${
                                                                isCompleted ? 'bg-green-500' :
                                                                isActive ? 'bg-blue-500' :
                                                                'bg-gray-300'
                                                            }`}
                                                            style={{ 
                                                                width: `${progress}%`,
                                                                animation: isActive ? 'pulse 2s infinite' : 'none'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Overall Progress */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-gray-800">Overall Progress</span>
                                        <span className="text-lg font-bold text-blue-600">
                                            {Math.round(projects[selectedProject].progress.reduce((a, b) => a + b, 0) / projects[selectedProject].progress.length)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div 
                                            className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-1000"
                                            style={{ 
                                                width: `${projects[selectedProject].progress.reduce((a, b) => a + b, 0) / projects[selectedProject].progress.length}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Real Activity Meter */}
                <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Current Activity Level</h3>
                            <p className="text-gray-600 mb-4">
                                Our teams are working at <span className="font-semibold text-green-600">peak efficiency</span> across all sites
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-1000" 
                                        style={{ 
                                            width: `${85 + Math.sin(timelineProgress * 0.1) * 10}%`
                                        }}
                                    />
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                    {Math.round(85 + Math.sin(timelineProgress * 0.1) * 10)}%
                                </span>
                            </div>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaTruck className="text-orange-500" />
                                    <span className="font-medium text-gray-800">Deliveries</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {12 + Math.floor(Math.sin(timelineProgress * 0.05) * 3)}/day
                                </p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <FiTrendingUp className="text-blue-500" />
                                    <span className="font-medium text-gray-800">Productivity</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">
                                    +{15 + Math.floor(Math.cos(timelineProgress * 0.08) * 5)}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
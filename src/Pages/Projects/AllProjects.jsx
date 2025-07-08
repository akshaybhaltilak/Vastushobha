import React, { useState, useEffect } from 'react';
import { database } from './Firebase';
import { ref, onValue } from 'firebase/database';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const AllProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const projectsRef = ref(database, 'projects');
        
        const unsubscribe = onValue(projectsRef, (snapshot) => {
            try {
                const data = snapshot.val();
                if (data) {
                    const projectsArray = Object.keys(data).map(key => ({
                        id: key,
                        ...data[key]
                    }));
                    projectsArray.sort((a, b) => {
                        if (a.featured && !b.featured) return -1;
                        if (!a.featured && b.featured) return 1;
                        return (b.year || '').localeCompare(a.year || '');
                    });
                    setProjects(projectsArray);
                } else {
                    setProjects([]);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching projects: ", error);
                setLoading(false);
            }
        }, (error) => {
            console.error("Firebase error: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const openModal = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedProject(null);
    };

    const getCategoryColor = (category) => {
        switch(category) {
            case 'Residential': return 'from-emerald-500 to-teal-600';
            case 'Commercial': return 'from-blue-500 to-indigo-600';
            case 'Institutional': return 'from-purple-500 to-violet-600';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Completed': return 'bg-emerald-500 text-white';
            case 'In Progress': return 'bg-amber-500 text-white';
            case 'Planned': return 'bg-blue-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.category === filter);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <Helmet>
                <title>All Projects | Vastushobha Construction</title>
                <meta 
                    name="description" 
                    content="Browse our complete portfolio of construction projects including residential, commercial, and institutional developments." 
                />
            </Helmet>

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-gray-800/80 to-slate-900/90 z-10"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
                        alt="Construction background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-20 max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-6">
                            Our Portfolio
                        </h1>
                        <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Explore our complete collection of construction projects across all categories and statuses.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <div className="flex space-x-4">
                                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                    <span className="text-white font-semibold">{projects.length} Projects</span>
                                </div>
                                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                    <span className="text-white font-semibold">Complete Portfolio</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Filters and Title */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">All Projects</h2>
                        <p className="text-gray-600">Browse our complete construction portfolio</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter === 'all' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        >
                            All Projects
                        </button>
                        <button
                            onClick={() => setFilter('Residential')}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter === 'Residential' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        >
                            Residential
                        </button>
                        <button
                            onClick={() => setFilter('Commercial')}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter === 'Commercial' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        >
                            Commercial
                        </button>
                        <button
                            onClick={() => setFilter('Institutional')}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter === 'Institutional' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        >
                            Institutional
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-red-100"></div>
                        </div>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-12">
                        <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No projects found</h3>
                        <p className="text-gray-600">No projects match your selected filter</p>
                        <button 
                            onClick={() => setFilter('all')}
                            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="group relative rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg border border-white/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                                {/* Project Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        src={project.imageUrl || 'https://via.placeholder.com/600x400?text=Vastushobha'}
                                        alt={project.title}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/600x400?text=Vastushobha';
                                        }}
                                    />
                                    
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    
                                    {/* Featured Badge */}
                                    {project.featured && (
                                        <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                            ⭐ Featured
                                        </div>
                                    )}
                                    
                                    {/* Category Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(project.category)} shadow-lg`}>
                                            {project.category}
                                        </span>
                                    </div>
                                    
                                    {/* Status Badge */}
                                    <div className="absolute bottom-3 left-3">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    
                                    {/* Year Badge */}
                                    {project.year && (
                                        <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full border border-white/30">
                                            {project.year}
                                        </div>
                                    )}
                                </div>

                                {/* Project Content */}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    
                                    {project.client && (
                                        <p className="text-xs text-gray-600 mb-2 font-medium">
                                            For {project.client}
                                        </p>
                                    )}
                                    
                                    <p className="text-sm text-gray-700 line-clamp-3 mb-4 leading-relaxed">
                                        {project.shortDescription || 'No description available.'}
                                    </p>

                                    {/* Project Details Grid */}
                                    {project.totalArea && (
                                        <div className="flex items-center text-xs text-gray-600 mb-2">
                                            <svg className="h-3 w-3 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                            </svg>
                                            <span>{project.totalArea}</span>
                                        </div>
                                    )}
                                    
                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openModal(project)}
                                            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Enhanced Modal */}
            {showModal && selectedProject && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="relative">
                            {/* Modal Header Image */}
                            <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                                <img
                                    src={selectedProject.imageUrl || 'https://via.placeholder.com/800x400?text=Vastushobha'}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                
                                {/* Close Button */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                
                                {/* Modal Title Overlay */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{selectedProject.title}</h2>
                                    {selectedProject.client && (
                                        <p className="text-lg text-gray-200">For {selectedProject.client}</p>
                                    )}
                                </div>
                            </div>
                            
                            {/* Modal Content */}
                            <div className="p-6 md:p-8">
                                {/* Status and Category Badges */}
                                <div className="flex flex-wrap gap-3 mb-6">
                                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${getCategoryColor(selectedProject.category)}`}>
                                        {selectedProject.category}
                                    </span>
                                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedProject.status)}`}>
                                        {selectedProject.status}
                                    </span>
                                    {selectedProject.featured && (
                                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-amber-400 to-orange-500">
                                            ⭐ Featured Project
                                        </span>
                                    )}
                                </div>
                                
                                {/* Description */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Project Description</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {selectedProject.shortDescription || selectedProject.description || 'No description available.'}
                                    </p>
                                </div>
                                
                                {/* Project Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {selectedProject.totalArea && (
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <div className="flex items-center mb-2">
                                                <svg className="h-5 w-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                                </svg>
                                                <span className="font-semibold text-gray-900">Total Area</span>
                                            </div>
                                            <p className="text-gray-700">{selectedProject.totalArea}</p>
                                        </div>
                                    )}
                                    
                                    {selectedProject.timeline && (
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <div className="flex items-center mb-2">
                                                <svg className="h-5 w-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="font-semibold text-gray-900">Timeline</span>
                                            </div>
                                            <p className="text-gray-700">{selectedProject.timeline}</p>
                                        </div>
                                    )}
                                    
                                    {selectedProject.budget && (
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <div className="flex items-center mb-2">
                                                <svg className="h-5 w-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                </svg>
                                                <span className="font-semibold text-gray-900">Budget</span>
                                            </div>
                                            <p className="text-gray-700">{selectedProject.budget}</p>
                                        </div>
                                    )}
                                    
                                    {selectedProject.address && (
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <div className="flex items-center mb-2">
                                                <svg className="h-5 w-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="font-semibold text-gray-900">Location</span>
                                            </div>
                                            <p className="text-gray-700">{selectedProject.address}</p>
                                        </div>
                                    )}
                                    
                                    {selectedProject.year && (
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <div className="flex items-center mb-2">
                                                <svg className="h-5 w-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="font-semibold text-gray-900">Year</span>
                                            </div>
                                            <p className="text-gray-700">{selectedProject.year}</p>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={closeModal}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProjects;
import React, { useState, useEffect } from 'react';
import { database } from './Firebase';
import { ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeStatus, setActiveStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const projectsRef = ref(database, 'projects'); // Now ref is properly imported
        
        const unsubscribe = onValue(projectsRef, (snapshot) => {
            try {
                const data = snapshot.val();
                if (data) {
                    const projectsArray = Object.keys(data).map(key => ({
                        id: key,
                        ...data[key]
                    }));
                    // Sort featured projects first, then by year (newest first)
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

    // Rest of the component remains the same...
    // Get unique categories and statuses for filters
    const categories = ['All', ...new Set(projects.map(p => p.category))];
    const statuses = ['All', ...new Set(projects.map(p => p.status))];

    // Filter projects based on selected category, status and search term
    const filteredProjects = projects.filter(project => {
        const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
        const matchesStatus = activeStatus === 'All' || project.status === activeStatus;
        const matchesSearch = searchTerm === '' || 
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            (project.shortDescription && project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (project.client && project.client.toLowerCase().includes(searchTerm.toLowerCase()));
        
        return matchesCategory && matchesStatus && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>Our Projects | Vastushobha Construction</title>
                <meta 
                    name="description" 
                    content="Explore our portfolio of residential, commercial, and institutional projects. View completed works and ongoing developments by Vastushobha Construction." 
                />
            </Helmet>

            {/* Hero Section */}
            <div className="relative bg-gray-900">
                <div className="absolute inset-0 overflow-hidden opacity-75">
                    <img 
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
                        alt="Construction background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Our Projects
                    </h1>
                    <p className="mt-6 text-xl text-gray-300 max-w-3xl">
                        Showcasing our excellence in construction across various sectors including residential, commercial, and institutional projects.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Filters */}
                <div className="mb-12 bg-white rounded-xl shadow-md p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="w-full md:w-96">
                            <label htmlFor="search" className="sr-only">Search projects</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="search"
                                    placeholder="Search projects..."
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <div>
                                <label htmlFor="category-filter" className="sr-only">Filter by category</label>
                                <select
                                    id="category-filter"
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-lg"
                                    value={activeCategory}
                                    onChange={(e) => setActiveCategory(e.target.value)}
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="status-filter" className="sr-only">Filter by status</label>
                                <select
                                    id="status-filter"
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-lg"
                                    value={activeStatus}
                                    onChange={(e) => setActiveStatus(e.target.value)}
                                >
                                    {statuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-md p-8">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No projects found</h3>
                        <p className="mt-1 text-gray-500">
                            {searchTerm || activeCategory !== 'All' || activeStatus !== 'All' 
                                ? 'Try adjusting your search or filter criteria' 
                                : 'No projects have been added yet'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="flex flex-col rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
                                {/* Project Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={project.imageUrl || 'https://via.placeholder.com/600x400?text=Vastushobha'}
                                        alt={project.title}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/600x400?text=Vastushobha';
                                        }}
                                    />
                                    {project.featured && (
                                        <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            Featured
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            project.status === 'Completed' 
                                                ? 'bg-green-100 text-green-800' 
                                                : project.status === 'In Progress' 
                                                ? 'bg-yellow-100 text-yellow-800' 
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {project.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="flex-1 p-6 flex flex-col">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                project.category === 'Residential' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : project.category === 'Commercial' 
                                                    ? 'bg-blue-100 text-blue-800' 
                                                    : 'bg-purple-100 text-purple-800'
                                            }`}>
                                                {project.category}
                                            </span>
                                            {project.year && (
                                                <span className="text-sm text-gray-500">
                                                    {project.year}
                                                </span>
                                            )}
                                        </div>
                                        <Link 
                                            to={`/projects/${project.slug || project.id}`} 
                                            className="block mt-2"
                                        >
                                            <h3 className="text-xl font-semibold text-gray-900 hover:text-red-600 transition-colors">
                                                {project.title}
                                            </h3>
                                        </Link>
                                        {project.client && (
                                            <p className="mt-1 text-sm text-gray-500">
                                                For {project.client}
                                            </p>
                                        )}
                                        <p className="mt-3 text-base text-gray-600 line-clamp-3">
                                            {project.shortDescription || 'No description available.'}
                                        </p>
                                    </div>

                                    <div className="mt-6">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            {project.totalArea && (
                                                <div className="flex items-start">
                                                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="ml-2 text-gray-600">{project.totalArea}</span>
                                                </div>
                                            )}
                                            {project.timeline && (
                                                <div className="flex items-start">
                                                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="ml-2 text-gray-600">{project.timeline}</span>
                                                </div>
                                            )}
                                            {project.budget && (
                                                <div className="flex items-start">
                                                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="ml-2 text-gray-600">{project.budget}</span>
                                                </div>
                                            )}
                                            {project.address && (
                                                <div className="flex items-start">
                                                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="ml-2 text-gray-600 line-clamp-1">{project.address}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <Link
                                            to={`/projects/${project.slug || project.id}`}
                                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                                        >
                                            View Project Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;
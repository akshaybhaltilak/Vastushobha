import React, { useState, useEffect } from 'react';
import { database } from './Firebase';
import { ref, onValue, set, push, remove } from 'firebase/database';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectsAdmin = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Residential',
        address: '',
        shortDescription: '',
        timeline: '',
        totalArea: '',
        budget: '',
        client: '',
        year: '',
        slug: '',
        imageUrl: '',
        featured: false,
        status: 'Completed'
    });
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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
                    setProjects(projectsArray);
                } else {
                    setProjects([]);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching projects: ", error);
                toast.error("Failed to load projects");
                setLoading(false);
            }
        }, (error) => {
            console.error("Firebase error: ", error);
            toast.error("Connection error loading projects");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            
            // Basic validation
            if (!formData.title || !formData.imageUrl || !formData.slug) {
                toast.error("Please fill in all required fields");
                setLoading(false);
                return;
            }

            const projectData = {
                ...formData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            if (editingId) {
                // Update existing project
                const projectRef = ref(database, `projects/${editingId}`);
                await set(projectRef, projectData);
                toast.success("Project updated successfully!");
            } else {
                // Add new project
                const newProjectRef = push(ref(database, 'projects'));
                await set(newProjectRef, projectData);
                toast.success("Project added successfully!");
            }
            
            // Reset form
            setFormData({
                title: '',
                category: 'Residential',
                address: '',
                shortDescription: '',
                timeline: '',
                totalArea: '',
                budget: '',
                client: '',
                year: '',
                slug: '',
                imageUrl: '',
                featured: false,
                status: 'Completed'
            });
            setEditingId(null);
            
        } catch (error) {
            console.error("Error saving project: ", error);
            toast.error("Error saving project. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (project) => {
        setFormData({
            title: project.title || '',
            category: project.category || 'Residential',
            address: project.address || '',
            shortDescription: project.shortDescription || '',
            timeline: project.timeline || '',
            totalArea: project.totalArea || '',
            budget: project.budget || '',
            client: project.client || '',
            year: project.year || '',
            slug: project.slug || '',
            imageUrl: project.imageUrl || '',
            featured: project.featured || false,
            status: project.status || 'Completed'
        });
        setEditingId(project.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project? This cannot be undone.')) {
            try {
                const projectRef = ref(database, `projects/${id}`);
                await remove(projectRef);
                toast.success("Project deleted successfully!");
            } catch (error) {
                console.error("Error deleting project: ", error);
                toast.error("Error deleting project. Please try again.");
            }
        }
    };

    const filteredProjects = projects.filter(project => {
        const searchLower = searchTerm.toLowerCase();
        return (
            project.title?.toLowerCase().includes(searchLower) ||
            project.client?.toLowerCase().includes(searchLower) ||
            project.category?.toLowerCase().includes(searchLower) ||
            project.status?.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects Admin Panel</h1>
                    <p className="text-lg text-gray-600">
                        {projects.length === 0 ? 'No projects yet' : `Managing ${projects.length} project${projects.length !== 1 ? 's' : ''}`}
                    </p>
                </div>

                {/* Project Form */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
                    <div className="p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">
                            {editingId ? 'Edit Project' : 'Add New Project'}
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Required Fields */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Project Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        required
                                        placeholder="Project Name"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        required
                                    >
                                        <option value="Residential">Residential</option>
                                        <option value="Commercial">Commercial</option>
                                        <option value="Industrial">Industrial</option>
                                        <option value="Institutional">Institutional</option>
                                        <option value="Landscape">Landscape</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status *
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        required
                                    >
                                        <option value="Completed">Completed</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Planned">Planned</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        URL Slug *
                                    </label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        required
                                        placeholder="project-name"
                                    />
                                </div>
                                
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Image URL *
                                    </label>
                                    <input
                                        type="url"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        required
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                                
                                {/* Optional Fields */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        placeholder="Project location"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Year Completed
                                    </label>
                                    <input
                                        type="text"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        placeholder="2023"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Client Name
                                    </label>
                                    <input
                                        type="text"
                                        name="client"
                                        value={formData.client}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        placeholder="Client or company name"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Project Timeline
                                    </label>
                                    <input
                                        type="text"
                                        name="timeline"
                                        value={formData.timeline}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        placeholder="6 months"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Total Area
                                    </label>
                                    <input
                                        type="text"
                                        name="totalArea"
                                        value={formData.totalArea}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        placeholder="5000 sq ft"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Budget
                                    </label>
                                    <input
                                        type="text"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        placeholder="$500,000"
                                    />
                                </div>
                                
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                                        Featured Project
                                    </label>
                                </div>
                                
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Short Description
                                    </label>
                                    <textarea
                                        name="shortDescription"
                                        value={formData.shortDescription}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        placeholder="Brief project description (2-3 sentences)"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex justify-end space-x-4 pt-4">
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData({
                                                title: '',
                                                category: 'Residential',
                                                address: '',
                                                shortDescription: '',
                                                timeline: '',
                                                totalArea: '',
                                                budget: '',
                                                client: '',
                                                year: '',
                                                slug: '',
                                                imageUrl: '',
                                                featured: false,
                                                status: 'Completed'
                                            });
                                            setEditingId(null);
                                        }}
                                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2.5 bg-red-600 rounded-lg text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {editingId ? 'Updating...' : 'Adding...'}
                                        </span>
                                    ) : (
                                        editingId ? 'Update Project' : 'Add Project'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Projects List */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                All Projects ({filteredProjects.length})
                            </h2>
                            <div className="w-full sm:w-64">
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                        </div>
                        
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                            </div>
                        ) : filteredProjects.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-700 mb-2">
                                    {searchTerm ? 'No matching projects found' : 'No projects found'}
                                </h3>
                                <p className="text-gray-500">
                                    {searchTerm ? 'Try a different search term' : 'Add your first project using the form above'}
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Image
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Category / Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Year
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredProjects.map((project) => (
                                            <tr key={project.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img 
                                                            className="h-10 w-10 rounded-md object-cover" 
                                                            src={project.imageUrl || 'https://via.placeholder.com/100'} 
                                                            alt={project.title} 
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = 'https://via.placeholder.com/100';
                                                            }}
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {project.title}
                                                        {project.featured && (
                                                            <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">Featured</span>
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-gray-500">{project.client}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-col gap-1">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            project.category === 'Residential' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : project.category === 'Commercial' 
                                                                ? 'bg-blue-100 text-blue-800' 
                                                                : 'bg-purple-100 text-purple-800'
                                                        }`}>
                                                            {project.category}
                                                        </span>
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            project.status === 'Completed' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : project.status === 'In Progress' 
                                                                ? 'bg-yellow-100 text-yellow-800' 
                                                                : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {project.status}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {project.year}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(project)}
                                                        className="text-red-600 hover:text-red-900 mr-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(project.id)}
                                                        className="text-gray-600 hover:text-gray-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsAdmin;
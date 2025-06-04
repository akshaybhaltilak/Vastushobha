import React from 'react';
import { Linkedin, Instagram, Clock, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white text-red-600 pt-16 pb-8 shadow-lg">
            <div className="container mx-auto px-4 md:px-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        {/* Logo */}
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-red-600 p-2">
                                <img 
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_xnQHTc9jCNvHR8zchGy65ysBii6XB4Zg&s" 
                                    alt="Vastushobha Construction" 
                                    className="w-full h-full object-contain" 
                                />
                            </div>
                            <span className="text-red-600 font-bold text-2xl">Vastushobha</span>
                        </div>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            Creating harmonious spaces with Vedic principles. Vastushobha Construction blends traditional wisdom with modern techniques to build homes that nurture and inspire.
                        </p>
                        
                        <div className="flex items-center space-x-2 text-gray-700 mb-6">
                            <Clock className="w-5 h-5 text-red-500" />
                            <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-5">
                            <a href="#" 
                               className="hover:scale-110 transition-transform bg-red-50 p-2 rounded-full" 
                               aria-label="LinkedIn">
                                <Linkedin className="w-5 h-5 text-red-600 hover:text-red-800" />
                            </a>
                            <a href="#" 
                               className="hover:scale-110 transition-transform bg-red-50 p-2 rounded-full" 
                               aria-label="Instagram">
                                <Instagram className="w-5 h-5 text-red-600 hover:text-red-800" />
                            </a>
                            <a href="#" 
                               className="hover:scale-110 transition-transform bg-red-50 p-2 rounded-full" 
                               aria-label="WhatsApp">
                                <svg className="w-5 h-5 text-red-600 hover:text-red-800" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                            </a>
                            <a href="#" 
                               className="hover:scale-110 transition-transform bg-red-50 p-2 rounded-full" 
                               aria-label="Facebook">
                                <svg className="w-5 h-5 text-red-600 hover:text-red-800" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="mt-8 md:mt-0">
                        <h3 className="text-red-800 font-bold text-lg mb-6 border-b border-red-100 pb-2">Our Services</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-700 hover:text-red-600 transition-colors flex items-center group">
                                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                                    Vastu Consultation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 hover:text-red-600 transition-colors flex items-center group">
                                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                                    Residential Construction
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 hover:text-red-600 transition-colors flex items-center group">
                                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                                    Commercial Projects
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 hover:text-red-600 transition-colors flex items-center group">
                                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                                    Interior Design
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 hover:text-red-600 transition-colors flex items-center group">
                                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                                    Renovation & Remodeling
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 hover:text-red-600 transition-colors flex items-center group">
                                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                                    Landscaping
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-8 lg:mt-0">
                        <h3 className="text-red-800 font-bold text-lg mb-6 border-b border-red-100 pb-2">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/about" className="text-gray-700 hover:text-red-600 transition-colors flex items-center group">
                                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/projects" className="text-gray-700 hover:text-red-600 transition-colors flex items-center group">
                                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                                    Our Projects
                                </Link>
                            </li>
                            <li>
                                <Link to="/testimonials" className="text-gray-700 hover:text-red-600 transition-colors flex items-center group">
                                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                                    Client Testimonials
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-gray-700 hover:text-red-600 transition-colors flex items-center group">
                                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                                    Vastu Blog
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-700 hover:text-red-600 transition-colors flex items-center group">
                                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/careers" className="text-gray-700 hover:text-red-600 transition-colors flex items-center group">
                                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="mt-8 lg:mt-0">
                        <h3 className="text-red-800 font-bold text-lg mb-6 border-b border-red-100 pb-2">Contact Us</h3>
                        <div className="space-y-5">
                            <div className="bg-red-50 rounded-lg p-4 shadow-inner">
                                <div className="flex items-start">
                                    <MapPin className="w-5 h-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                                    <p className="text-gray-700">
                                        123 Vastu Lane,<br />
                                        Harmony Complex,<br />
                                        Mumbai, Maharashtra 400001
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <a href="tel:+919876543210" className="flex items-center group">
                                    <div className="bg-red-100 p-2 rounded-full mr-3 group-hover:bg-red-200 transition-colors">
                                        <Phone size={16} className="text-red-600 group-hover:text-red-800" />
                                    </div>
                                    <span className="text-gray-700 group-hover:text-red-600 transition-colors">+91 98765 43210</span>
                                </a>
                                
                                <a href="tel:+919876543211" className="flex items-center group">
                                    <div className="bg-red-100 p-2 rounded-full mr-3 group-hover:bg-red-200 transition-colors">
                                        <Phone size={16} className="text-red-600 group-hover:text-red-800" />
                                    </div>
                                    <span className="text-gray-700 group-hover:text-red-600 transition-colors">+91 98765 43211</span>
                                </a>
                                
                                <a href="mailto:contact@vastushobha.com" className="flex items-center group">
                                    <div className="bg-red-100 p-2 rounded-full mr-3 group-hover:bg-red-200 transition-colors">
                                        <Mail size={16} className="text-red-600 group-hover:text-red-800" />
                                    </div>
                                    <span className="text-gray-700 group-hover:text-red-600 transition-colors">contact@vastushobha.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar with Attribution */}
                <div className="mt-12 pt-6 border-t border-red-100">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="mb-4 sm:mb-0">
                            <p className="text-gray-500 text-sm">
                                © {new Date().getFullYear()} Vastushobha Construction. All rights reserved.
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-500 hover:text-red-600 text-sm transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-500 hover:text-red-600 text-sm transition-colors">Terms of Service</a>
                            <a href="#" className="text-gray-500 hover:text-red-600 text-sm transition-colors">Sitemap</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
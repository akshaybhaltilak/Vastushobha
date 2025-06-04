import React from 'react';
import { Linkedin, Instagram, Clock, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-rose-50 to-rose-100 text-rose-900 pt-16 pb-8 border-t border-rose-200">
            <div className="container mx-auto px-4 md:px-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        {/* Logo */}
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-rose-600 to-rose-800 p-2 shadow-md">
                                <img 
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_xnQHTc9jCNvHR8zchGy65ysBii6XB4Zg&s" 
                                    alt="Vastushobha Construction" 
                                    className="w-full h-full object-contain" 
                                />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-rose-700 to-rose-900 bg-clip-text text-transparent">
                                Vastushobha
                            </span>
                        </div>

                        <p className="text-rose-800 leading-relaxed mb-6">
                            Creating harmonious spaces with Vedic principles. Vastushobha Construction blends traditional wisdom with modern techniques to build homes that nurture and inspire.
                        </p>
                        
                        <div className="flex items-center space-x-2 text-rose-700 mb-6">
                            <Clock className="w-5 h-5 text-rose-600" />
                            <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-4">
                            <a href="#" 
                               className="hover:scale-110 transition-all bg-white p-2 rounded-full shadow-sm hover:shadow-md hover:bg-rose-50" 
                               aria-label="LinkedIn">
                                <Linkedin className="w-5 h-5 text-rose-700 hover:text-rose-900" />
                            </a>
                            <a href="#" 
                               className="hover:scale-110 transition-all bg-white p-2 rounded-full shadow-sm hover:shadow-md hover:bg-rose-50" 
                               aria-label="Instagram">
                                <Instagram className="w-5 h-5 text-rose-700 hover:text-rose-900" />
                            </a>
                            <a href="#" 
                               className="hover:scale-110 transition-all bg-white p-2 rounded-full shadow-sm hover:shadow-md hover:bg-rose-50" 
                               aria-label="WhatsApp">
                                <svg className="w-5 h-5 text-rose-700 hover:text-rose-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                            </a>
                            <a href="#" 
                               className="hover:scale-110 transition-all bg-white p-2 rounded-full shadow-sm hover:shadow-md hover:bg-rose-50" 
                               aria-label="Facebook">
                                <svg className="w-5 h-5 text-rose-700 hover:text-rose-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="mt-8 md:mt-0">
                        <h3 className="text-rose-800 font-bold text-lg mb-6 border-b border-rose-200 pb-2">Our Services</h3>
                        <ul className="space-y-3">
                            {[
                                "Vastu Consultation",
                                "Residential Construction",
                                "Commercial Projects",
                                "Interior Design",
                                "Renovation & Remodeling",
                                "Landscaping"
                            ].map((service) => (
                                <li key={service}>
                                    <a href="#" className="text-rose-700 hover:text-rose-900 transition-colors flex items-center group">
                                        <span className="w-2 h-2 bg-rose-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-8 lg:mt-0">
                        <h3 className="text-rose-800 font-bold text-lg mb-6 border-b border-rose-200 pb-2">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { name: "About Us", path: "/about" },
                                { name: "Our Projects", path: "/projects" },
                                { name: "Client Testimonials", path: "/testimonials" },
                                { name: "Vastu Blog", path: "/blog" },
                                { name: "Contact Us", path: "/contact" },
                                { name: "Careers", path: "/careers" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-rose-700 hover:text-rose-900 transition-colors flex items-center group">
                                        <span className="w-2 h-2 bg-rose-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="mt-8 lg:mt-0">
                        <h3 className="text-rose-800 font-bold text-lg mb-6 border-b border-rose-200 pb-2">Contact Us</h3>
                        <div className="space-y-5">
                            <div className="bg-white/80 rounded-lg p-4 shadow-sm backdrop-blur-sm">
                                <div className="flex items-start">
                                    <MapPin className="w-5 h-5 text-rose-600 mt-1 mr-3 flex-shrink-0" />
                                    <p className="text-rose-800">
                                        123 Vastu Lane,<br />
                                        Harmony Complex,<br />
                                        Mumbai, Maharashtra 400001
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                {[
                                    { icon: <Phone size={16} />, text: "+91 98765 43210", href: "tel:+919876543210" },
                                    { icon: <Phone size={16} />, text: "+91 98765 43211", href: "tel:+919876543211" },
                                    { icon: <Mail size={16} />, text: "contact@vastushobha.com", href: "mailto:contact@vastushobha.com" }
                                ].map((contact, index) => (
                                    <a key={index} href={contact.href} className="flex items-center group">
                                        <div className="bg-white p-2 rounded-full mr-3 group-hover:bg-rose-100 transition-colors shadow-sm">
                                            {React.cloneElement(contact.icon, { className: "text-rose-600 group-hover:text-rose-800" })}
                                        </div>
                                        <span className="text-rose-700 group-hover:text-rose-900 transition-colors">{contact.text}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar with Attribution */}
                <div className="mt-12 pt-6 border-t border-rose-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="mb-4 sm:mb-0">
                            <p className="text-rose-700 text-sm">
                                © {new Date().getFullYear()} Vastushobha Construction. All rights reserved.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                            {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
                                <a 
                                    key={item} 
                                    href="#" 
                                    className="text-rose-700 hover:text-rose-900 text-sm transition-colors hover:underline"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
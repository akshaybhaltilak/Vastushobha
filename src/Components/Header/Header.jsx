import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { 
        name: "Projects", 
        href: "/all",

    },
    { name: "About Us", href: "#about" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState("Home");

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setActiveSubmenu(null);
        document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !document.getElementById('mobile-menu').contains(event.target) && 
                !document.getElementById('menu-button').contains(event.target)) {
                toggleMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    const handleLinkClick = (e, href, name) => {
        e.preventDefault();
        setActiveLink(name);
        
        if (href.startsWith('#')) {
            const element = document.getElementById(href.substring(1));
            element?.scrollIntoView({ behavior: 'smooth' });
        }
        
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            {/* Subtle background glow */}
            <div className="fixed top-0 left-0 w-full h-20 bg-gradient-to-b from-rose-500/10 to-transparent pointer-events-none z-30" />
            
            <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-white/95 backdrop-blur-md shadow-sm py-2 border-b border-rose-100' 
                    : 'bg-white/90 backdrop-blur-sm py-3'
            }`}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {/* Logo - Simplified */}
                        <a 
                            href="/" 
                            className="flex items-center space-x-2 z-50"
                            onClick={(e) => handleLinkClick(e, "#home", "Home")}
                        >
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_xnQHTc9jCNvHR8zchGy65ysBii6XB4Zg&s"
                                alt="Vastushobha Logo"
                                className="h-10 w-10 object-contain"
                            />
                            <div className="flex flex-col">
                                <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Vastushobha
                                </span>
                                <span className="text-xs text-gray-500 tracking-wider">CONSTRUCTION</span>
                            </div>
                        </a>

                        {/* Desktop Navigation - Compact */}
                        <nav className="hidden md:flex items-center space-x-1">
                            {menuItems.map((item) => (
                                <div key={item.name} className="relative group">
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleLinkClick(e, item.href, item.name)}
                                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                            activeLink === item.name 
                                                ? "text-white bg-rose-500" 
                                                : "text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                                        }`}
                                    >
                                        {item.name}
                                        {item.submenu && <ChevronDown className="ml-1 w-4 h-4" />}
                                    </a>

                                    {item.submenu && (
                                        <div className="absolute top-full left-0 w-56 mt-1 bg-white border border-gray-100 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                            {item.submenu.map((subitem) => (
                                                <a
                                                    key={subitem.name}
                                                    href={subitem.href}
                                                    onClick={(e) => handleLinkClick(e, subitem.href, subitem.name)}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                                                >
                                                    {subitem.name}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Right Section - Simplified */}
                        <div className="hidden md:flex items-center space-x-3">
                            <a
                                href="tel:+911234567890"
                                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-rose-600 px-3 py-2 rounded-md hover:bg-rose-50 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                <span>+91 1234567890</span>
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => handleLinkClick(e, "#contact", "Contact")}
                                className="px-4 py-2 bg-rose-500 text-white text-sm font-medium rounded-md hover:bg-rose-600 transition-colors"
                            >
                                Contact
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            id="menu-button"
                            onClick={toggleMenu}
                            className="md:hidden text-gray-700 p-2 z-50 rounded-md hover:bg-gray-100"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden">
                    <div 
                        id="mobile-menu"
                        className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50 overflow-y-auto"
                    >
                        <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center space-x-2">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_xnQHTc9jCNvHR8zchGy65ysBii6XB4Zg&s"
                                    alt="Logo"
                                    className="h-10 w-10 object-contain"
                                />
                                <span className="text-lg font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Vastushobha
                                </span>
                            </div>
                        </div>

                        <div className="p-2">
                            {menuItems.map((item) => (
                                <div key={item.name} className="mb-1">
                                    <div
                                        className={`flex items-center justify-between p-3 rounded-md ${
                                            activeLink === item.name 
                                                ? "bg-rose-500 text-white" 
                                                : "text-gray-700 hover:bg-rose-50"
                                        }`}
                                        onClick={() => item.submenu && setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                                    >
                                        <a
                                            href={item.href}
                                            onClick={(e) => !item.submenu && handleLinkClick(e, item.href, item.name)}
                                            className="text-sm font-medium"
                                        >
                                            {item.name}
                                        </a>
                                        {item.submenu && (
                                            <ChevronDown className={`w-4 h-4 transition-transform ${
                                                activeSubmenu === item.name ? "rotate-180" : ""
                                            }`} />
                                        )}
                                    </div>

                                    {item.submenu && activeSubmenu === item.name && (
                                        <div className="pl-4 py-1">
                                            {item.submenu.map((subitem) => (
                                                <a
                                                    key={subitem.name}
                                                    href={subitem.href}
                                                    onClick={(e) => handleLinkClick(e, subitem.href, subitem.name)}
                                                    className="block p-2 text-sm text-gray-600 hover:bg-rose-50 hover:text-rose-600 rounded-md"
                                                >
                                                    {subitem.name}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-gray-100 mt-auto">
                            <a
                                href="tel:+911234567890"
                                className="flex items-center space-x-2 p-3 text-sm font-medium text-gray-700 hover:bg-rose-50 rounded-md mb-3"
                            >
                                <Phone className="w-4 h-4 text-rose-500" />
                                <span>+91 1234567890</span>
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => handleLinkClick(e, "#contact", "Contact")}
                                className="block w-full p-3 text-center text-sm font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
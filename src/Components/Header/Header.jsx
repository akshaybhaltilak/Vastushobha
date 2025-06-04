import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search, Phone, Sparkles } from "lucide-react";

const menuItems = [
    {
        name: "Home",
        href: "#home"
    },
    {
        name: "Services",
        href: "#services",
    },
    {
        name: "Our Work",
        href: "#projects",
        submenu: [
            { name: "Mr. Arvind Yadav", href: "/ourwork/arvind-yadav" },
            { name: "Mr. Ajay Lagad", href: "/ourwork/ajay-lagad" },
            { name: "Mr. Prathamesh Sakarkar", href: "/ourwork/prathamesh-sakarkar" },
            { name: "Mr. Ganesh Magar", href: "/ourwork/ganesh-magar" },
            { name: "Mr. Saurabh Wakode", href: "/ourwork/saurabh-wakode" },
            { name: "Mr. Aditya Sawalkar", href: "/ourwork/aditya-sawalkar" },
            { name: "D.K. Sakarkar LLP", href: "/ourwork/dk-sakarkar-llp" },
            { name: "Emerge Construction Office", href: "/ourwork/emerge-construction-office" },
            { name: "Mr. Balkrishna Thokal", href: "/ourwork/balkrishna-thokal" },
        ]
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
        
        if (!isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const mobileMenu = document.getElementById('mobile-menu');
            const menuButton = document.getElementById('menu-button');
            
            if (isMenuOpen && mobileMenu && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
                setIsMenuOpen(false);
                document.body.style.overflow = 'auto';
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const handleLinkClick = (e, href, name) => {
        e.preventDefault();
        setActiveLink(name);
        
        if (href.startsWith('#')) {
            const element = document.getElementById(href.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            {/* Animated background glow */}
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-rose-500/20 via-pink-500/10 to-transparent pointer-events-none z-30" />
            
            <header className={`w-full fixed top-0 z-50 transition-all duration-500 ${
                isScrolled 
                    ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-rose-500/20 border-b border-rose-100/50 py-2' 
                    : 'bg-gradient-to-r from-white/90 via-rose-50/80 to-white/90 backdrop-blur-md py-4'
            }`}>
                <div className="container mx-auto px-4 transform transition-all duration-800 hover:scale-[1.01]">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <a 
                            href="/" 
                            className="flex items-center space-x-4 group z-50 relative transform transition-all duration-300 hover:scale-105"
                            onClick={(e) => handleLinkClick(e, "#home", "Home")}
                        >
                            <div className="relative flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-br from-white via-rose-50 to-white shadow-xl shadow-rose-500/30 border-2 border-rose-200/50 p-1 group-hover:shadow-2xl group-hover:shadow-rose-500/40 transition-all duration-300">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_xnQHTc9jCNvHR8zchGy65ysBii6XB4Zg&s"
                                    alt="Vastushobha Logo"
                                    className="h-12 w-12 object-contain rounded-xl"
                                />
                                {/* Sparkle effect */}
                                <div className="absolute -top-2 -right-2 animate-pulse">
                                    <Sparkles className="w-4 h-4 text-rose-400" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-red-500 to-pink-600 bg-clip-text text-transparent group-hover:from-red-600 group-hover:via-rose-500 group-hover:to-red-600 transition-all duration-300">
                                    Vastushobha
                                </span>
                                <span className="text-xs text-gray-600 tracking-[0.2em] font-medium uppercase">CONSTRUCTION</span>
                            </div>
                        </a>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-2">
                            {menuItems.map((item, index) => (
                                <div key={item.name} className="relative group">
                                    <div className="transform transition-all duration-300 hover:scale-105">
                                        <a
                                            href={item.href}
                                            onClick={(e) => handleLinkClick(e, item.href, item.name)}
                                            className={`flex items-center space-x-2 px-5 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 rounded-full relative overflow-hidden
                                                ${activeLink === item.name 
                                                    ? "text-white bg-gradient-to-r from-rose-500 to-red-500 shadow-lg shadow-rose-500/40" 
                                                    : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-rose-400 hover:to-pink-500 hover:shadow-lg hover:shadow-rose-400/30"
                                                }`
                                            }
                                        >
                                            <span className="relative z-10">{item.name}</span>
                                            {item.submenu && (
                                                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 relative z-10" />
                                            )}
                                            {/* Shimmer effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                        </a>
                                    </div>

                                    {item.submenu && (
                                        <div className="absolute top-full left-0 w-72 bg-white/95 backdrop-blur-xl border border-rose-200/50 shadow-2xl shadow-rose-500/20 rounded-2xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform scale-95 group-hover:scale-100">
                                            <div className="absolute -top-2 left-6 w-4 h-4 bg-white/95 border-l border-t border-rose-200/50 transform rotate-45" />
                                            {item.submenu.map((subitem, subIndex) => (
                                                <div
                                                    key={subitem.name}
                                                    className="transform transition-all duration-200 hover:translate-x-2"
                                                >
                                                    <a
                                                        href={subitem.href}
                                                        onClick={(e) => handleLinkClick(e, subitem.href, subitem.name)}
                                                        className="block px-5 py-3 text-sm font-medium transition-all duration-200 rounded-xl mx-2 relative overflow-hidden text-gray-700 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 hover:text-rose-600"
                                                    >
                                                        <span className="relative z-10">{subitem.name}</span>
                                                        <div className="absolute inset-0 bg-gradient-to-r from-rose-100/0 via-rose-100/50 to-rose-100/0 transform -translate-x-full hover:translate-x-full transition-transform duration-500" />
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Right Section */}
                        <div className="hidden lg:flex items-center space-x-6">
                            <div className="flex items-center space-x-3 text-gray-700 hover:text-rose-600 transition-all duration-300 bg-white/80 px-4 py-2 rounded-full shadow-lg shadow-rose-500/20 border border-rose-100/50 transform hover:scale-105">
                                <Phone className="w-5 h-5" />
                                <span className="text-sm font-semibold">+91 1234567890</span>
                            </div>
                            <div className="transform transition-all duration-300 hover:scale-105">
                                <a
                                    href="#contact"
                                    onClick={(e) => handleLinkClick(e, "#contact", "Contact")}
                                    className="relative px-8 py-3 bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 text-white font-bold rounded-full shadow-xl shadow-rose-500/40 hover:shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 overflow-hidden group"
                                >
                                    <span className="relative z-10">Inquire Now</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                </a>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            id="menu-button"
                            onClick={toggleMenu}
                            className="lg:hidden text-gray-700 hover:text-rose-600 transition-all duration-300 p-3 z-50 bg-white/80 rounded-full shadow-lg shadow-rose-500/20 border border-rose-100/50 transform hover:scale-110 hover:rotate-90"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-gradient-to-br from-rose-900/60 via-pink-800/40 to-red-900/60 backdrop-blur-md lg:hidden z-40 animate-fadeIn"
                    onClick={toggleMenu}
                />
            )}

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div
                    id="mobile-menu"
                    className="fixed inset-y-0 left-0 max-w-xs w-4/5 bg-gradient-to-br from-white via-rose-50 to-pink-50 shadow-2xl shadow-rose-500/30 lg:hidden overflow-hidden z-50 border-r border-rose-200/50 transform transition-transform duration-300 animate-slideInLeft"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="h-full flex flex-col">
                        {/* Mobile Menu Header */}
                        <div className="p-6 bg-gradient-to-r from-rose-500 to-red-500 text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer" />
                            <div className="flex items-center space-x-4 relative z-10">
                                <div className="relative">
                                    <img 
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_xnQHTc9jCNvHR8zchGy65ysBii6XB4Zg&s" 
                                        alt="Vastushobha Logo" 
                                        className="h-12 w-12 object-contain rounded-xl bg-white/20 p-1 border-2 border-white/30" 
                                    />
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold">Vastushobha</span>
                                    <span className="text-xs text-rose-100 tracking-widest">CONSTRUCTION</span>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu Content */}
                        <div className="flex-1 overflow-y-auto py-6">
                            <div className="px-6 space-y-4">
                                {menuItems.map((item, index) => (
                                    <div 
                                        key={item.name} 
                                        className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg shadow-rose-500/10 border border-rose-100/50 overflow-hidden transform transition-all duration-300 hover:scale-105"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div
                                            className="flex items-center justify-between text-gray-800 cursor-pointer transition-all duration-300 p-4 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50"
                                            onClick={() => item.submenu && setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                                        >
                                            <a
                                                href={item.href}
                                                className="text-base font-semibold uppercase tracking-wider hover:text-rose-600 transition-colors"
                                                onClick={(e) => handleLinkClick(e, item.href, item.name)}
                                            >
                                                {item.name}
                                            </a>
                                            {item.submenu && (
                                                <ChevronDown 
                                                    className={`w-5 h-5 transition-all duration-300 ${
                                                        activeSubmenu === item.name ? "rotate-180 text-rose-600" : "text-gray-400"
                                                    }`} 
                                                />
                                            )}
                                        </div>

                                        {item.submenu && activeSubmenu === item.name && (
                                            <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-t border-rose-100/50 animate-expandDown">
                                                {item.submenu.map((subitem, subIndex) => (
                                                    <div
                                                        key={subitem.name}
                                                        className="border-b border-rose-100/30 last:border-b-0 transform transition-all duration-200 hover:translate-x-2"
                                                    >
                                                        <a
                                                            href={subitem.href}
                                                            onClick={(e) => handleLinkClick(e, subitem.href, subitem.name)}
                                                            className="block py-3 px-6 text-sm transition-all duration-200 relative overflow-hidden text-gray-600 hover:text-rose-600 hover:bg-white/40"
                                                        >
                                                            <span className="relative z-10">{subitem.name}</span>
                                                            <div className="absolute inset-0 bg-gradient-to-r from-rose-100/0 via-rose-100/60 to-rose-100/0 transform -translate-x-full hover:translate-x-full transition-transform duration-500" />
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Menu Footer */}
                        <div className="px-6 py-6 bg-gradient-to-r from-gray-50 to-rose-50 border-t border-rose-100/50 mt-auto space-y-4">
                            <div className="flex items-center space-x-3 text-gray-700 bg-white/70 p-3 rounded-xl shadow-sm transform transition-all duration-300 hover:scale-105">
                                <Phone className="w-5 h-5 text-rose-500" />
                                <span className="text-sm font-medium">+91 1234567890</span>
                            </div>
                            <a
                                href="#contact"
                                onClick={(e) => handleLinkClick(e, "#contact", "Contact")}
                                className="block w-full px-6 py-4 text-center font-bold text-white bg-gradient-to-r from-rose-500 to-red-500 rounded-xl shadow-xl shadow-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/40 transition-all duration-300 relative overflow-hidden group transform hover:scale-105"
                            >
                                <span className="relative z-10">Inquire Now</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideInLeft {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
                
                @keyframes expandDown {
                    from { height: 0; opacity: 0; }
                    to { height: auto; opacity: 1; }
                }
                
                @keyframes shimmer {
                    0% { transform: translateX(-100%) skewX(-12deg); }
                    100% { transform: translateX(200%) skewX(-12deg); }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                
                .animate-slideInLeft {
                    animation: slideInLeft 0.3s ease-out;
                }
                
                .animate-expandDown {
                    animation: expandDown 0.3s ease-out;
                }
                
                .animate-shimmer {
                    animation: shimmer 3s infinite;
                }
            `}</style>
        </>
    );
}
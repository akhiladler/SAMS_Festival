import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import { translations } from "@/lib/translations";
import { Link } from "wouter";
import samsLogoOfficial from "../assets/sams-logo-official.png";
import { Menu } from "lucide-react";

const Header = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect scroll to add background opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "#about", label: t.about },
    { href: "#submissions", label: t.submissions }, 
    { href: "#festival-highlights", label: t.festivalHighlights },
    { href: "#contact", label: t.contact }
  ];

  // Enhanced scroll handler function with consistent behavior
  const handleNavLinkClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    
    // Check for active overlays
    const paymentSection = document.getElementById('paymentSection');
    const confirmationSection = document.getElementById('confirmationSection');
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    // If any of these sections are visible, remove them first
    if (paymentSection?.style.opacity === '1' || confirmationSection?.style.opacity === '1' || loadingOverlay?.style.opacity === '1') {
      document.querySelectorAll('#paymentSection, #confirmationSection, #loadingOverlay').forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    }
    
    // If in submission flow or payment screen, do a hard reload
    const isInSubmissionFlow = document.querySelector('#paymentSection, #confirmationSection') !== null;
    const isProcessingState = document.body.classList.contains('processing') || 
                              document.body.classList.contains('focus-on-upload');
                           
    if (isInSubmissionFlow || isProcessingState) {
      window.location.href = window.location.origin + targetId;
      return;
    }
    
    // For normal navigation, smooth scroll to the section
    const element = document.querySelector(targetId);
    if (element) {
      // Different offsets for different sections
      let headerOffset = 100; // Default for most sections
      
      // Special case for submissions section
      if (targetId === '#submissions') {
        const shareYourVisionSection = document.getElementById('share-your-vision');
        if (shareYourVisionSection) {
          const sectionTop = shareYourVisionSection.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: sectionTop - 70,
            behavior: 'smooth'
          });
          return;
        }
      }
      
      // For all other sections
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth'
      });
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className="fixed w-full z-50 transition-all duration-300 bg-festival-blue"
    >
      <div className="container-responsive px-4">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo - SAMS STUDIOS */}
          <a href="#hero" className="flex items-center space-x-2 max-w-[200px] sm:max-w-none">
            <div className="flex-shrink-0 w-8 xs:w-9 sm:w-10">
              <img 
                src={samsLogoOfficial} 
                alt="SAMS Logo" 
                className="w-full h-auto object-contain brightness-0 invert"
              />
            </div>
            <span className="text-sm xs:text-lg sm:text-xl font-montserrat font-bold text-festival-gold uppercase tracking-wider">
              SAMS STUDIOS
            </span>
          </a>
          
          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center justify-center space-x-6">
            {navItems.map((item, index) => (
              item.href.startsWith("#") ? (
                <a 
                  key={index}
                  href={item.href} 
                  className="nav-link"
                  onClick={(e) => handleNavLinkClick(e, item.href)}
                >
                  {item.label}
                </a>
              ) : (
                <Link 
                  key={index}
                  href={item.href} 
                  className="nav-link"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-festival-gold hover:text-white transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <Menu size={24} />
          </button>
          
          {/* Language Toggle */}
          <div className="hidden md:flex items-center pl-4">
            <LanguageToggle />
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden bg-festival-blue border-t border-festival-gold/20 overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-60' : 'max-h-0'
        }`}
      >
        <div className="container-responsive px-4 py-2">
          <nav className="flex flex-col space-y-4 py-4">
            {navItems.map((item, index) => (
              item.href.startsWith("#") ? (
                <a 
                  key={index}
                  href={item.href} 
                  className="nav-link block"
                  onClick={(e) => handleNavLinkClick(e, item.href)}
                >
                  {item.label}
                </a>
              ) : (
                <Link 
                  key={index}
                  href={item.href} 
                  className="nav-link block"
                >
                  {item.label}
                </Link>
              )
            ))}
            
            {/* Mobile Language Toggle */}
            <div className="pt-2">
              <LanguageToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

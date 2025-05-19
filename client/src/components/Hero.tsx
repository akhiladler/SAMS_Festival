import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

interface HeroProps {
  id?: string;
}

const Hero = ({ id }: HeroProps) => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const handleNavLinkClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    
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

  return (
    <section 
      id={id}
      className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden"
      style={{
        backgroundColor: "#002366", // Royal Blue background
        backgroundImage: `
          linear-gradient(to bottom, rgba(0,35,102,0.95) 0%, rgba(0,35,102,0.97) 100%), 
          url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23D4AF37' fill-opacity='0.12' fill-rule='evenodd'/%3E%3C/svg%3E")
        `
      }}
    >
      {/* Indonesian-inspired design elements */}
      <div className="absolute inset-0 w-full h-full">
        {/* Batik pattern in corners */}
        <div className="absolute bottom-0 left-0 w-72 h-72 md:w-96 md:h-96 opacity-15">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,10 C15,20 20,15 25,10 C30,5 35,10 40,15 C45,20 50,15 55,10 C60,5 65,10 70,15 C75,20 80,15 85,10 C90,5 95,10 100,15" 
                  stroke="#D4AF37" strokeWidth="1" fill="none" strokeOpacity="0.8" />
            <path d="M10,25 C15,35 20,30 25,25 C30,20 35,25 40,30 C45,35 50,30 55,25 C60,20 65,25 70,30 C75,35 80,30 85,25 C90,20 95,25 100,30" 
                  stroke="#D4AF37" strokeWidth="1" fill="none" strokeOpacity="0.8" />
            <path d="M10,40 C15,50 20,45 25,40 C30,35 35,40 40,45 C45,50 50,45 55,40 C60,35 65,40 70,45 C75,50 80,45 85,40 C90,35 95,40 100,45" 
                  stroke="#D4AF37" strokeWidth="1" fill="none" strokeOpacity="0.8" />
            <circle cx="20" cy="20" r="5" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="10" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
            <circle cx="80" cy="30" r="7" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        
        {/* Wayang-inspired silhouette in top right corner */}
        <div className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 opacity-15">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M85,10 C80,15 75,20 70,15 C65,10 60,5 55,10 C50,15 45,10 40,5 C35,0 30,5 25,10 C20,15 15,10 10,5" 
                  stroke="#D4AF37" strokeWidth="1" fill="none" strokeOpacity="0.8" />
            <path d="M85,25 C80,30 75,35 70,30 C65,25 60,20 55,25 C50,30 45,25 40,20 C35,15 30,20 25,25 C20,30 15,25 10,20" 
                  stroke="#D4AF37" strokeWidth="1" fill="none" strokeOpacity="0.8" />
            <path d="M85,40 C80,45 75,50 70,45 C65,40 60,35 55,40 C50,45 45,40 40,35 C35,30 30,35 25,40 C20,45 15,40 10,35" 
                  stroke="#D4AF37" strokeWidth="1" fill="none" strokeOpacity="0.8" />
            <circle cx="70" cy="20" r="5" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
            <circle cx="30" cy="30" r="8" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
            <circle cx="60" cy="60" r="6" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        
        {/* Additional batik elements */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-5" preserveAspectRatio="none" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
            <pattern id="batik-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="20" stroke="#D4AF37" strokeWidth="1" fill="none" />
              <path d="M20,20 L80,80" stroke="#D4AF37" strokeWidth="0.5" />
              <path d="M80,20 L20,80" stroke="#D4AF37" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="40" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
              <path d="M10,50 C30,30 70,30 90,50" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
              <path d="M10,50 C30,70 70,70 90,50" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#batik-pattern)" />
          </svg>
        </div>
      </div>
      
      <div className="container-responsive text-center max-w-5xl mx-auto relative z-10 py-24">
        {/* Main title */}
        <h1 className="heading-xl mb-6 sm:mb-8">
          SAMS FESTIVAL 2025
        </h1>

        {/* Subtitle */}
        <div className="mb-6 max-w-3xl mx-auto">
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-montserrat tracking-wide">
            A national celebration of Indonesian cinema, art, and performance
          </p>
        </div>

        {/* Tagline */}
        <div className="mb-10 sm:mb-12">
          <p className="font-montserrat text-festival-gold text-lg sm:text-xl italic">
            One Nation. Many Stories.
          </p>
        </div>

        {/* Call-to-action buttons - Updated as per requirements */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a 
            href="#submissions" 
            className="py-4 px-8 bg-festival-gold text-festival-blue font-montserrat font-bold uppercase text-lg tracking-wide rounded-md shadow-lg hover:shadow-xl transition-all duration-300 hover:brightness-110 transform hover:scale-105 w-64"
            onClick={(e) => handleNavLinkClick(e, '#submissions')}
          >
            SHARE YOUR VISION
          </a>
          <a 
            href="#about" 
            className="py-3 px-6 bg-transparent border-2 border-festival-gold text-festival-gold font-montserrat uppercase font-semibold rounded-md transition-all duration-300 hover:bg-festival-gold/10 w-48"
            onClick={(e) => handleNavLinkClick(e, '#about')}
          >
            LEARN MORE
          </a>
        </div>
      </div>
      
      {/* Enhanced Temple silhouette at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="h-32 md:h-40 w-full max-w-6xl opacity-25">
          <svg viewBox="0 0 1200 250" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            {/* Simple temple silhouette inspired by Borobudur */}
            <path d="M0,250 L50,240 L100,245 L150,240 L200,245 L250,240 L300,245 
                      L350,240 L400,245 L450,240 L500,245 L550,240 L600,245 L650,240 
                      L700,245 L750,240 L800,245 L850,240 L900,245 L950,240 L1000,245 
                      L1050,240 L1100,245 L1150,240 L1200,245 L1200,250 L0,250 Z" 
                  fill="#D4AF37" />
            
            {/* Temple stupa/top elements */}
            <path d="M600,180 L625,140 L650,180 L675,140 L700,180" 
                  stroke="#D4AF37" strokeWidth="2" fill="none" />
            <path d="M500,200 L525,160 L550,200 L575,160 L600,200" 
                  stroke="#D4AF37" strokeWidth="2" fill="none" />
            <path d="M700,200 L725,160 L750,200 L775,160 L800,200" 
                  stroke="#D4AF37" strokeWidth="2" fill="none" />
                  
            {/* Central temple structure */}
            <path d="M550,220 L650,170 L750,220" 
                  stroke="#D4AF37" strokeWidth="3" fill="none" />
            <path d="M580,220 L650,190 L720,220" 
                  stroke="#D4AF37" strokeWidth="2" fill="none" />
            
            {/* Temple base steps */}
            <rect x="400" y="235" width="500" height="5" fill="#D4AF37" />
            <rect x="450" y="230" width="400" height="5" fill="#D4AF37" />
            <rect x="500" y="225" width="300" height="5" fill="#D4AF37" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
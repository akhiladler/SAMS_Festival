import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { Clock, Ticket, Users, Film, Music } from "lucide-react";
import BatikDivider from "./BatikDivider";

const FestivalHighlightsSection = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  // Festival highlights data with proper icons instead of emojis
  const highlightFeatures = [
    {
      category: t.specialEvent || "SPECIAL EVENT",
      title: t.openingNight || "Opening Night Gala",
      description: t.openingNightDesc || "Join us for a star-studded opening ceremony with a premiere screening and cultural performances celebrating Indonesian talent.",
      time: "May 25, 7:00 PM, 2025",
      icon: <Ticket className="h-6 w-6 text-festival-gold" />,
      categoryClass: "bg-festival-blue text-festival-gold",
    },
    {
      category: t.workshopLabel || "WORKSHOP",
      title: t.masterclass || "Director's Masterclass",
      description: t.masterclassDesc || "An exclusive opportunity to learn from acclaimed Indonesian directors about visual storytelling and creative direction.",
      time: "May 27, 2:00 PM, 2025",
      icon: <Film className="h-6 w-6 text-festival-gold" />,
      categoryClass: "bg-festival-blue text-festival-gold",
    },
    {
      category: t.panelLabel || "PANEL",
      title: t.futureCinema || "Future of Indonesian Cinema",
      description: t.futureCinemaDesc || "Industry leaders discuss emerging trends, technologies, and opportunities in Indonesia's growing film industry.",
      time: "May 28, 4:00 PM, 2025",
      icon: <Users className="h-6 w-6 text-festival-gold" />,
      categoryClass: "bg-festival-blue text-festival-gold",
    },
    {
      category: t.workshopLabel || "WORKSHOP",
      title: t.audioWorkshop || "Sound Design & Music",
      description: t.audioWorkshopDesc || "Learn how to create immersive soundscapes that enhance storytelling and emotional impact in film.",
      time: t.audioWorkshopTime || "May 29, 10:00 AM, 2025",
      icon: <Music className="h-6 w-6 text-festival-gold" />,
      categoryClass: "bg-festival-blue text-festival-gold",
    }
  ];

  return (
    <section id="festival-highlights" className="py-20 bg-festival-beige">
      <div className="container-responsive max-w-6xl">
        <div className="text-center mx-auto mb-16">
          <h2 className="heading-lg text-festival-blue mb-6">
            {t.festivalHighlights || "FESTIVAL HIGHLIGHTS"}
          </h2>
          
          <p className="subheading text-gray-700 max-w-3xl mx-auto mb-8">
            Experience the best of SAMS Festival 2025 — from gala nights to masterclasses.
          </p>
          
          {/* Using batik divider for consistent design language */}
          <BatikDivider />
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {highlightFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="rounded-lg shadow-xl overflow-hidden transition-all duration-300 
                        hover:-translate-y-1 hover:shadow-2xl border-2 border-festival-gold/30 
                        hover:border-festival-gold/50 bg-white"
            >
              <div className="p-8 flex flex-col h-full">
                {/* Category Tag and Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-xs font-bold px-4 py-2 rounded-full ${feature.categoryClass} font-montserrat`}>
                    {feature.category}
                  </span>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-festival-blue/10">
                    {feature.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-4 font-montserrat text-festival-blue">
                  {feature.title}
                </h3>
                
                <p className="text-gray-700 mb-6 flex-grow font-open-sans">
                  {feature.description}
                </p>
                
                {/* Footer with Event Time */}
                <div className="mt-auto flex items-center justify-center pt-4 border-t border-festival-gold/20">
                  <span className="text-sm text-gray-700 flex items-center font-medium font-montserrat">
                    <Clock className="h-4 w-4 mr-2 text-festival-gold" />
                    {feature.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FestivalHighlightsSection;
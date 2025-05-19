import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FestivalHighlights = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  // Festival highlights data
  const highlightFeatures = [
    {
      category: t.specialEvent,
      title: t.openingNight,
      description: t.openingNightDesc,
      time: t.openingTime,
      emoji: "🎭",
      categoryClass: "bg-[#b91c48] text-white",
      bgClass: "bg-gradient-to-br from-[#b91c48]/10 to-[#b91c48]/5",
    },
    {
      category: t.workshopLabel,
      title: t.masterclass,
      description: t.masterclassDesc,
      time: t.masterclassTime,
      emoji: "🎬",
      categoryClass: "bg-[#19b999] text-white",
      bgClass: "bg-gradient-to-br from-[#19b999]/10 to-[#19b999]/5",
    },
    {
      category: t.panelLabel,
      title: t.futureCinema,
      description: t.futureCinemaDesc,
      time: t.futureTime,
      emoji: "🎞️",
      categoryClass: "bg-[#e39f0a] text-white",
      bgClass: "bg-gradient-to-br from-[#e39f0a]/10 to-[#e39f0a]/5",
    },
    {
      category: t.workshopLabel,
      title: "Audio Design Workshop",
      description: "Explore the art of sound design and scoring for film with Indonesia's top audio engineers.",
      time: "Apr 20, 1:00 PM",
      emoji: "🎧",
      categoryClass: "bg-[#19b999] text-white",
      bgClass: "bg-gradient-to-br from-[#19b999]/10 to-[#19b999]/5",
    }
  ];

  return (
    <div className="font-inter text-dark bg-[#f9f9f9] min-h-screen">
      <Header />
      
      {/* Hero Section with semi-transparent overlay */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-gradient-to-r from-[#19b999]/10 to-[#b91c48]/10">
        <div className="container-responsive">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-poppins mb-4 text-gray-900">
              Festival Highlights
            </h1>
            
            <p className="text-gray-600 text-lg sm:text-xl mb-8 max-w-3xl mx-auto">
              Experience the best of SAMS Festival 2025 — from gala nights to masterclasses.
            </p>
            
            <div className="w-20 h-1 bg-[#b91c48] mx-auto"></div>
          </div>
        </div>
      </section>
      
      {/* Main Content Section */}
      <section className="py-12 md:py-16">
        <div className="container-responsive">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {highlightFeatures.map((feature, index) => (
              <div 
                key={index} 
                className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${feature.bgClass} border border-transparent hover:border-gray-200`}
              >
                <div className="p-6 md:p-8 flex flex-col h-full">
                  {/* Category Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${feature.categoryClass}`}>
                      {feature.category}
                    </span>
                    <span className="text-3xl" role="img" aria-label={feature.category}>
                      {feature.emoji}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold mb-3 line-clamp-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">
                    {feature.description}
                  </p>
                  
                  {/* Footer with Time and Learn More */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-200/50">
                    <span className="text-sm text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {feature.time}
                    </span>
                    
                    <a 
                      href="#" 
                      className="text-sm font-medium text-[#b91c48] hover:underline flex items-center"
                    >
                      {t.learnMore}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* View Full Schedule Button */}
          <div className="text-center">
            <a 
              href="#" 
              className="inline-flex items-center px-6 py-3 bg-[#b91c48] text-white font-medium rounded-lg shadow-lg shadow-[#b91c48]/20 hover:shadow-xl hover:shadow-[#b91c48]/30 transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#b91c48]/50"
            >
              <span>{t.viewSchedule}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FestivalHighlights;
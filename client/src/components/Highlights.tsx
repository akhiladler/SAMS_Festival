import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const Highlights = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  // Highlight cards data with SAM Studios color theme
  const highlights = [
    {
      type: t.specialEvent,
      title: t.openingNight,
      description: t.openingNightDesc,
      time: t.openingTime,
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      typeClass: "text-[#b91c48]",
      bgClass: "bg-[#b91c48]/5",
    },
    {
      type: t.workshopLabel,
      title: t.masterclass,
      description: t.masterclassDesc,
      time: t.masterclassTime,
      image: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      typeClass: "text-[#19b999]",
      bgClass: "bg-[#19b999]/5",
    },
    {
      type: t.panelLabel,
      title: t.futureCinema,
      description: t.futureCinemaDesc,
      time: t.futureTime,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
      typeClass: "text-[#e39f0a]",
      bgClass: "bg-[#e39f0a]/5",
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-responsive">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-poppins mb-4">
            {t.festivalHighlights}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            {t.highlightsDescription}
          </p>
          <div className="w-16 sm:w-20 h-1 bg-[#e39f0a] mx-auto mt-4"></div>
        </div>
        
        {/* Highlights Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {highlights.map((highlight, index) => (
            <div 
              key={index} 
              className={`cta-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${highlight.bgClass} border border-transparent hover:border-gray-200`}
            >
              {/* Image with responsive height and loading optimization */}
              <div className="h-36 sm:h-44 lg:h-48 overflow-hidden">
                <img 
                  src={highlight.image} 
                  alt={highlight.title} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
              </div>
              
              <div className="p-4 sm:p-6">
                <div className={`text-xs font-semibold ${highlight.typeClass} uppercase tracking-wide mb-1`}>
                  {highlight.type}
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-poppins mb-2 line-clamp-2">
                  {highlight.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
                  {highlight.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-500">{highlight.time}</span>
                  <a 
                    href="#" 
                    className="text-sm text-[#19b999] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[#19b999]/50 rounded"
                    aria-label={`Learn more about ${highlight.title}`}
                  >
                    {t.learnMore}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <a 
            href="#" 
            className="inline-flex items-center text-[#b91c48] font-medium hover:underline px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b91c48]/50 transition-all"
            aria-label="View full schedule"
          >
            <span>{t.viewSchedule}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Highlights;

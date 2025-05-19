import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import festivalImage from "../assets/sams_festival_updated.png";

const About = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  return (
    <section id="about" className="py-20 bg-festival-blue text-white">
      <div className="container-responsive max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-lg mb-4">
            {t.aboutFestival || "ABOUT"}
          </h2>
          <div className="w-20 h-1 bg-festival-gold mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image on the left side */}
          <div className="rounded-lg overflow-hidden shadow-lg border-2 border-festival-gold/30">
            <img 
              src={festivalImage} 
              alt="SAMS Festival - A National Celebration of Indonesian Cinema" 
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          
          {/* Text content on the right side */}
          <div className="flex flex-col justify-center h-full">
            <h3 className="subheading text-festival-gold mb-6">
              {t.empoweringStories || "Empowering Indonesian Stories"}
            </h3>
            
            <div className="space-y-6">
              <p className="body-text text-white/90">
                {t.aboutParagraph1 || "SAMS Festival is a prestigious platform celebrating the rich diversity of Indonesian cinema and storytelling. Our mission is to showcase the best filmmaking talent from across the archipelago."}
              </p>
              
              <p className="body-text text-white/90">
                {t.aboutParagraph2 || "Founded by SAMS Studios, one of Indonesia's leading film production companies, the festival has emerged as a premier event for filmmakers, artists, and audiences to connect, collaborate, and celebrate our nation's cultural heritage through the power of cinema."}
              </p>
              
              <p className="body-text font-semibold text-festival-gold">
                {t.aboutParagraph3 || "Join us for an unforgettable celebration of Indonesian creativity, innovation, and storytelling excellence."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

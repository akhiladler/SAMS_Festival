import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  // Social media links
  const socialLinks = [
    {
      name: "Twitter",
      icon: (
        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
        </svg>
      ),
      url: "#"
    },
    {
      name: "Instagram",
      icon: (
        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
        </svg>
      ),
      url: "#"
    },
    {
      name: "Facebook",
      icon: (
        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      ),
      url: "#"
    }
  ];

  // Quick links with uppercase text as per design
  const quickLinks = [
    { name: "ABOUT", url: "#about" },
    { name: "SUBMISSIONS", url: "#share-your-vision" },
    { name: "FESTIVAL HIGHLIGHTS", url: "#festival-highlights" },
    { name: "PAST WINNERS", url: "#" },
    { name: "FAQ", url: "#" }
  ];

  // Contact info
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-festival-gold" />,
      content: "info@samsfestival.org"
    },
    {
      icon: <Phone className="h-5 w-5 text-festival-gold" />,
      content: "+62 21 5678 9012"
    },
    {
      icon: <MapPin className="h-5 w-5 text-festival-gold" />,
      content: "Jl. Lebak Bulus I No.1, RT.4/RW.4<br />Cilandak Bar., Kec. Cilandak<br />Jakarta Selatan, Indonesia"
    }
  ];

  return (
    <footer id="contact" className="bg-festival-blue text-white py-12 sm:py-16 md:py-20 scroll-mt-24">
      <div className="container-responsive">
        {/* Main Footer Grid - Responsive layout for different screen sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* Column 1 - Logo and Social Media */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <a href="#hero" className="inline-block mb-5 sm:mb-6">
              <span className="text-xl sm:text-2xl font-bold font-montserrat text-festival-gold uppercase tracking-wide">
                SAMS STUDIOS
              </span>
            </a>
            <p className="text-white/80 text-sm sm:text-base mb-6 sm:mb-8 max-w-[300px] font-open-sans">
              {t.footerTagline || "A national celebration of Indonesian cinema, art and performance, showcasing the brightest talents and most compelling stories."}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  className="text-festival-gold hover:text-white transition-colors p-2 rounded-full hover:bg-festival-gold/10 focus:outline-none focus:ring-2 focus:ring-festival-gold/50"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold font-montserrat mb-5 text-festival-gold uppercase tracking-wider">
              {t.quickLinks || "Quick Links"}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-white hover:text-festival-gold transition-colors text-sm block py-1 font-montserrat tracking-wide"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3 - Contact */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold font-montserrat mb-5 text-festival-gold uppercase tracking-wider">
              {t.contactUs || "Contact Us"}
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="mt-0.5 flex-shrink-0">
                    {info.icon}
                  </div>
                  <span className="text-white/80 text-sm leading-relaxed font-open-sans" 
                    dangerouslySetInnerHTML={{ __html: info.content }}>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4 - Newsletter */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h4 className="text-lg font-bold font-montserrat mb-5 text-festival-gold uppercase tracking-wider">
              {t.newsletter || "Newsletter"}
            </h4>
            <p className="text-white/80 mb-4 sm:mb-5 text-sm font-open-sans">
              {t.newsletterDesc || "Subscribe to our newsletter to stay updated on festival news, submission deadlines, and special events."}
            </p>
            <form className="space-y-3">
              <div>
                <input 
                  type="email" 
                  placeholder={t.emailPlaceholder || "Your email address"} 
                  aria-label={t.emailPlaceholder || "Your email address"}
                  className="w-full px-4 py-3 bg-white/10 border border-festival-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-festival-gold/50 focus:border-transparent text-sm" 
                />
              </div>
              <button 
                type="button" 
                className="w-full px-4 py-3 bg-festival-gold text-festival-blue rounded-md hover:brightness-110 transition-all text-sm font-montserrat uppercase font-semibold"
                aria-label={t.subscribe || "Subscribe"}
              >
                {t.subscribe || "Subscribe"}
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright Footer */}
        <div className="border-t border-festival-gold/20 mt-10 sm:mt-14 pt-6 sm:pt-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <p className="text-white/60 text-xs sm:text-sm font-open-sans">
              {t.copyright || "© 2025 SAMS Festival. All rights reserved."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

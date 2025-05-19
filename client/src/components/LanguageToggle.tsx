import { useContext, useRef, useState } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { useOnClickOutside } from "@/hooks/use-mobile";
import { ChevronDown } from "lucide-react";

const LanguageToggle = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useOnClickOutside(dropdownRef, () => setDropdownOpen(false));

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const changeLanguage = (lang: 'en' | 'id') => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="flex items-center space-x-1 px-3 py-2 rounded border border-festival-gold/30 hover:border-festival-gold/70 transition-colors 
        text-xs sm:text-sm font-montserrat uppercase text-festival-gold"
      >
        <span>{language.toUpperCase()}</span>
        <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
      </button>
      
      {/* Language Dropdown */}
      <div 
        className={`absolute right-0 mt-2 py-2 w-32 bg-festival-blue border border-festival-gold/20 rounded shadow-lg ${dropdownOpen ? 'block' : 'hidden'}`}
      >
        <button 
          onClick={() => changeLanguage('en')} 
          className="block w-full px-4 py-2 text-sm text-left text-white hover:bg-festival-gold/10 font-montserrat uppercase"
        >
          English
        </button>
        <button 
          onClick={() => changeLanguage('id')} 
          className="block w-full px-4 py-2 text-sm text-left text-white hover:bg-festival-gold/10 font-montserrat uppercase"
        >
          Indonesian
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;

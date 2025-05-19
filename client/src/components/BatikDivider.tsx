import React from "react";

interface BatikDividerProps {
  className?: string;
}

const BatikDivider: React.FC<BatikDividerProps> = ({ className = "" }) => {
  return (
    <div className={`w-full flex items-center justify-center py-6 ${className}`}>
      <div className="relative w-full max-w-md h-6 flex items-center justify-center">
        {/* Left decorative element */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/3 h-px bg-festival-gold/50"></div>
        
        {/* Central batik pattern */}
        <div className="w-16 h-6 relative z-10">
          <svg viewBox="0 0 60 20" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="#D4AF37" strokeWidth="1">
              {/* Central flower/star pattern */}
              <circle cx="30" cy="10" r="6" stroke="#D4AF37" strokeWidth="0.5" />
              <path d="M24,10 L36,10" stroke="#D4AF37" strokeWidth="0.5" />
              <path d="M30,4 L30,16" stroke="#D4AF37" strokeWidth="0.5" />
              <path d="M25,5 L35,15" stroke="#D4AF37" strokeWidth="0.5" />
              <path d="M25,15 L35,5" stroke="#D4AF37" strokeWidth="0.5" />
              
              {/* Leaf/wave patterns */}
              <path d="M18,10 C16,7 14,13 12,10" stroke="#D4AF37" strokeWidth="0.5" />
              <path d="M42,10 C44,7 46,13 48,10" stroke="#D4AF37" strokeWidth="0.5" />
              
              {/* Connecting elements */}
              <path d="M0,10 C5,5 10,15 15,10" stroke="#D4AF37" strokeWidth="0.5" />
              <path d="M60,10 C55,5 50,15 45,10" stroke="#D4AF37" strokeWidth="0.5" />
            </g>
          </svg>
        </div>
        
        {/* Right decorative element */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 h-px bg-festival-gold/50"></div>
      </div>
    </div>
  );
};

export default BatikDivider;
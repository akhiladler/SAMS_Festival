import React from "react";

interface BatikCornerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

const BatikCorner: React.FC<BatikCornerProps> = ({ position, className = "" }) => {
  let transformClass = "";
  
  // Position the pattern in the correct corner with proper rotation
  switch (position) {
    case 'top-left':
      transformClass = "top-0 left-0";
      break;
    case 'top-right':
      transformClass = "top-0 right-0 rotate-90";
      break;
    case 'bottom-left':
      transformClass = "bottom-0 left-0 -rotate-90";
      break;
    case 'bottom-right':
      transformClass = "bottom-0 right-0 rotate-180";
      break;
  }

  return (
    <div className={`absolute w-40 h-40 md:w-56 md:h-56 opacity-10 pointer-events-none ${transformClass} ${className}`}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Batik-inspired pattern */}
        <g fill="none" stroke="#D4AF37" strokeWidth="1">
          {/* Central flower pattern */}
          <circle cx="100" cy="100" r="20" />
          <circle cx="100" cy="100" r="30" />
          <circle cx="100" cy="100" r="40" />
          
          {/* Curls and spirals */}
          <path d="M60,60 Q75,50 80,70 T100,80" />
          <path d="M140,60 Q125,50 120,70 T100,80" />
          <path d="M60,140 Q75,150 80,130 T100,120" />
          <path d="M140,140 Q125,150 120,130 T100,120" />
          
          {/* Parang (knife) patterns - modified for more decorative appearance */}
          <path d="M30,30 C40,20 50,40 40,50 C30,60 50,70 60,60" />
          <path d="M170,30 C160,20 150,40 160,50 C170,60 150,70 140,60" />
          <path d="M30,170 C40,180 50,160 40,150 C30,140 50,130 60,140" />
          <path d="M170,170 C160,180 150,160 160,150 C170,140 150,130 140,140" />
          
          {/* Wave patterns inspired by traditional batik */}
          <path d="M10,100 C20,90 30,110 40,100 C50,90 60,110 70,100 C80,90 90,110 100,100" />
          <path d="M100,10 C90,20 110,30 100,40 C90,50 110,60 100,70 C90,80 110,90 100,100" />
          <path d="M100,190 C110,180 90,170 100,160 C110,150 90,140 100,130 C110,120 90,110 100,100" />
          <path d="M190,100 C180,110 170,90 160,100 C150,110 140,90 130,100 C120,110 110,90 100,100" />
        </g>
      </svg>
    </div>
  );
};

export default BatikCorner;
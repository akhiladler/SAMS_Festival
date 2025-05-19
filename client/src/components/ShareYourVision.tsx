import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { Upload, FileText, CreditCard } from "lucide-react";
import BatikDivider from "./BatikDivider";
import BatikCorner from "./BatikCorner";

const ShareYourVision = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  // Define the 3 steps with updated icons
  const steps = [
    {
      step: "Step 1",
      icon: <Upload className="w-6 h-6 text-festival-gold" />,
      title: "Upload your film",
      description: "Submit your completed short film using the upload button below."
    },
    {
      step: "Step 2",
      icon: <FileText className="w-6 h-6 text-festival-gold" />,
      title: "Approval & instructions",
      description: "If accepted, you'll receive confirmation and next steps — including payment details."
    },
    {
      step: "Step 3",
      icon: <CreditCard className="w-6 h-6 text-festival-gold" />,
      title: "Complete your payment",
      description: "Once payment is complete, your film will be officially entered into the festival."
    }
  ];

  return (
    <section id="share-your-vision" className="py-20 bg-festival-blue text-white relative overflow-hidden">
      {/* Simple anchor point - we'll handle exact scrolling in the click handlers */}
      <div id="submissions" className="absolute top-0 left-0 w-full h-0"></div>
      
      {/* Decorative elements for cultural identity */}
      <BatikCorner position="top-left" />
      <BatikCorner position="bottom-right" />
      
      <div className="container-responsive text-center max-w-6xl relative z-10">
        <h2 className="heading-lg mb-6">
          SUBMISSIONS
        </h2>
        
        <p className="subheading text-white/80 max-w-2xl mx-auto mb-8">
          We're looking for new voices in film, animation, and digital media from across Indonesia.
        </p>
        
        {/* Batik-inspired divider */}
        <BatikDivider className="mb-12" />
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          {steps.map((item, index) => (
            <div 
              key={index} 
              className="bg-festival-blue/40 backdrop-blur-sm rounded-lg p-8 shadow-lg transition-all duration-300 
                        hover:shadow-xl border border-festival-gold/30 hover:border-festival-gold/60"
            >
              <div className="flex flex-col items-center">
                <div className="mb-5 text-center">
                  <p className="font-montserrat uppercase text-sm font-semibold text-festival-gold/70 mb-3">{item.step}</p>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-festival-blue border border-festival-gold/50 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-montserrat font-semibold text-lg text-festival-gold mb-3">{item.title}</h3>
                </div>
                <p className="font-open-sans text-white/80">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* File Upload Card */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-10 shadow-lg border border-festival-gold/30 max-w-3xl mx-auto">
          <h3 className="font-montserrat font-bold text-xl text-festival-gold mb-8">
            Ready to upload? Drag and drop your film below.
          </h3>
          <div className="border-2 border-dashed border-festival-gold/30 rounded-lg p-8 mb-8 bg-white/5 cursor-pointer hover:bg-white/10 transition-all">
            <div className="flex flex-col items-center justify-center py-4">
              <Upload className="w-14 h-14 text-festival-gold mb-5" />
              <p className="mb-2 text-sm font-montserrat font-medium text-white">
                <span className="font-bold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-white/70 font-open-sans">
                Accepted formats: MP4, MOV, AVI • Max file size: 2GB
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <button className="py-4 px-8 bg-festival-gold text-festival-blue font-montserrat font-bold uppercase text-lg tracking-wide rounded-md shadow-lg hover:shadow-xl transition-all duration-300 hover:brightness-110 w-64">
              SUBMIT NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareYourVision;
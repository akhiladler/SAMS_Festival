import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SubmissionFlow from "@/components/SubmissionFlow";
import FestivalHighlightsSection from "@/components/FestivalHighlightsSection";
import Footer from "@/components/Footer";
import BatikDivider from "@/components/BatikDivider";
import { SubmissionProvider, useSubmission } from "@/context/SubmissionContext";

// Home page with conditional rendering based on submission state
const HomeContent = () => {
  const { submissionStage, isSubmissionInProgress } = useSubmission();
  
  // Track if sections should be visible or hidden
  const [showNonEssentials, setShowNonEssentials] = useState(true);
  
  // Update visibility based on submission state
  useEffect(() => {
    if (isSubmissionInProgress) {
      // Hide non-essential sections when submission is in progress
      setShowNonEssentials(false);
    } else {
      // Show all sections when not in submission process
      setShowNonEssentials(true);
    }
  }, [isSubmissionInProgress]);
  
  // Check if we're in any of the states that need full-page treatment
  const isPaymentFlow = submissionStage === 'payment' || submissionStage === 'processing';
  const isCompleted = submissionStage === 'completed';
  const needsFullPageLayout = isCompleted || isPaymentFlow;
  
  // Special styles for full-page states
  const fullPageStyles = needsFullPageLayout 
    ? 'flex flex-col items-center justify-center min-h-screen bg-white' 
    : '';

  return (
    <div className={`font-inter text-dark ${needsFullPageLayout ? 'bg-white' : 'bg-[#f9f9f9]'} min-h-screen`}>
      {/* Only show header if not in one of the full-page layout states */}
      {!needsFullPageLayout && <Header />}
      
      <main className={fullPageStyles}>
        {/* Always show Hero if not in submission process */}
        {(!isSubmissionInProgress) && (
          <>
            <Hero id="hero" />
            <About />
            {/* Indonesian Batik Divider between About and Share Your Vision */}
            <BatikDivider className="py-6 bg-gradient-to-r from-[#f9f9f9] via-white to-[#f9f9f9]" />
            <SubmissionFlow />
            {/* Indonesian Batik Divider between sections */}
            <BatikDivider className="py-6 bg-gradient-to-r from-[#f9f9f9] via-white to-[#f9f9f9]" />
            <FestivalHighlightsSection />
          </>
        )}
        
        {/* Submission section removed as requested */}
      </main>
      
      {/* Only show Footer when not in submission process */}
      {showNonEssentials && <Footer />}
    </div>
  );
};

// Home page wrapper with SubmissionProvider
const Home = () => {
  return (
    <SubmissionProvider>
      <HomeContent />
    </SubmissionProvider>
  );
};

export default Home;

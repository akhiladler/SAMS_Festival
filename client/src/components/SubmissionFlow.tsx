import { useContext, useState, useRef, useEffect } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLocation } from "wouter";

enum SubmissionStage {
  INITIAL = "initial",
  UPLOAD = "upload",
  PROCESSING_UPLOAD = "processing_upload",
  SUBMISSION_CONFIRMED = "submission_confirmed",
  PAYMENT = "payment",
  PROCESSING_PAYMENT = "processing_payment",
  COMPLETED = "completed"
}

const SubmissionFlow = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const [stage, setStage] = useState<SubmissionStage>(SubmissionStage.INITIAL);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [filmTitle, setFilmTitle] = useState<string>("");
  const [filmGenre, setFilmGenre] = useState<string>("");
  const [isMetadataValid, setIsMetadataValid] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setLocation] = useLocation();
  const [isScrolledToUpload, setIsScrolledToUpload] = useState<boolean>(false);
  const [showFullContent, setShowFullContent] = useState<boolean>(false);
  const uploadRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const submissionsRef = useRef<HTMLDivElement>(null);
  
  // Function to handle scrolling to the upload section
  const scrollToUpload = () => {
    if (uploadRef.current) {
      // Calculate proper offset to account for the fixed header
      const headerHeight = 160; // Significantly increased to ensure full visibility
      const elementPosition = uploadRef.current.getBoundingClientRect().top + window.scrollY;
      
      // Scroll to position with offset to ensure full visibility
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth'
      });
      
      setIsScrolledToUpload(true);
      setShowFullContent(true);
      
      // Hide any following sections by adding a class to body
      document.body.classList.add('focus-on-upload');
      
      // Optional: Add a timeout to ensure smooth transition
      setTimeout(() => {
        // Scroll again to ensure proper positioning after DOM updates
        uploadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  // Function to handle scrolling to the submissions section
  const scrollToSubmissions = () => {
    if (submissionsRef.current) {
      submissionsRef.current.scrollIntoView({ behavior: 'smooth' });
      // We don't immediately show the upload section
      setIsScrolledToUpload(false);
      setShowFullContent(false);
    }
  };

  // Check URL hash for direct navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#submissions' || hash === '#share-your-vision') {
        scrollToSubmissions();
      }
    };

    // Check hash on initial load
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Define the 3 steps based on the screenshot
  const steps = [
    {
      step: t.step1 || "Step 1",
      icon: (
        <svg className="w-6 h-6 text-[#b91c48]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 16.5L12 21.5L17 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12.5V21.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20.39 18.39C21.3653 17.8583 22.1358 17.0169 22.5798 15.9986C23.0239 14.9804 23.1162 13.8432 22.8422 12.7667C22.5682 11.6901 21.9435 10.7355 21.0667 10.0534C20.1899 9.37138 19.1109 9.00073 18 9.00001H16.74C16.4373 7.82926 15.8731 6.74235 15.0899 5.82099C14.3067 4.89963 13.3248 4.16785 12.2181 3.68061C11.1113 3.19336 9.90851 2.96639 8.70008 3.01434C7.49164 3.06229 6.31051 3.3842 5.24155 3.95353C4.17259 4.52287 3.24768 5.32526 2.53511 6.29912C1.82253 7.27299 1.33868 8.39429 1.1229 9.58157C0.907126 10.7689 0.964121 11.9907 1.28996 13.1535C1.6158 14.3164 2.2022 15.3932 3.00001 16.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: t.uploadYourFilm || "Upload your film",
      description: t.submitDescription || "Submit your completed short film using the upload button below."
    },
    {
      step: t.step2 || "Step 2",
      icon: (
        <svg className="w-6 h-6 text-[#b91c48]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: t.approvalAndInstructions || "Approval & instructions",
      description: t.approvalDescription || "If accepted, you'll receive confirmation and next steps — including payment details."
    },
    {
      step: t.step3 || "Step 3",
      icon: (
        <svg className="w-6 h-6 text-[#b91c48]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 10H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 15H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 15H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: t.completeYourPayment || "Complete your payment",
      description: t.paymentDescription || "Once payment is complete, your film will be officially entered into the festival."
    }
  ];

  // Function to handle file selection via the browse button
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Check if the file is a video file (mp4, mov, avi)
      const fileType = selectedFile.type;
      if (
        fileType !== "video/mp4" &&
        fileType !== "video/quicktime" &&
        fileType !== "video/x-msvideo" &&
        !selectedFile.name.endsWith(".mp4") &&
        !selectedFile.name.endsWith(".mov") &&
        !selectedFile.name.endsWith(".avi")
      ) {
        alert("Please upload a video file (MP4, MOV, or AVI)");
        return;
      }

      // Check if the file size is less than 2GB
      if (selectedFile.size > 2 * 1024 * 1024 * 1024) {
        alert("File size should be less than 2GB");
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      simulateUpload();
    }
  };

  // Function to handle drag and drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      // Check if the file is a video file (mp4, mov, avi)
      const fileType = droppedFile.type;
      if (
        fileType !== "video/mp4" &&
        fileType !== "video/quicktime" &&
        fileType !== "video/x-msvideo" &&
        !droppedFile.name.endsWith(".mp4") &&
        !droppedFile.name.endsWith(".mov") &&
        !droppedFile.name.endsWith(".avi")
      ) {
        alert("Please upload a video file (MP4, MOV, or AVI)");
        return;
      }

      // Check if the file size is less than 2GB
      if (droppedFile.size > 2 * 1024 * 1024 * 1024) {
        alert("File size should be less than 2GB");
        return;
      }

      setFile(droppedFile);
      setFileName(droppedFile.name);
      simulateUpload();
    }
  };

  // Prevent default behavior for drag events
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Simulate file upload progress
  const simulateUpload = () => {
    setStage(SubmissionStage.UPLOAD);
    let progress = 0;
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setButtonEnabled(true);
        
        // Auto-scroll to film info section after upload completes
        setTimeout(() => {
          const filmInfoSection = document.querySelector('.film-info-section');
          if (filmInfoSection) {
            filmInfoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300); // Short delay to ensure UI has updated
      }
    }, 100); // Completes in approximately 2 seconds
  };

  // Handle the "Begin Your Journey" button click
  const handleSubmission = () => {
    // Show loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-submission-overlay';
    loadingOverlay.style.position = 'fixed';
    loadingOverlay.style.top = '0';
    loadingOverlay.style.left = '0';
    loadingOverlay.style.width = '100%';
    loadingOverlay.style.height = '100%';
    loadingOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    loadingOverlay.style.zIndex = '9999';
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.flexDirection = 'column';
    loadingOverlay.style.alignItems = 'center';
    loadingOverlay.style.justifyContent = 'center';
    
    // Add loading spinner
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.style.width = '80px';
    spinner.style.height = '80px';
    spinner.style.border = '6px solid #f3f3f3';
    spinner.style.borderTop = '6px solid #c23a50';
    spinner.style.borderRadius = '50%';
    spinner.style.animation = 'spin 1s linear infinite';
    
    // Add keyframe animation for spinner
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    // Add loading text
    const text = document.createElement('p');
    text.textContent = 'Processing your submission...';
    text.style.marginTop = '20px';
    text.style.fontSize = '18px';
    text.style.color = '#333';
    
    // Assemble and append to body
    loadingOverlay.appendChild(spinner);
    loadingOverlay.appendChild(text);
    document.body.appendChild(loadingOverlay);
    
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
    
    // Go directly to processing stage (skip intermediate view)
    setStage(SubmissionStage.PROCESSING_UPLOAD);
    
    // Capture current scroll position before any changes
    const initialScrollPosition = window.scrollY;
    
    // Simulate processing for exactly 3 seconds
    setTimeout(() => {
      // Move to confirmation stage but keep overlay visible during transition
      setStage(SubmissionStage.SUBMISSION_CONFIRMED);
      
      // Once the state is updated and DOM is rendered, fade out the overlay
      setTimeout(() => {
        // Transition the overlay to transparent before removing
        loadingOverlay.style.transition = 'opacity 0.5s ease';
        loadingOverlay.style.opacity = '0';
        
        // After fade out, remove the overlay and restore scrolling
        setTimeout(() => {
          // Remove overlay
          if (document.body.contains(loadingOverlay)) {
            document.body.removeChild(loadingOverlay);
          }
          
          // Restore scrolling without changing position
          document.body.style.overflow = '';
          
          // Ensure we're at the same position as before
          window.scrollTo({
            top: initialScrollPosition,
            behavior: 'auto'
          });
          
          // Now scroll the confirmation into view with smooth animation
          const confirmationElement = document.querySelector('.submission-stage-transition');
          if (confirmationElement) {
            const headerOffset = 80;
            const elementPosition = confirmationElement.getBoundingClientRect().top + window.scrollY;
            
            window.scrollTo({
              top: elementPosition - headerOffset,
              behavior: 'smooth'
            });
          }
        }, 500); // Time to complete fade out
      }, 100); // Small delay to ensure state update completed
    }, 3000); // Processing time
  };

  // Handle Continue to Payment button click - clean & emotional transition
  const handleContinueToPayment = () => {
    // Hide ALL other page sections without scrolling
    const sectionsToHide = [
      '#hero', 
      '.film-info-section', 
      '#festival-highlights', 
      '#highlights', 
      '#schedule', 
      '#share-your-vision', 
      'footer', 
      'header:not(.sticky-header)',
      '.submission-steps'
    ];
    
    // Hide all sections
    sectionsToHide.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
        }
      });
    });
    
    // Create payment section if it doesn't exist
    if (!document.getElementById('paymentSection')) {
      const paymentSection = document.createElement('div');
      paymentSection.id = 'paymentSection';
      paymentSection.className = 'fixed inset-0 flex items-center justify-center z-50 opacity-0 transition-opacity duration-400 ease-in';
      paymentSection.style.backgroundColor = 'rgba(255, 255, 255, 1)'; // Fully opaque background
      document.body.appendChild(paymentSection);
      
      // Trigger reflow to enable transition
      void paymentSection.offsetWidth;
      
      // Make payment section visible with fade-in
      paymentSection.style.opacity = '1';
    } else {
      const paymentSection = document.getElementById('paymentSection');
      if (paymentSection) {
        paymentSection.style.display = 'flex';
        paymentSection.style.opacity = '1';
      }
    }
    
    // Update the stage
    setStage(SubmissionStage.PAYMENT);
    
    // Prevent scrolling while payment form is active
    document.body.style.overflow = 'hidden';
    
    return false;
  };
  
  // Handle DOM updates for different stages
  useEffect(() => {
    // Create or update payment section content based on stage
    if (stage === SubmissionStage.PAYMENT) {
      const paymentSection = document.getElementById('paymentSection');
      if (paymentSection) {
        // Create content for payment section - clean & emotional
        paymentSection.innerHTML = `
          <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-800">Complete Your Payment</h2>
            </div>
            
            ${filmTitle ? `
              <div class="mb-4 pb-4 border-b">
                <div class="px-4 py-2 bg-gray-50 rounded-lg inline-block">
                  <p class="text-gray-700 font-medium">${filmTitle}</p>
                  ${filmGenre ? `<p class="text-gray-600 text-sm">${filmGenre}</p>` : ''}
                </div>
              </div>
            ` : ''}
            
            <div class="bg-gray-50 rounded-lg p-6 my-6 mx-auto">
              <p class="text-sm text-gray-500 mb-1">Entry Fee: Rp. 188,000</p>
              <p class="text-4xl font-bold">Rp 188,000</p>
            </div>
            
            <div class="flex justify-center gap-6 mt-8">
              <button id="payNowBtn" class="bg-[#4ac4a8] hover:bg-[#3daf95] text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transform transition hover:scale-105 active:scale-95">
                ${t.payNow || "Pay Now"}
              </button>
              <button id="cancelBtn" class="bg-white border border-gray-300 text-gray-700 font-medium py-3 px-8 rounded-lg hover:bg-gray-50 text-lg shadow-sm">
                ${t.cancel || "Cancel"}
              </button>
            </div>
          </div>
        `;
        
        // Create a loading overlay element but keep it hidden initially
        if (!document.getElementById('loadingOverlay')) {
          const loadingOverlay = document.createElement('div');
          loadingOverlay.id = 'loadingOverlay';
          loadingOverlay.className = 'fixed inset-0 flex items-center justify-center z-100 bg-gray-50/95 opacity-0 transition-opacity duration-300 pointer-events-none';
          loadingOverlay.innerHTML = `
            <div class="flex flex-col items-center">
              <div class="w-16 h-16 border-4 border-t-[#4ac4a8] border-gray-200 rounded-full animate-spin mb-4"></div>
              <p class="text-gray-600">Returning to homepage...</p>
            </div>
          `;
          document.body.appendChild(loadingOverlay);
        }
        
        // Add event listeners to the buttons
        document.getElementById('payNowBtn')?.addEventListener('click', handlePayment);
        document.getElementById('cancelBtn')?.addEventListener('click', handleCancelPayment);
      }
    } else if (stage === SubmissionStage.COMPLETED) {
      // Handle completed state - upgraded with confetti/animation
      const paymentSection = document.getElementById('paymentSection');
      if (paymentSection) {
        paymentSection.style.display = 'none';
      }
      
      if (!document.getElementById('confirmationSection')) {
        const confirmationSection = document.createElement('div');
        confirmationSection.id = 'confirmationSection';
        confirmationSection.className = 'fixed inset-0 flex items-center justify-center z-50 opacity-0 transition-opacity duration-400 ease-in';
        confirmationSection.style.backgroundColor = 'rgba(255, 255, 255, 1)'; // Fully opaque
        document.body.appendChild(confirmationSection);
        
        // Create content for confirmation section with confetti animation
        confirmationSection.innerHTML = `
          <div class="bg-white p-10 max-w-lg w-full text-center relative overflow-hidden">
            <!-- Animated confetti elements -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
              <div class="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#FF5A5F] animate-ping" style="animation-duration: 1.5s; animation-delay: 0.1s;"></div>
              <div class="absolute top-1/3 left-1/2 w-3 h-1 rounded-full bg-[#4ac4a8] animate-ping" style="animation-duration: 2.1s; animation-delay: 0.3s;"></div>
              <div class="absolute top-1/2 left-1/3 w-1 h-3 rounded-full bg-[#FFD166] animate-ping" style="animation-duration: 1.9s; animation-delay: 0.5s;"></div>
              <div class="absolute top-2/3 left-1/4 w-2 h-2 rounded-full bg-[#118AB2] animate-ping" style="animation-duration: 2.3s; animation-delay: 0.2s;"></div>
              <div class="absolute top-1/5 right-1/4 w-2 h-2 rounded-full bg-[#073B4C] animate-ping" style="animation-duration: 1.8s; animation-delay: 0.4s;"></div>
              <div class="absolute top-1/3 right-1/3 w-1 h-3 rounded-full bg-[#06D6A0] animate-ping" style="animation-duration: 2.2s; animation-delay: 0.1s;"></div>
              <div class="absolute top-1/2 right-1/5 w-3 h-1 rounded-full bg-[#EF476F] animate-ping" style="animation-duration: 1.7s; animation-delay: 0.7s;"></div>
              <div class="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-[#118AB2] animate-ping" style="animation-duration: 2.0s; animation-delay: 0.6s;"></div>
              <div class="absolute bottom-1/3 left-1/5 w-2 h-2 rounded-full bg-[#FFD166] animate-ping" style="animation-duration: 1.6s; animation-delay: 0.2s;"></div>
              
              <!-- Explosion effect -->
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-[#b91c48] via-[#4ac4a8] to-[#FFD166] opacity-10 animate-pulse" style="animation-duration: 3s;"></div>
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-gradient-to-r from-[#FFD166] via-[#b91c48] to-[#4ac4a8] opacity-10 animate-pulse" style="animation-duration: 2.5s; animation-delay: 0.3s;"></div>
            </div>
          
            <div class="mb-8 relative z-10">
              <div class="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-green-100 to-green-50 shadow-lg animate-bounce" style="animation-duration: 2s;">
                <div class="absolute w-full h-full rounded-full border-4 border-[#4ac4a8] opacity-25 animate-ping" style="animation-duration: 2s;"></div>
                <svg class="w-14 h-14 text-[#4ac4a8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            
            <h2 class="text-3xl font-bold mb-2 relative z-10 animate-pulse" style="animation-duration: 3s;">
              Fantastic! You're All Set!
            </h2>
            
            <p class="text-[#4ac4a8] font-medium mb-6 text-xl animate-pulse" style="animation-duration: 2.5s;">
              ${language === 'en' 
                ? "Your vision is now part of Indonesia's creative journey! We're thrilled to showcase your talent at SAMS Festival." 
                : "Visi Anda sekarang menjadi bagian dari perjalanan kreatif Indonesia! Kami sangat senang menampilkan bakat Anda di Festival SAMS."}
            </p>
            
            ${filmTitle ? `
              <div class="mb-8 relative z-10">
                <div class="inline-block px-8 py-5 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-100 shadow-md transform hover:scale-105 transition-transform animate-fadeIn" style="animation-duration: 1s;">
                  <div class="flex items-center justify-center mb-3">
                    <svg class="w-6 h-6 text-[#b91c48] mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h18M3 16h18" />
                    </svg>
                    <p class="text-gray-800 font-bold">${filmTitle}</p>
                  </div>
                  ${filmGenre ? `<p class="text-gray-600 text-sm">${filmGenre}</p>` : ''}
                  <div class="bg-white py-2 px-4 rounded-full inline-flex items-center mt-2 shadow-sm">
                    <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p class="text-green-600 font-medium">Payment Successful</p>
                  </div>
                </div>
              </div>
            ` : ''}
            
            <p class="text-gray-500 mt-6 relative z-10">
              <span class="font-medium">Redirecting to homepage in</span> <span id="countdown" class="text-[#b91c48] font-bold transition-all">${countdown}</span> <span class="font-medium">seconds...</span>
            </p>
          </div>
        `;
        
        // Trigger reflow to enable transition
        void confirmationSection.offsetWidth;
        
        // Make confirmation section visible with fade-in
        confirmationSection.style.opacity = '1';
      }
    }
    
    // Cleanup function
    return () => {
      // Remove event listeners when component unmounts or stage changes
      document.getElementById('payNowBtn')?.removeEventListener('click', handlePayment);
      document.getElementById('cancelBtn')?.removeEventListener('click', handleCancelPayment);
    };
  }, [stage, filmTitle, filmGenre, language, t.payNow, t.cancel, countdown]);

  // Handle Pay Now button click - improved with emotional transition
  const handlePayment = () => {
    // Hide payment section with fade-out
    const paymentSection = document.getElementById('paymentSection');
    if (paymentSection) {
      paymentSection.style.opacity = '0';
      
      // Wait for fade-out animation to complete
      setTimeout(() => {
        // Hide the payment section completely after fade-out
        paymentSection.style.display = 'none';
        
        // Set state to completed - this will trigger the confirmation screen
        setStage(SubmissionStage.COMPLETED);
        
        // Reset countdown for display
        setCountdown(5);
        
        // AUTO RESET AFTER 5 SECONDS - direct to hero page
        setTimeout(() => {
          // First scroll to the top of the page
          window.scrollTo(0, 0);
          // Use location.replace for immediate, clean redirect to hero with full path
          const fullPath = window.location.origin + '/';
          window.location.replace(fullPath);
        }, 5000);
        
        // Start countdown for display with visual feedback
        let count = 5;
        const timer = setInterval(() => {
          count -= 1;
          setCountdown(count);
          
          // Update the countdown text in real-time
          const countdownElement = document.getElementById('countdown');
          if (countdownElement) {
            countdownElement.textContent = count.toString();
            
            // Add a little animation to the countdown
            countdownElement.classList.add('font-bold', 'text-[#b91c48]');
            setTimeout(() => {
              countdownElement.classList.remove('font-bold', 'text-[#b91c48]');
            }, 300);
          }
          
          if (count === 0) {
            clearInterval(timer);
          }
        }, 1000);
      }, 400); // Match the duration of the fade-out animation (0.4s = 400ms)
    }
  };

  // Handle Cancel button on payment page - clear, smooth, direct
  const handleCancelPayment = () => {
    // Step 1: Fade out the payment modal
    const paymentSection = document.getElementById('paymentSection');
    if (paymentSection) {
      paymentSection.style.opacity = '0';
      paymentSection.style.transition = 'opacity 0.3s ease-out';
    }
    
    // Step 2: Show the loading spinner with a soft background
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
      loadingOverlay.style.opacity = '1';
      loadingOverlay.style.pointerEvents = 'auto';
    }
    
    // Clear any form data immediately
    setFilmTitle("");
    setFilmGenre("");
    setUploadProgress(0);
    setFile(null);
    setFileName("");
    setStage(SubmissionStage.INITIAL);
    setIsScrolledToUpload(false);
    setShowFullContent(false);
    setButtonEnabled(false);
    setIsMetadataValid(false);
    
    // Step 3: After a very short delay to show loading indicator, redirect directly to root
    setTimeout(() => {
      // First ensure we're scrolled to the absolute top
      window.scrollTo(0, 0);
      
      // Force a hard navigation to the root URL to guarantee we land on the hero section
      const fullPath = window.location.origin + '/';
      window.location.replace(fullPath);
    }, 300); // Shorter delay for more immediate response
  };
  
  // Handle Return to Homepage button click - direct to hero
  const handleReturnToHomepage = () => {
    // Scroll to the top of the page first
    window.scrollTo(0, 0);
    // Use location.replace with full path for cleaner navigation that replaces history
    const fullPath = window.location.origin + '/';
    window.location.replace(fullPath);
  };

  // Event listener for step 1 click
  useEffect(() => {
    const step1Element = step1Ref.current;
    
    const handleStep1Click = () => {
      scrollToUpload();
      setShowFullContent(true);
    };
    
    if (step1Element) {
      step1Element.addEventListener('click', handleStep1Click);
    }
    
    return () => {
      if (step1Element) {
        step1Element.removeEventListener('click', handleStep1Click);
      }
    };
  }, []);

  // Renders for different stages
  const renderContent = () => {
    switch (stage) {
      case SubmissionStage.INITIAL:
      case SubmissionStage.UPLOAD:
        return (
          <div id="submission-container" className="w-full">
              <div ref={submissionsRef} id="submissions" className="pt-16 -mt-16" data-anchor="submission-flow">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
                {steps.map((item, index) => (
                  <div 
                    key={index} 
                    ref={index === 0 ? step1Ref : undefined}
                    className={`bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 cursor-pointer ${index === 0 ? "hover:border-[#b91c48]" : ""}`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="mb-4 text-center">
                        <p className="text-sm font-medium text-gray-500 mb-2">{item.step}</p>
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#f8f0f3] mb-4">
                          {item.icon}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      {index === 0 && (
                        <div className="mt-4 text-[#b91c48]">
                          <svg className="w-5 h-5 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div 
              ref={uploadRef} 
              id="upload-section"
              className={`transition-all duration-500 pt-10 mt-8 ${isScrolledToUpload || showFullContent ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}
            >
              <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200 max-w-3xl mx-auto">
                <h3 className="text-xl font-bold mb-6">
                  {t.readyToUpload || "Ready to upload? Drag and drop your film below."}
                </h3>
                
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center justify-center py-4">
                    <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-medium">{t.dragAndDropFile || "Drag and drop your file here"}</span>
                      <span> {t.or || "or"} </span>
                    </p>
                    <button 
                      className="text-sm text-[#b91c48] font-medium bg-[#f8f0f3] px-4 py-2 rounded-md hover:bg-[#f0e0e5] transition-colors"
                    >
                      {t.browseFiles || "Browse Files"}
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden"
                      accept=".mp4,.mov,.avi,video/mp4,video/quicktime,video/x-msvideo"
                    />
                    <p className="text-xs text-gray-500 mt-3">
                      {t.acceptedFormats || "Accepted formats: MP4, MOV, AVI • Max file size: 2GB"}
                    </p>
                  </div>
                </div>
                
                {fileName && (
                  <div className="mb-6">
                    <p className="text-sm mb-2 text-gray-700">{fileName}</p>
                    <Progress value={uploadProgress} className="h-2 bg-gray-100" />
                    <p className="text-right text-xs mt-1 text-gray-500">{uploadProgress}%</p>
                  </div>
                )}
                
                {/* Film metadata inputs - only show when upload is complete */}
                {buttonEnabled && fileName && (
                  <div className="mb-8 mt-10 border-t pt-8 film-info-section">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                      <h3 className="text-xl font-bold mb-6 text-center text-[#b91c48]">
                        {t.filmInfo || "Your Film Information"}
                      </h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold mb-3">{t.filmTitle || "Film Title"} <span className="text-red-500">*</span></h4>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b91c48] focus:border-transparent"
                            placeholder={t.filmTitlePlaceholder || "Enter your film title"}
                            value={filmTitle}
                            onChange={(e) => {
                              setFilmTitle(e.target.value);
                              setIsMetadataValid(e.target.value.trim().length > 0);
                            }}
                            required
                          />
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold mb-3">{t.filmGenre || "Genre"}</h4>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b91c48] focus:border-transparent"
                            placeholder={t.filmGenrePlaceholder || "Enter film genre (optional)"}
                            value={filmGenre}
                            onChange={(e) => setFilmGenre(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-center mt-4">
                  <Button 
                    className={`bg-[#b91c48] hover:bg-[#a01940] text-white font-medium py-2 px-8 rounded-lg ${(!buttonEnabled || (buttonEnabled && !isMetadataValid)) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!buttonEnabled || (buttonEnabled && !isMetadataValid)}
                    onClick={handleSubmission}
                  >
                    {t.completeSubmission || "Begin Your Journey"}
                  </Button>
                </div>
                
                <p className="text-center text-xs text-gray-500 mt-4">
                  {t.termsAndConditions || "By uploading, you agree to the festival's terms and conditions."}
                </p>
              </div>
            </div>
          </div>
        );
      
      case SubmissionStage.PROCESSING_UPLOAD:
        return (
          <div ref={submissionsRef} className="min-h-[60vh] flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200 max-w-3xl mx-auto text-center w-full submission-stage-transition">
              <div className="mb-8">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-[#b91c48]"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {t.processingSubmission || "Preparing your submission..."}
              </h3>
              <p className="text-gray-500 text-lg">
                {t.pleaseWait || "Please wait while we process your submission."}
              </p>
              
              {/* Show film metadata confirmation */}
              {filmTitle && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-gray-700">
                    <span className="font-medium">{t.filmTitle || "Film Title"}:</span> {filmTitle}
                  </p>
                  {filmGenre && (
                    <p className="text-gray-700 mt-2">
                      <span className="font-medium">{t.filmGenre || "Genre"}:</span> {filmGenre}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        );
        
      case SubmissionStage.SUBMISSION_CONFIRMED:
        return (
          <div ref={submissionsRef} className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200 max-w-3xl mx-auto text-center w-full submission-stage-transition">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {t.fileReceived || "Submission received!"}
              </h3>
              <p className="text-gray-500 mb-4 text-lg">
                {t.submissionReceivedText || "Thank you for submitting your film! You are almost done. Just one more step."}
              </p>
              
              {/* Show film metadata confirmation */}
              {filmTitle && (
                <div className="my-6 py-4 px-6 border border-gray-100 rounded-lg bg-gray-50 inline-block mx-auto">
                  <p className="text-gray-700 font-medium text-lg">{filmTitle}</p>
                  {filmGenre && (
                    <p className="text-gray-600 mt-1">{filmGenre}</p>
                  )}
                  <p className="text-gray-500 text-sm mt-2">{fileName}</p>
                </div>
              )}
              
              <div className="mt-8">
                <Button 
                  className="bg-[#4ac4a8] hover:bg-[#3daf95] text-white font-bold py-4 px-10 rounded-lg text-lg shadow-md transform transition-transform active:scale-95"
                  onClick={handleContinueToPayment}
                  type="button"
                >
                  {t.simulatePayment || "Continue to Payment"}
                </Button>
              </div>
            </div>
          </div>
        );
        
      case SubmissionStage.PAYMENT:
        // Empty return - payment UI is created via DOM manipulation in the useEffect
        return null;
        
      case SubmissionStage.PROCESSING_PAYMENT:
        // No longer needed with new implementation
        return null;
        
      case SubmissionStage.COMPLETED:
        // Empty return - confirmation UI is created via DOM manipulation in the useEffect
        return null;
        
      default:
        return null;
    }
  };

  return (
    <section id="share-your-vision" className="py-16 bg-white scroll-mt-20">
      <div className="container-responsive text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t.shareYourVision || "Share Your Vision"}
        </h2>
        
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          {t.submissionDescription || "We're looking for bold new voices in film, animation, and digital media from across Indonesia."}
        </p>
        
        {/* Divider line */}
        <div className="w-16 h-1 bg-[#b91c48] mx-auto mb-12"></div>
        
        {renderContent()}
      </div>
    </section>
  );
};

export default SubmissionFlow;
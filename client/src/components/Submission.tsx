import React, { useContext, useState, useRef, useEffect } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { useSubmission } from "@/context/SubmissionContext";
import { translations } from "@/lib/translations";
import FileUpload from "./FileUpload";
import BatikCorner from "./BatikCorner";
import { 
  saveFileMetadata, 
  generateUniqueId, 
  formatFileSize, 
  getFileExtension, 
  formatDate 
} from "@/lib/fileMetadataService";

const Submission = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  
  // Get global submission context
  const { setSubmissionStage: setGlobalSubmissionStage } = useSubmission();
  
  // Ref for the upload form section
  const uploadFormRef = useRef<HTMLDivElement>(null);
  
  // Function to scroll to the upload form
  const scrollToUploadForm = () => {
    uploadFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // State to track the submission process flow
  const [submissionStage, setLocalSubmissionStage] = useState<'upload' | 'submitting' | 'payment' | 'paymentScreen' | 'processing' | 'completed'>('upload');
  const [shouldResetUpload, setShouldResetUpload] = useState<boolean>(false);
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  
  // Update both local and global submission state
  const setSubmissionStage = (stage: 'upload' | 'submitting' | 'payment' | 'paymentScreen' | 'processing' | 'completed') => {
    setLocalSubmissionStage(stage);
    // Map local stages to global stages
    if (stage === 'upload') {
      setGlobalSubmissionStage('none');
    } else if (stage === 'completed') {
      setGlobalSubmissionStage('completed');
    } else if (stage === 'paymentScreen') {
      // For paymentScreen, maintain the payment global stage
      setGlobalSubmissionStage('payment');
    } else {
      setGlobalSubmissionStage(stage);
    }
  };
  
  // State to track the uploaded file metadata
  const [fileMetadata, setFileMetadata] = useState<{
    title: string;
    filename: string;
    size: number;
    type: string;
  } | null>(null);
  
  // Function to reset the form after 10 seconds
  const resetForm = () => {
    setTimeout(() => {
      setShouldResetUpload(true);
      setSubmissionStage('upload');
      setSubmissionError(null);
      setFileMetadata(null);
      setIsFileUploaded(false);
    }, 10000);
  };
  
  // Handle when the reset is complete
  const handleResetComplete = () => {
    setShouldResetUpload(false);
  };
  
  // Debug state variable to help track values
  const [debugState, setDebugState] = useState<{lastMetadata: any; lastAction: string}>({
    lastMetadata: null,
    lastAction: "init"
  });
  
  // Handle file upload status change from the FileUpload component
  const handleUploadStatusChange = (isUploaded: boolean, fileInfo?: { title: string; filename: string; size: number; type: string }) => {
    console.log("Upload status changed:", isUploaded, fileInfo);
    
    // Save for debugging
    setDebugState(prev => ({
      ...prev,
      lastAction: "handleUploadStatusChange",
      lastMetadata: fileInfo
    }));
    
    // Update file upload status
    setIsFileUploaded(isUploaded);
    
    // Only process file info if it exists
    if (isUploaded && fileInfo) {
      setSubmissionError(null);
      
      // Make a clean copy of the file metadata to avoid reference issues
      const metadataCopy = {
        title: fileInfo.title,
        filename: fileInfo.filename,
        size: fileInfo.size,
        type: fileInfo.type
      };
      
      // Store file metadata
      setFileMetadata(metadataCopy);
      
      // Update file and title state for submission
      setFile(fileInfo);
      setTitle(fileInfo.title);
    } else if (!isUploaded) {
      // Clear metadata if file is not uploaded
      setFileMetadata(null);
      setFile(null);
      setTitle("");
    }
  };
  
  // Handle submission validation with debounce to prevent double submissions
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const onSubmit = ({ file, title }: { file: any; title: string }) => {
    // Proceed with the submission process
    setIsSubmitting(true);
    setSubmissionStage('submitting');
    
    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionStage('payment');
    }, 2000);
  };
  
  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Capture current state to prevent race conditions
    const currentFile = file;
    const currentTitle = title;

    console.log("SUBMIT CLICKED");
    console.log("file:", currentFile);
    console.log("title:", currentTitle);

    // Validate that we have both file and title before proceeding
    if (currentFile && currentTitle && currentTitle.trim() !== '') {
      console.log("Submission valid. Submitting...");
      // Call onSubmit immediately without the delay
      onSubmit({ file: currentFile, title: currentTitle });
    } else {
      console.log("Submission failed: missing file or title");
      setSubmissionError("Please upload a file and enter a title before submitting");
    }
  };

  // Determine if we're in a state that needs the full-page layout
  const isCompletedState = submissionStage === 'completed';
  const isIntermediateState = submissionStage === 'payment' || submissionStage === 'paymentScreen' || submissionStage === 'processing';
  const needsFullPageLayout = isCompletedState || isIntermediateState;
  
  return (
    <section id="submissions" className={`${needsFullPageLayout ? 'py-0 min-h-[80vh] flex items-center justify-center' : 'section-padding'}`}>
      <div className={`${needsFullPageLayout ? 'w-full max-w-3xl mx-auto' : 'container-responsive'}`}>
        {!isCompletedState && (
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-poppins mb-4">
              {t.submitWork}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              {t.submissionDescription}
            </p>
            <div className="w-16 sm:w-20 h-1 bg-[#b91c48] mx-auto mt-4 mb-8"></div>
          </div>
        )}
          
        {/* Only show the 3-Step Process in upload state, not in completed state */}
        {!isCompletedState && (
          <div className="text-center mb-8 bg-[#fafafa] py-8 rounded-lg">
            <h3 className="text-xl sm:text-2xl font-poppins font-semibold mb-6">
              Your Submission Journey
            </h3>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {t.submissionSteps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center text-center ${index === 0 ? 'cursor-pointer' : ''}`}
                    onClick={index === 0 ? scrollToUploadForm : undefined}
                    role={index === 0 ? "button" : undefined}
                    tabIndex={index === 0 ? 0 : undefined}
                    aria-label={index === 0 ? `Scroll to ${step.title}` : undefined}
                  >
                    <div className="text-4xl mb-3">{step.icon}</div>
                    <h3 className="font-semibold text-gray-600 mb-1 text-sm">{step.step}</h3>
                    <p className="font-semibold text-lg mb-2 text-gray-900">{step.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                    
                    {/* Add arrow indicator for the first step only */}
                    {index === 0 && (
                      <div className="mt-3 text-[#b91c48]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Submission Process Section */}
        <div className={`max-w-3xl mx-auto ${needsFullPageLayout ? 'mb-0' : 'mb-16'} ${needsFullPageLayout ? 'mt-0' : 'mt-4'}`}>
          <div ref={uploadFormRef} className={`bg-[#fafafa] rounded-lg shadow-lg p-6 sm:p-8 ${needsFullPageLayout ? 'border-t-0 shadow-xl' : 'border-t-4 border-[#b91c48]'} relative overflow-hidden`}>
            {/* Batik corners decoration removed for cleaner look */}
            {/* Stage 1: Upload Form */}
            {submissionStage === 'upload' && (
              <>
                <p className="text-lg sm:text-xl font-medium mb-6 text-center text-gray-900">
                  {t.uploadSubmission}
                </p>
                
                <p className="text-gray-600 mb-4 text-sm sm:text-base text-center">
                  {t.acceptedFormats}
                </p>
                
                <div className="mb-1 relative">
                  <FileUpload 
                    shouldReset={shouldResetUpload} 
                    onResetComplete={handleResetComplete}
                    onUploadStatusChange={handleUploadStatusChange}
                  />
                  
                  {/* Submission error message */}
                  {submissionError && (
                    <div className="mt-2 mb-0 text-red-500 text-xs flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{submissionError}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 mb-4"></div>
                
                <button 
                  type="button" 
                  className={`w-full py-3 bg-[#b91c48] text-white font-medium rounded-lg shadow-lg shadow-[#b91c48]/20 transition-all transform focus:outline-none focus:ring-2 focus:ring-[#b91c48]/50 ${
                    isFileUploaded && fileMetadata && fileMetadata.title && fileMetadata.title.trim() !== ''
                      ? 'hover:shadow-xl hover:shadow-[#b91c48]/30 hover:-translate-y-1' 
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  aria-label={t.completeSubmission}
                  onClick={handleSubmitClick}
                  disabled={!isFileUploaded || !fileMetadata || !fileMetadata.title || fileMetadata.title.trim() === '' || isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    t.completeSubmission
                  )}
                </button>
                
                <p className="text-xs sm:text-sm text-gray-500 mt-4 text-center">
                  {t.termsAndConditions}
                </p>
              </>
            )}
            
            {/* Submitting Stage */}
            {submissionStage === 'submitting' && (
              <div className="text-center py-8 animate-fadeIn transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#b91c48]"></div>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-medium mb-4 text-gray-900 animate-fadeIn">
                  {t.processingSubmission}
                </h3>
              </div>
            )}
            
            {/* Stage 2: Payment */}
            {submissionStage === 'payment' && (
              <div className="text-center py-12 animate-fadeIn transition-all duration-500">
                <div className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-green-100 rounded-full animate-slideUp">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-medium mb-4 text-gray-900 animate-slideUp">
                  {t.fileReceived}
                </h3>
                
                <p className="text-gray-600 max-w-md mx-auto mb-6 animate-slideUp opacity-90">
                  {t.submissionReceivedText}
                </p>
                
                <button 
                  type="button" 
                  className="w-full sm:w-auto px-6 py-3 mt-4 bg-[#19b999] text-white font-medium rounded-lg shadow-lg shadow-[#19b999]/20 hover:shadow-xl hover:shadow-[#19b999]/30 transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#19b999]/50 animate-slideUp"
                  onClick={async () => {
                    // Save file metadata to the server if available
                    if (fileMetadata) {
                      try {
                        // Create metadata object with additional information
                        const metadata = {
                          // id field is now auto-generated by the database
                          title: fileMetadata.title,
                          filename: fileMetadata.filename,
                          size: formatFileSize(fileMetadata.size),
                          type: fileMetadata.type,
                          uploadedAt: formatDate(new Date())
                        };
                        
                        // Save to server
                        await saveFileMetadata(metadata);
                        console.log('File metadata saved:', metadata);
                      } catch (error) {
                        console.error('Error saving file metadata:', error);
                        // Continue with the process even if metadata saving fails
                      }
                    }
                    
                    // Go directly to the payment screen (no processing animation first)
                    setSubmissionStage('paymentScreen');
                  }}
                >
                  {t.simulatePayment}
                </button>
              </div>
            )}
            
            {/* New Payment Screen */}
            {submissionStage === 'paymentScreen' && (
              <div className="text-center py-12 animate-fadeIn transition-all duration-500">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 animate-slideUp">
                  {t.paymentTitle}
                </h3>
                
                <p className="text-gray-600 max-w-md mx-auto mb-8 animate-slideUp opacity-90">
                  {t.paymentText}
                </p>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 max-w-xs mx-auto">
                  <p className="text-gray-500 text-sm mb-2">Entry Fee:</p>
                  <p className="text-3xl font-bold text-gray-900">{t.feeAmount}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    type="button" 
                    className="px-6 py-3 bg-[#19b999] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 focus:outline-none animate-slideUp"
                    onClick={() => {
                      // Show processing message, then show success
                      setSubmissionStage('processing');
                      setTimeout(() => {
                        setSubmissionStage('completed');
                        // Reset form after 10 seconds
                        resetForm();
                      }, 1500);
                    }}
                  >
                    {t.payNow}
                  </button>
                  
                  <button 
                    type="button"
                    className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all focus:outline-none animate-slideUp"
                    onClick={() => {
                      // Return to homepage
                      setSubmissionStage('upload');
                    }}
                  >
                    {t.cancel}
                  </button>
                </div>
              </div>
            )}
            
            {/* Processing Payment Stage */}
            {submissionStage === 'processing' && (
              <div className="text-center py-12 animate-fadeIn transition-all duration-500">
                <div className="inline-flex items-center justify-center w-20 h-20 mb-8">
                  <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-[#19b999]"></div>
                </div>
                
                <h3 className="text-xl sm:text-3xl font-medium mb-6 text-gray-900 animate-fadeIn">
                  {t.processingPayment}
                </h3>
                
                <p className="text-gray-600 max-w-md mx-auto mb-8 animate-fadeIn opacity-90">
                  Please wait while we process your payment information. This will only take a moment.
                </p>
              </div>
            )}
            
            {/* Stage 3: Completion */}
            {submissionStage === 'completed' && (
              <div className="text-center py-12 animate-fadeIn transition-all duration-500 relative overflow-hidden">
                {/* Enhanced confetti animation overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                  {/* More confetti for a better celebration effect */}
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div 
                      key={i}
                      style={{
                        position: 'absolute',
                        width: `${3 + Math.random() * 8}px`,
                        height: `${3 + Math.random() * 8}px`,
                        background: `${['#19b999', '#b91c48', '#FFD700', '#FF6F61', '#4BC0C0', '#9966FF'][Math.floor(Math.random() * 6)]}`,
                        borderRadius: `${Math.random() > 0.5 ? '50%' : '3px'}`,
                        left: `${Math.random() * 100}%`,
                        top: `${-20 - Math.random() * 100}px`,
                        transform: `rotate(${Math.floor(Math.random() * 360)}deg) scale(${0.8 + Math.random() * 0.5})`,
                        opacity: 0.8 + Math.random() * 0.2,
                        animation: `confetti ${1 + Math.random() * 3}s ease-out forwards`,
                        animationDelay: `${Math.random() * 0.7}s`
                      }}
                    />
                  ))}
                </div>
                
                {/* Animation is handled in global CSS */}
                
                <div className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-green-100 rounded-full animate-slideUp relative z-20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 animate-slideUp relative z-20">
                  {t.successTitle}
                </h3>
                
                <p className="text-gray-700 max-w-md mx-auto mb-3 animate-slideUp opacity-90 relative z-20">
                  {t.submissionSuccess}
                </p>
                
                <p className="text-gray-500 text-sm max-w-md mx-auto mb-8 animate-slideUp opacity-90 relative z-20">
                  {t.successSubtext}
                </p>
                
                <button 
                  type="button"
                  className="px-6 py-3 bg-[#b91c48] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 focus:outline-none animate-slideUp relative z-20"
                  onClick={() => {
                    // Reset the submission to starting state
                    setSubmissionStage('upload');
                  }}
                >
                  {t.returnToHomepage}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Submission;

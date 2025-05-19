import React, { useState, useRef, useEffect } from "react";
import { useSubmission } from "@/context/SubmissionContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Define the submission stages
type SubmissionStage = 'upload' | 'processing' | 'completed' | 'payment' | 'payment-processing' | 'final';

// Interface for file data
interface FileData {
  file: File;
  name: string;
  type: string;
  size: number;
}

const SubmissionWrapperV2 = () => {
  // Global submission context
  const { setSubmissionStage: setGlobalSubmissionStage } = useSubmission();
  
  // Local state variables for the entire submission flow
  const [stage, setLocalStage] = useState<SubmissionStage>('upload');
  const [title, setTitle] = useState<string>("");
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  
  // Payment information state
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  
  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Debug logs for state changes
  useEffect(() => {
    console.log("State changed - Current stage:", stage);
    console.log("State changed - Title:", title);
    console.log("State changed - File:", fileData ? fileData.name : "No file selected");
  }, [stage, title, fileData]);
  
  // Update global submission context when stage changes
  useEffect(() => {
    // Map local stages to global stages
    if (stage === 'upload') {
      setGlobalSubmissionStage('none');
    } else if (stage === 'processing') {
      setGlobalSubmissionStage('submitting');
    } else if (stage === 'payment' || stage === 'payment-processing') {
      setGlobalSubmissionStage('payment');
    } else if (stage === 'final') {
      setGlobalSubmissionStage('completed');
    } else {
      setGlobalSubmissionStage('processing');
    }
  }, [stage, setGlobalSubmissionStage]);
  
  // Handle stage change
  const setStage = (newStage: SubmissionStage) => {
    console.log("Changing stage from", stage, "to", newStage);
    setLocalStage(newStage);
  };
  
  // Title change handler
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    
    // Validate title
    if (value.length < 3 && value.length > 0) {
      setTitleError("Title must be at least 3 characters");
    } else {
      setTitleError(null);
    }
  };
  
  // Open file dialog
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is a video
      if (!file.type.includes('video/')) {
        alert("Please upload a video file (.mp4, .mov)");
        return;
      }
      
      // Set file data
      const newFileData = {
        file,
        name: file.name,
        type: file.type,
        size: file.size
      };
      
      setFileData(newFileData);
      console.log("File selected:", newFileData.name);
      
      // Simulate upload
      simulateUpload();
    }
  };
  
  // Simulate file upload
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploadProgress(100);
        setIsUploading(false);
      } else {
        setUploadProgress(progress);
      }
    }, 100);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!fileData || !title || title.length < 3) {
      if (!title || title.length < 3) {
        setTitleError("Title must be at least 3 characters");
      }
      return;
    }
    
    console.log("Form submitted with title:", title, "and file:", fileData.name);
    
    // Move to processing stage
    setStage('processing');
    
    // Simulate processing delay (2 seconds)
    setTimeout(() => {
      setStage('completed');
    }, 2000);
  };
  
  // Handle payment button click
  const handlePaymentClick = () => {
    console.log("Proceeding to payment with title:", title, "and file:", fileData?.name);
    
    // First, prevent any default scroll behavior by storing our position
    // and disabling scrolling
    document.body.style.overflow = 'hidden';
    
    // Change stage to payment which will render payment form
    setStage('payment');
    
    // Use a short timeout to ensure DOM is updated with payment form
    setTimeout(() => {
      // Scroll to top of page to ensure payment form is fully visible
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
      
      // Apply fade-in animation to the payment form
      const paymentForm = document.querySelector('.payment-form');
      if (paymentForm) {
        paymentForm.classList.add('animate-fadeSlideIn');
        
        // Make sure payment form is positioned in viewport center
        paymentForm.scrollIntoView({
          behavior: 'auto',
          block: 'center'
        });
      }
      
      // Re-enable scrolling
      document.body.style.overflow = '';
    }, 0);
  };
  
  // Handle payment form submission
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation for payment details
    if (cardNumber.length < 13 || expiryDate.length < 5 || cvv.length < 3) {
      alert("Please fill in all payment details correctly");
      return;
    }
    
    console.log("Payment submitted for:", title);
    
    // Show payment processing
    setPaymentProcessing(true);
    setStage('payment-processing');
    
    // Simulate payment processing (2 seconds)
    setTimeout(() => {
      setPaymentProcessing(false);
      setStage('final');
    }, 2000);
  };
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Render Upload Stage
  const renderUploadStage = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="film-title" className="text-sm font-medium">
          Film Title
        </label>
        <Input
          id="film-title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter your film title"
          className={titleError ? "border-red-500" : ""}
        />
        {titleError && (
          <p className="text-red-500 text-xs mt-1">{titleError}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Upload Video</label>
        <div 
          onClick={openFileDialog}
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/quicktime,video/mov"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {!fileData ? (
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                MP4 or MOV (max 2GB)
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm font-medium">{fileData.name}</p>
              <p className="text-xs text-gray-500">{formatFileSize(fileData.size)}</p>
              
              {isUploading && (
                <div className="mt-4">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    Uploading: {uploadProgress}%
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Button 
        onClick={handleSubmit}
        disabled={!fileData || !title || title.length < 3 || isUploading}
        className="w-full"
      >
        Begin Your Journey
      </Button>
    </div>
  );
  
  // Render Processing Stage
  const renderProcessingStage = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2">Preparing your submission…</h2>
      <p className="text-gray-500">Please wait while we process your film.</p>
    </div>
  );
  
  // Render Completed Stage
  const renderCompletedStage = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 className="text-2xl font-bold mb-2">Your film has been received</h2>
      <p className="text-xl mb-4">Welcome to SAMS Festival 2025</p>
      
      <div className="mt-4 max-w-md mx-auto bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-500 mb-2">
          <span className="font-medium">Title:</span> {title}
        </p>
        {fileData && (
          <p className="text-sm text-gray-500">
            <span className="font-medium">File:</span> {fileData.name} ({formatFileSize(fileData.size)})
          </p>
        )}
      </div>
      
      <div className="mt-8">
        <Button onClick={handlePaymentClick} className="px-8">
          Continue to Payment
        </Button>
      </div>
    </div>
  );
  
  // Render Payment Stage
  const renderPaymentStage = () => (
    <div className="payment-section flex flex-col items-center justify-center py-16">
      <div className="payment-container bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Submission</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          To finalize your submission to SAMS Festival 2025, please complete the payment process below.
        </p>
        
        <form onSubmit={handlePaymentSubmit} className="w-full payment-form">
          <div className="space-y-4">
            <div>
              <label htmlFor="card-number" className="block text-sm font-medium mb-1">
                Card Number
              </label>
              <Input 
                id="card-number" 
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                  Expiry Date
                </label>
                <Input 
                  id="expiry" 
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                  CVV
                </label>
                <Input 
                  id="cvv" 
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  maxLength={4}
                  type="password"
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full mt-6">
              Process Payment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
  
  // Render Payment Processing Stage
  const renderPaymentProcessingStage = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="animate-spin mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2">Processing Payment</h2>
      <p className="text-gray-500">Please wait, do not refresh this page...</p>
    </div>
  );
  
  // Render Final Stage
  const renderFinalStage = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-6">🎉</div>
      <h2 className="text-3xl font-bold mb-4">You're in!</h2>
      <p className="text-xl mb-4">Your film is now officially entered into SAMS Festival 2025.</p>
      <p className="text-gray-600 mb-8">We'll be in touch soon with the next steps.</p>
      
      <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3">Submission Details</h3>
        <p className="text-sm text-gray-500 mb-2">
          <span className="font-medium">Title:</span> {title}
        </p>
        {fileData && (
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-medium">File:</span> {fileData.name}
          </p>
        )}
        <p className="text-sm text-gray-500">
          <span className="font-medium">Status:</span> <span className="text-green-500">Confirmed</span>
        </p>
      </div>
    </div>
  );
  
  // 3-Step Process UI
  const renderSubmissionSteps = () => (
    <div className="text-center mb-8 bg-[#fafafa] py-8 rounded-lg">
      <h3 className="text-xl sm:text-2xl font-poppins font-semibold mb-6">
        Your Submission Journey
      </h3>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: Upload */}
          <div className={`p-4 rounded-lg ${stage === 'upload' ? 'bg-[#19b999]/10 border border-[#19b999]' : 'bg-white border border-gray-200'}`}>
            <div className="flex items-center mb-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${stage === 'upload' ? 'bg-[#19b999] text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <h4 className="font-medium">Upload</h4>
            </div>
            <p className="text-sm text-gray-600">
              Submit your film or project for consideration.
            </p>
          </div>
          
          {/* Step 2: Review */}
          <div className={`p-4 rounded-lg ${
            stage === 'processing' || stage === 'completed' ? 
            'bg-[#19b999]/10 border border-[#19b999]' : 
            'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center mb-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                stage === 'processing' || stage === 'completed' ? 
                'bg-[#19b999] text-white' : 
                'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <h4 className="font-medium">Review</h4>
            </div>
            <p className="text-sm text-gray-600">
              Our team validates your submission.
            </p>
          </div>
          
          {/* Step 3: Payment */}
          <div className={`p-4 rounded-lg ${
            stage === 'payment' || stage === 'payment-processing' || stage === 'final' ? 
            'bg-[#19b999]/10 border border-[#19b999]' : 
            'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center mb-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                stage === 'payment' || stage === 'payment-processing' || stage === 'final' ? 
                'bg-[#19b999] text-white' : 
                'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
              <h4 className="font-medium">Payment</h4>
            </div>
            <p className="text-sm text-gray-600">
              Complete payment to finalize your entry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Main render method
  return (
    <div className="submission-wrapper">
      {/* 3-Step Process Section */}
      {renderSubmissionSteps()}
      
      {/* Form Container */}
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {stage === 'upload' && renderUploadStage()}
        {stage === 'processing' && renderProcessingStage()}
        {stage === 'completed' && renderCompletedStage()}
        {stage === 'payment' && renderPaymentStage()}
        {stage === 'payment-processing' && renderPaymentProcessingStage()}
        {stage === 'final' && renderFinalStage()}
      </div>
    </div>
  );
};

export default SubmissionWrapperV2;
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SubmissionStage, FileData } from "./SubmissionWrapper";

// SubmissionV2 props interface
interface SubmissionV2Props {
  title: string;
  fileData: FileData | null;
  currentStage: SubmissionStage;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  onTitleChange: (title: string) => void;
  onFileChange: (fileData: FileData | null) => void;
  onStageChange: (stage: SubmissionStage) => void;
  onPaymentInfoChange: (cardNumber: string, expiryDate: string, cvv: string) => void;
}

const SubmissionV2 = ({
  title,
  fileData,
  currentStage,
  cardNumber,
  expiryDate,
  cvv,
  onTitleChange,
  onFileChange,
  onStageChange,
  onPaymentInfoChange
}: SubmissionV2Props) => {
  // Local state
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  
  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Function to set stage
  const setStage = (newStage: SubmissionStage) => {
    onStageChange(newStage);
    console.log("Setting stage to:", newStage);
  };

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onTitleChange(value);
    
    // Validate title
    if (value.length < 3 && value.length > 0) {
      setTitleError("Title must be at least 3 characters");
    } else {
      setTitleError(null);
    }
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
      
      // Set file data via props
      const newFileData = {
        file,
        name: file.name,
        type: file.type,
        size: file.size
      };
      
      onFileChange(newFileData);

      // Simulate upload progress
      simulateUpload();
    }
  };

  // Open file dialog
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // Simulate file upload with progress
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5; // Increment by 5% each time
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploadProgress(100);
        setIsUploading(false);
      } else {
        setUploadProgress(progress);
      }
    }, 100); // Update every 100ms for a roughly 2-second upload
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
    
    // Move to processing stage
    setStage('processing');
    
    // Simulate processing delay (2 seconds)
    setTimeout(() => {
      setStage('completed');
    }, 2000);
  };
  
  // Handle payment button click
  const handlePaymentClick = () => {
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
    
    // Simple validation (in a real app, we'd validate payment details properly)
    if (cardNumber.length < 13 || expiryDate.length < 5 || cvv.length < 3) {
      alert("Please fill in all payment details correctly");
      return;
    }
    
    // Show payment processing
    setPaymentProcessing(true);
    setStage('payment-processing');
    
    // Simulate payment processing delay (2 seconds)
    setTimeout(() => {
      setPaymentProcessing(false);
      setStage('final');
    }, 2000);
  };
  
  // Handle card number change
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPaymentInfoChange(e.target.value, expiryDate, cvv);
  };
  
  // Handle expiry date change
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPaymentInfoChange(cardNumber, e.target.value, cvv);
  };
  
  // Handle CVV change
  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPaymentInfoChange(cardNumber, expiryDate, e.target.value);
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Render upload stage content
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

  // Render processing stage content
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

  // Render completed stage content
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
  
  // Render payment stage content
  const renderPaymentStage = () => (
    <div className="w-full bg-white">
      <div className="payment-wrapper relative z-50 max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-8 transition-all duration-500 ease-in-out">
        <div className="absolute inset-0 bg-white rounded-xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Submission</h2>
          <p className="text-gray-600 mb-8 text-center max-w-md mx-auto">
            To finalize your submission to SAMS Festival 2025, please complete the payment process below.
          </p>
      
      <form onSubmit={handlePaymentSubmit} className="w-full max-w-md payment-form">
        <div className="space-y-4">
          <div>
            <label htmlFor="card-number" className="block text-sm font-medium mb-1">
              Card Number
            </label>
            <Input 
              id="card-number" 
              value={cardNumber}
              onChange={handleCardNumberChange}
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
                onChange={handleExpiryDateChange}
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
                onChange={handleCVVChange}
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
  </div>
  );
  
  // Render payment processing stage
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
  
  // Render final completed stage
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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {currentStage === 'upload' && renderUploadStage()}
      {currentStage === 'processing' && renderProcessingStage()}
      {currentStage === 'completed' && renderCompletedStage()}
      {currentStage === 'payment' && renderPaymentStage()}
      {currentStage === 'payment-processing' && renderPaymentProcessingStage()}
      {currentStage === 'final' && renderFinalStage()}
    </div>
  );
};

export default SubmissionV2;
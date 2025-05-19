import React, { useState, useEffect } from "react";
import SubmissionV2 from "./SubmissionV2";
import { useSubmission } from "@/context/SubmissionContext";

// Define the submission stages
export type SubmissionStage = 'upload' | 'processing' | 'completed' | 'payment' | 'payment-processing' | 'final';

// Interface for file data
export interface FileData {
  file: File;
  name: string;
  type: string;
  size: number;
}

const SubmissionWrapper = () => {
  // Global submission context
  const { submissionStage: globalStage, setSubmissionStage: setGlobalSubmissionStage } = useSubmission();
  
  // State variables for the whole submission flow (persistent)
  const [title, setTitle] = useState<string>("");
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [stage, setLocalStage] = useState<SubmissionStage>('upload');
  
  // State for payment information
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  
  // Debug logs whenever key state changes
  useEffect(() => {
    console.log('SubmissionWrapper - Current stage:', stage);
    console.log('SubmissionWrapper - Title:', title);
    console.log('SubmissionWrapper - File:', fileData ? fileData.name : 'No file selected');
  }, [stage, title, fileData]);
  
  // Update global submission context whenever local stage changes
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
  
  // Handle title change from child component
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    console.log('Title updated:', newTitle);
  };
  
  // Handle file change from child component
  const handleFileChange = (newFileData: FileData | null) => {
    setFileData(newFileData);
    console.log('File updated:', newFileData ? newFileData.name : 'No file selected');
  };
  
  // Handle stage change from child component
  const handleStageChange = (newStage: SubmissionStage) => {
    setLocalStage(newStage);
    console.log('Stage changed to:', newStage);
  };
  
  // Handle payment info changes from child component
  const handlePaymentInfoChange = (
    newCardNumber: string, 
    newExpiryDate: string, 
    newCVV: string
  ) => {
    setCardNumber(newCardNumber);
    setExpiryDate(newExpiryDate);
    setCvv(newCVV);
    console.log('Payment info updated');
  };
  
  // Determine if we need to show the 3-step process based on the stage
  const shouldShowSteps = true; // Always show steps for better guidance
  
  return (
    <div className="submission-wrapper">
      {/* 3-Step Process Section - Show only during initial stages */}
      {shouldShowSteps && (
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
              <div className={`p-4 rounded-lg ${stage === 'processing' || stage === 'completed' ? 'bg-[#19b999]/10 border border-[#19b999]' : 'bg-white border border-gray-200'}`}>
                <div className="flex items-center mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${stage === 'processing' || stage === 'completed' ? 'bg-[#19b999] text-white' : 'bg-gray-200 text-gray-500'}`}>
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
                stage === 'payment' || 
                stage === 'payment-processing' || 
                stage === 'final' ? 
                'bg-[#19b999]/10 border border-[#19b999]' : 
                'bg-white border border-gray-200'
              }`}>
                <div className="flex items-center mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    stage === 'payment' || 
                    stage === 'payment-processing' || 
                    stage === 'final' ? 
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
      )}
      
      {/* SubmissionV2 Component with props */}
      <SubmissionV2 
        title={title}
        fileData={fileData}
        currentStage={stage}
        cardNumber={cardNumber}
        expiryDate={expiryDate}
        cvv={cvv}
        onTitleChange={handleTitleChange}
        onFileChange={handleFileChange}
        onStageChange={handleStageChange}
        onPaymentInfoChange={handlePaymentInfoChange}
      />
    </div>
  );
};

export default SubmissionWrapper;
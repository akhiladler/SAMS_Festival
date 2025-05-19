import React, { useState, useRef } from 'react';

// Simple test component that isolates file upload behavior
const TestUpload = () => {
  // State for tracking file upload
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [title, setTitle] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [submissionStage, setSubmissionStage] = useState<'upload' | 'submitting' | 'completed'>('upload');

  // Reference to file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
      
      // Simulate file upload
      setIsUploading(true);
      setUploadProgress(0);
      
      // Reset any previous upload status
      setIsFileUploaded(false);
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) {
          progress = 100;
          clearInterval(interval);
          setIsFileUploaded(true);
        }
        
        setUploadProgress(Math.min(Math.round(progress), 100));
      }, 300);
    }
  };

  // Handle submission 
  const onSubmit = () => {
    // This function actually submits the data
    console.log('Submitting with file:', file?.name);
    console.log('Title:', title);
    
    // Change stage to submitting
    setSubmissionStage('submitting');
    
    // After 2 seconds, change to completed
    setTimeout(() => {
      setSubmissionStage('completed');
    }, 2000);
  };

  // Handle submit button click - version 1: with delay
  const handleSubmitClickWithDelay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Log current state
    console.log('Submit clicked (with delay)');
    console.log('file:', file?.name);
    console.log('title:', title);
    
    // Validate inputs
    if (file && title && title.trim() !== '') {
      console.log('Validation passed, will submit with delay...');
      // Add artificial delay before submission
      setTimeout(() => {
        onSubmit();
      }, 300);
    } else {
      console.log('Validation failed - missing file or title');
    }
  };
  
  // Handle submit button click - version 2: without delay
  const handleSubmitClickWithoutDelay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Log current state
    console.log('Submit clicked (without delay)');
    console.log('file:', file?.name);
    console.log('title:', title);
    
    // Validate inputs
    if (file && title && title.trim() !== '') {
      console.log('Validation passed, submitting immediately...');
      // Submit immediately without delay
      onSubmit();
    } else {
      console.log('Validation failed - missing file or title');
    }
  };

  // Reset form state
  const resetForm = () => {
    setFile(null);
    setFileName('');
    setTitle('');
    setUploadProgress(0);
    setIsUploading(false);
    setIsFileUploaded(false);
    setSubmissionStage('upload');
    
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Upload Test</h1>
      
      {/* Test explanation */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <p className="mb-2">This is a minimal test component to isolate file upload behavior.</p>
        <p className="mb-2">It tests two submission approaches:</p>
        <ul className="list-disc pl-5">
          <li>Submit with 300ms delay (original code)</li>
          <li>Submit without delay (fixed version)</li>
        </ul>
      </div>
      
      {submissionStage === 'upload' && (
        <div>
          {/* File Upload Section */}
          <div className="mb-6">
            <label htmlFor="file-upload" className="block font-medium mb-2">
              Select File:
            </label>
            <input
              id="file-upload"
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="block w-full mb-4"
            />
            
            {/* Upload Progress */}
            {isUploading && (
              <div>
                <div className="w-full h-2 bg-gray-200 rounded-full mb-1">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${uploadProgress}%`,
                      backgroundColor: uploadProgress === 100 ? 'green' : 'blue' 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="truncate max-w-[80%] text-gray-600">{fileName}</span>
                  <span className="text-gray-600 font-medium">{uploadProgress}%</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Title Input - Only shown when upload is complete */}
          {isFileUploaded && (
            <div className="mb-6">
              <label htmlFor="title-input" className="block font-medium mb-2">
                Title:
              </label>
              <input
                id="title-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          )}
          
          {/* Submission Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmitClickWithDelay}
              disabled={!isFileUploaded || !title.trim()}
              className={`flex-1 py-3 rounded-lg ${
                !isFileUploaded || !title.trim() 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-[#b91c48] hover:bg-[#a01940] text-white'
              }`}
            >
              Submit WITH Delay
            </button>
            
            <button
              onClick={handleSubmitClickWithoutDelay}
              disabled={!isFileUploaded || !title.trim()}
              className={`flex-1 py-3 rounded-lg ${
                !isFileUploaded || !title.trim() 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-[#19b999] hover:bg-[#13a789] text-white'
              }`}
            >
              Submit WITHOUT Delay
            </button>
          </div>
        </div>
      )}
      
      {/* Submitting state */}
      {submissionStage === 'submitting' && (
        <div className="text-center py-10">
          <div className="inline-block w-10 h-10 border-4 border-[#3498db] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg">Preparing your submission...</p>
        </div>
      )}
      
      {/* Completed state */}
      {submissionStage === 'completed' && (
        <div className="text-center py-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white text-2xl mb-4">✓</div>
          <h2 className="text-xl font-bold mb-2">Submission Complete!</h2>
          <p className="mb-4">Your file "{fileName}" with title "{title}" has been submitted.</p>
          <button
            onClick={resetForm}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Reset Form
          </button>
        </div>
      )}
      
      {/* Debug info */}
      <div className="mt-8 p-4 border-t border-gray-200 bg-gray-50">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <ul className="text-sm">
          <li><strong>File Uploaded:</strong> {isFileUploaded ? 'Yes' : 'No'}</li>
          <li><strong>File Name:</strong> {fileName || 'None'}</li>
          <li><strong>Title:</strong> {title || 'None'}</li>
          <li><strong>Upload Progress:</strong> {uploadProgress}%</li>
          <li><strong>Current Stage:</strong> {submissionStage}</li>
        </ul>
      </div>
    </div>
  );
};

export default TestUpload;
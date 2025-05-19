import React, { useState, useRef, useEffect } from 'react';

// Simple test component that isolates file upload behavior
const UploadTest = () => {
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
    <div className="upload-test-container" style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Upload Test</h1>
      
      {/* Test explanation */}
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <p>This is a minimal test component to isolate file upload behavior.</p>
        <p>It tests two submission approaches:</p>
        <ul>
          <li>Submit with 300ms delay (original code)</li>
          <li>Submit without delay (fixed version)</li>
        </ul>
      </div>
      
      {submissionStage === 'upload' && (
        <div>
          {/* File Upload Section */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="file-upload" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Select File:
            </label>
            <input
              id="file-upload"
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              style={{ marginBottom: '10px' }}
            />
            
            {/* Upload Progress */}
            {isUploading && (
              <>
                <div style={{ 
                  width: '100%', 
                  height: '10px', 
                  backgroundColor: '#e0e0e0', 
                  borderRadius: '5px',
                  marginBottom: '5px'
                }}>
                  <div style={{
                    width: `${uploadProgress}%`,
                    height: '10px',
                    backgroundColor: uploadProgress === 100 ? 'green' : 'blue',
                    borderRadius: '5px',
                    transition: 'width 0.3s'
                  }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>{fileName}</span>
                  <span>{uploadProgress}%</span>
                </div>
              </>
            )}
          </div>
          
          {/* Title Input - Only shown when upload is complete */}
          {isFileUploaded && (
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="title-input" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Title:
              </label>
              <input
                id="title-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  borderRadius: '5px',
                  border: '1px solid #ccc'
                }}
              />
            </div>
          )}
          
          {/* Submission Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <button
              onClick={handleSubmitClickWithDelay}
              disabled={!isFileUploaded || !title.trim()}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: !isFileUploaded || !title.trim() ? '#cccccc' : '#b91c48',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: !isFileUploaded || !title.trim() ? 'not-allowed' : 'pointer'
              }}
            >
              Submit WITH Delay
            </button>
            
            <button
              onClick={handleSubmitClickWithoutDelay}
              disabled={!isFileUploaded || !title.trim()}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: !isFileUploaded || !title.trim() ? '#cccccc' : '#19b999',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: !isFileUploaded || !title.trim() ? 'not-allowed' : 'pointer'
              }}
            >
              Submit WITHOUT Delay
            </button>
          </div>
        </div>
      )}
      
      {/* Submitting state */}
      {submissionStage === 'submitting' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            margin: '20px auto',
            border: '4px solid rgba(0, 0, 0, 0.1)',
            borderTopColor: '#3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p>Preparing your submission...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
      
      {/* Completed state */}
      {submissionStage === 'completed' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            margin: '20px auto',
            backgroundColor: '#62cb5c',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px'
          }}>✓</div>
          <h2>Submission Complete!</h2>
          <p>Your file "{fileName}" with title "{title}" has been submitted.</p>
          <button
            onClick={resetForm}
            style={{
              padding: '10px 15px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              marginTop: '20px',
              cursor: 'pointer'
            }}
          >
            Reset Form
          </button>
        </div>
      )}
      
      {/* Debug info */}
      <div style={{ 
        marginTop: '30px', 
        padding: '10px', 
        backgroundColor: '#f9f9f9', 
        borderTop: '1px solid #ddd'
      }}>
        <h3>Debug Info:</h3>
        <ul>
          <li>File Uploaded: {isFileUploaded ? 'Yes' : 'No'}</li>
          <li>File Name: {fileName || 'None'}</li>
          <li>Title: {title || 'None'}</li>
          <li>Upload Progress: {uploadProgress}%</li>
          <li>Current Stage: {submissionStage}</li>
        </ul>
      </div>
    </div>
  );
};

export default UploadTest;
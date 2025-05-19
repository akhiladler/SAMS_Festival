import { useContext, useState, useRef, useEffect } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

interface FileMetadataInfo {
  title: string;
  filename: string;
  size: number;
  type: string;
}

interface FileUploadProps {
  shouldReset?: boolean;
  onResetComplete?: () => void;
  onUploadStatusChange?: (isUploaded: boolean, fileInfo?: FileMetadataInfo) => void;
}

const FileUpload = ({ shouldReset, onResetComplete, onUploadStatusChange }: FileUploadProps) => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [filmTitle, setFilmTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Reset the component when shouldReset is true
  useEffect(() => {
    if (shouldReset) {
      setIsUploading(false);
      setUploadProgress(0);
      setFileName('');
      setFilmTitle('');
      setFileError(null);
      setHasNotifiedUpload(false);
      
      // Signal that file is no longer uploaded
      if (onUploadStatusChange) {
        onUploadStatusChange(false);
      }
      
      // Signal that reset is complete
      if (onResetComplete) {
        onResetComplete();
      }
    }
  }, [shouldReset, onResetComplete, onUploadStatusChange]);
  
  // Track if we've already notified parent about the current upload state
  const [hasNotifiedUpload, setHasNotifiedUpload] = useState(false);
  
  // Notify parent component when upload is complete
  useEffect(() => {
    // Only notify if upload is complete AND we haven't notified yet for this state
    if (onUploadStatusChange && isUploading && uploadProgress === 100 && !hasNotifiedUpload) {
      const fileInfo: FileMetadataInfo = {
        title: filmTitle,
        filename: fileName,
        size: fileInputRef.current?.files?.[0]?.size || 0,
        type: fileInputRef.current?.files?.[0]?.type || ''
      };
      
      // Mark that we've notified for this upload
      setHasNotifiedUpload(true);
      
      // Notify parent with upload status and file info
      onUploadStatusChange(true, fileInfo);
    }
  }, [uploadProgress, isUploading, hasNotifiedUpload, onUploadStatusChange, filmTitle, fileName]);
  
  // Title change tracking effect with memoized state
  const [prevTitle, setPrevTitle] = useState('');
  
  // Only run this effect when the title changes
  useEffect(() => {
    // Skip if title hasn't changed, we have no upload, or notification hasn't happened
    if (
      filmTitle === prevTitle || 
      !hasNotifiedUpload || 
      !filmTitle.trim() ||
      !isUploading ||
      uploadProgress !== 100 ||
      !onUploadStatusChange
    ) {
      return;
    }
    
    // Save current title as previous title
    setPrevTitle(filmTitle);
    
    // Create and send title update
    const fileInfo: FileMetadataInfo = {
      title: filmTitle,
      filename: fileName,
      size: fileInputRef.current?.files?.[0]?.size || 0,
      type: fileInputRef.current?.files?.[0]?.type || ''
    };
    
    // Update file metadata in parent with new title
    onUploadStatusChange(true, fileInfo);
  }, [
    filmTitle, 
    prevTitle, 
    hasNotifiedUpload, 
    isUploading, 
    uploadProgress, 
    fileName, 
    onUploadStatusChange
  ]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndUploadFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const validateAndUploadFile = (file: File) => {
    // Check if file is a video
    const isVideo = file.type.startsWith('video/');
    
    // Check file size (max 2GB)
    const maxSize = 2 * 1024 * 1024 * 1024; // 2GB in bytes
    const isValidSize = file.size <= maxSize;
    
    setFileError(null);
    
    if (!isVideo) {
      setFileError('Please upload a video file');
      return;
    }
    
    if (!isValidSize) {
      setFileError('File size exceeds the 2GB limit');
      return;
    }
    
    handleFileUpload(file);
  };

  const handleFileUpload = (file: File) => {
    // Reset all state for a new upload
    setIsUploading(true);
    setFileName(file.name);
    setFilmTitle(''); // Clear the title field for the new upload
    setPrevTitle(''); // Reset previous title tracking
    setHasNotifiedUpload(false); // Reset notification flag for the new upload
    setUploadProgress(0); // Reset progress
    
    // Also notify parent that no file is currently valid (will be valid once upload completes)
    if (onUploadStatusChange) {
      console.log("Notifying parent file upload started (invalid)");
      onUploadStatusChange(false);
    }
    
    // Store the file in the ref for metadata access
    if (fileInputRef.current && 'files' in fileInputRef.current && fileInputRef.current.files instanceof FileList) {
      // Create a new FileList-like object (since FileList is read-only)
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(true); // Keep it visible in this implementation
        }, 500);
      }
      
      setUploadProgress(Math.min(Math.round(progress), 100));
    }, 300);
  };

  return (
    <div>
      {/* File Upload Area */}
      <div 
        className={`border-2 border-dashed rounded-lg p-4 sm:p-6 md:p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer ${
          isDragging ? 'border-[#19b999] bg-[#19b999]/10' : fileError ? 'border-red-400 bg-red-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Upload file area"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <h4 className="mt-3 sm:mt-4 font-medium text-sm sm:text-base">
          {t.dragDropFile}
        </h4>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{t.or}</p>
        <button 
          type="button" 
          className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 bg-[#19b999] text-white text-sm rounded-lg hover:bg-[#19b999]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#19b999]/50"
        >
          {t.browseFiles}
        </button>
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept="video/mp4,video/x-m4v,video/*" 
          onChange={handleFileSelect}
          aria-label="File input"
        />
      </div>
      
      {/* Error Message */}
      {fileError && (
        <div className="mt-2 text-red-500 text-xs sm:text-sm flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {fileError}
        </div>
      )}
      
      {/* Upload Progress */}
      {isUploading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#19b999] h-2 rounded-full transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
              role="progressbar"
              aria-valuenow={uploadProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          <div className="flex justify-between items-center text-xs mt-1.5">
            <span className="truncate max-w-[80%] text-gray-500 text-[11px]">{fileName}</span>
            <span className="text-[11px] text-gray-600 font-medium">{uploadProgress}%</span>
          </div>
          
          {/* Film Title Input (shown when upload is complete) */}
          {uploadProgress === 100 && (
            <div className="mt-4">
              <label htmlFor="film-title" className="block text-sm font-medium text-gray-700 mb-1">
                {t.filmTitle}
              </label>
              <input
                type="text"
                id="film-title"
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-[#19b999] focus:border-[#19b999] focus:outline-none"
                placeholder={t.filmTitlePlaceholder}
                value={filmTitle}
                onChange={(e) => {
                  const newTitle = e.target.value;
                  setFilmTitle(newTitle);
                  
                  // Immediately notify parent of title change
                  if (onUploadStatusChange && isUploading && uploadProgress === 100) {
                    console.log("Title changed, immediately notifying parent:", newTitle);
                    const fileInfo = {
                      title: newTitle,
                      filename: fileName,
                      size: fileInputRef.current?.files?.[0]?.size || 0,
                      type: fileInputRef.current?.files?.[0]?.type || ''
                    };
                    onUploadStatusChange(true, fileInfo);
                  }
                }}
                aria-label={t.filmTitle}
                // Add blur event to ensure the title is saved
                onBlur={(e) => {
                  // Repeat notification on blur for reliability
                  if (onUploadStatusChange && isUploading && uploadProgress === 100) {
                    console.log("Title blur, ensuring parent is notified:", e.target.value);
                    const fileInfo = {
                      title: e.target.value,
                      filename: fileName,
                      size: fileInputRef.current?.files?.[0]?.size || 0,
                      type: fileInputRef.current?.files?.[0]?.type || ''
                    };
                    onUploadStatusChange(true, fileInfo);
                  }
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;

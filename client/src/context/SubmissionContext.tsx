import { createContext, useContext, ReactNode, useState } from 'react';

type SubmissionStage = 'none' | 'submitting' | 'payment' | 'processing' | 'completed';

interface SubmissionContextType {
  submissionStage: SubmissionStage;
  setSubmissionStage: (stage: SubmissionStage) => void;
  isSubmissionInProgress: boolean;
}

export const SubmissionContext = createContext<SubmissionContextType>({
  submissionStage: 'none',
  setSubmissionStage: () => {},
  isSubmissionInProgress: false,
});

interface SubmissionProviderProps {
  children: ReactNode;
}

export const SubmissionProvider = ({ children }: SubmissionProviderProps) => {
  const [submissionStage, setSubmissionStage] = useState<SubmissionStage>('none');
  
  // Helper property to determine if we're in any submission stage (including completion)
  const isSubmissionInProgress = submissionStage !== 'none';

  return (
    <SubmissionContext.Provider 
      value={{ 
        submissionStage, 
        setSubmissionStage,
        isSubmissionInProgress
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
};

// Custom hook for using submission context
export const useSubmission = () => useContext(SubmissionContext);
import React from 'react';
import SubmissionWrapperV2 from '@/components/SubmissionWrapperV2';
import { SubmissionProvider } from '@/context/SubmissionContext';

const SubmissionV2Test = () => {
  return (
    <SubmissionProvider>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">SAMS Festival Submission</h1>
          <SubmissionWrapperV2 />
        </div>
      </div>
    </SubmissionProvider>
  );
};

export default SubmissionV2Test;
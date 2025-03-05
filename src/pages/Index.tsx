
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import InterviewApp from "@/components/InterviewApp";
import HowItWorks from '@/components/HowItWorks';
import InterviewTips from '@/components/InterviewTips';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('scrollTo') === 'how-it-works') {
      const element = document.getElementById('how-it-works');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HowItWorks />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Alert className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Free Trial Limited</AlertTitle>
          <AlertDescription>
            You're using the free version. Upgrade to Premium for unlimited interview practice time, detailed AI feedback, and personalized coaching.
          </AlertDescription>
        </Alert>
        <InterviewApp />
      </div>
      <InterviewTips />
    </div>
  );
};

export default Index;


import React, { useState, useCallback } from 'react';
import { FunnelStep, FormData, Prize } from './types';
import TermsView from './views/TermsView';
import RegisterView from './views/RegisterView';
import WheelView from './views/WheelView';
import ResultView from './views/ResultView';

import { useAuth } from './contexts/AuthContext';
import Auth from './components/Auth';

const App: React.FC = () => {
  const { session, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState<FunnelStep>(FunnelStep.TERMS);

  // ... existing state ...
  const [formData, setFormData] = useState<FormData>({
    name: '',
    cpf: '',
    cnpj: '',
    company: '',
    job: '',
    area: '',
  });
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);

  const nextStep = useCallback(() => {
    switch (currentStep) {
      case FunnelStep.TERMS:
        setCurrentStep(FunnelStep.REGISTER);
        break;
      case FunnelStep.REGISTER:
        setCurrentStep(FunnelStep.WHEEL);
        break;
      case FunnelStep.WHEEL:
        setCurrentStep(FunnelStep.RESULT);
        break;
      default:
        break;
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    switch (currentStep) {
      case FunnelStep.REGISTER:
        setCurrentStep(FunnelStep.TERMS);
        break;
      case FunnelStep.WHEEL:
        setCurrentStep(FunnelStep.REGISTER);
        break;
      case FunnelStep.RESULT:
        setCurrentStep(FunnelStep.WHEEL);
        break;
      default:
        break;
    }
  }, [currentStep]);

  const handleRegister = (data: FormData) => {
    setFormData(data);
    nextStep();
  };

  const handleWheelResult = (prize: Prize) => {
    setSelectedPrize(prize);
    nextStep();
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black-deep flex items-center justify-center text-gold-400">
        <span className="w-8 h-8 border-4 border-gold-400/30 border-t-gold-400 rounded-full animate-spin"></span>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen w-full bg-black-deep font-display text-white selection:bg-gold-400 selection:text-black-deep relative overflow-hidden flex flex-col items-center">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-gold-400/5 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-gold-400/5 blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-md min-h-screen flex flex-col">
        {currentStep === FunnelStep.TERMS && (
          <TermsView onNext={nextStep} />
        )}

        {currentStep === FunnelStep.REGISTER && (
          <RegisterView
            onNext={handleRegister}
            onBack={prevStep}
          />
        )}

        {currentStep === FunnelStep.WHEEL && (
          <WheelView onResult={handleWheelResult} />
        )}

        {currentStep === FunnelStep.RESULT && selectedPrize && (
          <ResultView prize={selectedPrize} formData={formData} />
        )}
      </div>
    </div>
  );
};

export default App;

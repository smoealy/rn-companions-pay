import React, { createContext, useContext, useState } from 'react';

export type OnboardingProfile = {
  journey?: 'Hajj' | 'Umrah' | 'Later';
  year?: string;
  travelers?: string;
  budget?: string;
  family?: string[];
  web3?: boolean;
};

type OnboardingContextType = {
  profile: OnboardingProfile;
  update: (data: Partial<OnboardingProfile>) => void;
  reset: () => void;
};

const OnboardingContext = createContext<OnboardingContextType>({
  profile: {},
  update: () => {},
  reset: () => {},
});

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<OnboardingProfile>({});
  const update = (data: Partial<OnboardingProfile>) => setProfile(prev => ({ ...prev, ...data }));
  const reset = () => setProfile({});
  return (
    <OnboardingContext.Provider value={{ profile, update, reset }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);

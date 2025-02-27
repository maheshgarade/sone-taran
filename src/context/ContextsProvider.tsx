import { ReactNode } from 'react';
import { KalamsDataProvider } from './KalamsDataContext';

const ContextsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <KalamsDataProvider>
      {children}
    </KalamsDataProvider>
  );
};

export default ContextsProvider;

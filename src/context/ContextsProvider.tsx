import { ReactNode } from 'react';
import { KalamsDataProvider } from './KalamsDataContext';
import { AuthProvider } from '../features/auth/AuthContext/AuthProvider';

const ContextsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <KalamsDataProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </KalamsDataProvider>
  );
};

export default ContextsProvider;

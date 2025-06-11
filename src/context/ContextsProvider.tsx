import { ReactNode } from 'react';
import { KalamsDataProvider } from './KalamsDataContext';
import { CustomerDataProvider } from './CustomersDataContext';
import { AuthProvider } from '../features/auth/AuthContext/AuthProvider';

const ContextsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <KalamsDataProvider>
      <CustomerDataProvider>
        <AuthProvider>{children}</AuthProvider>
      </CustomerDataProvider>
    </KalamsDataProvider>
  );
};

export default ContextsProvider;

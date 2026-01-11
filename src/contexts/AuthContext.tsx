import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  user: null;
  session: null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Simplified auth - no real authentication
  return (
    <AuthContext.Provider value={{ user: null, session: null, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

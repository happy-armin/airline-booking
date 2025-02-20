import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import { IAppContextProps, IUserProps } from '../../types/props';
import axios from 'axios';
import { LOCAL_STORAGE_KEYS } from 'config/constants';
import { ApiService } from 'services';

// Define the type of the context value

// Create the context with a default value (empty values or undefined)
const AppContext = createContext<IAppContextProps | undefined>(undefined);

// Define the provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(LOCAL_STORAGE_KEYS.token)
  );
  const [user, setUser] = useState<IUserProps | null>(null);
  const apiService = new ApiService();

  useEffect(() => {
    return () => {
      localStorage.setItem(LOCAL_STORAGE_KEYS.token, token || '');
    };
  }, []);

  useEffect(() => {
    apiService.setAuthorization(token || '');
    if (token) {
      const fetchDashboard = async () => {
        try {
          const userResponse = await apiService.loadUser();

          setUser(userResponse); // Set user data
        } catch (err: any) {}
      };

      fetchDashboard();
    } else {
      setUser(null);
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser, apiService }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = (): IAppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

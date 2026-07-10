/**
 * Authentication Context
 * Manages user authentication state across the app
 */

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getClientConfig } from '@/hooks/useConfig';

interface User {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  type: 'worker' | 'hirer';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, otp: string, userType: 'worker' | 'hirer', extraData?: any) => Promise<void>;
  logout: () => void;
  sendOTP: (phone: string) => Promise<void>;
  registerHirer: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('ujobs_user');
    const storedToken = localStorage.getItem('ujobs_token');

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('ujobs_user');
        localStorage.removeItem('ujobs_token');
      }
    }
    
    setIsLoading(false);
  }, []);

  const getDeviceId = () => {
    if (typeof window === 'undefined') return '';
    let id = localStorage.getItem('ujobs_device_id');
    if (!id) {
      id = 'web_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('ujobs_device_id', id);
    }
    return id;
  };

  const sendOTP = async (phone: string) => {
    const config = getClientConfig();
    const response = await fetch(`${config.api.baseURL}/loginotp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        phone,
        device_id: getDeviceId()
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send OTP');
    }

    return response.json();
  };

  const login = async (phone: string, otp: string, userType: 'worker' | 'hirer', extraData?: any) => {
    const config = getClientConfig();
    // Using login_worker_register which matches mobile app and handles auto-registration for workers
    const endpoint = '/login_worker_register';

    const response = await fetch(`${config.api.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        phone, 
        otp,
        user_type: userType,
        device_id: getDeviceId(),
        ...extraData
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.error || 'Invalid OTP');
    }

    const data = await response.json();

    const userData: User = {
      id: data.user.id,
      name: data.user.name || 'User',
      email: data.user.email,
      phone: data.user.phone,
      type: userType,
    };

    setUser(userData);
    localStorage.setItem('ujobs_user', JSON.stringify(userData));
    localStorage.setItem('ujobs_token', data.token);
  };

  const registerHirer = async (data: any) => {
    const config = getClientConfig();
    const response = await fetch(`${config.api.baseURL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        device_id: getDeviceId()
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData.error) || 'Registration failed');
    }

    const result = await response.json();
    
    const userData: User = {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      phone: result.user.phone,
      type: 'hirer',
    };

    setUser(userData);
    localStorage.setItem('ujobs_user', JSON.stringify(userData));
    localStorage.setItem('ujobs_token', result.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ujobs_user');
    localStorage.removeItem('ujobs_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        sendOTP,
        registerHirer
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

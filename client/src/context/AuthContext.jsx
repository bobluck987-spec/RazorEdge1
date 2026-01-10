import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch user profile with role
  const fetchUserProfile = async (authUser) => {
    if (!authUser) {
      setUser(null);
      return;
    }
    
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();
      
      if (error) throw error;
      
      // Combine auth user with profile data
      setUser({
        ...authUser,
        role: profile.role,
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // If profile doesn't exist, user still gets basic auth info
      setUser(authUser);
    }
  };
  
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });
    
    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    
    return () => subscription.unsubscribe();
  }, []);
  
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    // Fetch profile after login
    if (data.user) {
      await fetchUserProfile(data.user);
    }
    
    return data;
  };
  
  const register = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    
    // Profile is automatically created by trigger, fetch it
    if (data.user) {
      await fetchUserProfile(data.user);
    }
    
    return data;
  };
  
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
import React, { createContext, useMemo, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider ({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a new context to hold authentication state (admin or guest)
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize isAdmin state from localStorage (if available), otherwise null
  const [isAdmin, setIsAdmin] = useState(() => {
    const saved = localStorage.getItem("isAdmin");
    return saved === "true" ? true : saved === "false" ? false : null;
  });

  // Sync isAdmin state to localStorage whenever it changes
  useEffect(() => {
    if (isAdmin === null) {
      localStorage.removeItem("isAdmin"); // Remove if not defined
    } else {
      localStorage.setItem("isAdmin", isAdmin); // Save as string
    }
  }, [isAdmin]);

  // Provide isAdmin and setIsAdmin to all child components
  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context in other components
export function useAuth() {
  return useContext(AuthContext);
}

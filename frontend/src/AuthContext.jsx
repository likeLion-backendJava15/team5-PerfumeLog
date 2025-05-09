import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored && stored !== "undefined") {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.error("⚠️ localStorage 파싱 오류:", err);
      localStorage.removeItem('user'); // 잘못된 값 제거
    } finally {
      setLoading(false);
    }
  }, []);
  

  const login = (userData) => {
    console.log("login()에 전달된 userData:", userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

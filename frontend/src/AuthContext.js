import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: 1, name: "테스트유저" });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ 이 줄을 꼭 추가!
export const useAuth = () => useContext(AuthContext);
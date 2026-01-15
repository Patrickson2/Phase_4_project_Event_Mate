import { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';



  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    localStorage.setItem('token', res.data.access_token);
    const userRes = await authAPI.getMe();
    setUser(userRes.data);
  };

  const register = async (name, email, password) => {
    await authAPI.register({ name, email, password });
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const AuthContext = createContext();

const MOCK_USERS = {
  "teste@gmail.com": {
    email: "teste@gmail.com",
    password: "123",
    name: "Usuário Teste",
    profilePicture: "https://via.placeholder.com/150/0000FF/FFFFFF?text=UT",
    xp: 500,
    level: 5,
    bio: "Este é um usuário de teste para demonstração de login local."
  },
  "admin@gmail.com": {
    email: "admin@gmail.com",
    password: "admin",
    name: "Administrador",
    profilePicture: "https://via.placeholder.com/150/FF0000/FFFFFF?text=AD",
    xp: 2000,
    level: 20,
    bio: "Perfil do administrador."
  }
};

export const AuthProvider = ({ children }) => {
  // Unificamos o estado de autenticação em um único objeto 'authState'
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false, // Adicionamos este campo crucial
    initializing: true,     // Renomeamos 'loading' para 'initializing'
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setAuthState({
            user: parsedUser,
            isAuthenticated: true, // Se há usuário salvo, está autenticado
            initializing: false,
          });
        } else {
          setAuthState(prev => ({ ...prev, initializing: false })); // Não há usuário, terminou de inicializar
        }
      } catch (error) {
        console.error("Erro ao carregar usuário do AsyncStorage:", error);
        setAuthState(prev => ({ ...prev, initializing: false }));
      }
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    setAuthState(prev => ({ ...prev, initializing: true })); // Define initializing como true durante o login
    try {
      const foundUser = MOCK_USERS[email];
      if (foundUser && foundUser.password === password) {
        const userToStore = { ...foundUser };
        delete userToStore.password;

        await AsyncStorage.setItem('user', JSON.stringify(userToStore));
        setAuthState({
          user: userToStore,
          isAuthenticated: true, // Login bem-sucedido, define como true
          initializing: false,
        });
        return true;
      } else {
        Alert.alert("Erro de Login", "Email ou senha inválidos.");
        setAuthState(prev => ({ ...prev, isAuthenticated: false, initializing: false })); // Define como false em caso de falha
        return false;
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      Alert.alert("Erro", "Ocorreu um erro durante o login. Tente novamente.");
      setAuthState(prev => ({ ...prev, isAuthenticated: false, initializing: false }));
      return false;
    }
  };

  const logout = async () => {
    setAuthState(prev => ({ ...prev, initializing: true }));
    try {
      await AsyncStorage.removeItem('user');
      setAuthState({
        user: null,
        isAuthenticated: false, // Logout, define como false
        initializing: false,
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      Alert.alert("Erro", "Ocorreu um erro ao fazer logout. Tente novamente.");
      setAuthState(prev => ({ ...prev, initializing: false }));
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
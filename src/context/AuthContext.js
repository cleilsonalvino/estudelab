import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// 1. Cria o contexto
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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erro ao carregar usuário do AsyncStorage:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Função de login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const foundUser = MOCK_USERS[email];
      if (foundUser && foundUser.password === password) {
    
        const userToStore = { ...foundUser };
        delete userToStore.password;

        setUser(userToStore);
        await AsyncStorage.setItem('user', JSON.stringify(userToStore));
        return true;
      } else {
        Alert.alert("Erro de Login", "Email ou senha inválidos.");
        return false; 
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      Alert.alert("Erro", "Ocorreu um erro durante o login. Tente novamente.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      Alert.alert("Erro", "Ocorreu um erro ao fazer logout. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
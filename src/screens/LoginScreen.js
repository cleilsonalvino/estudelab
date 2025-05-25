// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext'; 


import logoImage from '../../assets/estude-lab2.0.png';


const LoginScreen = ({ navigation }) => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Campos Vazios", "Por favor, preencha o email e a senha.");
      return;
    }

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) {
      console.log("Login bem-sucedido!");
    
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <Text style={styles.title}>Bem-vindo de volta!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>Não tem uma conta? **Registrar-se**</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Alert.alert("Funcionalidade", "Recuperar senha em breve!")}>
        <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151E3F',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FCFFFC',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: '#2D3750',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FCFFFC',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#435DD8',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#435DD8',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerLink: { // Novo estilo para o link de registro
    color: '#FCFFFC',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 15, // Adicionado para espaçamento
  },
  forgotPassword: {
    color: '#435DD8',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
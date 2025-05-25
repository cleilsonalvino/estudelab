// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Importa o hook de autenticação
import logoImage from '../../assets/estude-lab2.0.png'; // AJUSTE O CAMINHO DA SUA IMAGEM

const RegisterScreen = ({ navigation }) => { // Recebe navigation como prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert("Campos Vazios", "Por favor, preencha todos os campos: Email, Senha e Nome.");
      return;
    }

    setLoading(true);
    const success = await register(email, password, name);
    setLoading(false);

    if (success) {
      console.log("Registro bem-sucedido!");
      // O AuthContext já lida com o login automático e redirecionamento para Home
      // Então, não precisamos de navigation.navigate aqui, a menos que você queira
      // redirecionar para a tela de Login (em vez de Home) após o registro
    }
    // As mensagens de erro já são tratadas dentro do AuthContext
  };

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <Text style={styles.title}>Criar Nova Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu Nome Completo"
        placeholderTextColor="#999"
        autoCapitalize="words"
        value={name}
        onChangeText={setName}
      />
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
        style={styles.registerButton}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Registrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Já tem uma conta? **Entrar**</Text>
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
    textAlign: 'center',
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
  registerButton: {
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
  loginLink: {
    color: '#FCFFFC',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
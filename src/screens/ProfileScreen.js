// src/screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Mantenha se for usar para "Redefinir Progresso"

const ProfileScreen = () => {
  const navigation = useNavigation();

  // ATRIBUIÇÃO DIRETA DO OBJETO USER MOCKADO
  const user = {
    email: "teste@gmail.com",
    // password: "123", // Não precisa da senha aqui
    name: "Usuário Teste",
    profilePicture: "https://via.placeholder.com/150/0000FF/FFFFFF?text=UT",
    xp: 500,
    level: 5,
    bio: "Este é um usuário de teste para demonstração de login local."
  };

  // Remova a lógica de carregamento se não tiver mais AuthContext/AsyncStorage para usuário
  // if (loading || !user) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#FCFFFC" />
  //       <Text style={styles.loadingText}>Carregando perfil...</Text>
  //     </View>
  //   );
  // }

  // Exemplo de como você adaptaria o handleLogout (se optar por mantê-lo para outra finalidade)
  const handleResetProgress = async () => { // Renomeado para clareza
    Alert.alert(
      "Redefinir Progresso",
      "Tem certeza que deseja redefinir todo o seu progresso nos cursos? Esta ação é irreversível.",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Redefinir",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userProgress'); // Assumindo 'userProgress' como a chave
              Alert.alert("Sucesso", "Seu progresso foi redefinido!");
              navigation.navigate('Home'); // Voltar para a Home para ver o efeito
            } catch (error) {
              console.error("Erro ao redefinir progresso:", error);
              Alert.alert("Erro", "Não foi possível redefinir o progresso.");
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user.profilePicture || 'https://www.cleilsonalvino.com/img/eu.png' }}
          style={styles.profilePicture}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>

        <View style={styles.xpContainer}>
          <Text style={styles.xpText}>XP: {user.xp}</Text>
          <Text style={styles.levelText}>Nível: {user.level}</Text>
        </View>
      </View>

      <View style={styles.profileDetails}>
        <Text style={styles.sectionTitle}>Sobre Mim</Text>
        <Text style={styles.bioText}>{user.bio}</Text>

        <TouchableOpacity style={styles.optionButton} onPress={() => Alert.alert('Funcionalidade', 'Editar Perfil em breve!')}>
          <Text style={styles.optionButtonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => Alert.alert('Funcionalidade', 'Configurações em breve!')}>
          <Text style={styles.optionButtonText}>Configurações</Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={[styles.optionButton, styles.logoutButton]} onPress={handleResetProgress}>
          <Text style={[styles.optionButtonText, styles.logoutButtonText]}>Redefinir Progresso</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // ... seus estilos permanecem os mesmos
  container: {
    flex: 1,
    backgroundColor: '#151E3F',
  },
  contentContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingContainer: { // Se não for mais usado, pode ser removido
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151E3F',
  },
  loadingText: { // Se não for mais usado, pode ser removido
    color: '#FCFFFC',
    marginTop: 10,
    fontSize: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#1F2D61',
    width: '100%',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FCFFFC',
    marginBottom: 15,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FCFFFC',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#D0D0D0',
    marginBottom: 15,
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D3750',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  xpText: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
    marginLeft: 8,
    marginRight: 10,
  },
  levelText: {
    fontSize: 16,
    color: '#FCFFFC',
    fontWeight: 'bold',
  },
  profileDetails: {
    width: '90%',
    backgroundColor: '#1F2D61',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FCFFFC',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3A4B8A',
    paddingBottom: 5,
  },
  bioText: {
    fontSize: 16,
    color: '#D0D0D0',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'justify',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D3750',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  optionIcon: {
    marginRight: 10,
  },
  optionButtonText: {
    fontSize: 16,
    color: '#FCFFFC',
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#4D2930',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FF6347',
  },
});

export default ProfileScreen;
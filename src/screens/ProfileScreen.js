import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'; // Importa o hook de autenticação

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout, loading } = useAuth(); // Pega o usuário logado e a função de logout do contexto

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sair",
          onPress: () => {
            logout(); // Chama a função de logout do contexto
            // A navegação para a tela de login/home é tratada pelo App.js
          }
        }
      ]
    );
  };

  // Se o contexto ainda estiver carregando ou não houver usuário logado
  if (loading || !user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FCFFFC" />
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  // Se o usuário estiver carregado, exibe o perfil
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user.profilePicture || 'https://via.placeholder.com/150/CCCCCC/000000?text=NP' }} // Fallback para "No Picture"
          style={styles.profilePicture}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>

        <View style={styles.xpContainer}>
          <Icon name="military-tech" size={24} color="#FFD700" />
          <Text style={styles.xpText}>XP: {user.xp}</Text>
          <Text style={styles.levelText}>Nível: {user.level}</Text>
        </View>
      </View>

      <View style={styles.profileDetails}>
        <Text style={styles.sectionTitle}>Sobre Mim</Text>
        <Text style={styles.bioText}>{user.bio}</Text>

        <TouchableOpacity style={styles.optionButton} onPress={() => Alert.alert('Funcionalidade', 'Editar Perfil em breve!')}>
          <Icon name="edit" size={20} color="#FCFFFC" style={styles.optionIcon} />
          <Text style={styles.optionButtonText}>Editar Perfil</Text>
          <Icon name="chevron-right" size={20} color="#FCFFFC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => Alert.alert('Funcionalidade', 'Configurações em breve!')}>
          <Icon name="settings" size={20} color="#FCFFFC" style={styles.optionIcon} />
          <Text style={styles.optionButtonText}>Configurações</Text>
          <Icon name="chevron-right" size={20} color="#FCFFFC" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.optionButton, styles.logoutButton]} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#FF6347" style={styles.optionIcon} />
          <Text style={[styles.optionButtonText, styles.logoutButtonText]}>Sair</Text>
          <Icon name="chevron-right" size={20} color="#FF6347" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151E3F',
  },
  contentContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151E3F',
  },
  loadingText: {
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
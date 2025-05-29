import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // ✅ Correto

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('Home')}
      >
        <MaterialIcons name="home" size={24} color="#FCFFFC" />
        <Text style={styles.footerButtonText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <MaterialIcons name="person" size={24} color="#FCFFFC" />
        <Text style={styles.footerButtonText}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('About')}
      >
        <MaterialIcons name="info" size={24} color="#FCFFFC" />
        <Text style={styles.footerButtonText}>Sobre</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('Test')}
      >
        <MaterialIcons name="bug-report" size={24} color="#FCFFFC" />
        <Text style={styles.footerButtonText}>Depuração</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row', // Botões lado a lado
    justifyContent: 'space-around', // Espaçamento igual entre os botões
    alignItems: 'center',
    backgroundColor: '#1F2D61', // Cor de fundo do rodapé
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#3A4B8A', // Uma linha fina no topo
    position: 'absolute', // Fixa o rodapé na parte inferior
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerButton: {
    alignItems: 'center',
    padding: 8,
    marginBottom: 25,
  },
  footerButtonText: {
    color: '#FCFFFC', // Cor do texto do botão
    fontSize: 12,
    marginTop: 4,
  },
});

export default Footer;
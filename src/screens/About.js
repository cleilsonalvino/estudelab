import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking, // Importa o Linking para abrir URLs externas
} from 'react-native';

// Importe a imagem do logo (certifique-se de que o caminho está correto)
// Por exemplo, se a imagem estiver em `assets/img/logo-aprende-ai-sem-fundo.png`
import logoImage from '../public/imgs/estude-lab2.0.png'; // <--- AJUSTE ESSE CAMINHO

const AboutScreen = () => {
  const openLink = async (url) => {
    // Verifica se o dispositivo pode abrir a URL
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error(`Não foi possível abrir a URL: ${url}`);
      // Opcional: mostrar um alerta ao usuário
      // Alert.alert('Erro', 'Não foi possível abrir o link.');
    }
  };

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.header}>
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => console.log('Navegar para a Home')}>
            {/* O caminho da imagem precisa ser relativo ao arquivo que está sendo importado */}
            <Image
              source={logoImage}
              style={styles.logo}
              accessibilityLabel="Logo Aprende Aí"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.h2}>Conheça os Integrantes</Text>

        <View style={styles.section}>
          <Text style={styles.h3}>Professores:</Text>

          <View style={styles.teamMember}>
            <TouchableOpacity onPress={() => openLink('https://christianosantos.com.br/')}>
              <Text style={styles.linkText}>Christiano Santos</Text>
            </TouchableOpacity>
            <Text style={styles.p}>
              Com uma vasta experiência na área, o Professor Christiano é responsável por guiar e orientar todos os processos de ensino e aprendizado, trazendo insights valiosos para a equipe.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.h3}>Alunos:</Text>

          <View style={styles.teamMember}>
            <TouchableOpacity onPress={() => openLink('https://www.cleilsonalvino.com')}>
              <Text style={styles.linkText}>José Cleilson</Text>
            </TouchableOpacity>
            <Text style={styles.p}>
              José Cleilson é um dos alunos dedicados da nossa equipe, sempre buscando aprender e aplicar novos conhecimentos para enriquecer a experiência de todos os envolvidos.
            </Text>
          </View>

          <View style={styles.teamMember}>
            <Text style={styles.h4}>Hesnan Ávila</Text>
            <Text style={styles.p}>
              Hesnan Ávila é um aluno focado e comprometido, com uma paixão por adquirir novos conhecimentos e contribuir para o crescimento do projeto.
            </Text>
          </View>

          <View style={styles.teamMember}>
            <Text style={styles.h4}>Rian Souza</Text>
            <Text style={styles.p}>
              Rian Souza é um estudante altamente motivado, sempre em busca de desafios para expandir suas habilidades e colaborar de maneira eficaz no projeto.
            </Text>
          </View>

          <View style={styles.teamMember}>
            <Text style={styles.h4}>Yago Silva</Text>
            <Text style={styles.p}>
              Yago Silva é um aluno proativo, sempre contribuindo com novas ideias e soluções criativas para melhorar a execução do trabalho em equipe.
            </Text>
          </View>
        </View>
      </View>
      {/* Em React Native, um footer geralmente seria um componente separado ou parte da View principal */}
      <View style={styles.footer}>
        {/* Você pode adicionar conteúdo ao seu footer aqui, se necessário */}
        <Text style={styles.footerText}>© 2024 Estude Lab. Todos os direitos reservados.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1, // Garante que o ScrollView ocupe toda a tela
    backgroundColor: '#151E3F', // Cor de fundo do body
  },
  header: {
    width: '100%',
    padding: 10, // Adicionado padding para o header
  },
  nav: {
    backgroundColor: 'transparent',
    alignItems: 'flex-start', // Alinha o logo à esquerda
  },
  logo: {
    width: 150, // Ajuste a largura do logo conforme necessário
    height: 50, // Ajuste a altura do logo conforme necessário
    resizeMode: 'contain', // Garante que a imagem se ajuste sem cortar
  },
  container: {
    maxWidth: '90%', // React Native não tem 'max-width' em % diretamente como CSS
    width: '100%', // Use width para controlar o tamanho
    alignSelf: 'center', // Centraliza o container
    marginVertical: 10, // Adiciona margem vertical
    paddingHorizontal: 15, // Adiciona padding horizontal
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FCFFFC', // Cor mais clara para o título
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30, // Espaçamento entre as seções
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FCFFFC',
    marginBottom: 10,
  },
  h4: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCFFFC', // Ajustado para corresponder ao texto principal ou um pouco mais claro
    marginBottom: 5,
  },
  teamMember: {
    backgroundColor: '#2D3750', // Um fundo para cada membro da equipe
    borderRadius: 8,
    padding: 15,
    marginBottom: 15, // Espaçamento entre os membros da equipe
    shadowColor: "#000", // Sombras para dar profundidade
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  p: {
    fontSize: 16,
    color: '#FCFFFC',
    lineHeight: 24,
    textAlign: 'justify',
  },
  linkText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(93, 105, 212)', // Cor do link
    textDecorationLine: 'underline', // Sublinhado para links
    marginBottom: 5,
  },
  footer: {
    marginTop: 50,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D3750', // Cor de fundo para o footer
  },
  footerText: {
    color: '#FCFFFC',
    fontSize: 14,
    paddingBottom: 50, // Espaçamento inferior para o texto do footer
  },
});

export default AboutScreen;
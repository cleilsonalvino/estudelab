import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useFocusEffect } from '@react-navigation/native';
import { loadProgress } from '../services/ProguessService';
import { loadAllCourses } from '../services/DataService';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext'; // Importe o useAuth

const initialLayout = { width: Dimensions.get('window').width };

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth(); // Acesse o objeto user do AuthContext
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const updateRoutesWithCounts = () => {
      const disponiveis = courses.filter(course => !progress[course.id]).length;
      const emAndamento = courses.filter(course => {
        const p = progress[course.id];
        return p && !p.dataFim;
      }).length;
      const concluidos = courses.filter(course => {
        const p = progress[course.id];
        return p && p.dataFim;
      }).length;

      setRoutes([
        { key: 'Disponiveis', title: `Disponíveis (${disponiveis})` },
        { key: 'EmAndamento', title: `Em Andamento (${emAndamento})` },
        { key: 'Concluidos', title: `Concluídos (${concluidos})` },
      ]);
    };

    updateRoutesWithCounts();
  }, [courses, progress]);


  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        const allCourses = loadAllCourses();
        const userProgress = await loadProgress();
        setCourses(allCourses);
        setProgress(userProgress);
        setLoading(false);
      };
      fetchData();
    }, [])
  );

  const courseThumbnails = {
    'construcao_de_sites_1': require('../../assets/cursos/construcao_de_sites_1/img/thumbnail.jpg'),
    'engenharia_de_software': require('../../assets/cursos/engenharia_de_software/img/thumbnail.jpg'),
    'programacao_1_js': require('../../assets/cursos/programacao_1_js/img/thumbnail.jpg'),
    'programacao_1_python': require('../../assets/cursos/programacao_1_python/img/thumbnail.jpg'),
    'portugues_para_concursos': require('../../assets/cursos/portugues_para_concursos/img/thumbnail.jpg'),
    'raciocinio_e_matematica': require('../../assets/cursos/raciocinio_e_matematica/img/thumbnail.jpg'),
    'informatica_para_concursos': require('../../assets/cursos/informatica_para_concursos/img/thumbnail.jpg'),
    'producao_textual': require('../../assets/cursos/producao_textual/img/thumbnail.jpg'),
  };

  const renderCourses = (filteredCourses) => (
    <ScrollView contentContainerStyle={styles.coursesContainer}>
      {filteredCourses.map(course => (
        <TouchableOpacity
          key={course.id}
          style={styles.courseCard}
          onPress={() => navigation.navigate('CourseDetail', { courseId: course.id, courseName: course.nome })}
        >
          <Image source={courseThumbnails[course.id]} style={styles.thumbnail} />
          <Text style={styles.courseName}>{course.nome}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const getCoursesByStatus = (status) => {
    return courses.filter(course => {
      const prog = progress[course.id];
      if (status === 'Disponiveis') return !prog;
      if (status === 'EmAndamento') return prog && !prog.dataFim;
      if (status === 'Concluidos') return prog && prog.dataFim;
      return false;
    });
  };

  const renderScene = SceneMap({
    Disponiveis: () => renderCourses(getCoursesByStatus('Disponiveis')),
    EmAndamento: () => renderCourses(getCoursesByStatus('EmAndamento')),
    Concluidos: () => renderCourses(getCoursesByStatus('Concluidos')),
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando cursos...</Text>
      </View>
    );
  }

  // Define o nome de boas-vindas. Se o usuário existir, usa o nome dele; caso contrário, um nome padrão.
  const welcomeName = user && user.name ? user.name : 'Visitante';

  return (
    <View style={styles.container}>
      <NavBar />
      <Text style={styles.title}>Cursos</Text>
      {/* Altere esta linha para usar a variável welcomeName */}
      <Text style={styles.titleName}>Seja bem vindo de volta, {welcomeName}</Text>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={{ backgroundColor: 'transparent' }}
            indicatorStyle={{ backgroundColor: 'white' }}
            labelStyle={{ fontWeight: 'bold' }}
          />
        )}
      />

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
    backgroundColor: '#151E3F',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#fff',
  },
  titleName: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
    margin: 20,
  },
  coursesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 150,
  },
  courseName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    position: 'absolute',
    textShadowColor: 'rgba(0, 255, 4, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
});

export default HomeScreen;
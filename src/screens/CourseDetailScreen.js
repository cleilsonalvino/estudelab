// src/screens/CourseDetailScreen.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";

import { loadProgress, loadUserData } from "../services/ProguessService";
import { loadModulesForCourse } from "../services/DataService";

const CourseDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const { courseId, courseName } = route.params;

  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const courseModules = await loadModulesForCourse(courseId);
    const userProgress = await loadProgress(); // Carrega o progresso de todos os cursos

    setModules(courseModules);
    setProgress(userProgress); // Define o objeto de progresso completo
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []) // Array de dependências vazio para recarregar em cada foco
  );

  // Acessa o progresso específico deste curso
  const currentCourseProgress = progress[courseId] || {};

  const percentual =
    currentCourseProgress.licoesConcluidas && currentCourseProgress.licoesTotal
      ? currentCourseProgress.licoesConcluidas /
        currentCourseProgress.licoesTotal
      : 0;
  const notaMedia =
    currentCourseProgress.notaTotal && currentCourseProgress.licoesConcluidas
      ? currentCourseProgress.notaTotal / currentCourseProgress.licoesConcluidas
      : 0;

  const renderProgressInfo = () => {
    // Verifica se não há data de início OU se as lições concluídas são 0 (ou undefined)
    if (!currentCourseProgress.dataInicio && (currentCourseProgress.licoesConcluidas === undefined || currentCourseProgress.licoesConcluidas === 0)) {
      return (
        <Text style={styles.progressText}>
          Conclua uma lição com êxito para salvar seu progresso!
        </Text>
      );
    }

    let progressInfo = `Progresso: ${(100 * percentual).toFixed(1)}%\n`;
    progressInfo += `Nota Média: ${notaMedia.toFixed(1)}\n`;
    progressInfo += `Lições Concluídas: ${currentCourseProgress.licoesConcluidas || 0} / ${currentCourseProgress.licoesTotal || 0}\n`;


    if (currentCourseProgress.dataFim) {
      progressInfo += `Concluído em: ${new Date(
        currentCourseProgress.dataFim
      ).toLocaleDateString("pt-br")}\n`;
    }
    return <Text style={styles.progressText}>{progressInfo}</Text>;
  };

  const handleLessonPress = (type, moduleIndex, lessonIndex) => {
    const lesson = modules[moduleIndex].licoes[lessonIndex];
    navigation.navigate("Lesson", {
      courseId,
      lesson,
      moduleIndex,
      lessonIndex,
      modules, // Passa os módulos para a tela de lição (útil para navegação proxima/anterior)
      type, // 'video', 'text', 'exercise'
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando detalhes do curso...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.courseTitle}>{courseName}</Text>
      {renderProgressInfo()}
      <Text style={styles.sectionTitle}>Trilha do Curso</Text>

      {modules.map((module, modIndex) => (
        <View key={modIndex} style={styles.moduleContainer}>
          <Text style={styles.moduleTitle}>{module.nome}</Text>
          {module.licoes.map((lesson, lesIndex) => {
            
            const lessonConcluded = currentCourseProgress.lessons?.[lesson.id] !== undefined;

            let anteriorConcluida = true; 
           
            if (modIndex === 0 && lesIndex === 0) {
              anteriorConcluida = true; 
            } else if (lesIndex > 0) {
              
              anteriorConcluida = currentCourseProgress.lessons?.[modules[modIndex].licoes[lesIndex - 1]?.id] !== undefined;
            } else if (modIndex > 0 && lesIndex === 0) {
              
              const lastLessonOfPreviousModule = modules[modIndex - 1]?.licoes?.[modules[modIndex - 1].licoes.length - 1];
              anteriorConcluida = currentCourseProgress.lessons?.[lastLessonOfPreviousModule?.id] !== undefined;
            }

            const videoEnabled = anteriorConcluida && lesson.video;
            const textEnabled = anteriorConcluida;
            const exerciseEnabled = lessonConcluded; 

            return (
              <View key={lesson.id} style={styles.lessonItem}>
                <Text style={styles.lessonName}>{lesson.nome}</Text>
                {/* Indicador de lição concluída */}
                {lessonConcluded && (
                    <Text style={styles.concludedIndicator}>✓ Concluída</Text>
                )}
                <View style={styles.lessonButtons}>
                  <TouchableOpacity
                    style={[
                      styles.lessonButton,
                      !videoEnabled && styles.disabledButton,
                    ]}
                    onPress={() =>
                      videoEnabled &&
                      handleLessonPress("video", modIndex, lesIndex)
                    }
                    disabled={!videoEnabled}
                  >
                    <Text style={styles.lessonButtonText}>Vídeo</Text>
                    <View style={styles.lessonButtonInnerLine}></View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.lessonButton,
                      styles.buttonSecondary,
                      !textEnabled && styles.disabledButton,
                    ]}
                    onPress={() =>
                      textEnabled &&
                      handleLessonPress("html", modIndex, lesIndex)
                    }
                    disabled={!textEnabled}
                  >
                    <Text style={styles.lessonButtonText}>Texto</Text>
                    <View style={styles.lessonButtonInnerLine}></View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.lessonButton,
                      styles.buttonTertiary,
                      !exerciseEnabled && styles.disabledButton,
                    ]}
                    onPress={() =>
                      exerciseEnabled &&
                      handleLessonPress("json", modIndex, lesIndex)
                    }
                    disabled={!exerciseEnabled}
                  >
                    <Text style={styles.lessonButtonText}>Exercício</Text>
                    <View style={styles.lessonButtonInnerLine}></View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#151E3F",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  courseTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  progressText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  moduleContainer: {
    borderRadius: 8,
    marginBottom: 35,
  },
  moduleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#5D69D4",
  },
  lessonItem: {
    marginBottom: 10,
    paddingBottom: 20,
    backgroundColor: "#111832",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    borderRadius: 8,
    position: 'relative', // Para o indicador de concluído
  },
  lessonName: {
    fontSize: 24,
    marginBottom: 5,
    color: "#fff",
  },
  concludedIndicator: { // Novo estilo para o indicador
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#5CAB7D', // Verde
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: 'bold',
  },
  lessonButtons: {
    flexDirection: "column",
    marginTop: 5,
    fontSize: 12,
  },
  lessonButton: {
    backgroundColor: "#FF3856",
    paddingVertical: 8,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 7,
    alignItems: "center",
    marginBottom: 5,
    height: 80,
    justifyContent: "center",
    position: "relative", // Para o efeito de sombra
  },
  buttonSecondary: {
    backgroundColor: "#37718E", // Cor para Texto
    position: "relative",
  },
  buttonTertiary: {
    backgroundColor: "#5CAB7D", // Cor para Exercício
    position: "relative",
  },
  lessonButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    zIndex: 1,
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: "#6c757d", // Cinza para desabilitado
  },
  lessonButtonInnerLine: {
    width: "100%",
    height: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 0,
  },
});

export default CourseDetailScreen;
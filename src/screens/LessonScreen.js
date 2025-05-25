import React, { useState, useEffect, useCallback } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import RenderHtml from "react-native-render-html";
import { saveProgress, updateXP } from "../services/ProguessService";
import { loadLessonContent } from "../services/DataService";

const { width } = Dimensions.get("window");

const tagsStyles = {
  body: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "transparent",
  },
  h1: {
    color: "#FCFFFC",
    fontSize: 28,
    textAlign: "center",
    marginTop: 20,
  },
  h2: {
    color: "#FCFFFC",
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
  },
  h3: {
    color: "white",
    paddingVertical: 20,
    fontSize: 26,
  },
  h4: {
    color: "rgb(93, 105, 212)",
    fontSize: 24,
  },
  p: {
    color: "white",
    textAlign: "justify",
    padding: 10,
    fontSize: 18,
  },
  ul: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    listStyleType: "none",
    color: "white",
  },
  li: {
    padding: 10,
    margin: 20,
    flexBasis: 500,
    backgroundColor: "#fa7921",
    fontSize: 18,
    borderRadius: 10,
    flexGrow: 0,
    flexShrink: 1,
  },
  a: {
    textDecorationLine: "none",
    color: "#FCFFFC",
  },
  pre: {
    backgroundColor: "#282c34",
    color: "#abb2bf",
    padding: 10,
    borderRadius: 5,
  },
  ".titulo_questao": {
    fontSize: 32,
    marginVertical: 50,
    marginHorizontal: 20,
    color: "white",
  },
};

const LessonScreen = ({ navigation }) => {
  const route = useRoute();
  const { courseId, lesson, moduleIndex, lessonIndex, modules, type } =
    route.params;

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResultButtons, setShowResultButtons] = useState(false);
  const [correctAnswersMap, setCorrectAnswersMap] = useState({});
  const [shuffledContent, setShuffledContent] = useState(null);
  // Novo estado para controlar se o botão 'Próxima Lição' deve ser habilitado
  const [canGoToNextLesson, setCanGoToNextLesson] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setShowResultButtons(false); // Reseta os botões ao carregar nova lição
      setCanGoToNextLesson(false); // Reseta a permissão para avançar
      setSelectedAnswers({}); // Limpa respostas anteriores
      let fetchedContent = null;

      if (type === "video") {
        fetchedContent = lesson.video;
      } else if (type === "html") {
        fetchedContent = await loadLessonContent(courseId, lesson.id, "html");
      } else if (type === "json") {
        fetchedContent = await loadLessonContent(courseId, lesson.id, "json");

        if (fetchedContent && Array.isArray(fetchedContent)) {
          const newCorrectAnswersMap = {};
          const newShuffledContent = fetchedContent.map((question) => {
            const correctAnswer = question.alternativas[0];
            const qIndex = fetchedContent.indexOf(question); // Garante um índice único
            newCorrectAnswersMap[qIndex] = correctAnswer;

            const shuffledAlternatives = [...question.alternativas].sort(
              () => Math.random() - 0.5
            );

            return {
              ...question,
              alternativas: shuffledAlternatives,
            };
          });
          setCorrectAnswersMap(newCorrectAnswersMap);
          setShuffledContent(newShuffledContent);
        }
      }
      setContent(fetchedContent);
      setLoading(false);
    };
    fetchContent();
  }, [courseId, lesson.id, type]);

  const getEmbedLink = (url) => {
    if (url && url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&showinfo=0&controls=0`;
    }
    return url;
  };

  const handleAnswerSelect = useCallback((questionIndex, value) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  }, []);

  const verifyAnswers = async () => {
    let correctCount = 0;

    if (shuffledContent && Array.isArray(shuffledContent)) {
      shuffledContent.forEach((question, index) => {
        if (selectedAnswers[index] === correctAnswersMap[index]) {
          correctCount++;
        }
      });
    }

    const totalQuestions = shuffledContent?.length || 1;
    const score = (correctCount / totalQuestions) * 10;
    const canProceed = correctCount >= 2; // Verifica se acertou pelo menos 2
    const xpEarned = canProceed ? 10 : 0; // Ganha 10 XP se acertou 2 ou mais

    let alertMessage = `Você acertou ${correctCount} de ${totalQuestions} perguntas! Sua nota: ${score.toFixed(
      2
    )}.`;
    if (!canProceed && totalQuestions >= 2) {
      alertMessage += "\nVocê precisa acertar pelo menos 2 para avançar.";
    }

    Alert.alert("Resultado do Exercício", alertMessage, [
      {
        text: "OK",
        onPress: () => {
          setShowResultButtons(true);
          setCanGoToNextLesson(canProceed); // Define se pode avançar
        },
      },
    ]);

    // Só salva e atualiza XP se o usuário puder prosseguir (ou se não houver questões/vídeo/html)
    // Ou podemos sempre salvar, dependendo da regra de negócio. Aqui, salvamos sempre.
    const updatedProgress = await saveProgress(
      courseId,
      lesson.id,
      modules,
      score
    );
    const newTotalXp = await updateXP(xpEarned); // Atualiza XP (pode ser 0)
    // setXp(newTotalXp);

    console.log("Progresso salvo:", updatedProgress);
    console.log("XP atualizado:", newTotalXp);
  };

  const goToNextLesson = () => {
    let nextLesson = null;
    let nextModuleIndex = moduleIndex;
    let nextLessonIndex = lessonIndex + 1;

    if (nextLessonIndex < modules[moduleIndex].licoes.length) {
      nextLesson = modules[moduleIndex].licoes[nextLessonIndex];
    } else {
      nextModuleIndex++;
      if (nextModuleIndex < modules.length) {
        nextLessonIndex = 0;
        nextLesson = modules[nextModuleIndex].licoes[nextLessonIndex];
      }
    }

    if (nextLesson) {
      navigation.replace("Lesson", {
        courseId,
        lesson: nextLesson,
        moduleIndex: nextModuleIndex,
        lessonIndex: nextLessonIndex,
        modules,
        type: nextLesson.tipo || "html",
      });
    } else {
      Alert.alert(
        "Fim do Curso",
        "Você completou todas as lições deste curso!"
      );

      navigation.popToTop();
      navigation.navigate("CourseDetail", {
        courseId,
        courseName: lesson.nome, // Idealmente, você teria o nome do curso aqui
      });
    }
  };

  const goToPreviousLesson = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={styles.loadingText}>Carregando lição...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.lessonTitle}>{lesson.nome}</Text>

      {type === "video" && lesson.video && (
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: getEmbedLink(lesson.video) }}
            style={styles.videoPlayer}
            allowsFullscreenVideo
          />
        </View>
      )}

      {type === "html" && content && (
        <RenderHtml
          contentWidth={width - 32}
          source={{ html: content }}
          tagsStyles={tagsStyles}
        />
      )}

      {type === "json" && shuffledContent && Array.isArray(shuffledContent) && (
        <View style={styles.exerciseContainer}>
          {shuffledContent.map((question, qIndex) => (
            <View key={qIndex} style={styles.questionContainer}>
              <Text style={styles.questionText}>
                {String(question.descricao)}
              </Text>
              {question.alternativas.map((alt, aIndex) => (
                <TouchableOpacity
                  key={aIndex}
                  style={[
                    styles.radioButton,
                    selectedAnswers[qIndex] === alt &&
                      styles.radioButtonSelected,
                  ]}
                  onPress={() => handleAnswerSelect(qIndex, alt)}
                >
                  <Icon name="chevron-right" size={30} color="#999796" />
                  <Text style={styles.radioText}>{String(alt)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          {!showResultButtons && (
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={verifyAnswers}
            >
              <Text style={styles.verifyButtonText}>Verificar Respostas</Text>
            </TouchableOpacity>
          )}

          {showResultButtons && (
            <View style={styles.resultButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.nextLessonButton,
                  !canGoToNextLesson && styles.disabledButton, // Aplica estilo desabilitado
                ]}
                onPress={goToNextLesson}
                disabled={!canGoToNextLesson} // Desabilita o botão
              >
                <Text style={styles.nextLessonButtonText}>Próxima Lição</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.backLessonButton}
                onPress={goToPreviousLesson}
              >
                <Text style={styles.backLessonButtonText}>
                  Voltar para Lição
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {(type === "video" || type === "html") && (
        <TouchableOpacity
          style={styles.goToExerciseButton}
          onPress={() =>
            navigation.replace("Lesson", { ...route.params, type: "json" })
          }
        >
          <Text style={styles.goToExerciseButtonText}>Ir para Exercício</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151E3F",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#151E3F",
  },
  loadingText: {
    color: "#FFF",
    marginTop: 10,
  },
  lessonTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  videoContainer: {
    height: 250,
    marginBottom: 20,
    backgroundColor: "#000",
  },
  videoPlayer: {
    flex: 1,
  },
  exerciseContainer: {
    marginTop: 20,
  },
  questionContainer: {
    backgroundColor: "transparent",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FCFFFC",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#435DD8",
    backgroundColor: "#2D3750",
  },
  radioButtonSelected: {
    backgroundColor: "#435DD8",
    borderColor: "#435DD8",
  },
  radioText: {
    fontSize: 16,
    marginLeft: 10,
    flexShrink: 1,
    color: "#FCFFFC",
  },
  verifyButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  nextLessonButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 5,
  },
  nextLessonButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backLessonButton: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginLeft: 5,
  },
  backLessonButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  goToExerciseButton: {
    backgroundColor: "#ffc107",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  goToExerciseButtonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Novo estilo para o botão desabilitado
  disabledButton: {
    backgroundColor: "#6c757d",
    opacity: 0.6,
  },
});

export default LessonScreen;
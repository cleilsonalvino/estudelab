// src/navigation/AppNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import LessonScreen from "../screens/LessonScreen";
import AboutScreen from "../screens/About";
import ProfileScreen from "../screens/ProfileScreen";
import TestScreen from "../screens/DepuracaoScreen";

// **NÃO IMPORTE LoginScreen ou RegisterScreen AQUI, se não forem usadas.**

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={{
          title: "Detalhes do Curso",
          headerStyle: { backgroundColor: "#1F2D61" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Lesson"
        component={LessonScreen}
        options={{
          title: "Lição",
          headerStyle: { backgroundColor: "#1F2D61" },
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: "Sobre Nós",
          headerStyle: { backgroundColor: "#1F2D61" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Meu Perfil',
          headerStyle: { backgroundColor: '#1F2D61' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Test"
        component={TestScreen}
        options={{
          title: "Depuração",
          headerStyle: { backgroundColor: "#1F2D61" },
          headerTintColor: "#fff",
        }}
      />

    </Stack.Navigator>
  );
};

export default AppNavigator;
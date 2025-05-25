// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Importe APENAS o AppNavigator
import AppNavigator from '../src/navigation/AppNavigation';

const App = () => {
  return (
    <NavigationContainer>
      {/* Renderize diretamente o AppNavigator, que contém sua tela Home */}
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
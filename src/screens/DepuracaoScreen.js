// Em Home ou em uma tela de teste
import React from 'react';
import { View, Button, Text } from 'react-native';
import { clearAllLocalData } from '../services/ProguessService'; // Ajuste o caminho se necessário

const TestScreen = () => {
  const handleClearData = async () => {
    await clearAllLocalData();
    alert('Dados locais limpos! Reinicie o app para ver o efeito.');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ferramenta de Depuração</Text>
      <Button title="Limpar Dados de Progresso" onPress={handleClearData} />
    </View>
  );
};

export default TestScreen;
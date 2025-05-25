// src/services/api.js
import axios from 'axios';

// --- CONFIGURAÇÃO DA BASE URL DA API ---
// Use o IP da sua máquina se estiver testando em um celular físico Android/iOS
// Use '10.0.2.2' se estiver usando um emulador Android
// Use 'localhost' ou '127.0.0.1' se estiver usando um simulador iOS

const API_BASE_URL = 'http://192.168.0.3:3001/api'; // Exemplo para emulador Android
// const API_BASE_URL = 'http://192.168.1.5:3000/api'; // Exemplo para celular físico (ajuste seu IP)
// const API_BASE_URL = 'http://localhost:3000/api'; // Exemplo para simulador iOS

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
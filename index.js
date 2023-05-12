const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const carroRoutes = require('./src/routes/carro');

const app = express();

// Configuração do CORS
app.use(cors());

// Configuração do body parser
app.use(express.json());

// Configuração das rotas
app.use(carroRoutes);

// Conexão com o MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));
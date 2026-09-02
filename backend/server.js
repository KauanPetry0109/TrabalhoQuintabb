require('dotenv').config();

const express = require('express');
const cors = require('cors');

const database = require('./config/database');
const perguntas = require('./perguntas');
const auth = require('./auth');

const {
  fazerNivelamento
} = require('./controllers/nivelamentoController');

const {
  listarCandidatos,
  alterarStatus
} = require('./controllers/candidatosController');

const app = express();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL =
  process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: FRONTEND_URL
  })
);

app.use(express.json({ limit: '1mb' }));

// Teste simples da API e do banco.
app.get('/api/health', async (req, res) => {
  try {
    const { error } = await database
      .from('candidates')
      .select('id')
      .limit(1);

    if (error) {
      return res.status(503).json({
        status: 'degraded',
        service: 'Speak Up API',
        database: 'unavailable'
      });
    }

    return res.json({
      status: 'ok',
      service: 'Speak Up API',
      database: 'connected'
    });
  } catch (erro) {
    return res.status(503).json({
      status: 'degraded',
      service: 'Speak Up API',
      database: 'unavailable'
    });
  }
});

// Envia as perguntas sem revelar a resposta correta.
app.get('/api/questions', (req, res) => {
  const perguntasPublicas = perguntas.map(
    ({ resposta, ...pergunta }) => pergunta
  );

  res.json(perguntasPublicas);
});

// Corrige o teste e cadastra o candidato.
app.post('/api/placement', fazerNivelamento);

// Área administrativa.
app.get('/api/candidates', auth, listarCandidatos);

app.patch(
  '/api/candidates/:id/status',
  auth,
  alterarStatus
);

// Rota inexistente.
app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada.'
  });
});

app.listen(PORT, () => {
  console.log(`Speak Up API rodando em http://localhost:${PORT}`);
});
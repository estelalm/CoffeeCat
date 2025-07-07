const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const ARQUIVO_PATH= './usuarios.json';

// Função para ler os dados do arquivo
function lerUsuarios() {
  try {
    const data = fs.readFileSync(ARQUIVO_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Função para salvar os dados no arquivo
function salvarUsuarios(usuarios) {
  fs.writeFileSync(ARQUIVO_PATH, JSON.stringify(usuarios, null, 2));
}

// POST /cadastro
app.post('/cadastro', (req, res) => {
  const { nome, telefone, email, senha } = req.body;

  if (!nome || !telefone || !email || !senha) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  const usuarios = lerUsuarios();
  if (usuarios.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email já cadastrado.' });
  }

  usuarios.push({ nome, telefone, email, senha });
  salvarUsuarios(usuarios);

  res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

// POST /login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const usuarios = lerUsuarios();
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ error: 'Email ou senha incorretos.' });
  }

  res.json({ message: 'Login bem-sucedido!' });
});

// GET /usuarios
app.get('/usuarios', (req, res) => {
  const usuarios = lerUsuarios();
  res.json(usuarios);
});

// Inicializa servidor
app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});

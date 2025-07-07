const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const ARQUIVO_PATH= './usuarios.json';

function lerUsuarios() {
  try {
    const data = fs.readFileSync(ARQUIVO_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function salvarUsuarios(usuarios) {
  fs.writeFileSync(ARQUIVO_PATH, JSON.stringify(usuarios, null, 2));
}

app.post('/1.0/coffeecat/usuario', (req, res) => {
  const { nome, telefone, email, cep, rua, numero, bairro, cidade, estado,senha } = req.body;

  if (!nome || !telefone || !email ||!cep || !rua || !numero || !bairro || !cidade || !estado || !senha) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  const usuarios = lerUsuarios();
  if (usuarios.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email já cadastrado.' });
  }

  usuarios.push({ nome, telefone, email, cep, rua, numero, bairro, cidade, estado, senha });
  salvarUsuarios(usuarios);

  res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

app.post('/1.0/coffeecat/login', (req, res) => { 
  const { email, senha } = req.body;
  const usuarios = lerUsuarios();
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ error: 'Email ou senha incorretos.' });
  }

  res.json({ message: 'Login bem-sucedido!' });
});

app.get('/usuarios', (req, res) => {
  const usuarios = lerUsuarios();
  res.json(usuarios);
});

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});

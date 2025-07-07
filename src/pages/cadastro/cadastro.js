const usuario = {
  nome: " ",
  telefone: " ",
  email: " ",
  cep:" ",
  rua: " ",
  numero: " ",
  bairro: " ",
  cidade: " ", 
  estado: " ",
  senha: " "
};

const response = await fetch('http://localhost:8080/1.0/coffeecat/usuario', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(usuario)
});

const data = await response.json();
console.log(data);


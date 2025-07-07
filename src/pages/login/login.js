fetch('http://localhost:8080/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: '',
    senha: ''
  })
})
.then(res => res.json())
.then(data => alert(data.message))
.catch(err => alert('Erro: ' + err));

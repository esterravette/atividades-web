const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

const alunos = [
  { nome: 'Ana Carolina', curso: 'Ciência da Computação', ira: 8.5 },
  { nome: 'Bruno Gomes', curso: 'Engenharia de Software', ira: 10.0 },
  { nome: 'Carla Dias', curso: 'Sistemas de Informação', ira: 9.1 },
  { nome: 'Daniel Farias', curso: 'Ciência da Computação', ira: 6.9 },
  { nome: 'Eduarda Lima', curso: 'Redes de Computadores', ira: 9.5 }
];

app.get('/alunos', (req, res) => {
  res.json(alunos);
});

app.get('/alunos/media-ira', (req, res) => {
  const media = alunos.reduce((soma, a) => soma + a.ira, 0) / alunos.length;
  res.json({ media });
});

app.delete('/alunos/nome/delete/:nome', (req, res) => {
  const nome = req.params.nome;
  const index = alunos.findIndex(a => a.nome === nome);

  if (index !== -1) {
    const removido = alunos.splice(index, 1);
    res.json({ mensagem: `Aluno '${nome}' removido com sucesso!`, aluno: removido[0] });
  } else {
    res.status(404).json({ erro: `Aluno '${nome}' não encontrado.` });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
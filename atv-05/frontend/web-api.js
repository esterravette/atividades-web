document.addEventListener('DOMContentLoaded', () => {
  const urlBase = 'http://localhost:3000';
  const tabelaCorpo = document.getElementById('tabela-alunos-corpo');
  const spanMedia = document.getElementById('media-ira-valor');

  async function carregarAlunos() {
    try {
      const res = await fetch(`${urlBase}/alunos`);
      const alunos = await res.json();

      tabelaCorpo.innerHTML = '';
      alunos.forEach(aluno => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${aluno.nome}</td>
          <td>${aluno.curso}</td>
          <td>${aluno.ira.toFixed(1)}</td>
          <td><button class="btn-delete" data-nome="${aluno.nome}">Deletar</button></td>
        `;
        tabelaCorpo.appendChild(tr);
      });
    } catch (err) {
      console.error('Erro ao carregar alunos:', err);
      tabelaCorpo.innerHTML = '<tr><td colspan="4">Erro ao carregar dados.</td></tr>';
    }
  }

  async function carregarMedia() {
    try {
      const res = await fetch(`${urlBase}/alunos/media-ira`);
      const data = await res.json();
      spanMedia.textContent = data.media.toFixed(2);
    } catch (err) {
      console.error('Erro ao buscar média:', err);
      spanMedia.textContent = 'Erro!';
    }
  }

  tabelaCorpo.addEventListener('click', async event => {
    if (event.target.classList.contains('btn-delete')) {
      if (!confirm('Deseja mesmo excluir este aluno?')) return;

      const nome = encodeURIComponent(event.target.dataset.nome);

      try {
        await fetch(`${urlBase}/alunos/nome/delete/${nome}`, { method: 'DELETE' });
        await carregarAlunos();
        await carregarMedia();
      } catch (err) {
        alert('Erro ao deletar aluno: ' + err);
      }
    }
  });

  carregarAlunos();
  carregarMedia();
});

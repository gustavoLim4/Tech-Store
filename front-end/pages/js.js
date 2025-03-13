fetch("https://jsonplaceholder.typicode.com/comments")
  .then((resposta) => resposta.json())
  .then(exibirnatela => {
    const postar =  document.getElementById('posts-container');
    postar.innerHTML = '';


    exibirnatela.forEach(exibirnatela => {
        postar.innerHTML += `<h1>${exibirnatela.name}</h1>${exibirnatela.email}<p>${exibirnatela.body}</p>`;
    });
  });



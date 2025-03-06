function handleCredentialResponse(response) {
  console.log("Token recebido:", response.credential);

  try {
    // Decodificar o token JWT

    /* {response} é o objeto de resposta que a API do Google retorna quando o 
     usuário faz login com sucesso usando a conta do Google */

    /* A função {split} é um método JavaScript de strings que divide a string em 
     várias partes, com base no caractere que você especificar. Aqui, usamos o 
     ponto (.) como separador */

    /* {atob()} é uma função nativa do JavaScript que serve para decodificar uma 
     string em base64 para uma string de texto normal. O payload do JWT é codificado
     em base64, então usamos atob() para "traduzir" essa codificação para algo legível. */


    const ResponstaJWT = JSON.parse(atob(response.credential.split(".")[1]));
    console.log("Dados decodificados:", ResponstaJWT);

    // Salvar dados no sessionStorage
    /*O sessionStorage é utilizado para armazenar dados 
    temporários no navegador durante a sessão ativa.*/
    
    sessionStorage.setItem("userName", ResponstaJWT.name);
    sessionStorage.setItem("userEmail", ResponstaJWT.email);
    sessionStorage.setItem("userImg", ResponstaJWT.picture);

    // Esconder o ícone de login
    const loginButton = document.getElementById("user-link");
    if (loginButton) {
      loginButton.style.display = "none"; // Esconde o link de login
    }

    // Exibir a mensagem de boas-vindas com o nome do usuário
    const welcomeMessage = document.getElementById("welcome-message");
    if (welcomeMessage) {
      welcomeMessage.style.display = "block"; // Exibe a mensagem de boas-vindas
      const userName = document.getElementById("user-name");
      userName.textContent = ResponstaJWT.name; // Coloca o nome do usuário na mensagem
    }

    // Redirecionar para a página principal (index.html)
    window.location.href = "../../../front-end/pages/index.html";
  } catch (error) {
    console.error("Erro ao processar token:", error);
  }
}

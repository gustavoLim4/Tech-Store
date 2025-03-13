let currentIndex = 0;
const items = document.querySelectorAll(".carousel-item");
const totalItems = items.length;

function changeBanner() {
  // Remove a classe ativa do banner atual
  items[currentIndex].classList.remove("active");

  // Incrementa o índice
  currentIndex = (currentIndex + 1) % totalItems;

  // Adiciona a classe ativa ao próximo banner
  items[currentIndex].classList.add("active");

  // Muda a posição do container para mostrar o banner ativo
  document.querySelector(
    ".carousel-container"
  ).style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Inicia a mudança automática de banners a cada 3 segundos
setInterval(changeBanner, 3000);



window.onload = function () {
  const userName = sessionStorage.getItem("userName");

  if (userName) {
    // Esconde o ícone de login na página index.html
    const loginButton = document.getElementById("user");
    if (loginButton) {
      loginButton.style.display = "none"; // Esconde o link de login
    }
    // Exibe a mensagem de boas-vindas
    const SetMessage = document.getElementById("message");
    if (SetMessage) {
      SetMessage.style.display = "block";
      SetMessage.style.color = "white";
      SetMessage.style.margin = "0px 0px 0px 15px";
      const userNameSpan = document.getElementById("name-user");
      userNameSpan.textContent = userName; // Coloca o nome do usuário
    }
  } 
};




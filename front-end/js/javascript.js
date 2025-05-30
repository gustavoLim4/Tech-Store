let currentIndex = 0;
const items = document.querySelectorAll(".carousel-item");
const totalItems = items.length;

function changeBanner() {
  // Remove a classe ativa do banner atual
  items[currentIndex].classList.remove("active");

  // Incrementa o índice
  currentIndex = (currentIndex + 1) % totalItems;

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

function DadosFormContato() {
  const nomeContato = document.querySelector("#NomeFormContato").value;
  const emailContato = document.querySelector("#EmailFormContato").value;
  const messageContato = document.querySelector("#MessageFormContato").value;
  const messagem = document.querySelector("#messagem");
  const formContato = document.querySelector("#formContato");

  if (nomeContato && emailContato && messageContato) {
    messagem.innerText = "✅ Mensagem enviada!";
    messagem.style.display = "block";

    setTimeout(() => {
      messagem.style.opacity = "1";
    }, 10);

    setTimeout(() => {
      messagem.style.opacity = "0";
      setTimeout(() => {
        messagem.style.display = "none";
      }, 500);
    }, 2000);

    formContato.reset();
  } else {
    messagem.innerText = "❌ Preencha todos os campos!";
    messagem.style.display = "block";

    setTimeout(() => {
      messagem.style.opacity = "1";
    }, 10);
  }
  console.log(nomeContato, emailContato, messageContato);
}

document.querySelectorAll(".carrossel-container").forEach((container) => {
  const carrossel = container.querySelector(".carrossel");
  const btnPrev = container.querySelector(".prev");
  const btnNext = container.querySelector(".next");

  btnNext?.addEventListener("click", () => {
    carrossel.scrollBy({ left: 300, behavior: "smooth" });
  });

  btnPrev?.addEventListener("click", () => {
    carrossel.scrollBy({ left: -300, behavior: "smooth" });
  });
});


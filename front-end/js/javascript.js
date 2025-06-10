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

    // Redirecionar para a página principal (index.html)
    window.location.href = "../../../front-end/pages/index.html";
  } catch (error) {
    console.error("Erro ao processar token:", error);
  }
}



// --- Carrossel Banner (Topo) ---
let currentIndex = 0;
// items e totalItems para o banner do topo serão inicializados no window.onload

function changeBanner() {
  // É frequentemente mais seguro selecionar novamente os itens se o DOM puder mudar,
  // ou garantir que eles estejam corretamente no escopo do window.onload.
  // Para este banner, assume-se que os itens são fixos após o carregamento.
  const items = document.querySelectorAll(".carousel-item");
  const totalItems = items.length;

  if (totalItems === 0) {
    return; // Nenhum item para rotacionar
  }

  // Remove a classe ativa do banner atual
  if (items[currentIndex]) {
    // Verifica se o item existe
    items[currentIndex].classList.remove("active");
  }

  // Incrementa o índice
  currentIndex = (currentIndex + 1) % totalItems;

  // Adiciona a classe ativa ao novo banner atual (se o seu CSS depender disso para visibilidade)
  // Se a visibilidade for controlada exclusivamente pelo transform, esta linha pode não ser necessária.
  // items[currentIndex].classList.add("active");

  // Muda a posição do container para mostrar o banner ativo
  const carouselContainer = document.querySelector(".carousel-container");
  if (carouselContainer) {
    carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
}

// --- Lógica do Formulário de Contato ---
function DadosFormContato() {
  const nomeContato = document.querySelector("#NomeFormContato").value;
  const emailContato = document.querySelector("#EmailFormContato").value;
  const messageContato = document.querySelector("#MessageFormContato").value;
  const messagemElement = document.querySelector("#messagem"); // Renomeado para clareza
  const formContato = document.querySelector("#formContato");

  if (!messagemElement || !formContato) {
    console.error(
      "Elemento de feedback do formulário de contato ou formulário não encontrado!"
    );
    return;
  }

  if (nomeContato && emailContato && messageContato) {
    messagemElement.innerText = "✅ Mensagem enviada!";
    messagemElement.style.display = "block";
    messagemElement.style.opacity = "0"; // Começa transparente para o fade-in

    setTimeout(() => {
      messagemElement.style.opacity = "1";
    }, 10); // Pequeno atraso para garantir que display:block seja aplicado antes da transição de opacidade

    setTimeout(() => {
      messagemElement.style.opacity = "0";
      setTimeout(() => {
        messagemElement.style.display = "none";
      }, 500); // Corresponde a uma transição de fade-out de 0.5s
    }, 2000); // Mensagem visível por 2 segundos

    formContato.reset();
  } else {
    messagemElement.innerText = "❌ Preencha todos os campos!";
    messagemElement.style.display = "block";
    messagemElement.style.opacity = "0"; // Começa transparente para o fade-in

    setTimeout(() => {
      messagemElement.style.opacity = "1";
    }, 10);
    // Opcionalmente, adicione um timeout para ocultar a mensagem de erro também
    // setTimeout(() => {
    //   messagemElement.style.opacity = "0";
    //   setTimeout(() => {
    //       messagemElement.style.display = "none";
    //   }, 500);
    // }, 3000); // Mensagem de erro visível por 3 segundos
  }
  // console.log(nomeContato, emailContato, messageContato); // Bom para depuração
}

// --- Código para rodar após o DOM estar completamente carregado ---
window.onload = function () {
  // --- Lógica da Mensagem de Boas-vindas ---
  const userName = sessionStorage.getItem("userName");
  if (userName) {
    const loginButton = document.getElementById("open-modal-btn");
    if (loginButton) {
      loginButton.style.display = "none";
    }

    const welcomeMessageContainer = document.getElementById("message"); // Renomeado para clareza
    if (welcomeMessageContainer) {
      welcomeMessageContainer.style.display = "block";
      welcomeMessageContainer.style.color = "white";
      welcomeMessageContainer.style.margin = "0px 0px 0px 15px";
      const userNameSpan = document.getElementById("name-user");
      if (userNameSpan) {
        userNameSpan.textContent = userName;
      }
    }
  }

  // --- Inicializar Carrossel do Banner do Topo ---
  const bannerItems = document.querySelectorAll(".carousel-item");
  if (bannerItems.length > 0) {
    // Se o seu CSS usa uma classe 'active' no primeiro item para visibilidade inicial:
    if (bannerItems[0] && currentIndex === 0) {
      // bannerItems[0].classList.add("active"); // Garante que o primeiro item esteja ativo, se necessário
    }
    // Inicia a mudança automática de banners se existirem itens
    setInterval(changeBanner, 3000);
  }

  // --- Carrosséis de Rolagem Horizontal Genéricos ---
  document.querySelectorAll(".carrossel-container").forEach((container) => {
    const carrossel = container.querySelector(".carrossel");
    const btnPrev = container.querySelector(".prev");
    const btnNext = container.querySelector(".next");

    if (carrossel) {
      // Adiciona listeners apenas se o elemento principal do carrossel existir
      btnNext?.addEventListener("click", () => {
        carrossel.scrollBy({ left: 300, behavior: "smooth" });
      });

      btnPrev?.addEventListener("click", () => {
        carrossel.scrollBy({ left: -300, behavior: "smooth" });
      });
    }
  });

  // --- Lógica do Modal do Carrinho ---
  const openCartModalBtn = document.getElementById("openCartModal");
  const cartModal = document.getElementById("cartModal");
  const closeCartModalBtn = document.getElementById("closeCartModal");
  const exploreShopButton = document.getElementById("exploreShopButton");

  function openModal() {
    if (cartModal) {
      cartModal.classList.add("active");
      document.body.style.overflow = "hidden"; // Desabilita a rolagem da página
    }
  }

  function closeModal() {
    if (cartModal) {
      cartModal.classList.remove("active");
      document.body.style.overflow = ""; // Habilita a rolagem da página
    }
  }

  if (openCartModalBtn) {
    openCartModalBtn.addEventListener("click", openModal);
  }

  if (closeCartModalBtn) {
    closeCartModalBtn.addEventListener("click", closeModal);
  }

  // Fecha o modal clicando no overlay
  if (cartModal) {
    cartModal.addEventListener("click", (event) => {
      if (event.target === cartModal) {
        // Verifica se o clique foi diretamente no overlay
        closeModal();
      }
    });
  }

  // Redireciona e fecha o modal ao clicar em "Explorar loja"
  if (exploreShopButton) {
    exploreShopButton.addEventListener("click", (event) => {
      event.preventDefault(); // Impede o comportamento padrão do link
      closeModal();
      // Pequeno atraso para a transição de fechamento do modal antes de redirecionar
      setTimeout(() => {
        window.location.href = "produtos.html"; // Redireciona para a página de produtos
      }, 300); // Ajuste este tempo para corresponder ao tempo da sua transição CSS para o modal
    });
  }
}; // Fim do window.onload

const btnSignin = document.querySelector("#signin");
const btnSignup = document.querySelector("#signup");
const body = document.querySelector("body");
const modal = document.querySelector("#loginModal");
const openBtn = document.querySelector("#open-modal-btn");
const closeBtn = document.querySelector("#closeModal");

btnSignin.addEventListener("click", () => {
  body.className = "sign-in-js";
});

btnSignup.addEventListener("click", () => {
  body.className = "sign-up-js";
});

openBtn.addEventListener("click", () => {
  modal.classList.add("active");
  body.classList.add("sign-up-js"); // inicia com cadastro visível
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  body.classList.remove("sign-up-js", "sign-in-js");
});


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

document.addEventListener('DOMContentLoaded', () => {
    // === Lógica do Carrossel Principal ===
    let currentIndex = 0;
    const items = document.querySelectorAll(".carousel-item");
    const totalItems = items.length;

    function changeBanner() {
        if (items.length === 0) return; // Evita erro se não houver itens

        // Remove a classe ativa do banner atual
        items[currentIndex].classList.remove("active");

        // Incrementa o índice
        currentIndex = (currentIndex + 1) % totalItems;

        // Adiciona a classe ativa ao próximo banner
        items[currentIndex].classList.add("active");

        // Muda a posição do container para mostrar o banner ativo
        document.querySelector(".carousel-container").style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Inicia a mudança automática de banners a cada 3 segundos
    // Garante que o carrossel comece com o primeiro item visível
    if (items.length > 0) {
        items[0].classList.add("active");
        setInterval(changeBanner, 3000);
    }

    // === Lógica de Boas-Vindas do Usuário (mantida da sua versão) ===
    const nameUserSpan = document.getElementById("name-user");
    const messageDiv = document.getElementById("message");
    const userIcon = document.getElementById("user-icon");
    const loginButton = document.getElementById("user"); // Link para a página de login

    const userName = sessionStorage.getItem("userName");

    if (userName) {
        if (loginButton) {
            loginButton.style.display = "none"; // Esconde o link/ícone de login
        }
        if (messageDiv) {
            messageDiv.style.display = "block";
            messageDiv.style.color = "white";
            messageDiv.style.margin = "0px 0px 0px 15px";
            if (nameUserSpan) {
                nameUserSpan.textContent = userName; // Coloca o nome do usuário
            }
        }
    } else {
        if (messageDiv) {
            messageDiv.style.display = "none";
        }
        if (userIcon) {
            userIcon.style.display = "block"; // Garante que o ícone do usuário esteja visível
        }
    }

    // === Lógica do Carrossel de Promoções ===
    const carrossel = document.querySelector(".carrossel");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    function atualizarBotoes() {
        if (!carrossel || !prevBtn || !nextBtn) return; // Garante que os elementos existam

        // Se o scroll está no início, esconde o botão "Anterior"
        if (carrossel.scrollLeft <= 0) {
            prevBtn.style.display = "none";
        } else {
            prevBtn.style.display = "block";
        }

        // Se o scroll chegou no final, esconde o botão "Próximo"
        // Uma pequena margem de erro é boa para garantir que o botão "próximo" desapareça corretamente
        if (carrossel.scrollLeft + carrossel.clientWidth >= carrossel.scrollWidth - 5) {
            nextBtn.style.display = "none";
        } else {
            nextBtn.style.display = "block";
        }
    }

    // Atualiza os botões ao clicar
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            carrossel.scrollBy({ left: -310, behavior: "smooth" });
            setTimeout(atualizarBotoes, 300); // Pequeno delay para atualizar após a rolagem
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            carrossel.scrollBy({ left: 310, behavior: "smooth" });
            setTimeout(atualizarBotoes, 300); // Pequeno delay para atualizar após a rolagem
        });
    }

    // Verifica sempre que houver rolagem no carrossel
    if (carrossel) {
        carrossel.addEventListener("scroll", atualizarBotoes);
    }

    // Atualiza a visibilidade dos botões ao carregar a página
    atualizarBotoes();

    // === Lógica do Modal do Carrinho ===
    const openCartModalBtn = document.getElementById('openCartModal'); // Botão do carrinho na navbar
    const cartModal = document.getElementById('cartModal'); // O overlay do modal
    const closeCartModalBtn = document.getElementById('closeCartModal'); // O 'X' dentro do modal
    const exploreShopButton = document.getElementById('exploreShopButton'); // O botão "Explorar loja" dentro do modal

    // Função para abrir o modal
    function openModal() {
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Desabilita o scroll da página
    }

    // Função para fechar o modal
    function closeModal() {
        cartModal.classList.remove('active');
        document.body.style.overflow = ''; // Habilita o scroll da página
    }

    // Event Listeners para abrir e fechar o modal
    if (openCartModalBtn) {
        openCartModalBtn.addEventListener('click', openModal);
    }

    if (closeCartModalBtn) {
        closeCartModalBtn.addEventListener('click', closeModal);
    }

    // Fechar o modal clicando fora da caixa do carrinho (no overlay)
    if (cartModal) {
        cartModal.addEventListener('click', (event) => {
            if (event.target === cartModal) { // Verifica se o clique foi diretamente no overlay
                closeModal();
            }
        });
    }

    // Redirecionar e fechar o modal ao clicar em "Explorar loja"
    if (exploreShopButton) {
        exploreShopButton.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link para que o modal feche antes do redirecionamento
            closeModal();
            // Pequeno atraso para a transição do modal ocorrer antes do redirecionamento
            setTimeout(() => {
                window.location.href = 'produtos.html'; // Redireciona para a página de produtos
            }, 300); // Tempo da transição CSS do modal
        });
    }
});
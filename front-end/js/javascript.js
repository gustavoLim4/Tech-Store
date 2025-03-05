let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function changeBanner() {
  // Remove a classe ativa do banner atual
  items[currentIndex].classList.remove('active');

  // Incrementa o índice
  currentIndex = (currentIndex + 1) % totalItems;

  // Adiciona a classe ativa ao próximo banner
  items[currentIndex].classList.add('active');

  // Muda a posição do container para mostrar o banner ativo
  document.querySelector('.carousel-container').style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Inicia a mudança automática de banners a cada 3 segundos
setInterval(changeBanner, 3000);
function handleCredentialResponse(response) {
  // Decodificar o JWT para obter informações do usuário
  const userObject = jwt_decode(response.credential);
  console.log("Usuário logado:", userObject);

  // Exibir um alerta com o nome do usuário (apenas para teste)
  alert(`Bem-vindo, ${userObject.name}!`);

  // Você pode armazenar os dados do usuário no LocalStorage ou enviar para o backend
  localStorage.setItem("user", JSON.stringify(userObject));
}

// Inicializa o Google Login quando a página carrega
window.onload = function () {
  google.accounts.id.initialize({
    client_id: "YOUR_GOOGLE_CLIENT_ID",
    callback: handleCredentialResponse,
    ux_mode: "popup", // Garante que a telinha do Google abre sem redirecionar
  });
  google.accounts.id.renderButton(document.querySelector(".g_id_signin"), {
    theme: "outline",
    size: "large",
  });
};

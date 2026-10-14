// Função principal que inicia o jogo, recebe o tempo máximo de duração como parâmetro
function main(maxtime) {
  // Definição do namespace SVG e seleção do elemento do canvas no HTML
  const svgNS = "http://www.w3.org/2000/svg";
  const container = document.getElementById("canvas");

  // Inicialização dos áudios do jogo
  const audioBackground = new Audio("./media/playing.mp3"); // Música de fundo
  const audioCapture = new Audio("./media/coin.mp3"); // Som de captura de Pacman
  const audioGameOver = new Audio("./media/gameover.mp3"); // Som de fim de jogo

  // Definição das variáveis principais do jogo
  let arena_size = 800; // Tamanho da arena de jogo
  const pacmanCount = 3; // Quantidade inicial de Pacmen
  let score = 0; // Pontuação inicial
  let timeLeft = 2000; // Tempo restante do jogo
  let max_vel = 70; // Velocidade máxima dos Pacmen
  let safedistance = 10; // Distância segura entre o fantasma e os Pacmen

  // Configuração do tamanho da arena no canvas
  container.setAttribute("width", arena_size);
  container.setAttribute("height", arena_size);

  // Iniciar a música de fundo
  audioBackground.loop = true;
  audioBackground.addEventListener("canplaythrough", () => {
    audioBackground
      .play()
      .catch((err) => console.error("Erro ao reproduzir música de fundo", err));
  });

  // temporizador que será exibido na tela
  const timerElement = document.createElement("div");
  timerElement.id = "timer";
  timerElement.style.position = "absolute";
  timerElement.style.top = "10px";
  timerElement.style.left = "10px";
  timerElement.style.color = "black";
  timerElement.style.fontSize = "24px";
  document.body.appendChild(timerElement);

  // atualizar o temporizador na tela
  function updateTimer() {
    timerElement.textContent = `Tempo: ${timeLeft}s`;
  }

  // criar um Pacman na posição especificada
  function createPacman(x, y) {
    const pacman = document.createElementNS(svgNS, "image");
    pacman.setAttribute("href", "./media/zombie.svg");
    pacman.setAttribute("x", x);
    pacman.setAttribute("y", y);
    pacman.setAttribute("width", 60);
    pacman.setAttribute("height", 60);
    container.appendChild(pacman);
    return pacman;
  }

  // Pacmen com posições e direções aleatórias
  const pacmen = [];
  for (let i = 0; i < pacmanCount; i++) {
    const x = Math.random() * (arena_size - 60);
    const y = Math.random() * (arena_size - 60);
    pacmen.push({
      element: createPacman(x, y),
      x,
      y,
      directionX: Math.random() * 2 - 1, // Direção aleatória no eixo X
      directionY: Math.random() * 2 - 1, // Direção aleatória no eixo Y
      speed: 1 + Math.random(), // Velocidade aleatória
    });
  }

  // Criação do fantasma
  const fantasma = document.createElementNS(svgNS, "image");
  fantasma.setAttribute("href", "./media/fantasma.svg"); //
  fantasma.setAttribute("x", arena_size / 2);
  fantasma.setAttribute("y", arena_size / 2);
  fantasma.setAttribute("width", 80);
  fantasma.setAttribute("height", 80);
  container.appendChild(fantasma);

  // Variáveis da posição atual do fantasma
  let fantasmaX = arena_size / 2;
  let fantasmaY = arena_size / 2;

  // Evento para controlar o movimento do fantasma
  window.addEventListener("keydown", (event) => {
    const vel = 0.2 * max_vel; // Velocidade de movimento do fantasma
    switch (event.key) {
      case "w":
        fantasmaY = Math.max(0, fantasmaY - vel); // Move para cima
        break;
      case "a":
        fantasmaX = Math.max(0, fantasmaX - vel); // Move para a esquerda
        break;
      case "s":
        fantasmaY = Math.min(arena_size - 80, fantasmaY + vel); // Move para baixo
        break;
      case "d":
        fantasmaX = Math.min(arena_size - 80, fantasmaX + vel); // Move para a direita
        break;
    }
    // Atualiza a posição do fantasma na tela
    fantasma.setAttribute("x", fantasmaX);
    fantasma.setAttribute("y", fantasmaY);
  });

  // Função que move os Pacmen pela arena
  function movePacmen() {
    pacmen.forEach((pacman, index) => {
      // Calcula a distância entre o fantasma e o Pacman
      const dist = Math.hypot(fantasmaX - pacman.x, fantasmaY - pacman.y);

      // Define o multiplicador de velocidade
      let speedMultiplier = 1;
      if (dist < safedistance * 10) {
        speedMultiplier = 2; // Aumenta a velocidade se o fantasma estiver próximo
        if (speedMultiplier * pacman.speed > 0.5 * max_vel) {
          speedMultiplier = (0.5 * max_vel) / pacman.speed; // Limita a velocidade máxima
        }
      }

      // Atualiza a posição do Pacman
      pacman.x += pacman.directionX * pacman.speed * speedMultiplier;
      pacman.y += pacman.directionY * pacman.speed * speedMultiplier;

      // Inverte a direção se o Pacman atingir os limites da arena
      if (pacman.x <= 0 || pacman.x >= arena_size - 60) pacman.directionX *= -1;
      if (pacman.y <= 0 || pacman.y >= arena_size - 60) pacman.directionY *= -1;

      // Atualiza a posição do elemento Pacman no canvas
      pacman.element.setAttribute("x", pacman.x);
      pacman.element.setAttribute("y", pacman.y);

      // Verifica se o Pacman foi capturado pelo fantasma
      if (dist < safedistance) {
        container.removeChild(pacman.element);
        pacmen.splice(index, 1);
        score++; // Incrementa a pontuação
        audioCapture.currentTime = 0;
        audioCapture
          .play()
          .catch((err) =>
            console.error("Erro ao reproduzir som de captura", err)
          );

        // Termina o jogo se todos os Pacmen forem capturados
        if (pacmen.length === 0) {
          clearInterval(gameInterval);
          audioBackground.pause();
          audioGameOver
            .play()
            .catch((err) =>
              console.error("Erro ao reproduzir som de fim de jogo", err)
            );
          alert(
            `Jogo terminado! Todos os Pacmen foram capturados. Pontuação final: ${score}`
          );
        }
      }
    });
  }

  // controlar o loop principal do jogo
  function gameLoop() {
    if (timeLeft > 0) {
      timeLeft--; // Diminui o tempo restante
      updateTimer(); // Atualiza o temporizador na tela
      movePacmen(); // Move os Pacmen
    } else {
      clearInterval(gameInterval);
      audioBackground.pause();
      audioGameOver
        .play()
        .catch((err) =>
          console.error("Erro ao reproduzir som de fim de jogo", err)
        );
      alert(`Jogo terminado! Pontuação final: ${score}`);
    }
  }

  // Inicia o loop do jogo
  const gameInterval = setInterval(gameLoop, 1000 / 60);
}

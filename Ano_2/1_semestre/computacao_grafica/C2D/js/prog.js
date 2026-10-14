function main() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // imagem do avião
  const planeImage = new Image();
  planeImage.src =
    "https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/2708.svg";

  // imagem do objecto companheiro
  const CompImage = new Image();
  CompImage.src = "./media/Missile.svg";

  // Som da explosão
  const explosionSound = new Audio("./media/explosion.mp3");

  // Variáveis de animação
  let t = 0; // Parâmetro para o caminho
  const speed = 0.005; // Velocidade de animação
  let explosion = false; // Indica se deve mostrar a explosão

  let prevPlane = { x: 0, y: 0 }; // Coordenadas anteriores do avião
  let companionOffset = { x: 0, y: 0 }; // Coordenadas do companheiro

  const distance = -50; // Distância fixa entre avião e objeto companheiro

  // Função para calcular o caminho do avião
  function getPlanePath(t) {
    const x = 400 + 300 * Math.sin(t * Math.PI * 2); // Movimento em X
    const y = 200 + 170 * Math.cos(t * Math.PI * 2); // Movimento em Y
    return { x, y };
  }

  function getCompanionPath(plane, prevCompanion) {
    const dx = prevCompanion.x - plane.x;
    const dy = prevCompanion.y - plane.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    // Ajustar para manter uma distância constante
    const targetX = plane.x - (dx / length) * distance;
    const targetY = plane.y - (dy / length) * distance;

    // Suavização no movimento
    const smoothFactor = 0.1; // Quanto maior, mais lento o ajuste
    return {
      x: prevCompanion.x + (targetX - prevCompanion.x) * smoothFactor,
      y: prevCompanion.y + (targetY - prevCompanion.y) * smoothFactor,
    };
  }

  // desenhar a explosão
  function drawExplosion(x, y) {
    ctx.save();
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.restore();
  }

  // Função de animação
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    if (!explosion) {
      // Obtém as posições do avião e do companheiro
      const plane = getPlanePath(t);
      // Atualizar a posição do companheiro
      companionOffset = getCompanionPath(plane, companionOffset);

      // Calcular o ângulo de rotação baseado na direção do movimento
      const dx = plane.x - prevPlane.x;
      const dy = plane.y - prevPlane.y;
      const angle = Math.atan2(dy, dx); // Ângulo em radianos

      // Atualizar as coordenadas anteriores do avião
      prevPlane = plane;

      // Desenha o avião
      ctx.save();
      ctx.translate(plane.x, plane.y);
      ctx.rotate(angle); // Rotacionar para alinhar à direção do movimento
      ctx.drawImage(planeImage, -75, -45, 100, 100); // Ajustar posição para alinhar a imagem
      ctx.restore();

      // Desenha o objeto companheiro
      ctx.save();
      ctx.translate(companionOffset.x, companionOffset.y);
      ctx.rotate(angle + 1.5); // Rotacionar para alinhar à direção do movimento
      ctx.drawImage(CompImage, -15, -15, 30, 30);
      ctx.restore();

      // Atualiza o parâmetro do caminho
      t += speed;
      if (t > 1) t = 0; // Reinicia o ciclo
    } else {
      // Exibe a explosão
      const plane = getPlanePath(t);
      drawExplosion(plane.x, plane.y);
      // Toca o som da explosão
      explosionSound.play();
    }

    requestAnimationFrame(animate); // Continua a animação
  }
  // Evento de clique no canvas
  canvas.addEventListener("click", () => {
    explosion = true;
    setTimeout(() => {
      explosion = false; // Reinicia após a explosão
      t = 0; // Reinicia o ciclo de animação
    }, 2000); // Duração da explosão
  });

  // Inicia a animação após carregar as imagens
  planeImage.onload = () => {
    CompImage.onload = () => {
      animate();
    };
  };
}
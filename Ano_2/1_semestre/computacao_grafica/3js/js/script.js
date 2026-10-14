// Importações necessárias do Three.js
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"; // Loader para fontes JSON
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"; // Geometria para textos 3D

// Criação da cena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1d1d1d); // Cor de fundo da cena (cinza escuro)

// Configuração da câmera (perspectiva)
const camera = new THREE.PerspectiveCamera(
  75, // Campo de visão
  window.innerWidth / window.innerHeight, // Proporção da tela
  0.1, // Distância mínima de renderização
  100 // Distância máxima de renderização
);
camera.position.set(0, 2, 10); // Posiciona a câmera para visualizar a cena adequadamente

// Configuração do renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true}); // Suaviza as arestas
renderer.setSize(window.innerWidth, window.innerHeight); // Ajusta o tamanho inicial do canvas
document.body.appendChild(renderer.domElement); // Adiciona o canvas ao DOM

// Luz ambiente para iluminar a cena
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Cor branca, intensidade média
scene.add(ambientLight);

// Luz direcional para criar sombras e destaque no objeto
const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Cor branca, intensidade alta
directionalLight.position.set(10, 10, 10); // Posiciona a luz para iluminar de cima e da direita
scene.add(directionalLight);

// Palavra a ser renderizada
const word = "emborram";

// espaçamento entre as letras
const letterSpacing = 0.5;

// Array para armazenar as letras como objetos Mesh
const letters = [];

// Carregar fontes JSON
const loader = new FontLoader();
loader.load(
  // Caminho para a fonte
  "node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json",
  (font) => {
    // aparência
    const material = new THREE.MeshStandardMaterial({
      color: 0x0077ff, // Cor azul
      metalness: 0.5, // Aparência metálica
      roughness: 0.5, // Rugosidade
    });

    // Criação de cada letra individual
    [...word].forEach((char, index) => {
      // Geometria 3D da letra
      const geometry = new TextGeometry(char, {
        font: font, // Fonte carregada
        size: 0.4, // Tamanho da letra
        height: 0.1, // Profundidade 3D da letra
        curveSegments: 12, // Qualidade das curvas
        bevelEnabled: true, // Habilitar bordas
        bevelThickness: 0.03, // Espessura 
        bevelSize: 0.01, // Tamanho 
        bevelSegments: 5, // Qualidade
      });

      // Centraliza a geometria para alinhamento
      geometry.center();

      // Cria o objeto Mesh
      const mesh = new THREE.Mesh(geometry, material);

      // Posiciona a letra com base no índice
      mesh.position.x = index * letterSpacing - (word.length * letterSpacing) / 2; // Centraliza horizontalmente
      mesh.position.y = -5; // Inicia fora da vista, no eixo Y
      mesh.scale.set(0.1, 0.1, 0.1); // Escala inicial pequena

      // Adiciona a letra à cena e ao array
      scene.add(mesh);
      letters.push(mesh);
    });

    // Inicia a animação
    animate();
  });

// Ajusta a posição inicial da câmera para enquadrar melhor a cena
camera.position.set(0, 0, 4);

// Relógio para calcular o tempo entre frames
const clock = new THREE.Clock();

// Variável para acompanhar o progresso da animação
let animationProgress = 0;

// Função principal de animação
function animate() {
  requestAnimationFrame(animate); // Solicita o próximo frame da animação

  const delta = clock.getDelta(); // Tempo decorrido desde o último frame

  // Controle de progresso da animação inicial
  if (animationProgress < 1) {
    animationProgress += delta * 0.2; // Velocidade de construção das letras

    letters.forEach((letter, index) => {
      const delay = index * 0.1; // Atraso por índice da letra
      const progress = Math.max(0,Math.min((animationProgress - delay) / 0.2, 1)); // Progresso individual (0 a 1)

      // subida e escala
      letter.position.y = THREE.MathUtils.lerp(-5, 0, progress); // Sobe ao longo do eixo Y
      letter.scale.setScalar(THREE.MathUtils.lerp(0.1, 1, progress)); // Aumenta o tamanho 
    });
  }

  // Rotação contínua das letras
  letters.forEach((letter) => {
    letter.rotation.y += delta * 4; // Gira continuamente no eixo Y
  });

  // Renderiza a cena a cada frame
  renderer.render(scene, camera);
}

// redimensionar a janela
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight; // Atualiza a proporção
  camera.updateProjectionMatrix(); // Recalcula a matriz de projeção
  renderer.setSize(window.innerWidth, window.innerHeight); // Redimensiona o canvas
});
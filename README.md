Projetos acadêmicos desenvolvidos ao longo da minha licenciatura em Engenharia Informática na universidade de Évora

Este repositório apresenta meus trabalhos acadêmicos, habilidades técnicas e experiência prática adquiridos ao longo de três anos de estudo.

<h2>Projetos em destaque</h2>

<table>
  <thead>
    <tr>
      <th align="left">Projeto</th>
      <th align="left">Descrição</th>
      <th align="left">Tecnologias</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Nome do projecto 1</td>
      <td>Descrição</td>
      <td>Python, SQL</td>
    </tr>
    <tr>
      <td>Nome do projecto 1</td>
      <td>Descrição</td>
      <td>Java, OOP</td>
    </tr>
    <tr>
      <td>Nome do projecto 3</td>
      <td>Descrição</td>
      <td>C, Algoritmos</td>
    </tr>
  </tbody>
</table>


<h2>Projectos Acadêmicos</h2>
<details>
  <summary><strong>1.º Ano — 2023/2024</strong></summary>

  ### Programação

  <details>
  <summary>Projeto 1 — Jogo Ouri (Mancala)</summary>

  - Objetivo: Implementar em terminal o jogo tradicional de tabuleiro Ouri, com suporte para dois jogadores locais ou contra o computador, incluindo mecânicas de semeadura, captura de peças e gravação do estado da partida em ficheiro.
  - Tecnologias: C, Git.
  - Conceitos-chave: Estruturas de dados (structs, matrizes), manipulação de ficheiros (I/O), lógica de jogos por turnos, recursividade/funções modulares e geração de jogadas pseudoaleatórias.
  - Repositório: [Ver código-fonte](./Ano_1/semestre_1/progamacao1/ouri.c)

  </details>
  


  ### Sistemas digitais

  <details>
  <summary>Projeto 2 — Circuito de Controlo de Semáforos</summary>

  - Objetivo: Desenvolver um sistema digital autónomo e modular de controlo de semáforos para peões e veículos, integrando um contador decrescente em display de 7 segmentos para indicar aos peões o tempo restante de travessia antes da mudança de sinal.
  - Tecnologias: Logisim, Git.
  - Conceitos-chave: Máquinas de Estados Algorítmicas (ASM), Flip-Flops JK[cite: 6], Mapas de Karnaugh, circuitos combinatórios e sequenciais, decodificação para displays de 7 segmentos e lógica booleana.
  - Repositório: [Ver código-fonte](./Ano_1/semestre_1/SD/semaforos.circ)
  </details>  

</details>


<details>
  <summary><strong>2.º Ano — 2024/2025</strong></summary>

  ### Computação Gráfica

  <details>
  <summary>Projeto 1 — Tipografia 3D e Animação com Three.js (CG)</summary>

  - Objetivo: Desenvolver uma aplicação interativa de Computação Gráfica 3D no navegador para carregar e renderizar texto tridimensional, aplicando efeitos graduais de entrada (translação vertical e interpolação de escala) combinados com rotação contínua em torno do eixo Y.
  - Tecnologias: Three.js, WebGL, JavaScript (ES Modules), HTML5, CSS3, Git.
  - Conceitos-chave: Computação gráfica 3D, carregamento de fontes vetoriais (`FontLoader`), geometria 3D chanfrada (`TextGeometry`), materiais e iluminação realista (`MeshStandardMaterial`, `DirectionalLight`, `AmbientLight`), interpolação linear (`THREE.MathUtils.lerp`), transformações espaciais (escala, translação, rotação contínua) e ajuste responsivo de câmara (`PerspectiveCamera`).
  - Repositório: [Ver código-fonte](./Ano_2/1_semestre/computacao_grafica/3js/index.html)
  </details>

  <details>
  <summary>Projeto 2 — Animação Gráfica 2D em Canvas (C2D)</summary>

  - Objetivo: Criar uma aplicação web interativa em Canvas 2D que simula a rota de voo paramétrica de um avião seguido por um míssil/objeto acompanhante, com cálculo dinâmico de orientação vetorial, suavização de movimento e evento de explosão com efeitos visuais e sonoros ao clique.
  - Tecnologias: JavaScript, HTML5 Canvas, CSS3, Git.
  - Conceitos-chave: Computação gráfica 2D, cinemática/trajetórias paramétricas (curvas elípticas), trigonometria vetorial (Math.atan2, rotação e translação espacial), suavização de movimento (lerp/smooth factor), loop de animação contínuo (requestAnimationFrame) e manipulação do DOM/áudio.
  - Repositório: [Ver código-fonte](./Ano_2/1_semestre/computacao_grafica/C2D/index.html)
  </details>

  <details>
  <summary>Projeto 3 — Jogo de Perseguição e Fuga em SVG Dinâmico</summary>

  - Objetivo: Desenvolver um jogo 2D interativo no navegador utilizando gráficos vetoriais (SVG) e JavaScript, onde o utilizador controla uma personagem (fantasma) com as teclas WASD para perseguir e capturar entidades autónomas (zombies/pacmen) com mecânicas de fuga, deteção de colisões e gestão de tempo/pontuação.
  - Tecnologias: JavaScript, SVG (DOM API), HTML5, CSS3, Git.
  - Conceitos-chave: Manipulação dinâmica de elementos SVG em tempo de execução via DOM (`createElementNS`, `setAttribute`), física básica e inteligência de evasão (cálculo de distância euclidiana via `Math.hypot` e aceleração por proximidade), reflexão nos limites da arena, gestão de eventos de teclado (`keydown`), loop de jogo a 60 FPS (`setInterval`) e integração de áudio reativo (música de fundo e efeitos sonoros).
  - Repositório: [Ver código-fonte](./Ano_2/1_semestre/computacao_grafica/SVG/index.html)
  </details>

  <details>
  <summary>Projeto 4 — Modelação e Cena 3D Declarativa com X3DOM (X3D)</summary>

  - Objetivo: Criar um cenário virtual tridimensional interactivo directamente na web utilizando tecnologia X3D declarativa, representando um ambiente campestre com terreno, vegetação, cabana estruturada em módulos geométricos e perspetivas de câmara configuradas.
  - Tecnologias: X3DOM, X3D, HTML5, CSS3, Git.
  - Conceitos-chave: Modelação geométrica 3D (primitivas como cilindros, cones, caixas e esferas), estruturação e transformações de cena hierárquicas (translação, rotação e escala), iluminação pontual e direcional (`pointLight`, `directionalLight`), propriedades de materiais (`material`, `diffuseColor`), geometria por coordenadas indexadas (`indexedLineSet`) e definição de pontos de vista de câmara (`viewpoint`).
  - Repositório: [Ver código-fonte](./Ano_2/1_semestre/computacao_grafica/X3D/index.html)
  </details>

  ### Programação 

  - [Projeto 1 — Gestão de alunos](./Ano_1/programacao/)
  - [Projeto 2 — Jogo em Python](./Ano:2ano/programacao-jogo/)

  ### Matemática

  - [Projeto de análise matemática](./1-ano/matematica/)

</details>


<details>
  <summary><strong>3.º Ano — 2025/2026</strong></summary>

  ### Aprendizagem Automática

  <details>
  <summary>Projeto 1 — Diagnóstico de Tumores Cerebrais com Aprendizagem Automática</summary>

  - Objetivo: Desenvolver um pipeline completo de Machine Learning para auxílio ao diagnóstico de tumores cerebrais com base em dados demográficos e atributos de textura e difusão de ressonância magnética (ADC e GLCM), avaliando e comparando múltiplos classificadores para submissão competitiva no Kaggle[cite: 33].
  - Tecnologias: Python, Scikit-Learn, Pandas, NumPy, Matplotlib, Seaborn, Jupyter Notebook, Git[cite: 33].
  - Conceitos-chave: Classificação binária, análise exploratória de dados (EDA), pré-processamento com pipelines (`StandardScaler`, `OneHotEncoder`, `ColumnTransformer`), validação cruzada estratificada (`StratifiedKFold`), afinação de hiperparâmetros (`GridSearchCV`), avaliação de modelos (Acurácia, AUC-ROC, matriz de confusão, F1-Score), relevância de atributos (*Feature Importance*) e algoritmos de ensemble e lineares (Random Forest, Gradient Boosting e Regressão Logística)[cite: 33].
  - Repositório: [Ver código-fonte](./Ano_3/1_semestre/Aprendizagem_automatica/trabalho_tumor_cerebral_corrigido_sem_ids_duplicados.ipynb)
  </details>

  ### Matemática

  - [Projeto de análise matemática](./1-ano/matematica/)

</details>

<h2>Habilidades Técnicas</h2>
<ul>
    <li><b>Linguagens de programação: </b>Java, C, Python, JavaScript</li>
    <li><b>Base de dados: </b> SQL, PosgreSQL</li>
    <li><b>Ferramentas: </b> Git, Github, Linux</li>
    <li><b>Frameworks: </b>Spring, React</li>
</ul>


<h2>Sobre este repositório</h2>

<p>Os projetos estão organizados por ano letivo e disciplina. O repositório de cada projeto 
contém o código-fonte e, quando aplicável, documentação, 
instruções e exemplos de execução.</p>
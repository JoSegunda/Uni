#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <time.h>
#include <string.h>

#define buracos 6 
int ficheiro_salvo = 1;

struct jogadores    // Estrutura jogador para cada jogador
{
    int tabuleiro[2][7];
    bool vazio[2];
    bool venceu[2];
};
struct jogadores player;

void Imprimir_tabuleiro(int p);
int jogar(int p, int pc_jogada);
void captura(int jogador, int index, int s);
bool pode_jogar();
int sem_jogada(int jogador);
int jogador_vs_pc();
int guardar_ficheiro();

int main(void)
{
    // preencher o tabuleiro com pedras
    for (int i = 0; i < buracos; i++)
    {
        player.tabuleiro[0][i] = 4;
        player.tabuleiro[1][i] = 4;
    }
    player.vazio[0] = false;
    player.vazio[1] = false;

    Imprimir_tabuleiro(1);

    int n = 0;  // variável de controle
    do
    {
        printf("\n\nPressione \n[1] Jogador vs Jogador\n[2] Jogador vs Computador \n:");    // Escolher modo de jogo
        scanf("%d", &n);

    } while (n != 1 && n != 2);

    if (n == 1)
    {
        while (pode_jogar() && ficheiro_salvo == 1)
        {
            jogar(0,0);
                Imprimir_tabuleiro(1);
            if (ficheiro_salvo > 1)
            {
                return 0;
                break;
            }
            else{
                
                jogar(1,0);
                Imprimir_tabuleiro(1);
            }
        }
    }
    else if (n == 2)
    {
        while (pode_jogar() && ficheiro_salvo == 1)
        {
            jogar(0,0);
            Imprimir_tabuleiro(1);
            if (ficheiro_salvo > 1)
            {
                return 0;
                break;
            }else{
                jogar(1,3);
                Imprimir_tabuleiro(1);
            }
        }
    }
    
    if (player.tabuleiro[0][6] >= 25)
    {
        printf("\nParabens\nO jogador 1 Venceu, capturou %i pedras",player.tabuleiro[0][6]);
        player.venceu[0] = true;
        player.venceu[1] = false;
    }
    else if (player.tabuleiro[1][6] >= 25)
    {
        printf("\nParabens\nO jogador 2 Venceu");
        player.venceu[0] = false;
        player.venceu[1] = true;
    }
}

// Imprimir tabuleiro
void Imprimir_tabuleiro(int p)
{
    int j = p, b = buracos;
    if (j == 1){
        printf("\n-------------------------\n|  ");
    }else{
        printf("\n| %i|-----------------|%i |\n|  ", player.tabuleiro[1][6], player.tabuleiro[0][6]); 
    }
    for (int i = 1; i <= buracos; i++)
    {
        if (j == 1){
            printf("| %i",player.tabuleiro[j][b - 1]);
        }else{
            printf("| %i",player.tabuleiro[j][i-1]);
        } 
        b--;
    }
    printf("|  |");
    if (j + 1 == 2)
    {
        Imprimir_tabuleiro(j - 1);
        printf("\n-------------------------\n");
    } 
}
// Jogada de cada um
int jogar(int p, int pc_jogada)
{
    int jogador = p, pos = 0, vez_de = p, menor = 0;
    int vazio, jogadaDoPc = pc_jogada;
    sem_jogada(jogador);

    for (int i = 0; true; i++)
    {
        if (jogadaDoPc > 0){
            pos = jogador_vs_pc(); 
        }
        else
        {
            printf("\nJogador %i\nEscolha um valor de 0-6: ", jogador+1);
            scanf("%d", &pos);
            pos--;
        }
        int c = 0, M = 0;

        // pegar o maior número de pedras do buraco
        while (c < 6){
            if ((player.tabuleiro[jogador][c] > M)){
                M = player.tabuleiro[jogador][c];
            }c++;
        }
        if (pos == -1)
        {
            guardar_ficheiro();
            return 0;
        }
        else if ((pos >= 0 && pos < 6) && (player.tabuleiro[jogador][pos] > 1) ){
            break;
        }else if (player.tabuleiro[jogador][pos] == 1 && M == 1){
            break;
        }
    }

    if (jogadaDoPc > 0){
        printf("\nComputador: ");
        system("pause");
    }
    
    int pedra_actual = player.tabuleiro[jogador][pos];
    int pedra_tirada = player.tabuleiro[jogador][pos];
    player.tabuleiro[jogador][pos] = 0;
    pos++;

    for (int i = 0; i < pedra_tirada; i++)
    {
        if (jogador == 0 && pos == 6){
            jogador++;
            pos = 0;
        }else if (jogador == 1 && pos == 6){
            jogador--;
            pos = 0;
        } 
        
        player.tabuleiro[jogador][pos] += 1;
        pedra_actual--;
        pos++;
        if (pedra_actual == 0) {
            captura(jogador, pos-1, vez_de);
        }
    }
    return 0;
}
// Verificar se pode jogar
bool pode_jogar()
{
    bool e_valido = true;
    for (int i = 0; i < 2; i++){ // alguém venceu?
        if (player.tabuleiro[i][buracos] >= 25){
            e_valido = false;
        }
        
    }
    return e_valido;
}
// Capturar
void captura(int jogador, int index, int s)
{
    int j = jogador, actual = s, ind = index;
    bool n = true;
    if (actual != j)
    {
        while(n)
        { 
            if ((player.tabuleiro[j][ind] == 2 || player.tabuleiro[j][ind] == 3))
            {
                player.tabuleiro[actual][6] += player.tabuleiro[j][ind];
                player.tabuleiro[j][ind] = 0;
                ind--;
            }
            else
            {
                n = false;
            }
        } 
    }
}
// SE o jogador não poder fazer mais uma jogada
int sem_jogada(int jogador)
{
    int j = jogador, menor = 0;
    bool vazio = false;
    for (int i = 0; i < buracos; i++)
    {
        if (player.tabuleiro[j][i] > menor){
            vazio = false;
            return 1;
        }else{
            vazio = true;
        }
    }
    player.vazio[j] = vazio? true:false;

    if (j == 0 && player.vazio[1]){
        jogar(0,0);
        return 0;
    }else if (j == 1 && player.vazio[0]){
        jogar(1,1);
        return 0;
    }
    else{
        return 0;
    }
}
// Jogada do computador
int jogador_vs_pc()
{
    srand(time(NULL));

    int minimo = 1, maximo = 6, valorAleatorio;
    bool n = true;
    while (n)
    {
        valorAleatorio = rand() % (maximo - minimo + 1) + minimo;
        if (player.tabuleiro[1][valorAleatorio] == 0)
        {
            n = true;     
        }else{
            n = false;
        }
    }
    return valorAleatorio - 1;
}
// Salvar o estado do tabuleiro
int guardar_ficheiro()
{
    int *p[2][7];
    char nome_arquivo[20];

    printf("\n Guardar o Ficheiro...");
    printf("\n Que nome deseja que o ficheiro tivesse?");
    scanf("%19s",nome_arquivo);
    
    strcat(nome_arquivo,".txt");

    FILE *fp;
    fp = fopen(nome_arquivo, "w");
    if (fp == NULL){
        printf("Erro na abertura do ficheiro\n");
        fclose(fp);
        return 2;
    }

    fprintf(fp,"%d\n",player.tabuleiro[1][6]);

    for (int i = 1; i <= buracos; i++)
    {
        fprintf(fp,"%d ",player.tabuleiro[1][buracos - i]);
    }
    fprintf(fp,"\n%d\n",player.tabuleiro[0][6]);

    for (int i = 0; i < buracos; i++)
    {
        fprintf(fp,"%d ",player.tabuleiro[0][i]);
    }

    printf("\nFicheiro Salvo com sucesso");
    ficheiro_salvo = 3;
    fclose(fp);
    return 0;
}
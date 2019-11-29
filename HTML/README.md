# Implmentação de Geometria Computacional

Implementação dos conceitos de geometria computacional para a segunda nota da cadeira de Computação Gráfica. For implementado os assuntos vistos em aula na linguagem JavaScript utilizando o recurso Canvas.

##  Conceitos Implementados

- Objeto Ponto
- Objeto Linha
- Objeto Polígono
- Objeto Círculo
- Objeto Nuvem de Pontos
- Seleção de Objetos
- Translação
- Rotação
- Escala
- Fecho Convexo
- Diagrama de Voronoy
- Triangulação de Delaney

## Utilização

Extraia os arquivos na mesma pasta, e abra com o seu browser o arquivo index.html. Selecione o botão da implementação desejada e clique no canvas para utiliza-la de acordo com as instruções de cada função.

### Objeto Ponto

Clique simples para criar o Ponto na posição do clique.

### Objeto Linha

2 Clique simples em diferentes posições do canvas para criar uma linha entre os 2 cliques.

### Objeto Círculo

2 Clique simples em diferentes posições do canvas para um círculo com o centro no primeiro clique,  e de raio igual à distância entre os 2 cliques.

### Objeto Polígono

Cliques consecutivos para gerar as arestas do polígono, sendo necessário que o último clique seja na mesma posição que o primeiro para fechar o polígono.(Nota: Caso o polígono não seja finalizado normalmente, mesma as arestas desenhadas no canvas, o objeto não será salvo, não podendo ser utilizado para as outras funções, e sendo apagado quando o canvas for atualizado)

### Objeto Nuvem de Pontos

2 Clique simples em diferentes posições do canvas para gerar um círculo de probabilidades da geração dos pontos, com o centro no primeiro clique,  e de raio igual à distância entre os 2 cliques. Serão gerados 50 pontos aleatórios dentro da área de probabilidade do círculo, sendo esta mesma área utilizada como referência para a seleção.

### Seleção de Objetos

Clique no objeto para selecioná-lo. Objetos selecionados estarão pintados de azul, porém apenas um objeto pode ser selecionado por vez. A outras funções requerem um objeto selecionado para serem aplicadas no objeto. Objetos do tipo Ponto e Linha devem ser clicados diretamente com uma pequena tolerância, já objetos Circulo, Polígono e Nuvem de Pontos devem ser clicados na região do objeto como um todo.

### Translação

Após selecionado o objeto, clique em "Translate" e então clique em um ponto no canvas e arraste o mouse pressionado para transladar o objeto selecionado, solte o clique para parar a translação. (Nota: A translação só encerrará quando o mouse for soltado dentro da região do canvas, caso ele seja soltado fora da região, ele ainda será considerado como pressionado. Esta situação vale para Rotação e Escala)

### Rotação

Após selecionado o objeto, clique em "Rotate" e então clique em um ponto no canvas e arraste o mouse pressionado para rotacionar o objeto selecionado, solte o clique para parar a rotação. A rotação será dada em torno do ponto central do objeto, e é calculado através do ângulo gerado entre o ponto do centro do objeto, o ponto do clique inicial, e o ponto quando o clique for soltado.

### Escala

Após selecionado o objeto, clique em "Scale" e então clique em um ponto no canvas e arraste o mouse pressionado para escalar o objeto selecionado, solte o clique para parar a escala. A escala será dada em torno do ponto central do objeto, e é calculado através da diferença entre a distância do centro ao ponto inicial e a distância entre o centro e ponto final

### Fecho Convexo, Diagrama de Voronoy e Triangulação de Delaney

Selecione uma nuvem de pontos primeiramente, clique na função desejada, e clique no canvas para executa-la.

##### Clear e Restore

Todos os objetos criados serão salvos, clique em clear para apagar temporariamente da tela e restore para desenha-los novamente.
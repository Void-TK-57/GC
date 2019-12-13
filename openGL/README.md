# Implmentação de Geometria Computacional

Atividade 4: Iluminação.

##  Conceitos Implementados

- Luz Ambiente
- Luz Difusa
- Luz Specular

## Utilização

Extraia os arquivos na mesma pasta, abra um terminal, e digite make para gerar o executável. Com o executável criado, use o seguinte comando para executar:

```
./main
```

### Mudança de Modos

O programa possui os modos: 
- Câmera, para mudar a posição da câmera
- Rotation, para rotacionar o objeto
- Scale, para escalar o objeto
- Translate, para transladar o objeto
- Light, para ativar e desativar as iluminações

Inicialmente o programa começa no modo light, para mudar para cada modo, aperte a tecla da primeira letra do modo, c para câmera, r para rotação, s para scala, t para translação e l para light.

### Mudança de Projeção

Inicialmente, o programa começa no modo orthogonal, para mudar de modo aperte: p para Perspectiva e o para Orthogonal.

### Ativação e Desativação de Iluminações

As iluminações implementadas foram: Ambiente, Difusa e Specular. Após selecionado o modo light, aperte as setas direcionais esquerda e direita para desativar e ativar a luz difusa respectivamente, as setas direcionais cima e baixo para ativar e desativar a luz specular rescpectivamente, e as teclas - e + para desativar e ativar a luz ambiente respectivamente.

### Movimentação da câmera e objetos

Após selecionado o modo, utilize as setas direcionais para movimentar a câmera ou o objeto nos eixos x e y, e os teclas - e + para aproximar e afastar no eixo z.

(Nota: A mudança da posição da câmera não altera o ponto fixo a qual ela está direcionado, que é (0, 0, 0), logo a mudança da posição irá alterar a direçaõ da câmera, pois ela sempre estará direcionada para o ponto fixo (0, 0, 0) )

### Escala

Use as setas direcionais cima e baixo, para aumentar e diminuir o objeto respectivamente.

### Rotação

Use as setas direcionais e as teclas - e +, para rotacionar o objeto em 1 dos 3 eixos, x, y, z.

## Apagar Arquivos

Utilize o seguinte comando para apagar o arquivo

```
make clean
```
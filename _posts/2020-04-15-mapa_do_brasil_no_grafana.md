---
layout: post
title: "Mapa do Brasil no Grafana"
categories: [monitoring]
tags: [grafana, maps]
comments: true
date: "2020-04-15 00:41:02.111000+00:00"
---

![](/assets/img/K6VI7qsEm_018b98ff8fabcb3297fc97c0970f5baf.png)
*Imagem de https://www.pexels.com/photo/brazil-geography-globe-journey-269851/*

Atualmente com o avanço tecnológico e maior transparência do governo nos são proporcionados dados atualizados com cada vez mais frequência e por isso podemos criar dashboards reativos em tempo real.

Sendo assim, trago nesse post experimentos com vários plugins de mapa feitos no [Grafana](https://github.com/grafana/grafana) uma ferramenta opensource que possibilita a construção de dashboards muito utilizado para monitoramento de infraestrutura.

![](/assets/img/K6VI7qsEm_1290398ed3700f5292d3592a068395c6.png)
*Exemplo de dashboard retirado de https://play.grafana.org/d/000000012/grafana-play-home?orgId=1*

Dito isso, nesse post irei explorar os seguintes plugins:
* WorldMap
* SVG Panel
* FlowCharting

![](/assets/img/K6VI7qsEm_232e704438721d874643265677f64469.png)

![](/assets/img/K6VI7qsEm_d08a93a0064aea80382db02948b8e870.png)



| WorldMap | SVG Panel | FlowCharting |
|:--------:|:---------:|:------------:|
| ![](/uploads/upload_86f4a66fa3fdb5ed4d67ab30db88763b.png)| ![](/uploads/upload_d08a93a0064aea80382db02948b8e870.png)    |   ![](/assets/img/K6VI7qsEm_1dd18282d55cfe06847b983f37924ac8.png)|
     
     
Vamos começar.
> Se os arquivos em anexo no post não abrirem o mesmo conteúdo está disponível no meu blog em .

# WorldMap Plugin
https://grafana.com/grafana/plugins/grafana-worldmap-panel/installation

![](/assets/img/K6VI7qsEm_85972442ac4a3d1eb5357df23cd09a62.png)
*Retirado de https://grafana.com/grafana/plugins/grafana-worldmap-panel*

WorldMap Plugin é um tipo de mapa que já carrega o Mapa Mundi e os locais são configurados à partir de coordenadas **latitude** e **longitude**.

![](/assets/img/K6VI7qsEm_220a4c3005ad195c4b1bcbd2fe224512.png)

Em **1** centralizamos o Brasil no centro do mapa e em **2** precisamos oferecer ao painel quais os locais em [**latitude**, **longitude**] cada métrica estamos nos referindo.

O arquivo em **2** pode ser encontrado [aqui](https://gist.githubusercontent.com/isaqueprofeta/c9e4178a10e029ad9bb42bdd9dafb2b6/raw/443622ed4cc4886567d16dbea3603f40d0cf2a1a/capitais.json) oferecido pelo [Isaque Profeta](https://github.com/isaqueprofeta).

Em seguida é preciso correlacionar o campo "key" no arquivo.

![](/assets/img/K6VI7qsEm_241b8c44544ff87b1dce7ab06a3ee288.png)

e os pontos irão aparecer no mapa:
![](/assets/img/K6VI7qsEm_f8b4d412b082ff8c7d6ee26b88dcb724.png)


# SVG Panel

SVG Panel é outra forma de se obter um mapa já que com SVG podemos desenhar qualquer forma geométrica. [Mais informações sobre aqui](https://www.w3schools.com/graphics/svg_circle.asp).

A utilização desse painel é um pouco mais complexa pois envolve o conhecimento de SVG e javascript.

Para o SVG panel é preciso primeiro encontrar o mapa do Brasil em formato SVG. Para isso uma simples busca no google por "brasil svg" já nos traz o que precisamos. Por exemplo esse [aqui](https://github.com/LucasBassetti/mapa-brasil-svg).

![](/assets/img/K6VI7qsEm_32fdf9205ea40b5ad9c2114e2e70d474.png)

A versão que estou utilizando pode ser encontrada [aqui](/assets/files/K6VI7qsEm_brasil-svg-panel.svg).

Em seguida podemos utilizar o seguinte código em javascript para configurar a transição de cores.

![](/assets/img/K6VI7qsEm_39e5252f9185e726c14a09ede61cb1ee.png)

```javascript
var s = Snap(svgnode);
const media = arr => arr.reduce((a,b) => a+b, 0)/arr.length
ctrl.series.forEach((item) => {
    let minha_media = media(item.datapoints.map((d) => d[0]))
    let color
    if (minha_media < 30) {
        color = '#ffe1e0'
    }else if (minha_media < 60){
        color = '#eb4d55'
    }else {
        color = '#d0021b'
    }
    s.select('path[state="'+item.alias+'"]').attr('style', 'fill: '+color)
})
```

Utilizando o código acima podemos definir cores de acordo com a média.
![](/assets/img/K6VI7qsEm_ad344462b7483843b7b7d02f33632869.png)

Dessa forma podemos obter algo do tipo:
![](/assets/img/K6VI7qsEm_8484d15468ec99f6a30cc5342a08b037.png)



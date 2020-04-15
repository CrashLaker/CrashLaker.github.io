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

# WorldMap Plugin
https://grafana.com/grafana/plugins/grafana-worldmap-panel/installation

![](/assets/img/K6VI7qsEm_85972442ac4a3d1eb5357df23cd09a62.png)
*Retirado de https://grafana.com/grafana/plugins/grafana-worldmap-panel*

WorldMap Plugin é um tipo de mapa que já carrega o Mapa Mundi e os locais são configurados à partir de coordenadas **latitude** e **longitude**.

![](/assets/img/K6VI7qsEm_07b18e17b4d71128e31ae937263059f6.png)





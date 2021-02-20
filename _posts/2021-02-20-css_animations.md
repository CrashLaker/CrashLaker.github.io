---
layout: post
title: "CSS Animations"
comments: true
date: "2021-02-20 02:37:23.569000+00:00"
---



<iframe style="width:100%;"
        border=0>
<div class="container">
  <img class="img1" src="http://docs.popshi.com///datag/all//1-4.png"/>
  <img class="img2" src="http://docs.popshi.com///datag/all//2.png"/>
  <img class="img3" src="http://docs.popshi.com///datag/all//3.png"/>   
</div>
img {
   /* -webkit-animation: mover 2s infinite  alternate;
    animation: mover 2s infinite  alternate;*/
  position:absolute;
  top:0;
  left:0;
}
img.img1{
  -webkit-animation: mover1 2s  infinite alternate;
    animation: mover1 2s   infinite alternate;
  z-index:3;
}
img.img2{
  -webkit-animation: mover2 2s   forwards;
    animation: mover2 2s   forwards;
  z-index:2;
}
img.img3{
  -webkit-animation: mover3 2s   forwards;
    animation: mover3 2s   forwards;
  z-index:1;
}
@-webkit-keyframes mover1 {
    0% { transform: translateY(0); }
    100% { transform: translateY(20px); }
}
@keyframes mover1 {
    0% { transform: translateY(0); }
    100% { transform: translateY(20px); }
}
@-webkit-keyframes mover2 {
    0% { transform: translateY(0); }
    100% { transform: translateY(40px); }
}
@keyframes mover2 {
    0% { transform: translateY(0); }
    100% { transform: translateY(40px); }
}
@-webkit-keyframes mover3 {
    0% { transform: translateY(0); }
    100% { transform: translateY(60px); }
}
@keyframes mover3 {
    0% { transform: translateY(0); }
    100% { transform: translateY(60px); }
}

.container {
  position: relative;
}
</iframe>
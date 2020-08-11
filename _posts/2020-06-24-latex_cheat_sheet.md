---
layout: post
title: "Latex Cheat Sheet"
comments: true
date: "2020-06-24 02:33:31.884000+00:00"
categories:  [latex]
tags:  [latex]
---




**Image**
```
\begin{figure}[h]
\includegraphics[scale=0.5]{./images/.png}
\centering
\caption{}
\label{fig:}
\end{figure}
```

### Listings
```
\usepackage{xcolor}
\usepackage{float}
\usepackage[portuguese]{babel}
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage{listings}
\usepackage{listingsutf8}
\usepackage{placeins}
\usepackage{inconsolata}
\lstset{basicstyle=\ttfamily,
  showstringspaces=true,
  commentstyle=\color{red},
  keywordstyle=\color{blue},
  frame=single
}
\renewcommand{\lstlistingname}{Algoritmo}

\usepackage[dvipsnames]{xcolor}
\definecolor{blue}{HTML}{7ea6e0}
\definecolor{green}{HTML}{4d9900}
\definecolor{ref}{HTML}{ea6b66}

\newcommand\hr{\par\vspace{-.5\ht\strutbox}\noindent\hrulefill\par}



\lstset{
  language=C2,                % choose the language of the code
  numbers=left,                   % where to put the line-numbers
  stepnumber=1,                   % the step between two line-numbers.        
  numbersep=5pt,                  % how far the line-numbers are from the code
  backgroundcolor=\color{white},  % choose the background color. You must add \usepackage{color}
  showspaces=false,               % show spaces adding particular underscores
  showstringspaces=false,         % underline spaces within strings
  showtabs=false,                 % show tabs within strings adding particular underscores
  tabsize=2,                      % sets default tabsize to 2 spaces
  captionpos=b,                   % sets the caption-position to bottom
  breaklines=true,                % sets automatic line breaking
  breakatwhitespace=true,         % sets if automatic breaks should only happen at whitespace
  title=\lstname,                 % show the filename of files included with \lstinputlisting;
inputencoding=utf8,
extendedchars=true,
  literate={á}{{\'a}}1 {à}{{`a}}1 {ã}{{~a}}1 {é}{{\'e}}1 {ê}{{^e}}1 {ë}{{"e}}1 {í}{{\'i}}1 {ç}{{\c{c}}}1 {Ç}{{\c{C}}}1 {õ}{{~o}}1 {ó}{{\'o}}1 {ô}{{^o}}1 {ú}{{\'u}}1
}

\lstset{
  language=C,                % choose the language of the code
  %numbers=left,                   % where to put the line-numbers
  stepnumber=1,                   % the step between two line-numbers.        
  numbersep=5pt,                  % how far the line-numbers are from the code
  backgroundcolor=\color{white},  % choose the background color. You must add \usepackage{color}
  showspaces=false,               % show spaces adding particular underscores
  showstringspaces=false,         % underline spaces within strings
  showtabs=false,                 % show tabs within strings adding particular underscores
  tabsize=2,                      % sets default tabsize to 2 spaces
  captionpos=b,                   % sets the caption-position to bottom
  breaklines=true,                % sets automatic line breaking
  breakatwhitespace=true,         % sets if automatic breaks should only happen at whitespace
  title=\lstname,                 % show the filename of files included with \lstinputlisting;
inputencoding=utf8,
extendedchars=true,
  literate={á}{{\'a}}1 {à}{{`a}}1 {ã}{{~a}}1 {é}{{\'e}}1 {ê}{{^e}}1 {ë}{{"e}}1 {í}{{\'i}}1 {ç}{{\c{c}}}1 {Ç}{{\c{C}}}1 {õ}{{~o}}1 {ó}{{\'o}}1 {ô}{{^o}}1 {ú}{{\'u}}1
}

\lstset{
inputencoding=utf8,
extendedchars=true,
literate={á}{{\'a}}1 {à}{{`a}}1 {ã}{{~a}}1 {é}{{\'e}}1 {ê}{{^e}}1 {ë}{{"e}}1 {í}{{\'i}}1 {ç}{{\c{c}}}1 {Ç}{{\c{C}}}1 {õ}{{~o}}1 {ó}{{\'o}}1 {ô}{{^o}}1 {ú}{{\'u}}1
}

% https://latex.org/forum/viewtopic.php?t=17111
\usepackage{placeins}
```

### Imports
```
\input{chapter1}
\input{chapter2}
\input{chapter3}
\input{chapter4}
\input{chapter5}
\input{chapter6}
\input{chapter7}
```


### Table
```
\begin{table}[]
\centering
\caption{Tabela de Controle}
\begin{tabular}{|c|c|c|c|}
\hline
Hostname    & local\_rank & global\_rank & parent\_node \\ \hline
Computador1 & s0          & g0           & global       \\ \hline
Computador2 & s2          & g1           & global       \\ \hline
Gateway     & s1          & NULL         & cluster      \\ \hline
Gateway     & c0          & NULL         & cluster      \\ \hline
Node01      & c1          & g2           & cluster      \\ \hline
Node02      & c2          & g3           & cluster      \\ \hline
Node03      & c3          & g4           & cluster      \\ \hline
Node04      & c4          & g5           & cluster      \\ \hline
\end{tabular}
\label{tab:node-table}
\end{table}
```
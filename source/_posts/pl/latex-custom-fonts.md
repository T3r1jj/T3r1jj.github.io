---
title: Polskie znaki w LaTeX-u (Ubuntu, Times New Roman)
categories:
    - LaTeX
tags:
    - latex
    - czcionki
    - polskie znaki
    - linux
    - ubuntu
    - times new roman
lang: pl
date: 2018-05-11 12:00:01
---
LaTeX jest darmowym systemem składania tekstu (ang. typesetting). Jest ceniony za wiele właściwości takich jak automatyzacja procesu (generowanie bibliografii, odsyłaczy, równań matematycznych). Pozwala na skupienie się na tekście zamiast na jego wyglądzie poprzez wykorzystanie plików ze stylami (np. bibliografii) odpowiednich dla danego czasopisma. Przede wszystkim jest dostępny również na różne dystrybucje Linuxa.

<!-- more -->

Jednym z problemów, na jakie można napotkać podczas pisania pracy, są wymagania dotyczące użycia określonych czcionek. Standardowo wykorzystuje się następujące paczki zapewniające wsparcie dla polskich znaków:
<div class="pre tip">\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage{polski}
</div>
Taka konfiguracja zazwyczaj wystarcza przy założeniu, że pliki kodowane są w systemie UTF-8. Następnie wybieramy czcionkę <code>\usepackage{times}</code>.
Niestety zarówno przestarzała paczka *times*, jak i nowsze *mathptmx*, *pslatex*, oraz *txfonts* (*newtxtext*/*newtxmath*) wykorzystują tak naprawdę czcionki URW NimbusRomNo9L, które są bardzo podobne do Times Roman. Ponadto mimo tego, że polskie znaki wyświetlane są poprawnie, to podczas kopiowania mogą wystąpić błędy. Warto zwrócić na to uwagę, gdyż w programach antyplagiatowych wyrazy z polskimi literami zostaną nierozpoznane.

<div class="tip warn">
<div>
Zażółć gęślą jaźń
</div>
<div>
Zażółć g ̨eśl a  ̨ jaźń
</div>
</div>

W celu rozwiązania tego tego problemu można skorzystać z innej czcionki - TeX Gyre Termes: <code>\usepackage{tgtermes}</code>. Z innymi rodzajami czcionek zapoznać się można w bazie wiedzy [ShareLaTeX](https://www.sharelatex.com/learn/Font_typefaces).
## Oryginalna czcionka Times New Roman
Najprostszy sposób na załadowanie znanych z Windowsa czcionek na Ubuntu składa się z 3 kroków:
1. Instalacja czcionek TrueType Microsoft:
<code>sudo apt-get install ttf-mscorefonts-installer</code>
Podczas instalacji pojawi się okno z warunkami udzielenia licencji (Microsoft EULA). Czcionki zostały udostępnione za darmo jednak nie są one
open-source.
2. Zastąpienie paczek *inputenc* i *fontenc* następującymi komendami:
<pre class="tip">
\usepackage{fontspec}
\setmainfont{Times New Roman}
</pre>
3. Zmiana programu pdflatex na xelatex:
<pre class="tip">
xelatex main.tex
bibtex main
xelatex main.tex
xelatex main.tex
</pre>

W praktyce proces generowania pliku pdf może się nieco wydłużyć. W przypadku innego kodowania plików należy zastosować polecenia <code>\XeTeXinputencoding</code> dla poprzedzającego tekstu bądź <code>\XeTeXdefaultencoding</code> standardowo dla wszystkich plików,
np. <code>\XeTeXdefaultencoding "cp1250"</code> (kodowanie używane przez Microsoft Windows dla języków środkowoeuropejskich, w tym polskiego).

## Czcionki niestandardowe

Jeśli chcemy użyć czcionek niestandardowych np. Arial Narrow wystarczy przenieść je (rozszerzenie ttf dla czcionek TrueType) do stworzonego katalogu w <code>/usr/share/fonts/</code>.





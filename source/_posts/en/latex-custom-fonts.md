---
title: Diacritics in LaTeX (Ubuntu, Times New Roman)
categories:
    - LaTeX
tags:
    - latex
    - fonts
    - accents
    - special characters
    - diacritics
    - linux
    - ubuntu
    - times new roman
lang: en
date: 2018-05-11 12:00:00
---
LaTeX is a free typesetting system. It is valued for many properties such as automated processing (generating bibliographies, links, mathematical equations). It allows you to focus on the text instead of its appearance by using files with styles (e.g. bibliography) suitable for a given journal. Foremostly, it is also available for various Linux distributions.
<!-- more -->

One of the problems you may encounter while writing an article are the requirements for the use of certain fonts. By default, the following packages are used to provide support for language characters (accents/diacritics):
<div class="pre tip">\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage[your_language]{babel} %e.g. \usepackage[slovak]{babel}
</div>
Such configuration usually suffices assuming that the files are encoded in the UTF-8 system. Next choose the font <code>\usepackage{times}</code>. Unfortunately both outdated *times* and newer *mathptmx*, *pslatex* and *txfonts* (*newtxtext*/*newtxmath*) underneath use URW NimbusRomNo9L fonts that are very similar to Times Roman but they are not same. Although language specific characters are displayed correctly, errors may occur during copying. It is worth paying attention to it because in anti-plagiarism programs, words with these letters will be unrecognized.
<div class="tip warn">
<div>
ÁÄĎÉÍĽĹŇÓÔŔŤÚÝáäďéíľĺňóôŕťúý
</div>
<div>
ÁÄĎÉÍL’ĹŇÓÔŔŤÚÝáäd’éíl’ĺňóôŕt’úý
</div>
</div>

To solve this problem, you can use a different font - TeX Gyre Termes: <code>\usepackage{tgtermes}</code>. You can read more about other fonts in the [ShareLaTeX](https://www.sharelatex.com/learn/Font_typefaces) knowledge base.
## Original Times New Roman font
The easiest way to load fonts on Ubuntu known from Windows consists of three steps:
1. Install TrueType Microsoft fonts:
<code>sudo apt-get install ttf-mscorefonts-installer</code>
During the installation process you will be asked to accept Microsoft EULA. The fonts have been made available for free but they are not open-source.
2. Replace *inputenc* and *fontenc* packages with the following commands:
<pre class="tip">
\usepackage{fontspec}
\setmainfont{Times New Roman}
</pre>
3. Swap *pdflatex* with *xelatex*:
<pre class="tip">
xelatex main.tex
bibtex main
xelatex main.tex
xelatex main.tex
</pre>

In practice, the process of generating a pdf file may be slightly longer. For other file endocings use the <code>\XeTeXinputencoding</code> command for the preceding text or <code>\XeTeXdefaultencoding</code> as a standard for all files, e.g. <code>\XeTeXdefaultencoding "cp1250"</code> (coding used by Microsoft Windows for Central European languages).

## Custom fonts

If you want to use custom fonts like Arial Narrow, just place them (ttf extension for TrueType fonts) in a directory created under <code>/usr/share/fonts/</code>.




// assets/cursos/construcao_de_sites_1/html_content/02_estrutura_basica_documento_html.js

const htmlContent = `

<h3>Estrutura básica de uma tag</h3>
<p>Geralmente uma tag HTML se apresenta de uma das seguintes formas:</p>
<p><i>&lt;tag atributo="valor"&gt;Conteúdo da tag&lt;/tag&gt;</i> ou<br>
<i>&lt;tag atributo="valor"&gt;&lt;/tag&gt;</i></p>
<p>Tags que apresentam conteúdo devem ser abertas (&lt;tag&gt;) e fechadas (&lt;/tag&gt;).</p>
<p>Algumas tags não apresentam conteúdo (ex: &lt;br&gt;). Nesses casos a tag é somente aberta.</p>
<p>Atributos definem certas características de uma tag.</p>
<p>A partir da HTML 5, todos os atributos antes usados para formatação de uma tag tornaram-se obsoletos. Recomenda-se realizar a formatação de uma tag por meio de CSS!</p>

<h3>Estrutura básica de um documento HTML</h3>
<pre>
  &lt;!DOCTYPE html&gt;<br>
  &lt;html&gt;<br>
    <span> </span>&lt;head&gt;<br><br>

    <span> </span>&lt;/head&gt;<br><br>
    <span> </span>&lt;body&gt;<br><br>

    <span> </span>&lt;/body&gt;<br>
  &lt;/html&gt;
</pre>
<p>Declaração DOCTYPE - define o tipo de documento.</p>
<p>Tag html - envolve todo o conteúdo de uma página web.</p>
<p>Tag head - define um “cabeçalho” (informações referentes à página em si).</p>
<p>Tag body - apresenta o conteúdo a ser renderizado pelo navegador.</p>
<p>Tags não são case-sensitive (sensíveis à caixa), ou seja, não diferenciam entre letras maiúsculas e minúsculas.</p>
<p>Toda tag aberta deve ser fechada - exceto tags que não apresentam conteúdo!</p>
<p>Tags mais internas devem ser fechadas antes das tags mais externas.</p>

<h3>Tag HEAD</h3>
<p>Responsável por prover informações sobre a página.</p>
<p>Algumas tags que podem ser usadas aqui:</p>
<ul>
  <li>title - define um título para a página;</li>
  <li>meta - provê metadados (dados sobre os dados), como tipo de codificação, palavras-chave, descrição etc.</li>
  <li>link - estabelece uma relação entre o documento e um arquivo externo (estilo css, ícone etc.);</li>
  <li>style - define regras de estilo (CSS) diretamente no documento;</li>
  <li>script - provê instruções em linguagem de programação client-side (geralmente em JavaScript).</li>
</ul>
<p>Exemplo:</p>
<pre>
  &lt;head&gt;
    &lt;title&gt;Website de Christiano&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"&gt;
  &lt;/head&gt;
</pre>

<h3>Tag BODY</h3>
<p>Descreve todo o conteúdo a ser renderizado pelo navegador.</p>
<p>Algumas tags que podem ser usadas aqui:</p>
<ul>
  <li>Tags de cabeçalho: &lt;h1&gt;, &lt;h2&gt;... &lt;h6&gt;;</li>
  <li>Tag de parágrafo: &lt;p&gt;;</li>
  <li>Tags para formatação: &lt;b&gt; ou &lt;strong&gt;, &lt;i&gt; ou &lt;em&gt;, &lt;u&gt; etc.</li>
  <li>Tags para hyperlink: &lt;a&gt;;</li>
  <li>Tags de imagem: &lt;img&gt;;</li>
  <li>Tags para listas: &lt;ol&gt;, &lt;ul&gt; e &lt;li&gt;;</li>
  <li>Tags para tabelas: &lt;table&gt;, &lt;tr&gt;, &lt;th&gt; e &lt;td&gt;;</li>
  <li>Tags para blocos: &lt;div&gt; e &lt;span&gt;;</li>
  <li>Tags para layout: &lt;header&gt;, &lt;nav&gt;, &lt;section&gt;, &lt;article&gt; etc.</li>
</ul>
<p>Exemplo:</p>
<pre>
  &lt;body&gt;
    &lt;h1&gt;IFSBook - A rede social dos alunos do IFS&lt;/h1&gt;
    &lt;p&gt;O IFSBook traz como proposta integrar as características de redes sociais como o Facebook, novas abordagens educacionais como aquelas propostas em ambientes virtuais de aprendizagem como o Khan Academy e um sistema que facilite o compartilhamento de monografias, artigos científicos e relatórios técnicos produzidos pelos estudantes do Instituto Federal de Sergipe.&lt;/p&gt;
    &lt;p&gt;Assim, se você é estudante de nossa instituição, poderá acessar de forma bem simples todo o conteúdo escolhido especialmente para você.&lt;/p&gt;
  &lt;/body&gt;
</pre>
`;

export default htmlContent;
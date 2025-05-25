const htmlContent = 

`<h2>03. Tags HTML Básicas</h2>

<h3>O que são tags HTML?</h3>
<p>As tags HTML são os blocos de construção de uma página web. Elas são usadas para estruturar o conteúdo e definir como ele será exibido no navegador. Cada tag possui uma função específica e pode conter atributos que alteram seu comportamento ou aparência.</p>

<h3>Tags Comuns</h3>
<p>Algumas das tags HTML mais comuns incluem:</p>

<ul>
    <li><strong>&lt;h1&gt; a &lt;h6&gt;</strong> - Tags de cabeçalho que definem títulos, onde &lt;h1&gt; é o mais importante e &lt;h6&gt; é o menos importante.</li>
    <li><strong>&lt;p&gt;</strong> - Define um parágrafo. É uma das tags mais utilizadas para textos.</li>
    <li><strong>&lt;a&gt;</strong> - Usada para criar hyperlinks. Pode linkar para outras páginas, documentos ou recursos externos.</li>
    <li><strong>&lt;img&gt;</strong> - Insere imagens na página. Possui atributos como <code>src</code> para definir o caminho da imagem e <code>alt</code> para fornecer uma descrição alternativa.</li>
    <li><strong>&lt;ul&gt;, &lt;ol&gt; e &lt;li&gt;</strong> - Usadas para criar listas não ordenadas (&lt;ul&gt;) e ordenadas (&lt;ol&gt;), onde cada item da lista é definido pela tag &lt;li&gt;.</li>
    <li><strong>&lt;div&gt;</strong> e <strong>&lt;span&gt;</strong> - Usadas para agrupar conteúdo. &lt;div&gt; é um bloco que cria uma nova seção, enquanto &lt;span&gt; é um elemento em linha usado para estilização.</li>
    <li><strong>&lt;br&gt;</strong> - Utilizada para inserir uma quebra de linha. É uma tag vazia, não requerendo fechamento, e é útil para separar linhas de texto.</li>
    <li><strong>&lt;head&gt;</strong> - Contém informações sobre a página, como o título que aparece na barra do navegador, links para arquivos CSS e scripts, além de informações sobre descrição e palavras-chave para SEO.</li>
</ul>
  
<h3>Exemplos de Uso</h3>
<p>A seguir, exemplos práticos de algumas tags mencionadas:</p>
<pre>
  &lt;h1&gt;Meu Site Pessoal&lt;/h1&gt;
  &lt;p&gt;Bem-vindo ao meu site, onde compartilho minhas experiências e aprendizados.&lt;/p&gt;
  &lt;a href="https://www.exemplo.com"&gt;Visite meu blog&lt;/a&gt;
  &lt;img src="minha-imagem.jpg" alt="Uma descrição da imagem"&gt;
  &lt;ul&gt;
    &lt;li&gt;Item 1&lt;/li&gt;
    &lt;li&gt;Item 2&lt;/li&gt;
    &lt;li&gt;Item 3&lt;/li&gt;
  &lt;/ul&gt;
</pre>

<h3>Atributos Comuns</h3>
<p>Os atributos fornecem informações adicionais sobre as tags. Alguns atributos comuns incluem:</p>

<ul>
  <li><strong>href</strong> - Usado com a tag &lt;a&gt; para especificar o destino de um link.</li>
  <li><strong>src</strong> - Define o caminho para recursos como imagens ou arquivos de mídia.</li>
  <li><strong>alt</strong> - Fornece uma descrição alternativa para imagens, útil para acessibilidade.</li>
  <li><strong>title</strong> - Exibe um texto descritivo quando o usuário passa o cursor sobre o elemento.</li>
  <li><strong>id</strong> - Define um identificador único para um elemento, útil para CSS e JavaScript.</li>
  <li><strong>class</strong> - Atribui uma ou mais classes a um elemento, permitindo estilização específica em CSS.</li>
</ul>
`
export default htmlContent;
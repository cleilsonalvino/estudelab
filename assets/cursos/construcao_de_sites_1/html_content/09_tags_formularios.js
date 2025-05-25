const htmlContent = `<h2>09. Tags de Formulário</h2>

<h3>O que são Tags de Formulário?</h3>
<p>As tags de formulário em HTML são usadas para coletar informações dos usuários. Elas permitem a interação do visitante com a página web, possibilitando o envio de dados para processamento em servidores ou outros sistemas.</p>

<h3>Tags Comuns de Formulário</h3>
<p>Algumas das tags de formulário mais utilizadas incluem:</p>

<ul>
    <li><strong>&lt;form&gt;</strong> - Define um formulário e agrupa todos os elementos de entrada. Pode incluir atributos como <code>action</code> e <code>method</code>.</li>
    <li><strong>&lt;input&gt;</strong> - Utilizada para criar campos de entrada. Pode ter diferentes tipos, como <code>text</code>, <code>password</code>, <code>checkbox</code>, <code>radio</code>, entre outros.</li>
    <li><strong>&lt;textarea&gt;</strong> - Permite a entrada de texto em várias linhas. Ideal para comentários ou mensagens longas.</li>
    <li><strong>&lt;select&gt;</strong> - Cria uma lista suspensa (dropdown) para seleção de opções. Contém opções definidas com a tag <code>&lt;option&gt;</code>.</li>
    <li><strong>&lt;button&gt;</strong> - Define um botão que pode ser usado para enviar o formulário ou executar ações JavaScript.</li>
    <li><strong>&lt;label&gt;</strong> - Associa um rótulo a um elemento de entrada, melhorando a acessibilidade.</li>
</ul>

<h3>Exemplos de Uso</h3>
<p>A seguir, exemplos práticos de algumas tags de formulário mencionadas:</p>

<h3>Atributos Comuns</h3>
<p>As tags de formulário podem incluir vários atributos para personalização, como:</p>

<ul>
    <li><strong>action</strong> - Define a URL para onde os dados do formulário serão enviados.</li>
    <li><strong>method</strong> - Especifica o método HTTP usado para enviar os dados. Os métodos mais comuns são <code>GET</code> e <code>POST</code>.</li>
    <li><strong>placeholder</strong> - Fornece uma dica de texto que aparece dentro do campo de entrada quando vazio.</li>
    <li><strong>required</strong> - Indica que um campo deve ser preenchido antes do envio do formulário.</li>
    <li><strong>disabled</strong> - Desativa um campo de entrada, tornando-o não interativo.</li>
</ul>

`

export default htmlContent;
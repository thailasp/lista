// Função para inicializar o localStorage com produtos pré-cadastrados
function inicializarProdutos() {
    const produtosSalvos = localStorage.getItem('produtos');
    
    // Se não há produtos no localStorage, adiciona itens pré-cadastrados com imagens
    if (!produtosSalvos) {
        const produtosIniciais = [
            { nome: "O Peregrino", imagem: "https://www.mundocristao.com.br/wp-content/uploads/2021/12/O-peregrino-ilustrado.png" },
            { nome: "Mulherzinhas", imagem: "https://cdn.record.com.br/wp-content/uploads/2020/01/25164526/18994-600x970.png" },
            { nome: "Percy Jackson e o ladrão de raios", imagem: "https://www.containercultura.com.br/imgs/produtos/14440/images/14440.jpg" }
        ];
        localStorage.setItem('produtos', JSON.stringify(produtosIniciais));
    }
}

// Função para carregar os produtos do localStorage ao iniciar a página
function carregarProdutos() {
    const listaProdutos = document.getElementById('listaProdutos');
    listaProdutos.innerHTML = ''; // Limpa a lista

    // Recupera os produtos do localStorage
    const produtosSalvos = localStorage.getItem('produtos');
    const produtos = produtosSalvos ? JSON.parse(produtosSalvos) : [];

    // Renderiza os produtos na página
    produtos.forEach((produto, index) => {
        const li = document.createElement('li');
        li.className = 'produto-item';
        
        const img = document.createElement('img');
        img.src = produto.imagem;
        img.alt = produto.nome;

        const span = document.createElement('span');
        span.textContent = produto.nome;

        // Cria o botão de remover
        const removerBtn = document.createElement('button');
        removerBtn.textContent = 'Remover';
        removerBtn.style.marginLeft = '10px';
        removerBtn.onclick = () => removerProduto(index);

        li.appendChild(img);
        li.appendChild(span);
        li.appendChild(removerBtn);
        listaProdutos.appendChild(li);
    });
}

// Função para adicionar um novo produto ao carrinho
function adicionarProduto() {
    const produtoInput = document.getElementById('produtoInput');
    const imagemInput = document.getElementById('imagemInput');
    const novoProduto = produtoInput.value;
    const novaImagem = imagemInput.value;

    if (novoProduto && novaImagem) {
        // Recupera a lista atual de produtos do localStorage
        const produtosSalvos = localStorage.getItem('produtos');
        const produtos = produtosSalvos ? JSON.parse(produtosSalvos) : [];

        // Adiciona o novo produto à lista
        produtos.push({ nome: novoProduto, imagem: novaImagem });

        // Salva a lista atualizada no localStorage
        localStorage.setItem('produtos', JSON.stringify(produtos));

        // Limpa os campos de entrada
        produtoInput.value = '';
        imagemInput.value = '';

        // Atualiza a lista de produtos exibida
        carregarProdutos();
    } else {
        alert("Por favor, preencha o nome e a URL do livro.");
    }
}

// Função para remover um produto pelo índice
function removerProduto(index) {
    const produtosSalvos = localStorage.getItem('produtos');
    const produtos = produtosSalvos ? JSON.parse(produtosSalvos) : [];

    // Remove o produto da lista pelo índice
    produtos.splice(index, 1);

    // Atualiza o localStorage com a nova lista
    localStorage.setItem('produtos', JSON.stringify(produtos));

    // Atualiza a lista de produtos exibida
    carregarProdutos();
}

// Evento do botão para adicionar o produto
document.getElementById('adicionarBtn').addEventListener('click', adicionarProduto);

// Inicializa com produtos pré-cadastrados e carrega os produtos ao iniciar a página
inicializarProdutos();
carregarProdutos();

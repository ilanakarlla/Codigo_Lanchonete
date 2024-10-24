let funcionarios = []; // Cria um array vazio para armazenar os funcionários
let pedidos = []; // Cria um array vazio para armazenar os pedidos

// Função para atualizar a lista de funcionários na interface
function atualizarListaFuncionarios() {
    const lista = document.getElementById('lista-funcionarios'); // Obtém a referência da lista de funcionários no HTML
    lista.innerHTML = ''; // Limpa a lista para evitar duplicação ao atualizar

    // Para cada funcionário no array, cria um item de lista
    funcionarios.forEach((func, index) => {
        const li = document.createElement('li'); // Cria um novo elemento de lista
        li.textContent = `${func.nome} - ${func.cpf}`; // Define o texto do item da lista com o nome e CPF do funcionário

        // Cria um botão para excluir o funcionário
        const excluirButton = document.createElement('button');
        excluirButton.textContent = 'Excluir'; // Define o texto do botão como "Excluir"
        excluirButton.style.marginLeft = '10px'; // Adiciona margem à esquerda do botão para espaçamento

        // Adiciona um evento de clique ao botão de excluir
        excluirButton.addEventListener('click', function() {
            funcionarios.splice(index, 1); // Remove o funcionário da lista pelo índice
            localStorage.setItem('funcionarios', JSON.stringify(funcionarios)); // Atualiza o armazenamento local com a nova lista
            atualizarListaFuncionarios(); // Atualiza a lista exibida na interface
        });

        li.appendChild(excluirButton); // Adiciona o botão de excluir ao item da lista
        lista.appendChild(li); // Adiciona o item da lista à lista de funcionários no HTML
    });
    atualizarSelectResponsavel(); // Atualiza o seletor de responsáveis nos pedidos
}

// Função para atualizar o seletor de responsáveis nos pedidos
function atualizarSelectResponsavel() {
    const select = document.getElementById('responsavel-pedido'); // Obtém a referência do seletor de responsáveis
    select.innerHTML = ''; // Limpa o seletor para evitar duplicação

    // Para cada funcionário, cria uma opção no seletor
    funcionarios.forEach(func => {
        const option = document.createElement('option'); // Cria uma nova opção
        option.value = func.nome; // Define o valor da opção como o nome do funcionário
        option.textContent = func.nome; // Define o texto da opção como o nome do funcionário
        select.appendChild(option); // Adiciona a opção ao seletor
    });
}

// Adiciona um evento de submit ao formulário de cadastro de funcionários
document.getElementById('form-funcionario').addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o envio padrão do formulário
    const nome = document.getElementById('nome-funcionario').value; // Obtém o nome do funcionário
    const cpf = document.getElementById('cpf-funcionario').value; // Obtém o CPF do funcionário

    // Verifica se o nome e CPF estão preenchidos corretamente
    if (nome && cpf.length === 11) {
        const funcionario = { nome, cpf }; // Cria um objeto funcionário com nome e CPF
        funcionarios.push(funcionario); // Adiciona o funcionário ao array
        localStorage.setItem('funcionarios', JSON.stringify(funcionarios)); // Atualiza o armazenamento local com a nova lista
        atualizarListaFuncionarios(); // Atualiza a lista exibida na interface
        document.getElementById('form-funcionario').reset(); // Reseta o formulário
    } else {
        alert('Por favor, preencha todos os campos corretamente.'); // Alerta se os campos não estão corretos
    }
});

// Adiciona um evento de submit ao formulário de cadastro de pedidos
document.getElementById('form-pedido').addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o envio padrão do formulário
    const nomePedido = document.getElementById('nome-pedido').value; // Obtém o nome do pedido
    const descricaoPedido = document.getElementById('descricao-pedido').value; // Obtém a descrição do pedido
    const responsavel = document.getElementById('responsavel-pedido').value; // Obtém o responsável pelo pedido
    const status = "A Fazer"; // Define o status inicial do pedido

    const pedido = { nomePedido, descricaoPedido, responsavel, status }; // Cria um objeto pedido
    pedidos.push(pedido); // Adiciona o pedido ao array
    localStorage.setItem('pedidos', JSON.stringify(pedidos)); // Atualiza o armazenamento local com a nova lista
    atualizarListaPedidos(); // Atualiza a lista exibida na interface
    document.getElementById('form-pedido').reset(); // Reseta o formulário
});

// Função para atualizar a lista de pedidos na interface
function atualizarListaPedidos() {
    const lista = document.getElementById('lista-pedidos'); // Obtém a referência da lista de pedidos no HTML
    lista.innerHTML = ''; // Limpa a lista para evitar duplicação

    const selectPedido = document.getElementById('pedido-selecionado'); // Obtém a referência do seletor de pedidos
    selectPedido.innerHTML = ''; // Limpa o seletor para evitar duplicação

    // Para cada pedido no array, cria um item de lista
    pedidos.forEach((pedido, index) => {
        const li = document.createElement('li'); // Cria um novo elemento de lista
        li.textContent = `${pedido.nomePedido} - Responsável: ${pedido.responsavel} - Status: ${pedido.status}`; // Define o texto do item da lista com os dados do pedido

        // Adiciona o pedido ao seletor de pedidos
        const option = document.createElement('option'); // Cria uma nova opção
        option.value = index; // Define o valor da opção como o índice do pedido
        option.textContent = `${pedido.nomePedido} - Responsável: ${pedido.responsavel}`; // Define o texto da opção com o nome do pedido e o responsável
        selectPedido.appendChild(option); // Adiciona a opção ao seletor

        lista.appendChild(li); // Adiciona o item da lista à lista de pedidos no HTML
    });
}

// Função para mudar o status do pedido
function mudarStatus() {
    const index = document.getElementById('pedido-selecionado').value; // Obtém o índice do pedido selecionado
    const status = document.getElementById('status-pedido').value; // Obtém o status selecionado

    if (index) { // Verifica se um pedido foi selecionado
        pedidos[index].status = status; // Atualiza o status do pedido
        localStorage.setItem('pedidos', JSON.stringify(pedidos)); // Atualiza o armazenamento local
        atualizarListaPedidos(); // Atualiza a lista exibida na interface
        alert(`Status do pedido '${pedidos[index].nomePedido}' atualizado para: ${status}`); // Exibe um alerta com o novo status
    } else {
        alert('Por favor, selecione um pedido para atualizar o status.'); // Alerta se nenhum pedido foi selecionado
    }
}

// Carrega funcionários e pedidos do localStorage ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    const funcionariosSalvos = localStorage.getItem('funcionarios'); // Obtém os funcionários do armazenamento local
    const pedidosSalvos = localStorage.getItem('pedidos'); // Obtém os pedidos do armazenamento local

    if (funcionariosSalvos) {
        funcionarios = JSON.parse(funcionariosSalvos); // Converte os dados do armazenamento local em um objeto
        atualizarListaFuncionarios(); // Atualiza a lista de funcionários na interface
    }

    if (pedidosSalvos) {
        pedidos = JSON.parse(pedidosSalvos); // Converte os dados do armazenamento local em um objeto
        atualizarListaPedidos(); // Atualiza a lista de pedidos na interface
    }
});

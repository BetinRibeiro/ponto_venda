const cryptocurrencies = [
    ["ADA","1.57","1026"],
    ["NEAR","2.16","187.3"],
    ["SOL","64.7","0.881"],
    ["AGIX","0.27","611.67"],
    ["AGIX","0.27","200"],
    ["ETH","2850","0.0162"],
    ["BTC","49980","0.0012018"],
    ["SDAO","0.6345","22.84","1.0215"],
    ["NTX","0.041","600","0.08246"]
];

// ["SDAO","0.6522","22.84922"]
async function fetchCryptoPrice(crypto) {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${crypto}USDT`);
        if (!response.ok) {
            return false; // Retorna false se a solicitação não for bem-sucedida
        }
        const data = await response.json();
        return data.price;
    } catch (error) {
        console.error("Erro ao buscar preço da criptomoeda:", error);
        return false; // Retorna false em caso de erro
    }
}


function dolar(number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
}
function real(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value*5);
}

function calcularPercentual(valor1, valor2) {
    // Verifica se os valores são válidos e não são zero para evitar divisão por zero
    if (isNaN(valor1) || isNaN(valor2) || valor1 === 0 || valor2 === 0) {
        return "Valores inválidos";
    }
    
    // Calcula o percentual
    const percentual = ((valor2 - valor1) / valor1) * 100;

    // Formata o percentual com duas casas decimais e o símbolo de percentagem (%)
    const percentualFormatado = percentual.toFixed(2);

    return percentualFormatado;
}
async function updateTableAndInfo() {
    const tableBody = document.querySelector('#cryptoTable tbody');
    const tableFoot = document.querySelector('#cryptoTable tfoot');
    const infoDiv1 = document.querySelector('#info');
    const infoDiv2 = document.querySelector('#info2');

    tableBody.innerHTML = ''; // Limpa o conteúdo atual da tabela
    tableFoot.innerHTML = ''; // Limpa o conteúdo atual do rodapé da tabela
    infoDiv1.innerHTML = ''; // Limpa o conteúdo atual da primeira lista de informações
    infoDiv2.innerHTML = ''; // Limpa o conteúdo atual da segunda lista de informações

    let total_compra_geral = 0; // Variável para armazenar o total de compra geral
    let total_atualizado_geral = 0; // Variável para armazenar o total atualizado geral
    
    // Variável para armazenar o preço de todas as criptomoedas
    const cryptoPrices = {};

    // Função para buscar os preços de todas as criptomoedas
    async function fetchAllCryptoPrices() {
        for (const crypto of cryptocurrencies) {
            const price = await fetchCryptoPrice(crypto[0]);
            cryptoPrices[crypto[0]] = price !== false ? price : crypto[3];
        }
    }

    // Espera a busca de todos os preços antes de continuar
    await fetchAllCryptoPrices();

    for (const crypto of cryptocurrencies) {
        const preco_atual = cryptoPrices[crypto[0]];

        const quantidade = crypto[2];
        const preco_compra = crypto[1];
        const total_compra = preco_compra * quantidade;
        const totalAtualizado = preco_atual * quantidade;
        const lucro = totalAtualizado - total_compra;
        total_compra_geral += parseFloat(total_compra);
        total_atualizado_geral += parseFloat(totalAtualizado);
        const percentual = calcularPercentual(total_compra, totalAtualizado)
        
        // Criando uma nova linha na tabela para cada criptomoeda
        const row = `<tr>
                        <td>${crypto[0]}</td>
                        <td>${dolar(preco_compra)}</td>
                        <td>${quantidade}</td>
                        <td>${dolar(total_compra)}</td>
                        <td>${dolar(preco_atual)}</td>
                        <td>${dolar(totalAtualizado)}</td>
                        <td>${dolar(lucro)}</td>
                        <td>${percentual}%</td>
                    </tr>`;
        tableBody.innerHTML += row;

        // Criando um novo item de lista para cada criptomoeda na primeira lista de informações
        const listItem1 = document.createElement('li');
        listItem1.classList.add('list-group-item', 'd-flex', 'justify-content-between');
        listItem1.innerHTML = `
            <div>
                <h6 class="my-0"><b>${crypto[0]} - ${quantidade}</b></h6>
                <small class="text-muted">${percentual}%</small>
            </div>
            <span class="text-muted">${dolar(total_compra)}</span>`;
        infoDiv1.appendChild(listItem1);

        // Criando um novo item de lista para cada criptomoeda na segunda lista de informações
        const listItem2 = document.createElement('li');
        listItem2.classList.add('list-group-item', 'd-flex', 'justify-content-between');
        listItem2.innerHTML = `
            <div>
                <h6 class="my-0"><b>${crypto[0]} - ${quantidade}</b></h6>
                <small class="text-muted">${percentual}%</small>
            </div>
            <span class="text-muted">${dolar(totalAtualizado)}</span>`;
        infoDiv2.appendChild(listItem2);
    }

    // Adicionando linhas de total na tabela
    const totalDolarRow = `<tr class="table-primary">
                                <td colspan="3">Total em Dolar</td>
                                <td>${dolar(total_compra_geral)}</td>
                                <td>Total</td>
                                <td>${dolar(total_atualizado_geral)}</td>
                                <td>${dolar(total_atualizado_geral - total_compra_geral)}</td>
                                <td>${calcularPercentual(total_compra_geral, total_atualizado_geral)}</td>
                            </tr>`;
    const totalRealRow = `<tr class="table-secondary">
                                <td colspan="3">Total em Real</td>
                                <td>${real(total_compra_geral)}</td>
                                <td>Total</td>
                                <td>${real(total_atualizado_geral)}</td>
                                <td>${real(total_atualizado_geral - total_compra_geral)}</td>
                                <td>${calcularPercentual(total_compra_geral, total_atualizado_geral)}%</td>
                            </tr>`;
    tableFoot.innerHTML = totalDolarRow + totalRealRow;
}

// Função para atualizar a tabela e as listas de informações quando a página termina de carregar
window.addEventListener('load', updateTableAndInfo);

const cryptocurrencies = [
    ["ADA","1.6","1020"],
    ["NEAR","2.16","187.3"],
    ["SOL","64.7","0.881"],
    ["AGIX","0.27","611.67"],
    ["AGIX","0.27","200"],
    ["ETH","2850","0.0162"]
];

// ["SDAO","0.6522","22.84922"]

async function fetchCryptoPrice(crypto) {
    const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${crypto}USDT`);
    const data = await response.json();
    return data.price;
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
    const percentualFormatado = percentual.toFixed(2) + "%";

    return percentualFormatado;
}

async function updateTable() {
    const tableBody = document.querySelector('#cryptoTable tbody');
    tableBody.innerHTML = '';
    let total_compra_geral = 0; // Alteração para let
    let total_atualizado_geral = 0; // Alteração para let
    
    for (const crypto of cryptocurrencies) {
        const preco_atual = await fetchCryptoPrice(crypto[0]);
        const quantidade = crypto[2];
        const preco_compra = crypto[1];
        const total_compra = preco_compra * quantidade;
        const totalAtualizado = preco_atual * quantidade;
        const lucro = totalAtualizado - total_compra;
        total_compra_geral += parseFloat(total_compra);
        total_atualizado_geral += parseFloat(totalAtualizado);
        const row = `<tr>
                        <td>${crypto[0]}</td>
                        <td>${dolar(preco_compra)}</td>
                        <td>${quantidade}</td>
                        <td>${dolar(total_compra)}</td>
                        <td>${dolar(preco_atual)}</td>
                        <td>${dolar(totalAtualizado)}</td>
                        <td>${dolar(lucro)} </td>
                        <td>${calcularPercentual(total_compra,totalAtualizado) }</td>
                    </tr>`;
        tableBody.innerHTML += row;
    }

    const tableFoot = document.querySelector('#cryptoTable tfoot');
    tableFoot.innerHTML = '';
    const row = `<tr class="table-primary">
                        <td colspan="3">Total em Dolar</td>
                        <td>${dolar(total_compra_geral)}</td>
                        <td>Total</td>
                        <td>${dolar(total_atualizado_geral)}</td>
                        <td>${dolar(total_atualizado_geral - total_compra_geral)}</td>
                        <td>${calcularPercentual(total_compra_geral,total_atualizado_geral ) }</td>
                    </tr>
                    <tr class="table-secondary">
                    <td colspan="3">Total em Real</td>
                        <td>${real(total_compra_geral)}</td>
                        <td>Total</td>
                        <td>${real(total_atualizado_geral)}</td>
                        <td>${real(total_atualizado_geral - total_compra_geral)}</td>
                        <td>${calcularPercentual(total_compra_geral,total_atualizado_geral ) }</td>
                    </tr>`;
    tableFoot.innerHTML += row;
}

window.addEventListener('load', updateTable);

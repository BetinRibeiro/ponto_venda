const cryptocurrencies = [
    ["ADA","1.6","1020"],
    ["NEAR","2.16","187.3"],
    ["SOL","64.7","0.881"],
    ["AGIX","0.27","611.67"]
];

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
                        <td>${dolar(lucro)}</td>
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
                    </tr>
                    <tr class="table-secondary">
                    <td colspan="3">Total em Real</td>
                        <td>${real(total_compra_geral)}</td>
                        <td>Total</td>
                        <td>${real(total_atualizado_geral)}</td>
                        <td>${real(total_atualizado_geral - total_compra_geral)}</td>
                    </tr>`;
    tableFoot.innerHTML += row;
}

window.addEventListener('load', updateTable);

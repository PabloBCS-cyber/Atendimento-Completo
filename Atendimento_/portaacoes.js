// fila-atendimento versão lenta, aleatória, com limite visível de espera e limpeza do PRONTO

var filaEspera = document.getElementById("lista");   // fila visível (máx 4)
var filaBuffer = [];                                 // senhas extras ficam guardadas aqui
var caixa1 = document.getElementById("lista1");
var caixa2 = document.getElementById("caixa2");
var recebidos = document.getElementById("recebimentos");

let caixa1Ocupado = false;
let caixa2Ocupado = false;

// tempo mínimo que a senha deve ficar na fila de espera (em ms)
const TEMPO_MIN_ESPERA = 2000;

document.getElementById("re").addEventListener('click', () => {

    const senha = Math.floor(Math.random() * 8000);
    document.getElementById("senharand").textContent = senha;

    adicionarFilaEspera(senha);
    processarFila(); // dispara o processamento, mas respeitando o tempo mínimo
});

// ---- Adicionar senha com limite visual de 4 ----
function adicionarFilaEspera(senha) {

    if (filaEspera.childElementCount < 4) {
        const li = document.createElement("li");
        li.textContent = senha;
        li.dataset.entrada = Date.now(); // marca horário de chegada na fila
        filaEspera.appendChild(li);
    } else {
        // excedente vai para o buffer
        filaBuffer.push(senha);
    }
}

// ---- Mostrar próxima senha do buffer quando abrir espaço ----
function atualizarFilaVisual() {
    while (filaEspera.childElementCount < 4 && filaBuffer.length > 0) {
        const senha = filaBuffer.shift();
        const li = document.createElement("li");
        li.textContent = senha;
        li.dataset.entrada = Date.now(); // também marca horário ao entrar na fila visual
        filaEspera.appendChild(li);
    }
}

// ---- Processar fila tentando mandar para caixas ----
function processarFila() {

    if (filaEspera.childElementCount === 0) return;

    const primeiro = filaEspera.firstElementChild;

    // garante que temos o horário de entrada
    if (!primeiro.dataset.entrada) {
        primeiro.dataset.entrada = Date.now();
    }

    const tempoEspera = Date.now() - Number(primeiro.dataset.entrada);

    // se ainda não esperou o tempo mínimo, agenda nova tentativa
    if (tempoEspera < TEMPO_MIN_ESPERA) {
        setTimeout(processarFila, TEMPO_MIN_ESPERA - tempoEspera);
        return;
    }

    const senha = primeiro.textContent;

    if (!caixa1Ocupado) {
        moverParaCaixa(senha, 1);
        filaEspera.removeChild(filaEspera.firstElementChild);
        atualizarFilaVisual();
        return;
    }

    if (!caixa2Ocupado) {
        moverParaCaixa(senha, 2);
        filaEspera.removeChild(filaEspera.firstElementChild);
        atualizarFilaVisual();
        return;
    }

    // ambos ocupados → continua na fila de espera
}

// tempo aleatório entre 2 e 7 segundos
function tempoAleatorio() {
    return Math.floor(Math.random() * 10000) + 2000;
}

// ---- Enviar senha ao caixa ----
function moverParaCaixa(senha, caixa) {

    const li = document.createElement("li");
    li.textContent = senha;
    li.style.fontSize = "50px";
    if (caixa === 1) {
        caixa1.appendChild(li);
        caixa1Ocupado = true;

        setTimeout(() => finalizarAtendimento(senha, 1), tempoAleatorio());
    } else {
        caixa2.appendChild(li);
        caixa2Ocupado = true;

        setTimeout(() => finalizarAtendimento(senha, 2), tempoAleatorio());
    }
}

// ---- Finalizar atendimento, mandar para pronto e avaliação ----
function finalizarAtendimento(senha, caixa) {

    if (caixa === 1) {
        caixa1.innerHTML = "";
        caixa1Ocupado = false;
    } else {
        caixa2.innerHTML = "";
        caixa2Ocupado = false;
    }

    // adiciona ao pronto
    const li = document.createElement("li");
    li.textContent = senha;
    li.style.fontSize = "70px";
    recebidos.appendChild(li);

    // remove do pronto após tempo aleatório
    setTimeout(() => {
        if (li.parentNode) li.remove();
    }, tempoAleatorio() + 2000);

    // avaliação
    setTimeout(() => avaliar(senha), 1000);

    // tenta processar mais senhas
    setTimeout(processarFila, 300);
}

// ---- Avaliação ----
function avaliar(senha) {
    var imgsrc = document.getElementById('grade');
    var emojis_grade = Math.floor(Math.random() * 3);
    document.getElementById("nota_p").textContent = "Usuario: " + senha;
    var notamais = "imgs/naogostou.png";
    var notaneutra = "imgs/maisoumenos.png";
    var notamenos = "imgs/gostou.png";
    if (emojis_grade == 0) {
        imgsrc.src = "imgs/naogostou.png";
        document.getElementById("downvote").textContent =
            Number(document.getElementById("downvote").textContent) + 1;
            Arraynotas.push(notamenos);
    }
    else if (emojis_grade == 1) {
        imgsrc.src = "imgs/maisoumenos.png";
        document.getElementById("neutro").textContent =
            Number(document.getElementById("neutro").textContent) + 1;
            Arraynotas.push(notaneutra);
    }
    else {
        imgsrc.src = "imgs/gostou.png";
        document.getElementById("upvote").textContent =
            Number(document.getElementById("upvote").textContent) + 1;
            Arraynotas.push(notamais);
    }
    console.log(Arraynotas);
    imgsrc.style.width = "50px";
    imgsrc.style.display = "block";
    document.getElementById("nota_p").style.display = "block";

    setTimeout(() => {
        imgsrc.style.display = "none";
        document.getElementById("nota_p").style.display = "none";
    }, 4000);
}

console.log("Fila de atendimento carregada.");
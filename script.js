/* =====================================================
CLÍNICA SORRISO NOVO
JAVASCRIPT PRINCIPAL
===================================================== */

/* =====================================================
CONFIGURAÇÕES
===================================================== */

const CONFIG = {
whatsapp: "5519981123401",
telefone: "1936630000",

endereco:
    "Rua Guanabara, nº 26, Divinolândia - SP"

};

/* =====================================================
MENU MOBILE
===================================================== */

const botaoMenu = document.getElementById("botaoMenu");
const menuPrincipal = document.getElementById("menuPrincipal");

if (botaoMenu && menuPrincipal) {

botaoMenu.addEventListener("click", function () {

    menuPrincipal.classList.toggle("ativo");

    if (menuPrincipal.classList.contains("ativo")) {
        botaoMenu.textContent = "✕";
    } else {
        botaoMenu.textContent = "☰";
    }

});


/*
   Fecha o menu quando o usuário
   clica em uma opção.
*/

const linksMenu =
    menuPrincipal.querySelectorAll("a");

linksMenu.forEach(function (link) {

    link.addEventListener("click", function () {

        menuPrincipal.classList.remove("ativo");

        botaoMenu.textContent = "☰";

    });

});

}

/* =====================================================
WHATSAPP
===================================================== */

function abrirWhatsApp() {

const mensagem =
    "Olá! Gostaria de saber mais sobre os serviços da Clínica Sorriso Novo.";

const url =
    "https://wa.me/" +
    CONFIG.whatsapp +
    "?text=" +
    encodeURIComponent(mensagem);

window.open(url, "_blank");

}

/* =====================================================
SELECIONAR TRATAMENTO
===================================================== */

function selecionarTratamento(tratamento) {

const campoTratamento =
    document.getElementById("tratamento");

const secaoAgendamento =
    document.getElementById("agendamento");


if (campoTratamento) {

    campoTratamento.value = tratamento;

}


if (secaoAgendamento) {

    secaoAgendamento.scrollIntoView({
        behavior: "smooth"
    });

}

}

/* =====================================================
FORMULÁRIO DE AGENDAMENTO
===================================================== */

const formulario =
document.getElementById("formAgendamento");

if (formulario) {

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();


    /*
       Pegando os dados do formulário.
    */

    const nome =
        document.getElementById("nome").value.trim();

    const telefone =
        document.getElementById("telefone").value.trim();

    const tratamento =
        document.getElementById("tratamento").value;

    const profissional =
        document.getElementById("profissional").value;

    const data =
        document.getElementById("data").value;

    const horario =
        document.getElementById("horario").value;

    const observacao =
        document.getElementById("observacao").value.trim();


    /*
       Verificação básica.
    */

    if (
        !nome ||
        !telefone ||
        !tratamento ||
        !data ||
        !horario
    ) {

        alert(
            "Por favor, preencha todos os campos obrigatórios."
        );

        return;

    }


    /*
       Converte a data para
       dia/mês/ano.
    */

    let dataFormatada = data;

    if (data.includes("-")) {

        const partes =
            data.split("-");

        dataFormatada =
            partes[2] +
            "/" +
            partes[1] +
            "/" +
            partes[0];

    }


    /*
       Profissional.
    */

    const profissionalTexto =
        profissional
            ? profissional
            : "Sem preferência";


    /*
       Observação.
    */

    const observacaoTexto =
        observacao
            ? observacao
            : "Nenhuma";


    /*
       Monta a mensagem.
    */

    const mensagem =

`Olá! Gostaria de solicitar um agendamento na Clínica Sorriso Novo. 🦷

Dados do paciente:

👤 Nome: ${nome}

📱 Telefone: ${telefone}

🦷 Tratamento: ${tratamento}

👩‍⚕️ Profissional: ${profissionalTexto}

📅 Data preferida: ${dataFormatada}

⏰ Horário preferido: ${horario}

📝 Observação: ${observacaoTexto}

Aguardo a confirmação do agendamento. Obrigado!`;

    /*
       Abre o WhatsApp.
    */

    const url =
        "https://wa.me/" +
        CONFIG.whatsapp +
        "?text=" +
        encodeURIComponent(mensagem);


    window.open(url, "_blank");


    /*
       Mensagem para o usuário.
    */

    alert(
        "Sua solicitação foi preparada! O WhatsApp será aberto para você enviar a mensagem."
    );

});

}

/* =====================================================
COMO CHEGAR
===================================================== */

function abrirMapa() {

const endereco =
    encodeURIComponent(CONFIG.endereco);

const url =
    "https://www.google.com/maps/search/?api=1&query=" +
    endereco;

window.open(url, "_blank");

}

/* =====================================================
TELEFONE
===================================================== */

function ligarClinica() {

window.location.href =
    "tel:" + CONFIG.telefone;

}

/* =====================================================
DATA MÍNIMA DO AGENDAMENTO
===================================================== */

const campoData =
document.getElementById("data");

if (campoData) {

/*
   Impede selecionar uma data anterior
   ao dia atual.
*/

const hoje =
    new Date();

const ano =
    hoje.getFullYear();

const mes =
    String(
        hoje.getMonth() + 1
    ).padStart(2, "0");

const dia =
    String(
        hoje.getDate()
    ).padStart(2, "0");


campoData.min =
    `${ano}-${mes}-${dia}`;

}

/* =====================================================
MÁSCARA DE TELEFONE
===================================================== */

const campoTelefone =
document.getElementById("telefone");

if (campoTelefone) {

campoTelefone.addEventListener(
    "input",
    function () {

        let valor =
            campoTelefone.value
                .replace(/\D/g, "")
                .slice(0, 11);


        if (valor.length <= 10) {

            valor =
                valor.replace(
                    /^(\d{2})(\d)/,
                    "($1) $2"
                );

            valor =
                valor.replace(
                    /(\d{4})(\d)/,
                    "$1-$2"
                );

        } else {

            valor =
                valor.replace(
                    /^(\d{2})(\d)/,
                    "($1) $2"
                );

            valor =
                valor.replace(
                    /(\d{5})(\d)/,
                    "$1-$2"
                );

        }


        campoTelefone.value =
            valor;

    }
);

}

/* =====================================================
ANIMAÇÃO AO ENTRAR NA PÁGINA
===================================================== */

const elementosAnimados =
document.querySelectorAll(
".card-tratamento, " +
".card-profissional, " +
".depoimento, " +
".card-plano, " +
".contato-card"
);

if ("IntersectionObserver" in window) {

const observador =
    new IntersectionObserver(
        function (entradas) {

            entradas.forEach(
                function (entrada) {

                    if (
                        entrada.isIntersecting
                    ) {

                        entrada.target.style.opacity =
                            "1";

                        entrada.target.style.transform =
                            "translateY(0)";

                        observador.unobserve(
                            entrada.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


elementosAnimados.forEach(
    function (elemento) {

        elemento.style.opacity =
            "0";

        elemento.style.transform =
            "translateY(25px)";

        elemento.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observador.observe(
            elemento
        );

    }
);

}

/* =====================================================
FECHA MENU AO REDIMENSIONAR
===================================================== */

window.addEventListener(
"resize",
function () {

    if (
        window.innerWidth > 800 &&
        menuPrincipal
    ) {

        menuPrincipal.classList.remove(
            "ativo"
        );

        if (botaoMenu) {
            botaoMenu.textContent = "☰";
        }

    }

}

);

/* =====================================================
CONSOLE
===================================================== */

console.log(
"Clínica Sorriso Novo — site carregado com sucesso."
);
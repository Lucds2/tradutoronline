/* https://api.mymemory.translated.net/get?q=Hello Mundo!&langpair=en|ele */

window.speechSynthesis.getVoices();

let textoOriginal = document.querySelector(".texto-original");
const campoTraducao = document.querySelector(".traducao");
const selectIdiomaOrigem = document.querySelector(".idiomaOriginal");
const selectIdiomaAlvo = document.querySelector(".idiomaAlvo");

async function lerTexto() {
  let traduzir = textoOriginal.value;

  const selectIdiomaOrigem = document.querySelector(".idiomaOriginal");
  const idiomaOriginal =
    selectIdiomaOrigem.value; /* variável com seleção de idioma origem */

  const selectIdiomaAlvo = document.querySelector(".idiomaAlvo");
  const idiomaAlvo =
    selectIdiomaAlvo.value; /* variável com seleção de idioma alvo */

  const endereco =
    "https://api.mymemory.translated.net/get?q=" +
    traduzir +
    "&langpair=" +
    idiomaOriginal +
    "|" +
    idiomaAlvo;

  let resposta = await fetch(endereco);
  let respostajs = await resposta.json();

  const campoTraducao = document.querySelector(".traducao");
  campoTraducao.value = respostajs.responseData.translatedText;

  
}

function ouvir() {
    const textoParaOuvir = campoTraducao.value;

    if (textoParaOuvir !== "") {
        // CORREÇÃO 1: Cancela imediatamente qualquer processo pendente
        window.speechSynthesis.cancel();

        // Um pequeno atraso de 50ms ajuda o navegador a processar o cancelamento antes de falar
        setTimeout(() => {
            const fala = new SpeechSynthesisUtterance(textoParaOuvir);
            const langCode = selectIdiomaAlvo.value;
            fala.lang = langCode;

            // CORREÇÃO 2: Busca rápida da voz
            const voices = window.speechSynthesis.getVoices();
            const voice = voices.find(v => v.lang.startsWith(langCode));
            
            if (voice) {
                fala.voice = voice;
            }

            // CORREÇÃO 3: Ajustes de performance
            fala.rate = 1.0; // Velocidade normal
            fala.pitch = 1.0; // Tom normal

            window.speechSynthesis.speak(fala);
        }, 50);

    } else {
        alert("Traduza algo primeiro!");
    }
}
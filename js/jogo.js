// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(acertos, tentativas);
  // Mostra o botão jogar novamente alterando a classe CSS (className)
  btnJogarNovamente.className = 'visivel';
  // Oculta o botão reiniciar alterando a classe CSS (className)
  btnReiniciar.className = 'invisivel';
}

// Função jogar novamente
function jogarNovamente() {
  jogar = true; // Variável jogar volta a ser verdadeira
  let divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
    if (divis[i].id >= 0 && divis[i].id <= 4) {
      divis[i].className = "inicial";
    }
  }

  let img = document.getElementById("imagem");
  if (img != '') {
    img.remove();
  }

  let imagensErro = document.getElementsByClassName('imagemErro');
  while (imagensErro.length > 0) {
    imagensErro[0].remove();
  }
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (tentativas > 0) ? (acertos / tentativas) * 100 : 0;
  document.getElementById("resposta").innerHTML = `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

// Função executada quando o jogador acertou
function acertou(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.id = "imagem";
  img.src = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRXqO4pBeLoXaegT8aDlnPzNBT0j-EmFaYi9_iL_ZFCago1SNWD";
  obj.appendChild(img);
}

// Função para adicionar imagem de erro
function adicionarImagemErro(obj) {
  const img = new Image(100);
  img.src = "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTLlX6XJxzWRZz-DE4XuMi1gFg7m7f6ZLKO57tgnSNCpEsCxkmVeO37glyg66nzB9WJ_Oburstz0IS1NFA2hgbKeKFo-4h6C8Lvws7VBQtC6mL2omzFm1EYwhZltpCNLkf9sDEO-HgzDg"; 
  img.className = "imagemErro";
  obj.style.position = "relative"; 
  obj.appendChild(img);
}

// Função que sorteia um número aleatório entre 0 e 4 e verifica se o jogador acertou
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;
    if (tentativas >= 5) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }
    let sorteado = Math.floor(Math.random() * 5);
    if (obj.id == sorteado) {
      acertou(obj);
      acertos++;
    } else {
      obj.className = "errou";
      adicionarImagemErro(obj);
      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);
    }
    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
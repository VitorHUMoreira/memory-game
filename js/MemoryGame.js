class MemoryGame {
  constructor() {
    this.userName = "";
    this.points = 10;
    this.deck = [
      "./assets/harmonia.svg",
      "./assets/poder.svg",
      "./assets/projetar.svg",
      "./assets/refletir.svg",
      "./assets/harmonia.svg",
      "./assets/poder.svg",
      "./assets/projetar.svg",
      "./assets/refletir.svg",
    ];
    this.cardsSelected = [];
  }

  renderDeck() {
    let deckRandom = this.deck.sort(() => {
      return Math.random() - 0.5;
    });

    let board = document.querySelector("#board");

    deckRandom.forEach((imgSrc) => {
      let imgTag = document.createElement("img");
      imgTag.src = imgSrc;
      imgTag.classList.add("hide");
      imgTag.classList.add("cardFront");

      let backImg = document.createElement("img");
      backImg.src = "./assets/fe.svg";
      backImg.classList.add("show");
      backImg.classList.add("cardBack");

      board.appendChild(imgTag);
      board.appendChild(backImg);
    });
  }

  flip(card) {
    this.cardsSelected.push(card);

    if (this.cardsSelected.length === 2) {
      console.log("duas cartas selecionadas. vamos checar se elas são iguais!");
      this.checkPair();
    }
  }

  checkPair() {
    if (this.cardsSelected[0].src === this.cardsSelected[1].src) {
      console.log("cartas iguais! Acertou! :D");

      this.cardsSelected[0].classList.add("turn");
      this.cardsSelected[1].classList.add("turn");

      this.cardsSelected = [];
      this.checkStatus();
    } else {
      console.log("Errou!! Cartas diferentes");
      this.points -= 2;

      setTimeout(() => {
        console.log("FECHAR AS DUAS CARTAS");
        console.log(this.cardsSelected);

        this.cardsSelected[0].className = "hide cardFront";
        this.cardsSelected[1].className = "hide cardFront";

        this.cardsSelected[0].nextElementSibling.className = "show cardBack";
        this.cardsSelected[1].nextElementSibling.className = "show cardBack";

        this.checkStatus();

        this.cardsSelected = [];
      }, 1000);
    }
  }

  checkStatus() {
    console.log("checando se alguem ganhou ou perdeu");

    if (this.points === 0) {
      console.log("VOCÊ PERDEU O JOGO");
      let cardsFront = document.querySelectorAll(".cardFront");
      let cardsBack = document.querySelectorAll(".cardBack");

      console.log(cardsFront);
      console.log(cardsBack);

      cardsFront.forEach((cardFront) => {
        cardFront.className = "show";
      });

      cardsBack.forEach((cardBack) => {
        cardBack.className = "hide";
      });

      let div = document.createElement("div");
      div.innerHTML = `
        Você <strong>perdeu</strong>, meu fi!
      `;
      let board = document.querySelector("#board");
      board.appendChild(div);
    }

    let cardsTurn = document.querySelectorAll(".turn");
    if (cardsTurn.length === 8) {
      console.log("Ganhou o jogo!!");

      let board = document.querySelector("#board");
      let score = document.querySelector("#score");
      board.style.display = "none";
      score.style.display = "none";

      let div = document.createElement("div");
      div.innerHTML = `
        <h1>Você ganhou ${this.userName}!! Parabéns!!!!!!</h1>
      `;
      let gameDiv = document.querySelector("#game");
      gameDiv.appendChild(div);
    }
  }
}

const game = new MemoryGame();

const buttonStart = document.querySelector("#inicio button");
const inicio = document.querySelector("#inicio");
const inputName = document.querySelector("#inicio input");
const name = document.querySelector("#name");
const points = document.querySelector("#points");
const score = document.querySelector("#score");

buttonStart.addEventListener("click", () => {
  if (inputName.value === "") {
    return;
  }
  game.renderDeck();

  inicio.style.display = "none";
  score.style.display = "flex";

  game.userName = inputName.value;
  name.innerText = game.userName;
  points.innerText = game.points;

  settingUpGame();
});

function settingUpGame() {
  const allCardsBack = document.querySelectorAll(".show");

  allCardsBack.forEach((cardBack) => {
    cardBack.addEventListener("click", () => {
      let cardFront = cardBack.previousElementSibling;

      cardBack.className = "hide cardBack";
      cardFront.className = "show cardFront";

      game.flip(cardFront);

      console.log(game.points);

      points.innerText = game.points;
    });
  });
}

const playerEl1 = document.querySelector(".player-1");
const playerEl2 = document.querySelector(".player-2");
const dieEl1 = document.querySelector(".die-1");
const dieEl2 = document.querySelector(".die-2");
const smDieP1El1 = document.querySelector(".die1-p1");
const smDieP1El2 = document.querySelector(".die2-p1");
const smDieP2El1 = document.querySelector(".die1-p2");
const smDieP2El2 = document.querySelector(".die2-p2");
const rollEl1 = document.querySelector(".roll-btn-1");
const rollEl2 = document.querySelector(".roll-btn-2");
const addEl1 = document.querySelector(".add-credit-1");
const addEl2 = document.querySelector(".add-credit-2");

let diceValueP1 = [];
let diceValueP2 = [];
let credit1 = 0;
let credit2 = 0;

playerEl1.classList.toggle("player-active");
rollEl2.disabled = true;

const roundWin = function (dice1P1, dice2P1, dice1P2, dice2P2) {
  if (
    dice1P1 + dice2P1 > dice1P2 + dice2P2 ||
    (dice1P1 + dice2P1 === dice1P2 + dice2P2 && dice1P1 === dice2P1) ||
    dice1P1 + dice2P1 === 2
  ) {
    return 1;
  } else if (
    dice1P1 + dice2P1 < dice1P2 + dice2P2 ||
    (dice1P1 + dice2P1 === dice1P2 + dice2P2 && dice1P2 === dice2P2) ||
    dice1P2 + dice2P2 === 2
  ) {
    return 2;
  } else {
    return 3;
  }
};

const showCredit = function (credClass, credValue) {
  document.querySelector(credClass).textContent = `Credit: ${credValue}`;
};

addEl1.addEventListener("click", function () {
  credit1 += 10;
  document.querySelector(".credit-1").textContent = `Credit: ${credit1}`;
});

addEl2.addEventListener("click", function () {
  credit2 += 10;
  document.querySelector(".credit-2").textContent = `Credit: ${credit2}`;
});

const switchToPlayer1 = function () {
  playerEl1.classList.toggle("player-active");
  playerEl2.classList.toggle("player-active");
  rollEl1.disabled = false;
  rollEl2.disabled = true;
};

const switchToPlayer2 = function () {
  playerEl1.classList.toggle("player-active");
  playerEl2.classList.toggle("player-active");
  rollEl2.disabled = false;
  rollEl1.disabled = true;
};

const game = function () {
  creditIncrement = 1;
  incremented = false;

  rollEl1.addEventListener("click", function () {
    credit1 -= creditIncrement;
    showCredit(".credit-1", credit1);
    let dieValue1 = Math.trunc(Math.random() * 6 + 1);
    diceValueP1[0] = dieValue1;
    dieEl1.src = `dice/die-${dieValue1}.svg`;
    smDieP1El1.src = `dice/die-${dieValue1}.svg`;

    let dieValue2 = Math.trunc(Math.random() * 6 + 1);
    diceValueP1[1] = dieValue2;
    dieEl2.src = `dice/die-${dieValue2}.svg`;
    smDieP1El2.src = `dice/die-${dieValue2}.svg`;
    switchToPlayer2();
  });
  rollEl2.addEventListener("click", function () {
    credit2 -= creditIncrement;
    showCredit(".credit-2", credit2);
    let dieValue1 = Math.trunc(Math.random() * 6 + 1);
    diceValueP2[0] = dieValue1;
    dieEl1.src = `dice/die-${dieValue1}.svg`;
    smDieP2El1.src = `dice/die-${dieValue1}.svg`;

    let dieValue2 = Math.trunc(Math.random() * 6 + 1);
    diceValueP2[1] = dieValue2;
    dieEl2.src = `dice/die-${dieValue2}.svg`;
    smDieP2El2.src = `dice/die-${dieValue2}.svg`;
    switchToPlayer1();

    if (incremented === false) {
      creditIncrement = 1;
    }

    switch (
      roundWin(diceValueP1[0], diceValueP1[1], diceValueP2[0], diceValueP2[1])
    ) {
      case 1: {
        credit1 += 2 * creditIncrement;
        if (incremented === true) {
          incremented = false;
        }
        break;
      }
      case 2: {
        credit2 += 2 * creditIncrement;
        if (incremented === true) {
          incremented = false;
        }
        break;
      }
      case 3:
        // incremented = true;
        // creditIncrement *= 2;
        break;
    }

    showCredit(".credit-2", credit2);
  });
};

game();

let interval;
let modal = document.getElementById("modal");
let timer = document.querySelector(".timer");
let cardFind = document.getElementsByClassName("find");
let deckOfCards = ["🗼", "🗽", "🕌", "🕋", "🌉", "🗿", "🗻", "🏰", "🗼", "🗽", "🕌", "🕋", "🌉", "🗿", "🗻", "🏰"];
function shuffle(n) {
  let currentCard = n.length;
  let temporaryCard, randomCard;

  while (currentCard !== 0) {
    randomCard = Math.floor(Math.random() * currentCard);
    currentCard -= 1;
    temporaryCard = n[currentCard];
    n[currentCard] = n[randomCard];
    n[randomCard] = temporaryCard;
  }
  return n;
}
function startTimer() {
  let s = 0,
    m = 0,
    h = 0;
  interval = setInterval(function () {
    timer.innerHTML = "Tempo: " + m + " min " + s + " sec";
    s++;
    if (s == 60) {
      m++;
      s = 0;
    }
    if (m == 60) {
      h++;
      m = 0;
    }
  }, 1000);
}
function startGame() {
  let cardShuffle = shuffle(deckOfCards);

  clearInterval(interval);
  cardComparison = [];

  let list = document.getElementById("deck");
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }

  for (let i = 0; i < 16; i++) {
    let card = document.createElement("div");
    let front = document.createElement("div");
    front.className = "icon";
    document.getElementById("deck").appendChild(card).appendChild(front);
    front.innerHTML = cardShuffle[i];
  }

  startTimer();

  let icon = document.getElementsByClassName("icon");
  let icons = [...icon];

  for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener("click", displayCards);
    icons[i].addEventListener("click", openModal);
  }
}
function displayCards() {
  let icon = document.getElementsByClassName("icon");
  let icons = [...icon];

  this.classList.toggle("show");
  cardComparison.push(this);

  let len = cardComparison.length;
  if (len === 2) {
    if (cardComparison[0].innerHTML === cardComparison[1].innerHTML) {
      cardComparison.forEach(function (elemento) {
        elemento.classList.add("guessed", "disabled");
      });
      arrayComparison = [];
    } else {
      icons.forEach(function (item) {
        item.classList.add("disabled");
      });
      setTimeout(function () {
        cardComparison.forEach(function (elemento) {
          elemento.classList.remove("show");
        });
        icons.forEach(function (item) {
          item.classList.remove("disabled");
          for (let i = 0; i < cardFind.length; i++) {
            cardFind[i].classList.add("disabled");
          }
        });
        cardComparison = [];
      }, 700);
    }
  }
}
function openModal() {
  if (cardFind.length == 16) {
    clearInterval(interval);
    modal.classList.add("active");
    document.getElementById("totalTime").innerHTML = timer.innerHTML;
    closeModal();
  }
}
function closeModal() {
  closeicon.addEventListener("click", function (e) {
    modal.classList.remove("active");
    startGame();
  });
}
function playAgain() {
  modal.classList.remove("active");
  startGame();
}

document.body.onload = startGame();

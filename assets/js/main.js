console.log('test');

let playerPunkte = 0;
let computerPunkte = 0;
let rundenAnzahl = 5;
const aktuelleRunde = 0;
let winner = '';
let winnerAusgabe = '';
let thumbAusgabe = '';
let bisherigeErgebnisse = [];

const playBtn = document.querySelector('.intro button');
const introScreen = document.querySelector('.intro');
const gameArena = document.querySelector('.game-arena');

const rundenAktuell = document.getElementById('runden-anzahl');
const bisherigeErgebnisseAnzeige = document.getElementById('demo1');
// const res = document.getElementById('demo');
const avatarPlayer = ['😄', '😁', '😆', '🤗', '🤓', '😎', '😙', '😚', '🤠', '😋', '😜', '🤣', '👸', '👩‍🌾'];
const avatarComputer = ['🤖', '👾', '👻', '👽', '💻', '🖥', '🕹'];
const avatarVictory = ['😝', '😜', '😁', '😄', '😀', '😍', '🥳', '🤩'];
const avatarLost = ['😩', '😮', '😬', '😕', '😳', '😑', '🙄', '🤕', '🤮'];
const playerHand = document.getElementById('player-hand');
const computerHand = document.getElementById('computer-hand');
const haendeZusammen = document.querySelectorAll('.haende .hands');

haendeZusammen.forEach((hand) => {
  hand.addEventListener('animationend', function () {
    this.style.animation = '';
  });
});

const start = function () {
  // const game = document.querySelector('game');
  const gameText = document.querySelector('.game-text');
  const gameRunden = document.querySelector('.game-runden');
  // const formular = document.querySelector('.formular');
  const gameScoreBoard = document.querySelector('.game-score-board');
  const intro = document.querySelector('.intro');
  const restart = document.querySelector('.restart');
  // const gameTextBanner = document.querySelector('game-text-banner');
  // const gameAuswahl = document.querySelector('game-auswahl');
  // const gameErgebnisse = document.querySelector('game-ergebnisse');
  // const restartScreen = document.querySelector('.restart');

  const x = `#e8e8e8`;
  const y = `#f4f4f2`;
  const anzeigeX = [gameText, gameRunden, gameScoreBoard];
  const anzeigeY = [intro, restart];

  anzeigeX.map((el) => (el.style.backgroundColor = x));
  anzeigeY.map((el) => (el.style.backgroundColor = y));
};
start();

const randomNumber = function (arrayLaenge) {
  return Math.floor(Math.random() * arrayLaenge.length);
};

let avaPlRanAktuell = '';
let avaCoRanAktuell = '';
const randomAvatarP = function () {
  const avaPlRan = avatarPlayer[randomNumber(avatarPlayer)];
  const avaCoRan = avatarComputer[randomNumber(avatarComputer)];
  document.querySelector('#avatar-player').innerHTML = avaPlRan;
  document.querySelector('#avatar-computer').innerHTML = avaCoRan;
  avaPlRanAktuell = avaPlRan;
  avaCoRanAktuell = avaCoRan;
};
randomAvatarP();

// Start Game
const startGame = () => {
  playBtn.addEventListener('click', () => {
    introScreen.classList.add('fadeOut');
    gameArena.classList.remove('fadeOut');
    // console.log('click: Start');
  });
};

const reset = () => {
  // console.log('resettttt');

  playerPunkte = 0;
  computerPunkte = 0;
  rundenAktuell.innerHTML = `가위 바위 보 0/${rundenAnzahl}`;
  document.getElementById('player-punkte').innerHTML = 0;
  document.getElementById('computer-punkte').innerHTML = 0;
  document.getElementById('letsPlay').innerHTML = 'Beam me up, Scotty 👨🏻‍🚀🛸';
  const restartScreen = document.querySelector('.restart');
  restartScreen.classList.add('fadeOut');
  bisherigeErgebnisse = [];
  winnerAusgabe = [];
  bisherigeErgebnisseAnzeige.innerHTML = bisherigeErgebnisse;
  randomAvatarP();
};

const winStats = function () {
  const createdDiv = document.querySelectorAll('.lastThreeRounds');
  console.log(`${createdDiv.length}testlaenge`);

  if (createdDiv.length % 4 === 0) {
    document.getElementById('restart-text').innerHTML = `<h3>Weiter rudern 🚣‍♀️🚣‍♀️🚣‍♀️!</h3>`;
    return createdDiv.forEach((el) => el.remove());
  }
  document.getElementById('restart-text').innerHTML = `<h3> 가위✌️ 바위👊 보🖐 스팍🖖 도마뱀🦎</h3>`;
};

// im restart Fenster zeigt den Gewinner und die Rundenanzahl an
const create = function () {
  const section = document.querySelector('.recPast');
  const introDiv = document.createElement('div');
  const introH1 = document.createElement('h1');

  const pIntroDiv = document.createTextNode(`${thumbAusgabe}${winnerAusgabe}`);

  introDiv.append(introH1);
  introH1.append(pIntroDiv);

  introDiv.className = 'lastThreeRounds';

  section.append(introDiv);
  introDiv.append(introH1);

  winStats();
};
// Restart Game
const restartGame = () => {
  const restartButton = document.querySelector('.restart button');
  const restartScreen = document.querySelector('.restart');
  const match = document.querySelector('.game-arena');
  restartScreen.classList.remove('fadeOut');
  match.classList.remove('fadeIn');
  document.getElementById('winner').innerHTML = `<h2>${winner}</h2>`;

  restartButton.innerHTML = 'Restart';
  restartButton.addEventListener('click', () => reset());
  create();
};
// Runden
const runden = document.getElementsByName('runden');
// Wie viele Runden?
const rundenModi = function (e) {
  // console.log(e.target.id);
  // console.log(e.target.value);
  // console.log(e.target.checked);
  rundenAnzahl = e.target.value;
  rundenAktuell.innerHTML = `가위 바위 보 ${aktuelleRunde}/${e.target.value}`;
  document.getElementById('letsPlay').innerHTML = `Lass uns ${e.target.value} Runden spielen`;

  reset();
};

for (const singleRunde of runden) {
  singleRunde.addEventListener('click', rundenModi);
}

function einerVon(playerP, computerP) {
  const spielstand = playerP + computerP;
  rundenAktuell.innerHTML = `가위 바위 보 ${spielstand}/${rundenAnzahl}`;
}

// Ermittlung des Gewinners
function gewinnerErmittlung(playerP, computerP) {
  if (playerP + computerP >= rundenAnzahl) {
    // console.log('game end');
    // console.log(playerPunkte);
    // console.log(computerPunkte);
    einerVon(playerP, computerP);
    if (playerP > computerP) {
      winner = `You win ${avaPlRanAktuell}`;
      winnerAusgabe = avatarVictory[randomNumber(avatarVictory)];
      thumbAusgabe = '👍';
    } else if (playerP < computerP) {
      winner = `Comp wins ${avaCoRanAktuell}`;
      winnerAusgabe = avatarLost[randomNumber(avatarLost)];
      thumbAusgabe = '👎';
    }

    restartGame();
    // setTimeout(() => {
    //   restartGame();
    // }, 500);
  }
}

// button player1
const buttons = document.querySelectorAll('.game-auswahl > button');
const playhand = function (e) {
  // console.log(e.target);
  // console.log(e.target.id);
  // console.log(e.target.innerText);
  const player = e.target.id;

  // console.log(player);
  let playerHandSymbol = e.target.id;

  if (playerHandSymbol === 'schere') {
    playerHandSymbol = '✌️';
  } else if (playerHandSymbol === 'stein') {
    playerHandSymbol = '👊';
  } else if (playerHandSymbol === 'papier') {
    playerHandSymbol = '🖐';
  } else if (playerHandSymbol === 'spock') {
    playerHandSymbol = '🖖';
  } else {
    playerHandSymbol = '🦎';
  }

  setTimeout(() => {
    // ZufallsHaende
    const haende = [
      { wert: 'schere', symbol: '✌️', farbe: 'red' },
      { wert: 'stein', symbol: '👊', farbe: 'blue' },
      { wert: 'papier', symbol: '🖐', farbe: 'yellow' },
      { wert: 'spock', symbol: '🖖', farbe: 'green' },
      { wert: 'lizard', symbol: '🦎', farbe: 'orange' },
    ];

    const haendeWert = haende.map((x) => x.wert);
    const haendeSymbol = haende.map((x) => x.symbol);
    // const haendeFarben = haende.map((x) => x.farbe);
    // console.log(haendeWert);
    // console.log(haendeSymbol);
    const randomZahl = Math.floor(Math.random() * haende.length);
    const zufallsHand = haendeWert[randomZahl];
    const zufallsHandSymbol = haendeSymbol[randomZahl];
    // const zufallsHandFarbe = haendeFarben[randomZahl];
    // console.log(zufallsHand);
    // console.log(zufallsHandSymbol);
    // console.log(zufallsHandFarbe);
    bisherigeErgebnisse.push(playerHandSymbol, zufallsHandSymbol);
    document.getElementById('demo1').innerHTML = bisherigeErgebnisse.join('');

    playerHand.innerHTML = player;
    computerHand.innerHTML = zufallsHand;
    // console.log(zufallsHand);
    // console.log(player);
    // console.log(e.target);
    const gewinner = document.querySelector('.game-text-banner > h2');
    if (player === 'schere' && zufallsHand === 'schere') {
      gewinner.innerHTML = ` 🕶 it's a tie 🕶`;
      playerHand.innerHTML = '✌️';
      computerHand.innerHTML = '✌️';
    }
    if (player === 'schere' && zufallsHand === 'stein') {
      gewinner.innerHTML = '(and as it always has) 💃 Rock crushes Scissors';
      playerHand.innerHTML = '✌️';
      computerHand.innerHTML = '👊';
      computerPunkte += 1;
    }
    if (player === 'schere' && zufallsHand === 'papier') {
      gewinner.innerHTML = 'Scissors cuts Paper';
      playerHand.innerHTML = '✌️';
      computerHand.innerHTML = '🖐';
      playerPunkte += 1;
    }
    if (player === 'schere' && zufallsHand === 'spock') {
      gewinner.innerHTML = 'Spock smashes Scissors 🖖🔫🪓✂️✂️';
      playerHand.innerHTML = '✌️';
      computerHand.innerHTML = '🖖';
      computerPunkte += 1;
    }
    if (player === 'schere' && zufallsHand === 'lizard') {
      gewinner.innerHTML = 'Scissors decapitates Lizard ✂️🦎😵';
      playerHand.innerHTML = '✌️';
      computerHand.innerHTML = '🦎';
      playerPunkte += 1;
    }
    /// //////////
    if (player === 'stein' && zufallsHand === 'schere') {
      gewinner.innerHTML = '(and as it always has) 👗🤘🎸 Rock crushes Scissors ✂️';
      playerHand.innerHTML = '👊';
      computerHand.innerHTML = '✌️';
      playerPunkte += 1;
    }
    if (player === 'stein' && zufallsHand === 'stein') {
      gewinner.innerHTML = `🤘🎸it's rockin' roll🤘🎸`;
      playerHand.innerHTML = '👊';
      computerHand.innerHTML = '👊';
    }
    if (player === 'stein' && zufallsHand === 'papier') {
      gewinner.innerHTML = 'Paper covers Rock 🗞🕵️‍♀️🤘🎸';
      playerHand.innerHTML = '👊';
      computerHand.innerHTML = '🖐';
      computerPunkte += 1;
    }
    if (player === 'stein' && zufallsHand === 'spock') {
      gewinner.innerHTML = 'Spock vaporizes Rock! 🖖🔫🤘🎸';
      playerHand.innerHTML = '👊';
      computerHand.innerHTML = '🖖';
      computerPunkte += 1;
    }
    if (player === 'stein' && zufallsHand === 'lizard') {
      gewinner.innerHTML = 'Rock crushes Lizard 🤘🎸🦎';
      playerHand.innerHTML = '👊';
      computerHand.innerHTML = '🦎';
      playerPunkte += 1;
    }

    /// //////////
    if (player === 'papier' && zufallsHand === 'schere') {
      gewinner.innerHTML = 'Scissors cuts Paper ✂️📜';
      playerHand.innerHTML = '🖐';
      computerHand.innerHTML = '✌️';
      computerPunkte += 1;
    }
    if (player === 'papier' && zufallsHand === 'stein') {
      gewinner.innerHTML = 'Paper covers Rock';
      playerHand.innerHTML = '🖐';
      computerHand.innerHTML = '👊';
      playerPunkte += 1;
    }
    if (player === 'papier' && zufallsHand === 'papier') {
      gewinner.innerHTML = `🔥 it's a tie 🔥`;
      playerHand.innerHTML = '🖐';
      computerHand.innerHTML = '🖐';
    }

    if (player === 'papier' && zufallsHand === 'spock') {
      gewinner.innerHTML = 'Paper disproves Spock 👩‍🎓📚🤟💪🖖';
      playerHand.innerHTML = '🖐';
      computerHand.innerHTML = '🖖';
      playerPunkte += 1;
    }
    if (player === 'papier' && zufallsHand === 'lizard') {
      gewinner.innerHTML = 'Lizard eats Paper 🦎🍽😋📄';
      playerHand.innerHTML = '🖐';
      computerHand.innerHTML = '🦎';
      computerPunkte += 1;
    }
    /// //////////
    if (player === 'spock' && zufallsHand === 'schere') {
      gewinner.innerHTML = 'Spock smashes Scissors 🖖🪓✂️';
      playerHand.innerHTML = '🖖';
      computerHand.innerHTML = '✌️';
      playerPunkte += 1;
    }
    if (player === 'spock' && zufallsHand === 'stein') {
      gewinner.innerHTML = 'Spock vaporizes Rock 🖖🔫🤘🎸';
      playerHand.innerHTML = '🖖';
      computerHand.innerHTML = '👊';
      playerPunkte += 1;
    }
    if (player === 'spock' && zufallsHand === 'papier') {
      gewinner.innerHTML = 'Paper disproves Spock 👩‍🎓📚🤟💪🖖';
      playerHand.innerHTML = '🖖';
      computerHand.innerHTML = '🖐';
      computerPunkte += 1;
    }

    if (player === 'spock' && zufallsHand === 'spock') {
      gewinner.innerHTML = 'New Spock meets Old Spock 🖖🕔🚀🕤🤪';
      playerHand.innerHTML = '🖖';
      computerHand.innerHTML = '🖖';
    }
    if (player === 'spock' && zufallsHand === 'lizard') {
      gewinner.innerHTML = 'Lizard poisons Spock 🖖🤢🍄🍭🤪';
      playerHand.innerHTML = '🖖';
      computerHand.innerHTML = '🦎';
      computerPunkte += 1;
    }
    /// //////////
    if (player === 'lizard' && zufallsHand === 'schere') {
      gewinner.innerHTML = 'Scissors decapitates Lizard ✂️🦎😵';
      playerHand.innerHTML = '🦎';
      computerHand.innerHTML = '✌️';
      computerPunkte += 1;
    }
    if (player === 'lizard' && zufallsHand === 'stein') {
      gewinner.innerHTML = 'Rock crushes Lizard 🤘🎸🪓🦎';
      playerHand.innerHTML = '🦎';
      computerHand.innerHTML = '👊';
      computerPunkte += 1;
    }
    if (player === 'lizard' && zufallsHand === 'papier') {
      gewinner.innerHTML = 'Lizard eats Paper 🦎🍽📄😋';
      playerHand.innerHTML = '🦎';
      computerHand.innerHTML = '🖐';
      playerPunkte += 1;
    }

    if (player === 'lizard' && zufallsHand === 'spock') {
      gewinner.innerHTML = 'Lizard poisons Spock 🖖🤢🍄🍭🤪';
      playerHand.innerHTML = '🦎';
      computerHand.innerHTML = '🖖';
      playerPunkte += 1;
    }
    if (player === 'lizard' && zufallsHand === 'lizard') {
      gewinner.innerHTML = `🦎 vs 🦎 === it's a tie`;
      playerHand.innerHTML = '🦎';
      computerHand.innerHTML = '🦎';
    }

    document.getElementById('computer-punkte').innerHTML = computerPunkte;
    document.getElementById('player-punkte').innerHTML = playerPunkte;
    gewinnerErmittlung(playerPunkte, computerPunkte);
    einerVon(playerPunkte, computerPunkte);
  }, 500);

  playerHand.style.animation = 'flipIt 0.5s linear both';
  computerHand.style.animation = 'flipIt 0.5s linear both';
};

for (const singleButton of buttons) {
  singleButton.addEventListener('click', playhand);
}

function handler(ev) {
  const e = ev || window.Event;
  const target = e.target || e.srcElement;
  this.classList.toggle('selected');
  // console.log(`geklickt auf Knoten mit TARGET ID ${target.id}`);
  // console.log(`geklickt auf Knoten mi ID ${this.id}`);
  // console.log(target.classList);
  // console.log(this);

  target.style.backgroundColor = `#495464`;
  target.style.color = 'snow';
  target.classList.toggle('selected1');
}
function init() {
  const elements = document.querySelectorAll('.button');
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', handler, false);
  }
}

startGame();
document.addEventListener('DOMContentLoaded', init);

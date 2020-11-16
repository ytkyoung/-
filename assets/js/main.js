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
// const gameTextBanner = document.querySelector('.game-text-banner');
const rundenAktuell = document.getElementById('runden-anzahl');
const bisherigeErgebnisseAnzeige = document.getElementById('demo1');
// const res = document.getElementById('demo');
const avatarPlayer = [
  '😄',
  '😁',
  '😆',
  '🤗',
  '🤓',
  '😎',
  '😙',
  '😚',
  '🤠',
  '👴',
  '😋',
  '😜',
  '👵',
  '👰',
  '🤣',
  '👸',
  '👩‍🌾',
  '👨‍🚀',
];
const avatarComputer = ['🤖', '👾', '👻', '👽', '💻', '🖥', '🕹', '🤡', '💩', '🎃', '🔥', '⚡️', '🛸', '🚀', '📼'];
const avatarVictory = ['😝', '😜', '😁', '😄', '😀', '😍', '🥳', '🤩', '😈', '😘', '🤗', '😏', '😝', '😎', '😅', '🥴'];
const avatarLost = ['😩', '😮', '😬', '😕', '😳', '😑', '🙄', '🤕', '🤮', '😤', '😯', '😥', '🤪', '😖', '😲', '😱'];
const playerHand = document.getElementById('player-hand');
const computerHand = document.getElementById('computer-hand');
const haendeZusammen = document.querySelectorAll('.haende .hands');

haendeZusammen.forEach(hand => {
  hand.addEventListener('animationend', function() {
    this.style.animation = '';
  });
});

const start = function() {
  // const game = document.querySelector('game');
  const gameText = document.querySelector('.game-text');
  const gameRunden = document.querySelector('.game-runden');
  // const formular = document.querySelector('.formular');
  const gameScoreBoard = document.querySelector('.game-score-board');
  const intro = document.querySelector('.intro');
  const restart = document.querySelector('.restart');

  // const gameAuswahl = document.querySelector('game-auswahl');
  // const gameErgebnisse = document.querySelector('game-ergebnisse');
  // const restartScreen = document.querySelector('.restart');

  const x = `#232f34`;
  const y = `#f4f4f2`;
  const z = 'lightgray';
  const anzeigeX = [gameText, gameRunden];
  const anzeigeY = [intro, restart];
  const anzeigeZ = [gameScoreBoard];

  anzeigeX.map(el => (el.style.backgroundColor = x));
  anzeigeX.map(el => (el.style.color = 'snow'));
  anzeigeY.map(el => (el.style.backgroundColor = y));
  anzeigeZ.map(el => (el.style.backgroundColor = z));
};
start();

const randomNumber = function(arrayLaenge) {
  return Math.floor(Math.random() * arrayLaenge.length);
};

let avaPlRanAktuell = '';
let avaCoRanAktuell = '';
const randomAvatarP = function() {
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
const zitate = ['Beam me up, Scotty 👨🏻‍🚀🛸', ' Fascinating!🖖', '🖖 Live long and prosper'];
const randomZitat = () => zitate[randomNumber(zitate)];

const mitte = () => {
  document.getElementById('letsPlay').innerHTML = 'finde dein Mitte, ohhhmmmmm 🍳';
};
const kreis = document.querySelector('.versus');

const reset = () => {
  // console.log('resettttt');

  playerPunkte = 0;
  computerPunkte = 0;
  rundenAktuell.innerHTML = `가위✌️ 바위👊 보🖐 스팍🖖 도마뱀🦎 0/${rundenAnzahl}`;
  document.getElementById('player-punkte').innerHTML = 0;
  document.getElementById('computer-punkte').innerHTML = 0;
  document.getElementById('letsPlay').innerHTML = randomZitat();
  const restartScreen = document.querySelector('.restart');
  restartScreen.classList.add('fadeOut');
  bisherigeErgebnisse = [];
  winnerAusgabe = [];
  bisherigeErgebnisseAnzeige.innerHTML = bisherigeErgebnisse;

  playerHand.classList.remove('winnerFarbePlayer');
  computerHand.classList.remove('winnerFarbeComputer');
  randomAvatarP();
  document.getElementById('muhammad-ali').style.opacity = '0';
};

const motivation = [
  `Weiter rudern 🚣‍♀️🚣‍♀️🚣‍♀️!`,
  'As you think, so shall you become 🥋🤸‍♂️',
  '🐳 done, dieser Kreis in der Mitte...🤔',
];
const randomMotivation = () => motivation[randomNumber(motivation)];

const winStats = function() {
  const createdDiv = document.querySelectorAll('.lastThreeRounds');

  if (createdDiv.length % 4 === 0) {
    document.getElementById('restart-text').innerHTML = randomMotivation();
    document.querySelector('.last3').innerHTML = ``;
    return createdDiv.forEach(el => el.remove());
  }
  document.getElementById('restart-text').innerHTML = randomMotivation();

  let plural;
  if (createdDiv.length > 1) {
    plural = 'rounds';
  } else {
    plural = 'lost';
  }
  document.querySelector('.last3').innerHTML = `Last ${createdDiv.length} ${plural}`;
};

// im restart Fenster zeigt den Gewinner
const create = function() {
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

  document.getElementById('winner').innerHTML = `<h4>${winner}</h4>`;

  restartButton.innerHTML = 'Restart';
  restartButton.addEventListener('click', () => reset());
  create();
};
// Runden
const runden = document.getElementsByName('runden');
// Wie viele Runden?
const rundenModi = function(e) {
  // console.log(e.target.id);
  // console.log(e.target.value);
  // console.log(e.target.checked);
  rundenAnzahl = e.target.value;
  rundenAktuell.innerHTML = `가위✌️ 바위👊 보🖐 스팍🖖 도마뱀🦎 ${aktuelleRunde}/${e.target.value}`;

  reset();
};

for (const singleRunde of runden) {
  singleRunde.addEventListener('click', rundenModi);
}

// Runden Spielstand 0/5 1/5 usw aktuelle Runde
function einerVon(playerP, computerP) {
  const spielstand = playerP + computerP;
  rundenAktuell.innerHTML = `가위✌️ 바위👊 보🖐 스팍🖖 도마뱀🦎 ${spielstand}/${rundenAnzahl}`;
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
      playerHand.classList.add('winnerFarbePlayer');
      computerHand.classList.remove('winnerFarbeComputer');
    } else if (playerP < computerP) {
      winner = `Comp wins ${avaCoRanAktuell}`;
      winnerAusgabe = avatarLost[randomNumber(avatarLost)];
      thumbAusgabe = '👎';
      playerHand.classList.remove('winnerFarbePlayer');
      computerHand.classList.add('winnerFarbeComputer');
    }

    restartGame();
    // setTimeout(() => {
    //   restartGame();
    // }, 500);
  }
}

// button player1
const buttons = document.querySelectorAll('.game-auswahl > button');
const playhand = function(e) {
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

  document.getElementById('muhammad-ali').style.opacity = '0';

  setTimeout(() => {
    playerHand.classList.remove('winnerFarbePlayer');
    computerHand.classList.remove('winnerFarbeComputer');

    // ZufallsHaende
    const haende = [
      { wert: 'schere', symbol: '✌️', farbe: 'red' },
      { wert: 'stein', symbol: '👊', farbe: 'blue' },
      { wert: 'papier', symbol: '🖐', farbe: 'yellow' },
      { wert: 'spock', symbol: '🖖', farbe: 'green' },
      { wert: 'lizard', symbol: '🦎', farbe: 'orange' },
    ];

    const haendeWert = haende.map(x => x.wert);
    const haendeSymbol = haende.map(x => x.symbol);
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

    const winColorDraw = function() {
      setTimeout(() => {
        computerHand.classList.add('winnerFarbeComputer');
        playerHand.classList.add('winnerFarbePlayer');
      }, 500);
    };

    const winColorPlayer = function() {
      setTimeout(() => {
        playerHand.classList.add('winnerFarbePlayer');
      }, 500);
    };

    const winColorComputer = function() {
      setTimeout(() => {
        computerHand.classList.add('winnerFarbeComputer');
      }, 500);
    };

    const gewinner = document.querySelector('.game-text-banner > h4');
    if (player === 'schere' && zufallsHand === 'schere') {
      gewinner.innerHTML = `✌️ it's a tie ✌️`;
      playerHand.innerHTML = '✌️';
      computerHand.innerHTML = '✌️';
      winColorDraw();
    }
    if (player === 'schere' && zufallsHand === 'stein') {
      gewinner.innerHTML = '(and as it always has) 💃 Rock crushes Scissors';
      playerHand.innerHTML = '✌️';
      computerHand.innerHTML = '👊';
      computerPunkte += 1;
      winColorComputer();
    }
    if (player === 'schere' && zufallsHand === 'papier') {
      gewinner.innerHTML = 'Scissors cuts Paper';
      playerHand.innerHTML = '✌️';
      computerHand.innerHTML = '🖐';
      playerPunkte += 1;
      winColorPlayer();
    }
    if (player === 'schere' && zufallsHand === 'spock') {
      gewinner.innerHTML = 'Spock smashes Scissors 🖖🔫🪓✂️✂️';
      playerHand.innerHTML = '✌️';
      computerHand.innerHTML = '🖖';
      computerPunkte += 1;
      winColorComputer();
    }
    if (player === 'schere' && zufallsHand === 'lizard') {
      gewinner.innerHTML = 'Scissors decapitates Lizard ✂️🦎😵';
      playerHand.innerHTML = '✌️';
      computerHand.innerHTML = '🦎';
      playerPunkte += 1;
      winColorPlayer();
    }
    // / //////////
    if (player === 'stein' && zufallsHand === 'schere') {
      gewinner.innerHTML = '(and as it always has) 👗🤘🎸 Rock crushes Scissors ✂️';
      playerHand.innerHTML = '👊';
      computerHand.innerHTML = '✌️';
      playerPunkte += 1;
      winColorPlayer();
    }
    if (player === 'stein' && zufallsHand === 'stein') {
      gewinner.innerHTML = `🤘🎸it's rockin' roll🤘🎸`;
      playerHand.innerHTML = '👊';
      computerHand.innerHTML = '👊';
      winColorDraw();
    }
    if (player === 'stein' && zufallsHand === 'papier') {
      gewinner.innerHTML = 'Paper covers Rock 🗞🕵️‍♀️🤘🎸';
      playerHand.innerHTML = '👊';
      computerHand.innerHTML = '🖐';
      computerPunkte += 1;
      winColorComputer();
    }
    if (player === 'stein' && zufallsHand === 'spock') {
      gewinner.innerHTML = 'Spock vaporizes Rock! 🖖🔫🤘🎸';
      playerHand.innerHTML = '👊';
      computerHand.innerHTML = '🖖';
      computerPunkte += 1;
      winColorComputer();
    }
    if (player === 'stein' && zufallsHand === 'lizard') {
      gewinner.innerHTML = '🤘🎸 Rock crushes Lizard 🦎';
      playerHand.innerHTML = '👊';
      computerHand.innerHTML = '🦎';
      playerPunkte += 1;
      winColorPlayer();
    }

    // / //////////
    if (player === 'papier' && zufallsHand === 'schere') {
      gewinner.innerHTML = '✂️ Scissors cuts Paper 📜';
      playerHand.innerHTML = '🖐';
      computerHand.innerHTML = '✌️';
      computerPunkte += 1;
      winColorComputer();
    }
    if (player === 'papier' && zufallsHand === 'stein') {
      gewinner.innerHTML = '📝 Paper covers Rock 🌚';
      playerHand.innerHTML = '🖐';
      computerHand.innerHTML = '👊';
      playerPunkte += 1;
      winColorPlayer();
    }
    if (player === 'papier' && zufallsHand === 'papier') {
      gewinner.innerHTML = `🔥 it's a tie 🔥`;
      playerHand.innerHTML = '🖐';
      computerHand.innerHTML = '🖐';
      winColorDraw();
    }

    if (player === 'papier' && zufallsHand === 'spock') {
      gewinner.innerHTML = 'Paper disproves Spock 👩‍🎓📚🤟💪🖖';
      playerHand.innerHTML = '🖐';
      computerHand.innerHTML = '🖖';
      playerPunkte += 1;
      winColorPlayer();
    }
    if (player === 'papier' && zufallsHand === 'lizard') {
      gewinner.innerHTML = 'Lizard eats Paper 🦎🍽😋📄';
      playerHand.innerHTML = '🖐';
      computerHand.innerHTML = '🦎';
      computerPunkte += 1;
      winColorComputer();
    }
    // / //////////
    if (player === 'spock' && zufallsHand === 'schere') {
      gewinner.innerHTML = 'Spock smashes Scissors 🖖🪓✂️';
      playerHand.innerHTML = '🖖';
      computerHand.innerHTML = '✌️';
      playerPunkte += 1;
      winColorPlayer();
    }
    if (player === 'spock' && zufallsHand === 'stein') {
      gewinner.innerHTML = 'Spock vaporizes Rock 🖖🔫🤘🎸';
      playerHand.innerHTML = '🖖';
      computerHand.innerHTML = '👊';
      playerPunkte += 1;
      winColorPlayer();
    }
    if (player === 'spock' && zufallsHand === 'papier') {
      gewinner.innerHTML = 'Paper disproves Spock 👩‍🎓📚🤟💪🖖';
      playerHand.innerHTML = '🖖';
      computerHand.innerHTML = '🖐';
      computerPunkte += 1;
      winColorComputer();
    }

    if (player === 'spock' && zufallsHand === 'spock') {
      gewinner.innerHTML = 'New Spock meets Old Spock 🖖🕔🚀🕤🤪';
      playerHand.innerHTML = '🖖';
      computerHand.innerHTML = '🖖';
      winColorDraw();
    }
    if (player === 'spock' && zufallsHand === 'lizard') {
      gewinner.innerHTML = 'Lizard poisons Spock 🖖🤢🍄🍭🤪';
      playerHand.innerHTML = '🖖';
      computerHand.innerHTML = '🦎';
      computerPunkte += 1;
      winColorComputer();
    }
    // / //////////
    if (player === 'lizard' && zufallsHand === 'schere') {
      gewinner.innerHTML = 'Scissors decapitates Lizard ✂️🦎😵';
      playerHand.innerHTML = '🦎';
      computerHand.innerHTML = '✌️';
      computerPunkte += 1;
      winColorComputer();
    }
    if (player === 'lizard' && zufallsHand === 'stein') {
      gewinner.innerHTML = 'Rock crushes Lizard 🤘🎸🪓🦎';
      playerHand.innerHTML = '🦎';
      computerHand.innerHTML = '👊';
      computerPunkte += 1;
      winColorComputer();
    }
    if (player === 'lizard' && zufallsHand === 'papier') {
      gewinner.innerHTML = 'Lizard eats Paper 🦎🍽📄😋';
      playerHand.innerHTML = '🦎';
      computerHand.innerHTML = '🖐';
      playerPunkte += 1;
      winColorPlayer();
    }

    if (player === 'lizard' && zufallsHand === 'spock') {
      gewinner.innerHTML = 'Lizard poisons Spock 🖖🤢🍄🍭🤪';
      playerHand.innerHTML = '🦎';
      computerHand.innerHTML = '🖖';
      playerPunkte += 1;
      winColorPlayer();
    }
    if (player === 'lizard' && zufallsHand === 'lizard') {
      gewinner.innerHTML = `🦎 vs 🦎 === it's a tie`;
      playerHand.innerHTML = '🦎';
      computerHand.innerHTML = '🦎';
      winColorDraw();
    }

    document.getElementById('computer-punkte').innerHTML = computerPunkte;
    document.getElementById('player-punkte').innerHTML = playerPunkte;
    gewinnerErmittlung(playerPunkte, computerPunkte);
    einerVon(playerPunkte, computerPunkte);
  }, 500);
  kreis.addEventListener('click', mitte);
  document.querySelector('.left').style.animation = 'flipIt 0.5s linear both';
  document.querySelector('.right').style.animation = 'flipIt 0.5s linear both';
};

function init() {
  for (const singleButton of buttons) {
    singleButton.addEventListener('click', playhand);
  }
}

startGame();
document.addEventListener('DOMContentLoaded', init);

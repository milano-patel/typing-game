const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game (could use api to do so by setting up a function)
const words = [
  'calculator',
  'grandfather',
  'inject',
  'exuberant',
  'battle',
  'cabbage',
  'knot',
  'spell',
  'waiting',
  'bluebird',
  'activity',
  'doll',
  'porter',
  'add',
  'settle',
  'absolute',
];

let randomWord;

let score = 0;

let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = difficulty;

// Difficulty Level
function difficultyLevel(){
  if(difficulty === 'easy'){
    return 5;
  } else if(difficulty === 'medium'){
    return 3;
  } else if(difficulty === 'hard'){
    return 1;
  }
}

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Random word generator function
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Update the score
function updateScore() {
  score++;
  scoreEl.innerText = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if(time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// Gameover, show end screen
function gameOver(){
  endgameEl.style.display = 'flex';
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score} </p>
    <button onclick="location.reload()">Reload</button>
  `;
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

addWordToDOM();

// Event Listener

text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if(insertedText === randomWord){
    addWordToDOM();
    updateScore();

    e.target.value = '';

    time += difficultyLevel();
  }

});

// Settings

settingsBtn.addEventListener('click', () =>
settings.classList.toggle('hide'));

settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
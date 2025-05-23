let playerScore = 0;
let computerScore = 0;
let draws = 0;
let gameHistory = [];

// DOM elements
const choices = document.querySelectorAll('.choice');
const playerScoreElement = document.querySelector('.player .score-number');
const computerScoreElement = document.querySelector('.computer .score-number');
const drawsElement = document.querySelector('.draws .score-number');
const gameResult = document.querySelector('.game-result');
const resetButton = document.querySelector('.reset-button');
const historyList = document.querySelector('.history-list');

// Game choices
const gameChoices = ['rock', 'paper', 'scissors'];

// Get computer choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * gameChoices.length);
  return gameChoices[randomIndex];
}

// Determine winner
function getWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return 'draw';
  
  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'win';
  }
  
  return 'lose';
}

// Update game history
function updateHistory(playerChoice, computerChoice, result) {
  const historyItem = document.createElement('div');
  historyItem.className = 'history-item fade-in';
  
  historyItem.innerHTML = `
    <div class="history-icons">
      <span class="history-icon">${getEmoji(playerChoice)}</span>
      <span>vs</span>
      <span class="history-icon">${getEmoji(computerChoice)}</span>
    </div>
    <span class="history-result ${result}">${result.charAt(0).toUpperCase() + result.slice(1)}</span>
  `;
  
  historyList.insertBefore(historyItem, historyList.firstChild);
  
  // Keep only last 10 moves
  if (historyList.children.length > 10) {
    historyList.removeChild(historyList.lastChild);
  }
}

// Get emoji for choice
function getEmoji(choice) {
  const emojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
  };
  return emojis[choice];
}

// Play round
function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = getWinner(playerChoice, computerChoice);
  
  // Update scores
  if (result === 'win') {
    playerScore++;
    playerScoreElement.textContent = playerScore;
    gameResult.textContent = 'You win! 🎉';
    gameResult.className = 'game-result result-win';
  } else if (result === 'lose') {
    computerScore++;
    computerScoreElement.textContent = computerScore;
    gameResult.textContent = 'Computer wins! 😔';
    gameResult.className = 'game-result result-lose';
  } else {
    draws++;
    drawsElement.textContent = draws;
    gameResult.textContent = 'It\'s a draw! 🤝';
    gameResult.className = 'game-result result-draw';
  }
  
  // Update history
  updateHistory(playerChoice, computerChoice, result);
  
  // Add battle animation
  const playerChoiceElement = document.querySelector(`[data-choice="${playerChoice}"]`);
  playerChoiceElement.classList.add('battle');
  setTimeout(() => playerChoiceElement.classList.remove('battle'), 500);
}

// Event listeners
choices.forEach(choice => {
  choice.addEventListener('click', () => {
    const playerChoice = choice.dataset.choice;
    playRound(playerChoice);
  });
});

// Reset game
resetButton.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  draws = 0;
  playerScoreElement.textContent = '0';
  computerScoreElement.textContent = '0';
  drawsElement.textContent = '0';
  gameResult.textContent = 'Make your first move!';
  gameResult.className = 'game-result';
  historyList.innerHTML = '';
});
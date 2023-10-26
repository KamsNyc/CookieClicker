// Elements
const scoreElement = document.querySelector('.clicks');
const cookieElement = document.querySelector('.cookie');
const shopButton = document.querySelector('.shop-button');
const shopPopup = document.querySelector('.shop-popup');
const shopMenu = document.querySelector('.shop-menu');
const upgradeItems = document.querySelectorAll('.upgrade-item');
const highScoreElement = document.querySelector('.high-score-value');
const musicButton = document.querySelector('.music-button');
const backgroundMusic = document.getElementById('background-music');
const clickSound = new Audio('cookie-click.mp3');
const progressBar = document.querySelector('.progress-bar');
const rankValue = document.querySelector('.rank-value');
const statsBox = document.querySelector('.stats-box');

// Game state
let score = 0;
let autoClickerEnabled = false;
let helperEnabled = false;
let scoreBoostEnabled = false;
let megaClickerEnabled = false;
let highScore = 0;
let progressBarValue = 0;
let rank = 'Bronze';

// Load game state from local storage
function loadGameState() {
  const savedScore = localStorage.getItem('score');
  const savedHighScore = localStorage.getItem('highScore');
  const savedAutoClicker = localStorage.getItem('autoClicker');
  const savedHelper = localStorage.getItem('helper');
  const savedScoreBoost = localStorage.getItem('scoreBoost');
  const savedMegaClicker = localStorage.getItem('megaClicker');
  const savedProgressBarValue = localStorage.getItem('progressBarValue');
  const savedRank = localStorage.getItem('rank');

  if (savedScore) {
    score = parseInt(savedScore);
    scoreElement.textContent = score;
  }

  if (savedHighScore) {
    highScore = parseInt(savedHighScore);
    highScoreElement.textContent = highScore;
  }

  if (savedAutoClicker === 'true') {
    enableAutoClicker();
  }

  if (savedHelper === 'true') {
    enableHelper();
  }

  if (savedScoreBoost === 'true') {
    enableScoreBoost();
  }

  if (savedMegaClicker === 'true') {
    enableMegaClicker();
  }

  if (savedProgressBarValue) {
    progressBarValue = parseInt(savedProgressBarValue);
    updateProgressBar();
  }

  if (savedRank) {
    rank = savedRank;
    rankValue.textContent = rank;
  }
}

// Save game state to local storage
function saveGameState() {
  localStorage.setItem('score', score);
  localStorage.setItem('highScore', highScore);
  localStorage.setItem('autoClicker', autoClickerEnabled);
  localStorage.setItem('helper', helperEnabled);
  localStorage.setItem('scoreBoost', scoreBoostEnabled);
  localStorage.setItem('megaClicker', megaClickerEnabled);
  localStorage.setItem('progressBarValue', progressBarValue);
  localStorage.setItem('rank', rank);
}

// Update the high score
function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    highScoreElement.textContent = highScore;
    localStorage.setItem('highScore', highScore);
  }
}

// Update the progress bar and rank
function updateProgressBar() {
  progressBar.style.width = progressBarValue + '%';

  if (progressBarValue >= 100) {
    rank = 'Gold';
  } else if (progressBarValue >= 75) {
    rank = 'Silver';
  } else if (progressBarValue >= 50) {
    rank = 'Bronze';
  } else {
    rank = 'Beginner';
  }

  rankValue.textContent = rank;
}

// Handle cookie click
function handleClick() {
  score++;
  scoreElement.textContent = score;
  updateFontColor();
  playChimeSound();

  // Add animation for cookie click
  cookieElement.classList.add('clicked');

  // Remove animation class after the animation completes
  setTimeout(() => {
    cookieElement.classList.remove('clicked');
  }, 400);

  // Update progress bar value
  progressBarValue = (score / 1000) * 100;
  updateProgressBar();
}

function updateFontColor() {
  var colors = ['red', 'blue', 'green', 'orange', 'purple']; // List of colors to cycle through
  var colorIndex = score % colors.length; // Calculate the index based on score
  scoreElement.style.color = colors[colorIndex];
}

function playChimeSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// Enable Auto Clicker ability
function enableAutoClicker() {
  if (autoClickerEnabled) return;
  autoClickerEnabled = true;

  // Add animation for Auto Clicker
  cookieElement.classList.add('auto-clicker');

  autoClickerIntervalId = setInterval(clickCookie, 1000);
}

// Disable Auto Clicker ability
function disableAutoClicker() {
  if (!autoClickerEnabled) return;
  autoClickerEnabled = false;

  // Remove animation for Auto Clicker
  cookieElement.classList.remove('auto-clicker');

  clearInterval(autoClickerIntervalId);
}

// Handle clicking the cookie for Auto Clicker ability
function clickCookie() {
  score++;
  scoreElement.textContent = score;

  // Show click emoji animation
  clickEmojiElement.style.opacity = '1';
  setTimeout(() => {
    clickEmojiElement.style.opacity = '0';
  }, 500);

  // Update progress bar value
  progressBarValue = (score / 1000) * 100;
  updateProgressBar();
}

// Enable Helper ability
function enableHelper() {
  if (helperEnabled) return;
  helperEnabled = true;

  // Add animation for Helper
  cookieElement.classList.add('helper');
}

// Disable Helper ability
function disableHelper() {
  if (!helperEnabled) return;
  helperEnabled = false;

  // Remove animation for Helper
  cookieElement.classList.remove('helper');
}

// Enable Score Boost ability
function enableScoreBoost() {
  if (scoreBoostEnabled) return;
  scoreBoostEnabled = true;

  // Add animation for Score Boost
  cookieElement.classList.add('score-boost');
  scoreElement.classList.add('score-boosted');
}

// Disable Score Boost ability
function disableScoreBoost() {
  if (!scoreBoostEnabled) return;
  scoreBoostEnabled = false;

  // Remove animation for Score Boost
  cookieElement.classList.remove('score-boost');
  scoreElement.classList.remove('score-boosted');
}

// Enable Mega Clicker ability
function enableMegaClicker() {
  if (megaClickerEnabled) return;
  megaClickerEnabled = true;

  // Add animation for Mega Clicker
  cookieElement.classList.add('mega-clicker');
}

// Disable Mega Clicker ability
function disableMegaClicker() {
  if (!megaClickerEnabled) return;
  megaClickerEnabled = false;

  // Remove animation for Mega Clicker
  cookieElement.classList.remove('mega-clicker');
}

// Handle shop button click
function handleShopClick() {
  shopMenu.classList.toggle('show');
}

// Handle upgrade item click
function handleUpgradeItemClick(event) {
  const item = event.target;
  const itemPrice = parseInt(item.dataset.price);

  if (score >= itemPrice) {
    score -= itemPrice;
    scoreElement.textContent = score;
    item.classList.add('purchased');
    item.textContent = 'Purchased';

    // Apply the ability based on the selected item
    if (item.classList.contains('upgrade-item:nth-child(1)')) {
      enableAutoClicker();
    } else if (item.classList.contains('upgrade-item:nth-child(2)')) {
      enableHelper();
    } else if (item.classList.contains('upgrade-item:nth-child(3)')) {
      enableScoreBoost();
    } else if (item.classList.contains('upgrade-item:nth-child(4)')) {
      enableMegaClicker();
    }

    // Update high score if necessary
    updateHighScore();
  } else {
    item.textContent = 'Not enough cookies';
  }
}

// Handle music button click
function handleMusicButtonClick() {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    musicButton.classList.remove('play');
    musicButton.classList.add('pause');
  } else {
    backgroundMusic.pause();
    musicButton.classList.remove('pause');
    musicButton.classList.add('play');
  }
}

// Initialize the game
function init() {
  loadGameState();

  // Event listeners
  cookieElement.addEventListener('click', handleClick);
  shopButton.addEventListener('click', handleShopClick);
  upgradeItems.forEach((item) => {
    item.addEventListener('click', handleUpgradeItemClick);
  });

  musicButton.addEventListener('click', handleMusicButtonClick);

  // Save game state whenever the window is closed or refreshed
  window.addEventListener('beforeunload', saveGameState);
}

// Call init to start the game
init();

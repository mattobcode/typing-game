const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const diffSelect = document.getElementById('difficulty');



// List of words for game
const words = [
    'pepper',
    'fly',
    'bike',
    'mystery',
    'safari',
    'jockey',
    'collapse',
    'audience',
    'glory',
    'confrontation',
    'eavesdrop',
    'motorist',
    'restoration',
    'clearance',
    'matto'
];

// init word
let randomWord;

// init score
let score = 0;

// init time
let time= 10;

// init difficulty and set it to localStorage
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//set difficulty select value
diffSelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';



// focus the text at start
text.focus();

// start counting down
const timeInterval = setInterval(updateTime, 1000);

// random word generation from array words
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
};

// add the random word to DOM
function addWordToDom(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
};

// updating the score if correct
function updateScore(){
    score++;
    scoreEl.innerHTML = score;
};

// update time
function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0){
        clearInterval(timeInterval);
        //end the game
        gameOver();
    }
};

// game over function -> show end screen
function gameOver(){

    endgameEl.innerHTML = `
    <h1>Time is over</h1>
    <p>Your final score is <b>${score}</b></p>
    <button onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
};

addWordToDom();

text.addEventListener('input', e =>{
    const insertedText = e.target.value;
    
    if(insertedText == randomWord){
        addWordToDom();
        updateScore();

        //clear 
        e.target.value = '';

        // add time based on difficulty
        if (difficulty == 'easy'){
            time += 5;
        } else if (difficulty== 'medium'){
            time += 3;
        } else {
            time +=2;
        }
    }
});


// settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// settings select
settingsForm.addEventListener('change', e =>{
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});


const elements = {
    word: document.getElementById("word"),
    textInput: document.getElementById("text"),
    domScore: document.getElementById("score"),
    domTime: document.getElementById("time"),
    domEndgame: document.getElementById("end-game-container"),
    settingsBtn: document.getElementById("settings-btn"),
    settings: document.getElementById("settings"),
    settingsForm: document.getElementById("settings-form"),
    difficultySelect: document.getElementById("difficulty"),
};

const words = [
    "sigh",
    "tense",
    "airplane",
    "ball",
    "pies",
    "juice",
    "warlike",
    "bad",
    "north",
    "dependent",
    "steer",
    "silver",
    "highfalutin",
    "superficial",
    "quince",
    "eight",
    "feeble",
    "admit",
    "drag",
    "loving",
    "programming",
    "developer",
    "javascript",
];

let randomWord;

let score = 0;

let time = 10;

const getRandomWord = arr => arr[Math.floor(Math.random() * arr.length)];

const displayWord = _ => {
    randomWord = getRandomWord(words);

    elements.word.textContent = randomWord;
};
displayWord();

const updateScore = _ => {
    score++;
    elements.domScore.textContent = score;
};

const gameOver = score => {
    elements.domEndgame.insertAdjacentHTML(
        "afterbegin",
        `
            <span>Time ran out</span>
            <p>Your final score is: <span>${score}</span></p>
            <button onclick="location.reload()">play again</button>
        `,
    );

    elements.domEndgame.classList.add("show");
};

let interval;
const updateTime = (timeVal = 0) => {
    time += timeVal;

    if (time > 0) time--;
    else {
        clearInterval(interval);
        gameOver(score);
    }

    elements.domTime.textContent = `${time}s`;
};
interval = setInterval(updateTime, 1000);

elements.textInput.addEventListener("input", ({ currentTarget: input }) => {
    let enteredWord = input.value.trim().toLowerCase();

    let { time: timeVal } = elements.difficultySelect[elements.difficultySelect.selectedIndex].dataset;

    if (enteredWord === randomWord && time) {
        updateTime(+timeVal);
        updateScore();
        displayWord();
        input.value = "";
    }
});

elements.settingsBtn.addEventListener("click", _ => elements.settings.classList.toggle("show-settings"));

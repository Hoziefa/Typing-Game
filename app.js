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

const state = {
    words: [
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
    ],
    randomWord: "",
    score: 0,
    time: 10,
    interval: null,
};

const setState = (newState = {}, prevState = state) => Object.assign(prevState, newState);

const getRandomWord = arr => arr[Math.floor(Math.random() * arr.length)];

const displayWord = () => {
    setState({ randomWord: getRandomWord(state.words) });

    elements.word.textContent = state.randomWord;
};

const updateScore = () => {
    setState({ score: state.score + 1 });
    elements.domScore.textContent = state.score;
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

const updateTime = (timeVal = 0) => {
    timeVal && setState({ time: state.time + timeVal });

    if (state.time <= 0) {
        clearInterval(state.interval);
        gameOver(state.score);
    } else setState({ time: state.time - 1 });

    elements.domTime.textContent = `${state.time}s`;
};

elements.textInput.addEventListener("input", ({ currentTarget: input }) => {
    let enteredWord = input.value.trim().toLowerCase();

    let { time: timeVal } = elements.difficultySelect[elements.difficultySelect.selectedIndex].dataset;

    if (enteredWord === state.randomWord && state.time) {
        updateTime(+timeVal + 1);
        updateScore();
        displayWord();
        input.value = "";
    }
});

elements.settingsBtn.addEventListener("click", () => elements.settings.classList.toggle("show-settings"));

displayWord();

setState({ interval: setInterval(updateTime, 1000) });

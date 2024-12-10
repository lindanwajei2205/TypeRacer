document.addEventListener('DOMContentLoaded', function() {
    const easyTexts = [
        "The cat sat on the mat.",
        "A quick brown fox jumps over the lazy dog.",
        "She sells seashells by the seashore."
    ];

    const mediumTexts = [
        "To be or not to be, that is the question.",
        "All that glitters is not gold.",
        "A journey of a thousand miles begins with a single step."
    ];

    const hardTexts = [
        "It was the best of times, it was the worst of times.",
        "In the beginning God created the heavens and the earth.",
        "The only thing we have to fear is fear itself."
    ];

    const difficultySelect = document.getElementById('difficulty');
    const sampleTextDiv = document.getElementById('sample-text');
    const startButton = document.getElementById('start-btn');
    const stopButton = document.getElementById('stop-btn');
    const retryButton = document.getElementById('retry-btn');
    const userInput = document.getElementById('user-input');
    const timeDisplay = document.getElementById('time');
    const wpmDisplay = document.getElementById('wpm');
    const levelDisplay = document.getElementById('level');

    let startTime, endTime;

    function getRandomText(textArray) {
        const randomIndex = Math.floor(Math.random() * textArray.length);
        return textArray[randomIndex];
    }

    function updateSampleText() {
        let selectedDifficulty = difficultySelect.value;
        let selectedText;

        if (selectedDifficulty === 'easy') {
            selectedText = getRandomText(easyTexts);
        } else if (selectedDifficulty === 'medium') {
            selectedText = getRandomText(mediumTexts);
        } else if (selectedDifficulty === 'hard') {
            selectedText = getRandomText(hardTexts);
        }

        sampleTextDiv.textContent = selectedText;
        levelDisplay.textContent = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
    }

    function startTest() {
        startTime = new Date();
        startButton.disabled = true;
        stopButton.disabled = false;
        userInput.value = '';
        userInput.disabled = false;
        userInput.focus();
    }

    function stopTest() {
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000;
        timeDisplay.textContent = timeTaken.toFixed(2);
        startButton.disabled = false;
        stopButton.disabled = true;
        userInput.disabled = true;

        const sampleText = sampleTextDiv.textContent.trim();
        const userText = userInput.value.trim();
        const correctWords = calculateCorrectWords(sampleText, userText);
        const wpm = calculateWPM(correctWords, timeTaken);
        wpmDisplay.textContent = wpm;
    }

    function calculateCorrectWords(sampleText, userText) {
        const sampleWords = sampleText.split(' ');
        const userWords = userText.split(' ');
        let correctWords = 0;

        for (let i = 0; i < userWords.length; i++) {
            if (userWords[i] === sampleWords[i]) {
                correctWords++;
            }
        }

        return correctWords;
    }

    function calculateWPM(correctWords, timeTaken) {
        const minutes = timeTaken / 60;
        return Math.round(correctWords / minutes);
    }

    startButton.addEventListener('click', startTest);
    stopButton.addEventListener('click', stopTest);
    retryButton.addEventListener('click', updateSampleText);
    difficultySelect.addEventListener('change', updateSampleText);

    // Initialize with a random text from the default difficulty level
    updateSampleText();
});
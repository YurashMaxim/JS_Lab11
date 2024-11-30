document.addEventListener("DOMContentLoaded", function() {
    const words = [
        {word: 'parley', translation: 'перемовини'},
        {word: 'dog', translation: 'собака'},
        {word: 'fog', translation: 'туман'},
        {word: 'tree', translation: 'дерево'},
        {word: 'car', translation: 'автомобіль'},
        {word: 'smoke', translation: 'дим'},
        {word: 'apple', translation: 'яблуко'},
        {word: 'hand', translation: 'рука'},
        {word: 'ship', translation: 'корабель'},
        {word: 'panda', translation: 'панда'}
    ];

    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let currentStep = 0;
    const totalSteps = words.length;

    const userName = prompt("Please enter your name:");
    $("#userName").text(`Hello, ${userName}!`);

    function updateProgress() {
        $("#progress").text(`Step ${currentStep + 1} of ${totalSteps}`);
        $("#score").html(`<span class="correct">Correct: ${correctAnswers}</span>, <span class="incorrect">Incorrect: ${incorrectAnswers}</span>`);
    }

    function showModal(result) {
        $("#result").text(result);
        $("#modal").css("display", "block");
    }

    $(".close-btn").on('click', function() {
        $("#modal").css("display", "none");
    });

    function showNextCard() {
        if (currentStep < totalSteps) {
            const wordObj = words[currentStep];
            const card = $(`<div class="card">${wordObj.word}</div>`);
            $("#words-container").html(card);
        } else {
            showModal(`Your level: ${(correctAnswers / totalSteps * 100).toFixed(0)}%`);
            $("#words-container").html('<div class="card">Game Over</div>');
            $("#userInput").prop('disabled', true);
            $("#submitBtn").prop('disabled', true);
        }
    }

    $("#submitBtn").on('click', function() {
        const userTranslation = $("#userInput").val().trim().toLowerCase();
        if (userTranslation) {
            const wordObj = words[currentStep];
            if (userTranslation === wordObj.translation.toLowerCase()) {
                correctAnswers++;
            } else {
                incorrectAnswers++;
            }
            currentStep++;
            $("#userInput").val('');
            updateProgress();
            showNextCard();
        }
    });

    updateProgress();
    showNextCard();
});

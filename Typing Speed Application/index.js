let timeLimit = 60;

let quotes = [
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "The way to get started is to quit talking and begin doing.",
    "If life were predictable it would cease to be life, and be without flavor.",
    "It is during our darkest moments that we must focus to see the light.",
    "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
];

let timer_text = document.querySelector(".time");
let accuracy_text = document.querySelector(".currentAccuracy");
let error_text = document.querySelector(".currentErrors");
let cpm_text = document.querySelector(".currentCPM");
let wpm_text = document.querySelector(".currentWPM");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input");
let restart_btn = document.querySelector(".restart");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = timeLimit;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;


function startTest() {
    resetValues();
    changeQuote();

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function changeQuote() {
    quote_text.textContent = null;
    current_quote = quotes[quoteNo];

    current_quote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quote_text.appendChild(charSpan)
    })

    if (quoteNo < quotes.length - 1)
        quoteNo++;

    else
        quoteNo = 0;

}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;

        timeElapsed++;

        timer_text.textContent = timeLeft + "s";

    } else {
        finishTest();
    }
}

function checkInputText() {
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');

    characterTyped++;

    errors = 0;

    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {



        let typedChar = curr_input_array[index]

        if (typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');

        } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');

        } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');

            errors++;
        }
    });

    error_text.textContent = total_errors + errors;

    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);

    if (curr_input.length == current_quote.length) {
        changeQuote();

        total_errors += errors;

        input_area.value = "";
    }
}

function finishTest() {
    clearInterval(timer);

    input_area.disabled = true;

    quote_text.textContent = "Click on restart to start a new game.";

    restart_btn.style.display = "block";

    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;

    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
}

function resetValues() {
    timeLeft = timeLimit;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;

    input_area.value = "";
    quote_text.textContent = 'Click on the area below to start the game.';
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
}
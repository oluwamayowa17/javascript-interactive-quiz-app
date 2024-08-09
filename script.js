const questions = [
    {
        question: 'What is the largest animal in the world?',
        answer: [
            { option: 'Shark', correct: false },
            { option: 'Elephant', correct: false },
            { option: 'Blue Whale', correct: true },
            { option: 'Eagle', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answer: [
            { option: 'Earth', correct: false },
            { option: 'Mars', correct: true },
            { option: 'Jupiter', correct: false },
            { option: 'Venus', correct: false }
        ]
    },
    {
        question: 'What is the capital city of France?',
        answer: [
            { option: 'Rome', correct: false },
            { option: 'Paris', correct: true },
            { option: 'Berlin', correct: false },
            { option: 'Madrid', correct: false }
        ]
    },
    {
        question: 'Who wrote "Romeo and Juliet"?',
        answer: [
            { option: 'Mark Twain', correct: false },
            { option: 'William Shakespeare', correct: true },
            { option: 'Charles Dickens', correct: false },
            { option: 'J.K. Rowling', correct: false }
        ]
    },
    {
        question: 'What is the boiling point of water?',
        answer: [
            { option: '50°C', correct: false },
            { option: '100°C', correct: true },
            { option: '150°C', correct: false },
            { option: '200°C', correct: false }
        ]
    },
    {
        question: 'Which is the largest desert in the world?',
        answer: [
            { option: 'Sahara Desert', correct: false },
            { option: 'Arabian Desert', correct: false },
            { option: 'Antarctic Desert', correct: true },
            { option: 'Gobi Desert', correct: false }
        ]
    },
    {
        question: 'What is the chemical symbol for gold?',
        answer: [
            { option: 'Go', correct: false },
            { option: 'Au', correct: true },
            { option: 'Ag', correct: false },
            { option: 'Fe', correct: false }
        ]
    },
    {
        question: 'Which country is home to the kangaroo?',
        answer: [
            { option: 'South Africa', correct: false },
            { option: 'India', correct: false },
            { option: 'Australia', correct: true },
            { option: 'Brazil', correct: false }
        ]
    },
    {
        question: 'What is the smallest planet in our solar system?',
        answer: [
            { option: 'Venus', correct: false },
            { option: 'Mars', correct: false },
            { option: 'Mercury', correct: true },
            { option: 'Neptune', correct: false }
        ]
    },
    {
        question: 'Who painted the Mona Lisa?',
        answer: [
            { option: 'Vincent van Gogh', correct: false },
            { option: 'Pablo Picasso', correct: false },
            { option: 'Leonardo da Vinci', correct: true },
            { option: 'Claude Monet', correct: false }
        ]
    }
]

const questionElement = document.querySelector('#question')
const answerElement = document.querySelector('#answer-options')
const nextButton = document.querySelector('#next-btn')
const timer = document.querySelector('#counter')
const startBtn = document.querySelector('#start-btn')

let currentQuestionIndex = 0;
let score = 0;
let time = 60;

startBtn.addEventListener('click', startQuiz)


function handleTime(){
    timer.textContent = time

    let timerInterval = setInterval(() => {
        time--;
        timer.textContent = time;

        if (time <= 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);

}


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    startBtn.style.display = 'none'
    document.querySelector('#timer').style.display = 'block'
    handleTime()
    showQuestions();
}

function showQuestions(){
    resetState()
    let displayQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + displayQuestion.question
   
    displayQuestion.answer.forEach(answer=>{
        let answerBtn = document.createElement('button');
        answerBtn.classList.add('btn')
        answerBtn.textContent = answer.option
        answerElement.appendChild(answerBtn)
        if(answer.correct){
            answerBtn.dataset.correct = answer.correct
        }

        answerBtn.addEventListener('click', checkAnswer)
    })
}


function resetState(){
    nextButton.style.display = 'none'
    while(answerElement.firstChild){
        answerElement.removeChild(answerElement.firstChild)
    }
}

function checkAnswer(e){
    let selectedBtn = e.target;
    if(selectedBtn.dataset.correct === 'true'){
        selectedBtn.classList.add('correct')
        score++
    }else{
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerElement.children).forEach((button)=>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true
    })

    nextButton.style.display = 'block'
}


nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextQUestion()
    }else{
        startQuiz()
    }
})


function handleNextQUestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){

        showQuestions()
    }else{
        showScore()
    }
    
}

function showScore(){
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = 'Play Again'
    nextButton.style.display = 'block'
}


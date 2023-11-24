const quizData = [
  {
    question: 'Who is the main character of The Witcher?',
    options: ['Yennefer of Vengerberg', 'Ciri', 'Triss Merigold', 'Geralt of Rivia'],
    answer: 'Geralt of Rivia',
  },
  {
    question: 'Who is the sorceress who trains and mentors Yennefer?',
    options: ['Tissaia de Vries', 'Fringilla Vigo', 'Margarita Laux-Antille', 'Nilfgaardian Agent'],
    answer: 'Tissaia de Vries',
  },
  {
    question: 'What is the name of the group of Witchers that Geralt belongs to?',
    options: ['The School of the Bear', 'The School of the Wolf', 'The School of the Griffin', 'The School of the Cat'],
    answer: 'The School of the Wolf',
  },
  {
    question: 'What is the name of the kingdom where most of the story takes place?',
    options: ['Cintra', 'Kaedwen', 'Temeria', 'Nilfgaard'],
    answer: 'Cintra',
  },
  {
    question: 'What is the primary weapon used by Witchers?',
    options: [
      'Spears',
      ' Daggers',
      'Swords',
      ' Crossbows',
    ],
    answer: 'Swords',
  },
  {
    question: 'Who is the dwarf that helps Geralt in his quests?',
    options: ['Yarpen Zigrin', 'Zoltan Chivay', 'Sheldon Skaggs', 'CedricPhillips'],
    answer: 'Zoltan Chivay',
  },
  {
    question: 'What is the name of the potion that allows Geralt to see in the dark?',
    options: [
      'Moon Dust',
      'Night Vision',
      'Cat Potion',
      'Swallow',
    ],
    answer: 'Swallow',
  },
  {
    question: 'What is the name of the powerful mage who is also known as the Butterfly of Sodden?',
    options: ['Sabrina Glevissig', 'Philippa Eilhart', 'Francesca Findabair', 'Annalkin'],
    answer: 'Philippa Eilhart',
  },
  {
    question: 'Who is the leader of the Scoiatael?',
    options: [
      'Eithné',
      'Isengrim Faoiltiarna',
      'Istredd',
      'Verene',
    ],
    answer: 'Eithné',
  },
  {
    question: 'What is the name of the elven mage who helps Geralt in his quest to find Ciri?',
    options: ['Dijkstra', 'Imlerith', 'Vilgefortz', 'Caranthir'],
    answer: 'Vilgefortz',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
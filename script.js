const buttons = ['7', '8', '9', '/', '6', '5', '4', '*', '1', '2', '3', '-', 'mic', '0', '.', '+', 'AC', '=']
const buttonsDiv = document.getElementById('buttons');
let equation = '';
const previousEquationElement = document.getElementById('previous');
let previousEquationResult = '';

for (let button = 0; button < buttons.length; button++) {
  const buttonElement = document.createElement('button');
  buttonElement.innerText = buttons[button];
  buttonElement.id = buttons[button] === '=' ? 'eq' : buttons[button];
  buttonElement.style.backgroundColor = isNaN(Number(buttons[button])) ? '#FFA000' : '#E5E5E5'
  buttonsDiv.appendChild(buttonElement);
};

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
window.SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const recognition = new window.SpeechRecognition();
recognition.lang = 'pt-BR';

const resultElement = document.getElementById('result');
const micBtn = document.getElementById('mic');
const buttonsElement = document.querySelectorAll('button');

buttonsElement.forEach(button => {
  button.addEventListener('click', () => {
    if (button.innerText === 'mic') {
      return
    };

    if (button.innerText === '=') {
      equation !== '' ? resultElement.innerText = eval(equation) : '';
      previousEquationResult = eval(equation);
      previousEquationElement.innerText = equation;
      equation = '';
      return;
    };

    if (button.innerText === 'AC') {
      resultElement.innerText = '0';
      equation = '';
      previousEquationResult = '';
      previousEquationElement = '';
      return
    }

    if (isNaN(button.innerText) && previousEquationResult !== '') {
      equation = previousEquationResult + button.innerText;
      resultElement.innerText = equation;
      previousEquationResult = '';
      return;
    };

    if (previousEquationResult !== '') {
      equation = equation + button.innerText;
      resultElement.innerText = equation;
      previousEquationResult = '';
      return;
    };

    equation = equation + button.innerText;
    resultElement.innerText = equation;
  })
})

micBtn.onclick = () => {
  recognition.start();
};

recognition.onaudiostart = () => {
  micBtn.innerText = '...';
};

recognition.onspeechend = (e) => {
  micBtn.innerText = 'mic';
  recognition.stop();
};

recognition.addEventListener("result", (event) => {
  const conta = event.results[0][0].transcript;
  console.log(event);
  const resultado = eval(conta.replaceAll('x', '*'));
  console.log(event);
  console.log(conta);
  console.log(conta + ' = ' + resultado);
  previousEquationElement.innerText = conta;
  resultElement.innerText = resultado;
});
let equation = '';
const previousEquationElement = document.getElementById('previous');
let previousEquationResult = '';

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
  console.log(recognition.continuous)
};

recognition.onstart = () => {
  micBtn.innerText = '...';
};

recognition.onend = () => {
  micBtn.innerText = 'mic';
};

recognition.onspeechend = (e) => {
  micBtn.innerText = 'mic';
  recognition.stop();
};

recognition.addEventListener("result", (event) => {
  const fala = event.results[0][0].transcript;
  const conta = replaceTextForDigit(fala);
  console.log(event);
  console.log(conta)
  const resultado = eval(conta.replaceAll('x', '*'));
  console.log(event);
  console.log(conta);
  console.log(conta + ' = ' + resultado);
  previousEquationElement.innerText = conta;
  resultElement.innerText = resultado;
  recognition.stop();
});

function replaceTextForDigit(text) {
  const strNums = ["um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "mais", "menos", "vezes", "dividido por"];
  const strDigits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/"];
  let result = text;
  for (let i = 0; i < strNums.length; i++) {
    result = result.replaceAll(strNums[i], strDigits[i]);
  }

  return result;
}
// Цифры
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// Цифры




// Данные для 1 уровня
function createDataLevel1() {
  // на 1 уровне складываем два числа от 1 до 9
  // создадим массив на 10 заданий
  const arr = [];

  for (let i = 0; i < 10; i++) {
    let num1 = Math.floor(Math.random() * 9 + 1);
    let num2 = Math.floor(Math.random() * 9 + 1);
    let sign = '+';
    arr.push({n1: num1, n2: num2, sign})
  }
  return arr;
}
// Конец Данные для 1 уровня




// Данные для 2 уровня
function createDataLevel2() {
  // на 2 уровне складываем два числа от 1 до 19
  // одно из чисел всегда больше 10
  // создадим массив на 10 заданий
  const arr = [];
  let num2;

  for (let i = 0; i < 10; i++) {
    let num1 = Math.floor(Math.random() * 19 + 1);
    if (num1 < 10) {
      num2 = Math.floor(Math.random() * 9 + 10);
    } else {
      num2 = Math.floor(Math.random() * 19 + 1);
    }
    let sign = '+';
    arr.push({n1: num1, n2: num2, sign})
  }
  return arr;
}
// Конец Данные для 2 уровня




// Данные для 3 уровня
function createDataLevel3() {
  // на 3 уровне складываем два числа от 1 до 99
  // одно из чисел всегда больше 20
  // создадим массив на 10 заданий
  const arr = [];
  let num2;

  for (let i = 0; i < 10; i++) {
    let num1 = Math.floor(Math.random() * 99 + 1);
    if (num1 < 20) {
      num2 = Math.floor(Math.random() * 9 + 20);
    } else {
      num2 = Math.floor(Math.random() * 99 + 1);
    }
    let sign = '+';
    arr.push({n1: num1, n2: num2, sign})
  }
  return arr;
}
// Конец Данные для 3 уровня




// Данные для 4 уровня
function createDataLevel4() {
  // таблица умножения от 2 до 9
  // создадим массив на 10 заданий
  const arr = [];

  for (let i = 0; i < 10; i++) {
    let num1 = Math.floor(Math.random() * 8 + 2);
    let num2 = Math.floor(Math.random() * 8 + 2);
    let sign = '*';
    arr.push({n1: num1, n2: num2, sign})
  }
  return arr;
}
// Конец Данные для 4 уровня




// Данные для 5 уровня
function createDataLevel5() {
  // таблица умножения до 19 * 9
  // создадим массив на 10 заданий
  const arr = [];

  for (let i = 0; i < 10; i++) {
    let num1 = Math.floor(Math.random() * 10 + 10);
    let num2 = Math.floor(Math.random() * 8 + 2);
    let sign = '*';
    arr.push({n1: num1, n2: num2, sign})
  }
  return arr;
}
// Конец Данные для 5 уровня




// Секция Выбор уровня
const ls = document.querySelector('.js-ls');
const levels = document.querySelectorAll('.js-ls li');

ls.addEventListener('click', lsClick);

function lsClick(e) {
  if (e.target === ls) {
    return;
  }
  setActive(levels, e.target);
  start(e.target.dataset.level);
}

function setActive(list, elem) {
  for (let i = 0; i < list.length; i++) {
    list[i].classList.remove('active');
  }
  elem.classList.add('active');
}
// КОНЕЦ Секция Выбор уровня




// Секция Game
const game = document.querySelector('.js-game');
let taskCount;
let taskDiv;
let num1Div;
let num1;
let sign;
let num2Div;
let num2;
let resDiv;
let d;
let text;
let count;

function start(level) {
  // Выбор уровня
  switch (level) {
    case '1':
      d = createDataLevel1();
      text = 'Сложи 2 числа от 1 до 9';
      console.log(d);
      break;
    case '2':
      d = createDataLevel2();
      text = 'Сложи 2 числа от 1 до 19';
      console.log(d);
      break;
    case '3':
      d = createDataLevel3();
      text = 'Сложи 2 числа от 1 до 99';
      console.log(d);
      break;
    case '4':
      d = createDataLevel4();
      text = 'Таблица умножения от 2 до 9';
      console.log(d);
      break;
    case '5':
      d = createDataLevel5();
      text = 'Таблица умножения до 19 * 9';
      console.log(d);
      break;
    default: return;
  }

  count = 1;
  let taskTitle = document.createElement('h2');
  taskTitle.innerText = text;
  taskCount = document.createElement('div');
  taskCount.classList.add('task-count');
  taskCount.innerText = `Задание ${count} из 10`;

  game.innerHTML = '';
  game.append(taskTitle, taskCount);
  createTask(d[0]);
  clearStars();
  window.addEventListener('keydown', keyPress);
}

// создаем новое задание в game
function createTask(data) {
  num1Div = document.createElement('div');
  num1Div.classList.add('js-num1');
  num1Div.innerText = data.n1;
  num1 = +num1Div.innerText;
  const signDiv = document.createElement('div');
  signDiv.classList.add('js-sign');
  signDiv.innerText = data.sign;
  sign = data.sign;
  num2Div = document.createElement('div');
  num2Div.classList.add('js-num2');
  num2Div.innerText = data.n2;
  num2 = +num2Div.innerText;
  const equalDiv = document.createElement('div');
  equalDiv.classList.add('equal');
  equalDiv.innerText = '=';
  resDiv = document.createElement('div');
  resDiv.classList.add('res', 'js-res');
  taskDiv = document.createElement('div');
  taskDiv.classList.add('task', 'js-task');
  taskDiv.append(num1Div, signDiv, num2Div, equalDiv, resDiv);

  taskCount.innerText = `Задание ${count} из 10`;
  game.append(taskDiv);
}


function keyPress(e) {
  const key = e.key;
  let resStr = resDiv.innerText;

  // если нажата цифра
  // если меньше 3 цифр в результате
  if (key in digits && resStr.length < 3) {
    resStr += key;
    resDiv.innerText = resStr;
  }

  // если нажата Backspase
  if (key === 'Backspace') {
    resStr = resStr.slice(0, -1);
    resDiv.innerText = resStr;
  }

  // если нажата Enter
  if (key === 'Enter') {
    let userAnswer = +resStr;
    let rightAnswer;
    switch (sign) {
      case '+':
        rightAnswer = num1 + num2;
        break;
      case '*':
        rightAnswer = num1 * num2;
        break;
      default:
        return;
    }
    

    // если ответ правильный
    if (userAnswer === rightAnswer) {
      showStar();
    } else {
      console.log('false');
    }
    //res.innerText = resStr;
  }

}
// Конец Секция Game




// Секция Звездочки
let stars = document.querySelector('.stars-container');

function showStar() {
  let starsCount = stars.childNodes.length;
  console.log(starsCount)

  // если звездочек больше или равно десяти
  if (starsCount >= 10) {
    // удалим первую
    stars.firstChild.remove();
  }

  taskDiv.append(String.fromCodePoint(11088));
  stars.append(taskDiv);
  
  // если еще есть задания
  if (d.length > 1) {
    d.shift();
    count++;
    createTask(d[0]);
  } else {
    taskCount.innerText = 'Молодец!';
    window.removeEventListener('keydown', keyPress);
  }
}

function clearStars() {
  stars.innerHTML = '';
}
// Конец Секция Звездочки






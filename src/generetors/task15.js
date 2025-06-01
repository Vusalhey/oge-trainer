import utils from '../utils/utils';

export default function generateTask15() {
  const taskTypes = [
    {
      type: 'find_multiple_number',
      text: 'Напишите программу, которая из списка чисел выводит только те, что кратны %multiple% (и не кратны %non_multiple%).',
      inputFormat: "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]",
      outputFormat: "[2, 4, 8, 10]",
      exampleSolution: `function solution(input){\n  return input.filter(num => num % %multiple% === 0 && num % %non_multiple% !== 0)\n}`
    },
    {
      type: 'reversed_words',
      text: 'Напишите программу, которая переворачивает слова длиной более %limit% символов в строке.',
      inputFormat: '"Это пример строки с разными словами"',
      outputFormat: '"Это пример йынморс с иммарз словами"',
      exampleSolution: `function solution(input){\n  return input.split(' ').map(word => word.length > %limit% ? word.split('').reverse().join('') : word).join(' ')\n}`
    },
    {
      type: 'unique_number',
      text: 'Напишите программу, которая находит уникальное число в массиве (все числа одинаковые, кроме одного).',
      inputFormat: "[1, 1, 2, 1, 1]",
      outputFormat: "2",
      exampleSolution: `function solution(input){\n  return input.find(num => input.indexOf(num) === input.lastIndexOf(num))\n}`
    }
  ];

  const selectedTask = utils.randomItem(taskTypes);
  let task = { ...selectedTask };

  // Генерация уникальных данных для задачи
  switch(task.type) {
    case 'find_multiple_number':
      task.multiple = utils.random(2, 8);
      // Убедимся, что non_multiple не равно multiple
      let nonMultiple;
      do {
        nonMultiple = utils.random(2, 8);
      } while (nonMultiple === task.multiple);
      task.non_multiple = nonMultiple;
      break;
    case 'reversed_words':
      task.limit = utils.random(5, 9);
      break;
  }

  // Подготовка данных для разных языков
  task.languagesSpecificData = {
    javascript: {
      inputFormat: task.inputFormat,
      outputFormat: task.outputFormat,
      exampleSolution: task.exampleSolution
        .replace(/%multiple%/g, task.multiple || '')
        .replace(/%non_multiple%/g, task.non_multiple || '')
        .replace(/%limit%/g, task.limit || ''),
      inputFillFunction: () => {
        switch(task.type) {
          case 'find_multiple_number':
            return JSON.stringify(Array.from({length: 10}, () => utils.random(1, 20)));
          case 'reversed_words':
            const words = ['Пример', 'текста', 'для', 'проверки', 'функции', 'переворота', 'длинных', 'слов'];
            return JSON.stringify(words.join(' '));
          case 'unique_number':
            const unique = utils.random(1, 100);
            const common = utils.random(1, 100, [unique]); // Передаем массив исключений
            return JSON.stringify([...Array(4).fill(common), unique].sort(() => Math.random() - 0.5));
        }
      }
    },
    python: {
      inputFormat: task.inputFormat,
      outputFormat: task.outputFormat,
      exampleSolution: task.exampleSolution
        .replace(/function solution/g, 'def solution')
        .replace(/=>/g, ':')
        .replace(/filter/g, 'filter')
        .replace(/%multiple%/g, task.multiple || '')
        .replace(/%non_multiple%/g, task.non_multiple || '')
        .replace(/%limit%/g, task.limit || ''),
      inputFillFunction: () => {
        switch(task.type) {
          case 'find_multiple_number':
            return JSON.stringify(Array.from({length: 10}, () => utils.random(1, 20)));
          case 'reversed_words':
            const words = ['Пример', 'текста', 'для', 'проверки', 'функции', 'переворота', 'длинных', 'слов'];
            return JSON.stringify(words.join(' '));
          case 'unique_number':
            const unique = utils.random(1, 100);
            const common = utils.random(1, 100, [unique]); // Передаем массив исключений
            return JSON.stringify([...Array(4).fill(common), unique].sort(() => Math.random() - 0.5));
        }
      }
    }
  };

  // Заменяем плейсхолдеры в тексте задачи
  task.text = task.text
    .replace(/%multiple%/g, task.multiple || '')
    .replace(/%non_multiple%/g, task.non_multiple || '')
    .replace(/%limit%/g, task.limit || '');

  return task;
}
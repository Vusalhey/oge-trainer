export default function generateTask3() {
  // Типы условий
  const conditionTypes = [
    { type: 'even', text: 'x чётное' },
    { type: 'odd', text: 'x нечётное' },
    { type: 'sameDigits', text: 'цифры x одинаковые' },
    { type: 'notSameDigits', text: 'цифры x неодинаковые' }
  ];

  // Генерация условий
  const min = 20;
  const max = 70;
  const condition1 = Math.floor(Math.random() * (max - min + 1)) + min;
  const condition2 = conditionTypes[Math.floor(Math.random() * conditionTypes.length)];
  
  // Инвертировать условие (50% chance)
  const shouldInvert = Math.random() > 0.5;
  let conditionText = condition2.text;
  let conditionType = condition2.type;

  if (shouldInvert) {
    conditionText = `НЕ (${conditionText})`;
    if (conditionType === 'even') conditionType = 'odd';
    else if (conditionType === 'sameDigits') conditionType = 'notSameDigits';
  }

  // Генерация правильного ответа
  let answer;
  let x = condition1 + 1;

  while (true) {
    const digits = String(x).split('');
    
    switch (conditionType) {
      case 'even':
        if (x % 2 === 0) { answer = x; break; }
        break;
      case 'odd':
        if (x % 2 !== 0) { answer = x; break; }
        break;
      case 'sameDigits':
        if (new Set(digits).size === 1) { answer = x; break; }
        break;
      case 'notSameDigits':
        if (new Set(digits).size > 1) { answer = x; break; }
        break;
    }

    if (answer !== undefined) break;
    x++;
  }

  return {
    question: `Напишите наименьшее число x, для которого истинно высказывание:`,
    expression: `(x > ${condition1}) И ${shouldInvert ? 'НЕ ' : ''}(${condition2.text})`,
    answer: answer,
    explanation: `Минимальное число, большее ${condition1} и удовлетворяющее условию "${conditionText}"`
  };
}
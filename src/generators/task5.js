import utils from '../utils/utils';

export default function generateTask5() {
  // Генерация начального числа
  const startNumber = utils.random(1, 10);
  
  // Генерация последовательности команд (5 команд)
  const commands = [];
  let currentNumber = startNumber;
  
  // Гарантируем, что будет хотя бы одна команда умножения
  const multiplyPosition = utils.random(0, 4);
  
  for (let i = 0; i < 5; i++) {
    if (i === multiplyPosition) {
      // Команда умножения
      const b = utils.random(2, 5); // множитель от 2 до 5
      commands.push({ type: 'multiply', value: b });
      currentNumber *= b;
    } else {
      // Команда прибавления
      commands.push({ type: 'add', value: 1 });
      currentNumber += 1;
    }
  }
  
  // Получаем конечное число
  const endNumber = currentNumber;
  
  // Определяем правильный ответ (значение b)
  const correctB = commands.find(cmd => cmd.type === 'multiply').value;
  
  return {
    startNumber,
    commands: commands.map(cmd => cmd.type === 'add' ? '1' : '2'),
    endNumber,
    answer: correctB,
    explanation: `Алгоритм: ${commands.map(cmd => cmd.type === 'add' ? '+1' : `*${cmd.value}`).join(' → ')}`
  };
}
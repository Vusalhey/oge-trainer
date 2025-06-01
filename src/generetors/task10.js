import utils from '../utils/utils';

export default function generateTask10() {
  // Генерация 3 случайных чисел в разных системах счисления
  const numbers = [];
  const bases = [];
  
  // Генерируем 3 числа
  for (let i = 0; i < 3; i++) {
    const base = utils.random(2, 16); // система счисления от 2 до 16
    const value = utils.random(10, 1000); // число в десятичной системе
    
    // Преобразуем в указанную систему счисления
    const numberInBase = value.toString(base).toUpperCase();
    
    numbers.push(numberInBase);
    bases.push(base);
  }
  
  // Находим максимальное число (в десятичной системе)
  const decimalValues = numbers.map((num, i) => parseInt(num, bases[i]));
  const maxValue = Math.max(...decimalValues);
  const maxIndex = decimalValues.indexOf(maxValue);
  
  return {
    numbers: numbers.map((num, i) => ({
      value: num,
      base: bases[i]
    })),
    answer: maxValue,
    explanation: `Максимальное число: ${numbers[maxIndex]} (${bases[maxIndex]}) = ${maxValue} (10)`
  };
}
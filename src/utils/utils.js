const utils = {
  /**
   * Перемешивает элементы массива случайным образом
   * @param {Array} array - Входной массив
   * @return {Array} Перемешанный массив
   */
  shuffle: function(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },

  /**
   * Генерирует случайное число в заданном диапазоне
   * @param {number} min - Минимальное значение (включительно)
   * @param {number} max - Максимальное значение (включительно)
   * @param {Array} exclude - Числа, которые нужно исключить
   * @return {number} Случайное число
   */
  random: function(min, max, exclude = []) {
    let random;
    do {
      random = Math.floor(min + Math.random() * (max + 1 - min));
    } while (exclude.includes(random));
    return random;
  },

  /**
   * Возвращает случайный элемент массива
   * @param {Array} array - Входной массив
   * @return {*} Случайный элемент
   */
  randomItem: function(array) {
    return array[Math.floor(Math.random() * array.length)];
  },

  /**
   * Преобразует первую букву строки в заглавную
   * @param {string} string - Входная строка
   * @return {string} Строка с заглавной первой буквой
   */
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  /**
   * Кодирует ответ для проверки
   * @param {number} exercise - Номер задания
   * @param {string} answer - Ответ
   * @return {string} Закодированный ответ
   */
  encodeAnswer: function(exercise, answer) {
    // В реальном проекте здесь должно быть хеширование
    // Для учебных целей возвращаем как есть
    return answer;
  },

  /**
   * Проверяет, находится ли число в диапазоне
   * @param {number} value - Проверяемое число
   * @param {number} min - Минимальное значение
   * @param {number} max - Максимальное значение
   * @return {boolean} Результат проверки
   */
  isBetween: function(value, min, max) {
    return value >= min && value <= max;
  },

  /**
   * Возвращает последний элемент массива
   * @param {Array} array - Входной массив
   * @return {*} Последний элемент
   */
  last: function(array) {
    return array[array.length - 1];
  },

  /**
   * Сокращает строку до указанного количества слов
   * @param {string} text - Входной текст
   * @param {number} limit - Максимальное количество слов
   * @return {string} Сокращенный текст
   */
  wordsLimit: function(text, limit) {
    return text.split(' ').slice(0, limit).join(' ');
  },

  /**
   * Очищает строку от всех символов, кроме букв и пробелов
   * @param {string} text - Входной текст
   * @return {string} Очищенный текст
   */
  toPureLabel: function(text) {
    return text.replace(/[^а-яА-ЯёЁ ]/g, '').replace(/ и /g, ' ');
  }
};

// Добавляем методы в прототипы стандартных объектов
Number.prototype.isBetween = function(min, max) {
  return utils.isBetween(this, min, max);
};

Array.prototype.last = function() {
  return utils.last(this);
};

export default utils;
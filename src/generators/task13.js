import utils from '../utils/utils';

export default function generateTask13() {
  // Примеры текстов для задания
  const texts = [
    "Научные открытия последних лет значительно изменили наше представление о мире. Исследования в области квантовой физики демонстрируют удивительные свойства материи.",
    "Современные технологии оказывают profound влияние на все сферы жизни общества. Digital трансформация стала неотъемлемой частью бизнес-процессов.",
    "Экологические проблемы требуют немедленного решения. Загрязнение окружающей среды достигло critical уровня во многих регионах планеты."
  ];

  // Генерируем таблицу
  const tableData = [
    ["Объект", "Характеристика", "Значение"],
    ["Компьютер", "Процессор", "Intel Core i7"],
    ["Монитор", "Диагональ", "27 дюймов"],
    ["Принтер", "Тип", "Лазерный"]
  ];

  // Выбираем случайный текст
  const text = utils.randomItem(texts);
  
  // Добавляем случайное форматирование
  const words = text.split(' ');
  const formattedWords = words.map(word => {
    // 20% chance сделать слово жирным
    if (Math.random() < 0.2) return `**${word}**`;
    // 15% chance сделать слово курсивом
    if (Math.random() < 0.15) return `_${word}_`;
    // 10% chance подчеркнуть слово
    if (Math.random() < 0.1) return `<u>${word}</u>`;
    return word;
  });

  return {
    text: formattedWords.join(' '),
    tableData,
    requirements: [
      "Отступ первой строки первого абзаца - 8 пробелов",
      "Основной текст выровнен по ширине",
      "Заголовок и текст в ячейках таблицы - по центру",
      "Межстрочный интервал - одинарный",
      "Использованы слова с разным форматированием"
    ]
  };
}
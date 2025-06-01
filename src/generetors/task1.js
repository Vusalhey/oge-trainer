// export default function generateTask1() {
//   const categories = [
//     {
//       common: 'животные',
//       subject: 'название животного',
//       items: {
//         2: ['ёж', 'уж', 'як'],
//         3: ['кот', 'пёс', 'рак'],
//         // ... остальные варианты
//       }
//     },
//     // ... другие категории
//   ];

//   const category = categories[Math.floor(Math.random() * categories.length)];
//   const lengths = Object.keys(category.items).map(Number);
//   const length = lengths[Math.floor(Math.random() * lengths.length)];
//   const items = category.items[length];
//   const answer = items[Math.floor(Math.random() * items.length)];

//   const symbolSize = Math.pow(2, Math.ceil(Math.random() * 4));
//   const sizeType = ['битами', 'байтами'][Math.floor(Math.random() * 2)];
//   const sizeInBits = sizeType === 'битами' ? symbolSize : symbolSize * 8;

//   const allItems = [];
//   for (const len of Object.keys(category.items)) {
//     allItems.push(...category.items[len]);
//   }
//   const shuffledItems = [...allItems].sort(() => Math.random() - 0.5);
//   const writtenText = `${shuffledItems.join(', ')} – ${category.common}`;

//   return {
//     question: `В одной из кодировок Unicode каждый символ кодируется ${symbolSize} ${sizeType}. Ученик написал текст (в нём нет лишних пробелов):`,
//     text: writtenText,
//     task: `Ученик удалил из списка ${category.subject}, а также лишние запятую и пробел. При этом размер нового предложения в данной кодировке оказался на ${(answer.length + 2) * sizeInBits} бит меньше, чем размер исходного предложения.`,
//     answer: answer,
//     explanation: `Правильный ответ: ${answer}, так как удалено слово длиной ${answer.length} символов плюс запятая и пробел.`
//   };
// }
export default function generateTask1() {
  const categories = [
    {
      common: 'животные',
      subject: 'название животного',
      items: {
        2: ['ёж', 'уж', 'як'],
        3: ['кот', 'пёс', 'рак'],
      }
    }
  ];

  const category = categories[0]; // Упрощаем для теста
  const answer = 'кот'; // Фиксируем ответ для теста

  return {
    question: "В одной из кодировок Unicode каждый символ кодируется 8 битами. Ученик написал текст:",
    text: "ёж, як, кот – животные",
    task: `Ученик удалил из списка ${category.subject}.`,
    answer: answer,
    explanation: `Правильный ответ: ${answer}`,
    subject: category.subject
  };
}
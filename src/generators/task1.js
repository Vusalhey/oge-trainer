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

  const category = categories[0];
  const answer = 'кот';

  return {
    question: "В одной из кодировок Unicode каждый символ кодируется 8 битами. Ученик написал текст:",
    text: "ёж, як, кот – животные",
    task: `Ученик удалил из списка ${category.subject}.`,
    answer: answer,
    explanation: `Правильный ответ: ${answer}`,
    subject: category.subject
  };
}
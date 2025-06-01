import utils from '../utils/utils';

export default function generateTask14() {
  // Генерация данных для таблицы
  const columns = [
    { name: 'Город', type: 'string' },
    { name: 'Температура', type: 'number' },
    { name: 'Влажность', type: 'number' },
    { name: 'Давление', type: 'number' }
  ];

  const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань'];
  const data = [];

  // Заполняем таблицу случайными данными
  for (let i = 0; i < 10; i++) {
    const row = {
      Город: utils.randomItem(cities),
      Температура: utils.random(-10, 30),
      Влажность: utils.random(30, 100),
      Давление: utils.random(720, 780)
    };
    data.push(row);
  }

  // Генерируем вопросы
  const questions = [
    {
      text: `Сколько записей в таблице относятся к городу ${utils.randomItem(cities)}?`,
      answer: data.filter(row => row.Город === cities[0]).length,
      type: 'count'
    },
    {
      text: 'Какое среднее значение температуры в таблице? (округлите до целых)',
      answer: Math.round(data.reduce((sum, row) => sum + row.Температура, 0) / data.length),
      type: 'average'
    },
    {
      text: `Сколько записей имеют влажность выше ${utils.random(60, 80)}%?`,
      answer: data.filter(row => row.Влажность > 70).length,
      type: 'filter'
    }
  ];

  // Выбираем 2 случайных вопроса
  const selectedQuestions = utils.shuffle([...questions]).slice(0, 2);

  return {
    columns,
    data,
    questions: selectedQuestions,
    explanation: 'Для решения используйте инструменты работы с таблицами'
  };
}
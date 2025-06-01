import utils from '../utils/utils';

export default function generateTask8() {
  // Пары терминов для запросов
  const termPairs = [
    ['шинель', 'кофта'],
    ['рыбка', 'рыбак'],
    ['башня', 'замок'],
    ['лимон', 'лайм'],
    ['аэрофлот', 'аэропорт'],
    ['банка', 'банк'],
    ['лунка', 'луна'],
    ['решето', 'решетка'],
    ['блок', 'блог'],
    ['самара', 'саратов']
  ];

  // Выбираем случайную пару терминов
  const [term1, term2] = utils.randomItem(termPairs);
  
  // Определяем какой термин будем спрашивать
  const searchTerm = utils.randomItem([term1, term2]);
  
  // Генерация статистики запросов
  const requests = [
    `${term1} | ${term2}`,
    searchTerm,
    `${term1} & ${term2}`
  ];
  
  // Случайные количества результатов (в тысячах)
  const results = {
    [requests[0]]: utils.random(50, 200) * 10,
    [requests[1]]: utils.random(20, 150) * 10,
    [requests[2]]: utils.random(5, 50) * 10
  };
  
  // Вычисляем правильный ответ по формуле: (A|B - X + A&B)
  const answer = results[requests[0]] - results[requests[1]] + results[requests[2]];
  
  return {
    term1,
    term2,
    searchTerm,
    requests: utils.shuffle(requests),
    results,
    answer,
    explanation: `Формула: (${term1}|${term2}) - ${searchTerm} + (${term1}&${term2}) = ${answer}`
  };
}
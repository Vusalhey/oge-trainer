import utils from '../utils/utils';

export default function generateTask6() {
  // Возможные операторы сравнения
  const operators = ['>', '>=', '<', '<=', '=='];
  const logicalOperators = ['И', 'ИЛИ'];
  
  // Генерация условий
  const condition1 = {
    operator: utils.randomItem(operators),
    value: utils.random(-5, 20)
  };
  
  const condition2 = {
    operator: utils.randomItem(operators),
    value: utils.random(-5, 20)
  };
  
  const logicalOperator = utils.randomItem(logicalOperators);
  
  // Генерация тестовых данных (10-15 пар чисел)
  const testCount = utils.random(10, 15);
  const testCases = [];
  const outputs = [];
  
  for (let i = 0; i < testCount; i++) {
    const s = utils.random(-5, 20);
    const t = utils.random(-5, 20);
    testCases.push([s, t]);
    
    // Проверка условий
    const cond1 = eval(`${s} ${condition1.operator} ${condition1.value}`);
    const cond2 = eval(`${t} ${condition2.operator} ${condition2.value}`);
    
    let result;
    if (logicalOperator === 'И') {
      result = cond1 && cond2;
    } else {
      result = cond1 || cond2;
    }
    
    outputs.push(result ? 'YES' : 'NO');
  }
  
  // Выбираем какой вывод ищем (YES или NO)
  const targetOutput = utils.randomItem(['YES', 'NO']);
  const answer = outputs.filter(out => out === targetOutput).length;
  
  return {
    condition1,
    condition2,
    logicalOperator,
    testCases,
    outputs,
    targetOutput,
    answer,
    explanation: `Условие: (s ${condition1.operator} ${condition1.value}) ${logicalOperator} (t ${condition2.operator} ${condition2.value})`
  };
}
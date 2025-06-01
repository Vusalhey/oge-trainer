import utils from '../utils/utils';

export default function generateTask9() {
  // Генерация ориентированного графа
  const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З'];
  const nodeCount = utils.random(5, 7); // 5-7 городов
  const nodes = letters.slice(0, nodeCount);
  
  // Создаем граф
  const graph = {};
  nodes.forEach(node => { graph[node] = []; });

  // Добавляем связи
  nodes.forEach((node, i) => {
    const possibleTargets = nodes.filter((_, j) => j > i);
    const connectionCount = utils.random(1, Math.min(3, possibleTargets.length));
    
    utils.shuffle(possibleTargets).slice(0, connectionCount).forEach(target => {
      graph[node].push(target);
      
      // 30% chance добавить обратную связь
      if (Math.random() < 0.3) {
        graph[target] = graph[target] || [];
        graph[target].push(node);
      }
    });
  });

  // Выбираем начальную и конечную точки
  const start = nodes[0];
  const end = nodes[nodes.length - 1];
  
  // Подсчитываем количество путей
  const pathCount = countPaths(graph, start, end);

  return {
    nodes,
    graph,
    start,
    end,
    answer: pathCount,
    explanation: `Количество путей из ${start} в ${end}`
  };

  // Рекурсивный подсчет путей
  function countPaths(g, current, target, visited = new Set()) {
    if (current === target) return 1;
    
    let total = 0;
    visited.add(current);
    
    for (const neighbor of g[current] || []) {
      if (!visited.has(neighbor)) {
        total += countPaths(g, neighbor, target, new Set(visited));
      }
    }
    
    return total;
  }
}
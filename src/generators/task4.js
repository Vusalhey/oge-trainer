import utils from '../utils/utils';

export default function generateTask4() {
  // Генерация случайного графа дорог между городами
  const pointNames = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З'];
  const pointsCount = utils.random(5, 8);
  const usedPoints = pointNames.slice(0, pointsCount);
  
  // Создаем матрицу смежности
  const roads = {};
  usedPoints.forEach(point => {
    roads[point] = {};
  });

  // Генерируем дороги
  usedPoints.forEach((point, i) => {
    const possibleTargets = [...usedPoints];
    possibleTargets.splice(i, 1);
    
    const connectionsCount = utils.random(2, 3);
    const connectedPoints = utils.shuffle(possibleTargets).slice(0, connectionsCount);
    
    connectedPoints.forEach(target => {
      const distance = utils.random(1, 10);
      roads[point][target] = distance;
    });
  });

  // Выбираем точки маршрута
  const startPoint = usedPoints[0];
  let midPoint, endPoint;
  
  do {
    midPoint = utils.randomItem(usedPoints.filter(p => p !== startPoint));
    endPoint = utils.randomItem(usedPoints.filter(p => p !== startPoint && p !== midPoint));
  } while (!isValidPath(roads, startPoint, midPoint, endPoint));

  // Находим кратчайший путь
  const shortestPath = findShortestPath(roads, startPoint, midPoint, endPoint);

  return {
    points: usedPoints,
    roads: roads,
    startPoint,
    midPoint,
    endPoint,
    answer: shortestPath.distance,
    explanation: `Кратчайший путь: ${shortestPath.path.join(' → ')} (${shortestPath.distance} км)`
  };

  function isValidPath(roads, start, mid, end) {
    return findPath(roads, start, mid) && findPath(roads, mid, end);
  }

  function findPath(roads, from, to, visited = new Set()) {
    if (from === to) return true;
    visited.add(from);
    
    for (const neighbor in roads[from]) {
      if (!visited.has(neighbor)) {
        if (findPath(roads, neighbor, to, new Set(visited))) {
          return true;
        }
      }
    }
    return false;
  }

  function findShortestPath(roads, start, mid, end) {
    const paths = [];
    
    function dfs(current, path = [], distance = 0, visited = new Set()) {
      if (current === end && path.includes(mid)) {
        paths.push({ path: [...path, current], distance });
        return;
      }
      
      visited.add(current);
      
      for (const neighbor in roads[current]) {
        if (!visited.has(neighbor)) {
          dfs(
            neighbor,
            [...path, current],
            distance + roads[current][neighbor],
            new Set(visited)
          );
        }
      }
    }
    
    dfs(start);
    
    if (paths.length === 0) return { path: [], distance: 0 };
    
    return paths.reduce((shortest, current) => 
      current.distance < shortest.distance ? current : shortest
    );
  }
}
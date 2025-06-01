import React from 'react';
import generateTask9 from '/home/vus/oge-trainer/src/generetors/task9.js';

class Task9 extends React.Component {
  constructor(props) {
    super(props);
    this.taskData = generateTask9();
    this.canvasRef = React.createRef();
    this.state = {
      userAnswer: '',
      isChecked: false,
      correctAnswer: this.taskData.answer
    };
  }

  componentDidMount() {
    this.drawGraph();
  }

  drawGraph() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { nodes, graph, start, end } = this.taskData;
    
    // Очистка canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Настройки отрисовки
    const radius = 20;
    const nodePositions = {};
    const angleStep = (2 * Math.PI) / nodes.length;
    
    // Рассчитываем позиции узлов по кругу
    nodes.forEach((node, i) => {
      const angle = i * angleStep;
      nodePositions[node] = {
        x: canvas.width / 2 + Math.cos(angle) * 150,
        y: canvas.height / 2 + Math.sin(angle) * 150
      };
    });
    
    // Рисуем связи
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    
    nodes.forEach(from => {
      graph[from]?.forEach(to => {
        ctx.beginPath();
        const fromPos = nodePositions[from];
        const toPos = nodePositions[to];
        
        // Вычисляем направление стрелки
        const angle = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
        const headLength = 10;
        
        // Линия
        ctx.moveTo(fromPos.x, fromPos.y);
        ctx.lineTo(
          toPos.x - Math.cos(angle) * radius,
          toPos.y - Math.sin(angle) * radius
        );
        ctx.stroke();
        
        // Стрелка
        ctx.beginPath();
        ctx.moveTo(
          toPos.x - Math.cos(angle) * radius,
          toPos.y - Math.sin(angle) * radius
        );
        ctx.lineTo(
          toPos.x - Math.cos(angle) * radius - Math.cos(angle - Math.PI/6) * headLength,
          toPos.y - Math.sin(angle) * radius - Math.sin(angle - Math.PI/6) * headLength
        );
        ctx.moveTo(
          toPos.x - Math.cos(angle) * radius,
          toPos.y - Math.sin(angle) * radius
        );
        ctx.lineTo(
          toPos.x - Math.cos(angle) * radius - Math.cos(angle + Math.PI/6) * headLength,
          toPos.y - Math.sin(angle) * radius - Math.sin(angle + Math.PI/6) * headLength
        );
        ctx.stroke();
      });
    });
    
    // Рисуем узлы
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    nodes.forEach(node => {
      const pos = nodePositions[node];
      
      // Круг
      ctx.fillStyle = node === start ? '#aaffaa' : 
                     node === end ? '#ffaaaa' : '#dddddd';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      
      // Текст
      ctx.fillStyle = '#000';
      ctx.fillText(node, pos.x, pos.y);
    });
  }

  handleInputChange = (e) => {
    this.setState({ userAnswer: e.target.value });
  };

  handleCheck = () => {
    this.setState({ isChecked: true });
  };

  render() {
    const { userAnswer, isChecked, correctAnswer } = this.state;
    const { nodes, start, end } = this.taskData;
    const isCorrect = parseInt(userAnswer) === correctAnswer;

    return (
      <div className="task">
        <h4>Задание 9</h4>
        <p>
          На рисунке – схема дорог, связывающих города {nodes.join(', ')}.
          По каждой дороге можно двигаться только в одном направлении, указанном стрелкой.
        </p>
        
        <div className="graph-container">
          <canvas 
            ref={this.canvasRef}
            width={400}
            height={400}
          />
        </div>
        
        <p>
          Сколько существует различных путей из города {start} в город {end}?
        </p>
        
        <input
          type="number"
          min="0"
          value={userAnswer}
          onChange={this.handleInputChange}
          disabled={isChecked}
          placeholder="Введите количество путей"
        />
        
        <button onClick={this.handleCheck} disabled={isChecked}>
          Проверить
        </button>
        
        {isChecked && (
          <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <p>Верно! Существует {correctAnswer} различных путей.</p>
            ) : (
              <p>Неверно! Правильный ответ: {correctAnswer}.</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Task9;
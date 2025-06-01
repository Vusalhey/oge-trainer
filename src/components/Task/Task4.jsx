import React from 'react';
import generateTask4 from '../../generators/task4.js';
import utils from '../../utils/utils';
import { Table } from 'reactstrap';

class Task4 extends React.Component {
  constructor(props) {
    super(props);
    this.taskData = generateTask4();
    this.state = {
      userAnswer: '',
      isChecked: false,
      correctAnswer: utils.encodeAnswer(4, this.taskData.answer)
    };
  }

  handleInputChange = (e) => {
    this.setState({ userAnswer: e.target.value });
  };

  handleCheck = () => {
    this.setState({ isChecked: true });
  };

  renderRoadsTable() {
    const { roads, points } = this.taskData;
    const roadExists = (from, to) => roads[from] && roads[from][to] !== undefined;

    return (
      <Table bordered className="roads-table">
        <thead>
          <tr>
            <th>Из \ В</th>
            {points.map(p => <th key={`th-${p}`}>{p}</th>)}
          </tr>
        </thead>
        <tbody>
          {points.map(from => (
            <tr key={`row-${from}`}>
              <th>{from}</th>
              {points.map(to => (
                <td key={`cell-${from}-${to}`}>
                  {roadExists(from, to) ? roads[from][to] : '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  render() {
    const { userAnswer, isChecked, correctAnswer } = this.state;
    const { startPoint, midPoint, endPoint, points } = this.taskData;
    const encodedUserAnswer = utils.encodeAnswer(4, userAnswer);
    const isCorrect = encodedUserAnswer === correctAnswer;

    return (
      <div className="task">
        <h4>Задание 4</h4>
        <p>
          Между населёнными пунктами {points.join(', ')} построены дороги, 
          протяжённость которых (в километрах) приведена в таблице:
        </p>
        
        {this.renderRoadsTable()}
        
        <p>
          Определите длину кратчайшего пути между пунктами {startPoint} и {endPoint},
          проходящего через пункт {midPoint}. Передвигаться можно только по дорогам,
          протяжённость которых указана в таблице. Каждый пункт можно посетить только один раз.
        </p>
        
        <input
          type="number"
          value={userAnswer}
          onChange={this.handleInputChange}
          disabled={isChecked}
          placeholder="Введите расстояние"
        />
        
        <button onClick={this.handleCheck} disabled={isChecked}>
          Проверить
        </button>
        
        {isChecked && (
          <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <p>Верно! {this.taskData.explanation}</p>
            ) : (
              <p>Неверно! {this.taskData.explanation}</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Task4;
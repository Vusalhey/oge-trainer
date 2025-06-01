import React from 'react';
import generateTask8 from '../../generators/task8.js';
import { Table } from 'reactstrap';

class Task8 extends React.Component {
  constructor(props) {
    super(props);
    this.taskData = generateTask8();
    this.state = {
      userAnswer: '',
      isChecked: false,
      correctAnswer: this.taskData.answer
    };
  }

  handleInputChange = (e) => {
    this.setState({ userAnswer: e.target.value });
  };

  handleCheck = () => {
    this.setState({ isChecked: true });
  };

  render() {
    const { userAnswer, isChecked, correctAnswer } = this.state;
    const { term1, term2, searchTerm, requests, results } = this.taskData;
    const isCorrect = parseInt(userAnswer) === correctAnswer;

    return (
      <div className="task">
        <h4>Задание 8</h4>
        <p>
          В языке запросов поискового сервера для обозначения логической операции "ИЛИ"
          используется символ "|", а для обозначения логической операции "И" - символ "&".
        </p>
        
        <p>
          В таблице приведены запросы и количество найденных по ним страниц некоторого
          сегмента сети Интернет.
        </p>
        
        <Table bordered>
          <thead>
            <tr>
              <th>Запрос</th>
              <th>Найдено страниц (тыс.)</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, i) => (
              <tr key={i}>
                <td>{request}</td>
                <td>{results[request]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        <p>
          Какое количество страниц (в тысячах) будет найдено по запросу "{searchTerm}"?
          Считается, что все запросы выполнялись практически одновременно, так что набор
          страниц, содержащих все искомые слова, не изменялся за время выполнения запросов.
        </p>
        
        <input
          type="number"
          min="0"
          value={userAnswer}
          onChange={this.handleInputChange}
          disabled={isChecked}
          placeholder="Введите число"
        />
        
        <button onClick={this.handleCheck} disabled={isChecked}>
          Проверить
        </button>
        
        {isChecked && (
          <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <p>Верно! {this.taskData.explanation}</p>
            ) : (
              <p>Неверно! Правильный ответ: {correctAnswer}. {this.taskData.explanation}</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Task8;
import React from 'react';
import generateTask14 from '/home/vus/oge-trainer/src/generetors/task14.js';
import { Table } from 'reactstrap';

class Task14 extends React.Component {
  constructor(props) {
    super(props);
    this.taskData = generateTask14();
    this.state = {
      answers: ['', ''],
      isChecked: false
    };
  }

  handleAnswerChange = (index, value) => {
    const newAnswers = [...this.state.answers];
    newAnswers[index] = value;
    this.setState({ answers: newAnswers });
  };

  handleCheck = () => {
    this.setState({ isChecked: true });
  };

  render() {
    const { answers, isChecked } = this.state;
    const { columns, data, questions } = this.taskData;

    return (
      <div className="task">
        <h4>Задание 14</h4>
        <p>В электронную таблицу занесены данные о погодных условиях. Ниже приведены первые пять строк таблицы:</p>
        
        <Table bordered responsive>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i}>{col.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 5).map((row, i) => (
              <tr key={i}>
                {columns.map((col, j) => (
                  <td key={j}>{row[col.name]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>

        <p>Всего в таблице {data.length} строк записей.</p>

        <div className="questions">
          {questions.map((question, i) => (
            <div key={i} className="question-item">
              <p>{question.text}</p>
              <input
                type="number"
                value={answers[i]}
                onChange={(e) => this.handleAnswerChange(i, e.target.value)}
                disabled={isChecked}
                placeholder="Введите ответ"
              />
              {isChecked && (
                <div className={`result ${answers[i] == question.answer ? 'correct' : 'incorrect'}`}>
                  {answers[i] == question.answer ? '✓ Верно' : `✗ Неверно. Правильный ответ: ${question.answer}`}
                </div>
              )}
            </div>
          ))}
        </div>

        <button 
          onClick={this.handleCheck} 
          disabled={isChecked}
          className="check-button"
        >
          Проверить ответы
        </button>
      </div>
    );
  }
}

export default Task14;
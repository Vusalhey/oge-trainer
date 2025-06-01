import React from 'react';
import generateTask10 from '/home/vus/oge-trainer/src/generetors/task10.js';

class Task10 extends React.Component {
  constructor(props) {
    super(props);
    this.taskData = generateTask10();
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

  renderNumberNotation(number) {
    return (
      <span>
        {number.value}<sub>{number.base}</sub>
      </span>
    );
  }

  render() {
    const { userAnswer, isChecked, correctAnswer } = this.state;
    const { numbers } = this.taskData;
    const isCorrect = parseInt(userAnswer) === correctAnswer;

    return (
      <div className="task">
        <h4>Задание 10</h4>
        <p>
          Среди приведённых ниже трёх чисел, записанных в различных системах счисления,
          найдите максимальное и запишите его в ответе в десятичной системе счисления.
          В ответе запишите только число, основание системы счисления указывать не нужно.
        </p>
        
        <div className="numbers-list">
          {this.renderNumberNotation(numbers[0])}, 
          {this.renderNumberNotation(numbers[1])}, 
          {this.renderNumberNotation(numbers[2])}
        </div>
        
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
              <p>Верно! Максимальное число: {correctAnswer}</p>
            ) : (
              <p>Неверно! {this.taskData.explanation}</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Task10;
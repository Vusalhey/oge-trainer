import React from 'react';
import generateTask3 from '/home/vus/oge-trainer/src/generetors/task3.js';
import utils from '../../utils/utils';

class Task3 extends React.Component {
  constructor(props) {
    super(props);
    this.taskData = generateTask3();
    this.state = {
      userAnswer: '',
      isChecked: false,
      correctAnswer: utils.encodeAnswer(3, this.taskData.answer)
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
    const encodedUserAnswer = utils.encodeAnswer(3, userAnswer);
    const isCorrect = encodedUserAnswer === correctAnswer;

    return (
      <div className="task">
        <h4>Задание 3</h4>
        <p>{this.taskData.question}</p>
        <pre>{this.taskData.expression}</pre>
        
        <input
          type="number"
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
              <p>Неверно! {this.taskData.explanation}. Правильный ответ: {this.taskData.answer}</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Task3;
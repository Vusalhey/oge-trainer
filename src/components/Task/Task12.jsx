import React from 'react';
import generateTask12 from '/home/vus/oge-trainer/src/generetors/task12.js';

class Task12 extends React.Component {
  constructor(props) {
    super(props);
    this.taskData = generateTask12();
    this.state = {
      userAnswer: '',
      isChecked: false,
      correctAnswer: this.taskData.answer
    };
  }

  handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Оставляем только цифры
    this.setState({ userAnswer: value });
  };

  handleCheck = () => {
    this.setState({ isChecked: true });
  };

  render() {
    const { userAnswer, isChecked, correctAnswer } = this.state;
    const { folder, extension } = this.taskData;
    const isCorrect = parseInt(userAnswer) === correctAnswer;

    return (
      <div className="task">
        <h4>Задание 12</h4>
        <p>
          Сколько файлов с расширением <b>.{extension}</b> содержится в подкаталогах каталога <b>{folder}</b>?
        </p>
        <p>
          В ответе укажите только число.
        </p>
        
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={userAnswer}
          onChange={this.handleInputChange}
          disabled={isChecked}
          placeholder="Введите количество файлов"
        />
        
        <button onClick={this.handleCheck} disabled={isChecked}>
          Проверить
        </button>
        
        {isChecked && (
          <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <p>Верно! В папке {folder} найдено {correctAnswer} файлов с расширением .{extension}</p>
            ) : (
              <p>Неверно! Правильный ответ: {correctAnswer}</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Task12;
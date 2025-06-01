import React from 'react';
import generateTask11 from '/home/vus/oge-trainer/src/generetors/task11.js';

class Task11 extends React.Component {
  constructor(props) {
    super(props);
    this.taskData = generateTask11();
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
    const { folder, searchText } = this.taskData;
    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();

    return (
      <div className="task">
        <h4>Задание 11</h4>
        <p>
          В одном из файлов, текст которого приведён в подкаталоге каталога <b>{folder}</b>,
          находятся такие слова: «{searchText}»
        </p>
        
        <p>
          С помощью поисковых средств операционной системы и текстового редактора или браузера
          выясните имя файла без пути к нему, только имя с расширением. Например, <i>example.txt</i>
        </p>
        
        <p>
          Если таких файлов несколько, запишите название любого из них.
        </p>
        
        <input
          type="text"
          value={userAnswer}
          onChange={this.handleInputChange}
          disabled={isChecked}
          placeholder="Введите имя файла"
        />
        
        <button onClick={this.handleCheck} disabled={isChecked}>
          Проверить
        </button>
        
        {isChecked && (
          <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <p>Верно! Файл: {correctAnswer}</p>
            ) : (
              <p>Неверно! Правильный ответ: {correctAnswer}</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Task11;
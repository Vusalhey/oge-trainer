import React from 'react';
import generateTask7 from '/home/vus/oge-trainer/src/generetors/task7.js';

class Task7 extends React.Component {
  constructor(props) {
    super(props);
    this.taskData = generateTask7();
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
    const { fileName, domain, protocol, segments } = this.taskData;
    const isCorrect = userAnswer === correctAnswer;

    return (
      <div className="task">
        <h4>Задание 7</h4>
        <p>
          Доступ к файлу <b>{fileName}</b>, находящемуся на сервере <b>{domain}</b>,
          осуществляется по протоколу <b>{protocol}</b>. Фрагменты адреса файла
          закодированы цифрами от 1 до {segments.length}. Запишите последовательность
          этих цифр, кодирующую адрес указанного файла.
        </p>

        <ol className="url-segments">
          {segments.map(item => (
            <li key={item.number}>{item.text}</li>
          ))}
        </ol>

        <input
          type="text"
          value={userAnswer}
          onChange={this.handleInputChange}
          disabled={isChecked}
          placeholder="Введите последовательность цифр"
          pattern="[0-9]*"
        />

        <button onClick={this.handleCheck} disabled={isChecked}>
          Проверить
        </button>

        {isChecked && (
          <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <p>Верно! Адрес: {protocol}://{domain}/{fileName}</p>
            ) : (
              <p>Неверно! Правильный ответ: {correctAnswer}. Адрес: {protocol}://{domain}/{fileName}</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Task7;
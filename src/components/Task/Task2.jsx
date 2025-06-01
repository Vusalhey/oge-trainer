import React from 'react';
import utils from '../../utils/utils';
import { Table } from 'reactstrap';

class Task2 extends React.Component {
  constructor(props) {
    super(props);
    this.generateExerciseData();
  }

  generateExerciseData() {
    // Алфавит для задания
    this.letters = {
      'А': '01',
      'Б': '100', 
      'К': '101',
      'Л': '111',
      'О': '00',
      'С': '110'
    };

    // Генерация случайного сообщения длиной 6 символов
    this.decodedMessage = '';
    this.encodedMessage = '';
    
    const letterKeys = Object.keys(this.letters);
    for (let i = 0; i < 6; i++) {
      const randomLetter = utils.randomItem(letterKeys);
      this.decodedMessage += randomLetter;
      this.encodedMessage += this.letters[randomLetter];
    }

    // Поиск альтернативных решений (если есть)
    this.alternativeSolution = this.findAllSolutions(this.encodedMessage, true);
    
    // Формирование ответа
    this.answer = [utils.encodeAnswer(2, this.decodedMessage)];
    if (this.alternativeSolution) {
      this.answer.push(utils.encodeAnswer(2, this.alternativeSolution));
    }

    this.state = {
      userAnswer: '',
      isChecked: false
    };
  }

  // Метод для поиска всех возможных решений
  findAllSolutions(encodedMessage, lookForReversed = false) {
    let message = encodedMessage.split('');
    if (lookForReversed) {
      message = message.reverse();
    }

    let buffer = '';
    let solution = '';
    
    for (let digit of message) {
      buffer += digit;
      const letter = this.getLetterByCode(buffer);
      if (letter) {
        solution += letter;
        buffer = '';
      }
    }

    return buffer === '' ? solution : undefined;
  }

  // Вспомогательный метод для поиска буквы по коду
  getLetterByCode(code) {
    for (const [letter, letterCode] of Object.entries(this.letters)) {
      if (letterCode === code) return letter;
    }
    return null;
  }

  handleInputChange = (e) => {
    this.setState({ userAnswer: e.target.value.toUpperCase() });
  };

  handleCheck = () => {
    this.setState({ isChecked: true });
  };

  render() {
    const { userAnswer, isChecked } = this.state;
    const isCorrect = this.answer.includes(utils.encodeAnswer(2, userAnswer));

    return (
      <div className="task">
        <h4>Задание 2</h4>
        <p>От разведчика было получено следующее сообщение:</p>
        <pre>{this.encodedMessage}</pre>
        
        <p>В этом сообщении зашифрован пароль - последовательность русских букв. 
        В пароле использовались только буквы А, Б, К, Л, О, С; каждая буква
        кодировалась двоичным словом по следующей таблице:</p>
        
        <Table className="table table-bordered text-center">
          <thead>
            <tr>
              {Object.keys(this.letters).map(letter => (
                <th key={letter}>{letter}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.values(this.letters).map((code, i) => (
                <td key={i}>{code}</td>
              ))}
            </tr>
          </tbody>
        </Table>
        
        <p>Расшифруйте сообщение. Запишите в ответе пароль.</p>
        
        <input
          type="text"
          value={userAnswer}
          onChange={this.handleInputChange}
          disabled={isChecked}
          placeholder="Введите пароль"
        />
        
        <button onClick={this.handleCheck} disabled={isChecked}>
          Проверить
        </button>
        
        {isChecked && (
          <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <p>Верно! Правильный ответ: {this.decodedMessage}</p>
            ) : (
              <p>Неверно! Правильный ответ: {this.decodedMessage}</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Task2;
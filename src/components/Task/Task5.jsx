// import React from 'react';
// import generateTask5 from '/home/vus/oge-trainer/src/generetors/task5.js';
// import utils from '../../utils/utils';

// class Task5 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.taskData = generateTask5();
//     this.state = {
//       userAnswer: '',
//       isChecked: false,
//       correctAnswer: utils.encodeAnswer(5, this.taskData.answer)
//     };
//   }

//   handleInputChange = (e) => {
//     this.setState({ userAnswer: e.target.value });
//   };

//   handleCheck = () => {
//     this.setState({ isChecked: true });
//   };

//   render() {
//     const { userAnswer, isChecked, correctAnswer } = this.state;
//     const { startNumber, commands, endNumber } = this.taskData;
//     const encodedUserAnswer = utils.encodeAnswer(5, userAnswer);
//     const isCorrect = encodedUserAnswer === correctAnswer;

//     return (
//       <div className="task">
//         <h4>Задание 5</h4>
//         <p>У исполнителя Альфа две команды, которым присвоены номера:</p>
//         <pre>1. прибавь 1</pre>
//         <pre>2. умножь на b</pre>
//         <p>(b — неизвестное натуральное число; b ≥ 2).</p>
        
//         <p>
//           Первая из них увеличивает число на экране на 1, вторая умножает его на b.
//           Алгоритм для исполнителя Альфа — это последовательность номеров команд.
//         </p>
        
//         <p>
//           Найдите значение числа b, при котором из <b>числа {startNumber}</b> по{' '}
//           <b>алгоритму {commands.join('')}</b> будет получено <b>число {endNumber}</b>.
//         </p>
        
//         <input
//           type="number"
//           min="2"
//           value={userAnswer}
//           onChange={this.handleInputChange}
//           disabled={isChecked}
//           placeholder="Введите значение b"
//         />
        
//         <button onClick={this.handleCheck} disabled={isChecked}>
//           Проверить
//         </button>
        
//         {isChecked && (
//           <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
//             {isCorrect ? (
//               <p>Верно! Алгоритм: {this.taskData.explanation}</p>
//             ) : (
//               <p>Неверно! Правильный ответ: {this.taskData.answer}. {this.taskData.explanation}</p>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default Task5;
import React from 'react';
import generateTask5 from '/home/vus/oge-trainer/src/generetors/task5.js';

class Task5 extends React.Component {
  constructor(props) {
    super(props);
    this.taskData = generateTask5();
    this.state = {
      userAnswer: '',
      isChecked: false,
      // Сохраняем оригинальный ответ для сравнения
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
    const { startNumber, commands, endNumber } = this.taskData;
    
    // Сравниваем числа напрямую, без кодирования
    const isCorrect = parseInt(userAnswer) === correctAnswer;

    return (
      <div className="task">
        <h4>Задание 5</h4>
        <p>У исполнителя Альфа две команды, которым присвоены номера:</p>
        <pre>1. прибавь 1</pre>
        <pre>2. умножь на b</pre>
        <p>(b — неизвестное натуральное число; b ≥ 2).</p>
        
        <p>
          Первая из них увеличивает число на экране на 1, вторая умножает его на b.
          Алгоритм для исполнителя Альфа — это последовательность номеров команд.
        </p>
        
        <p>
          Найдите значение числа b, при котором из <b>числа {startNumber}</b> по{' '}
          <b>алгоритму {commands.join('')}</b> будет получено <b>число {endNumber}</b>.
        </p>
        
        <input
          type="number"
          min="2"
          value={userAnswer}
          onChange={this.handleInputChange}
          disabled={isChecked}
          placeholder="Введите значение b"
        />
        
        <button onClick={this.handleCheck} disabled={isChecked}>
          Проверить
        </button>
        
        {isChecked && (
          <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <p>Верно! Алгоритм: {this.taskData.explanation}</p>
            ) : (
              <p>Неверно! Правильный ответ: {correctAnswer}. {this.taskData.explanation}</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Task5;
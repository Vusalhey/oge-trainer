// import { useState } from 'react';
// import generateTask1 from '/home/vus/oge-trainer/src/generators/task1.js';

// export default function Task1() {
//   const [taskData] = useState(generateTask1());
//   const [userAnswer, setUserAnswer] = useState('');
//   const [isChecked, setIsChecked] = useState(false);

//   return (
//     <div className="task">
//       <h4>Задание 1</h4>
//       <p>{taskData.question}</p>
//       <pre>{taskData.text}</pre>
//       <p>{taskData.task}</p>
//       <p>Напишите в ответе удалённое {taskData.subject}.</p>
      
//       <input
//         type="text"
//         value={userAnswer}
//         onChange={(e) => setUserAnswer(e.target.value)}
//         disabled={isChecked}
//       />
      
//       <button onClick={() => setIsChecked(true)} disabled={isChecked}>
//         Проверить
//       </button>
      
//       {isChecked && (
//         <div className="result">
//           {userAnswer === taskData.answer ? (
//             <p className="correct">Верно! {taskData.explanation}</p>
//           ) : (
//             <p className="incorrect">Неверно! {taskData.explanation}</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
// import { useState } from 'react';
// import generateTask1 from '../../generators/task1'; // Обратите внимание - без фигурных скобок

// export default function Task1() {
//   const [taskData] = useState(generateTask1());
//   const [userAnswer, setUserAnswer] = useState('');
//   const [isChecked, setIsChecked] = useState(false);

//   return (
//     <div className="task">
//       <h4>Задание 1</h4>
//       <p>{taskData.question}</p>
//       <pre>{taskData.text}</pre>
//       <p>{taskData.task}</p>
//       <p>Напишите в ответе удалённое {taskData.subject}.</p>
      
//       <input
//         type="text"
//         value={userAnswer}
//         onChange={(e) => setUserAnswer(e.target.value)}
//         disabled={isChecked}
//       />
      
//       <button onClick={() => setIsChecked(true)} disabled={isChecked}>
//         Проверить
//       </button>
      
//       {isChecked && (
//         <div className="result">
//           {userAnswer === taskData.answer ? (
//             <p className="correct">Верно! {taskData.explanation}</p>
//           ) : (
//             <p className="incorrect">Неверно! {taskData.explanation}</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
import React from 'react';
import utils from '/home/vus/oge-trainer/src/utils/utils.js';

class Task1 extends React.Component {
  constructor(props) {
    super(props);
    this.generateExerciseData();
  }

  generateExerciseData() {
    this.list = utils.randomItem([
      {
        common: 'животные',
        subject: 'название животного',
        items: {
          2: ['ёж', 'уж', 'як'],
          3: ['кот', 'пёс', 'рак'],
          4: ['осёл', 'удав', 'овца'],
          5: ['песец', 'олень', 'хомяк'],
          6: ['сайгак', 'свинья', 'собака'],
          7: ['альпака', 'носорог', 'утконос'],
          8: ['крокодил', 'хамелеон', 'шимпанзе'],
          9: ['аллигатор', 'горностай', 'иглошерст']
        }
      },
      {
        common: 'города',
        subject: 'название города',
        items: {
          3: ['Уфа', 'Бор', 'Шуя'],
          4: ['Ухта', 'Чита', 'Сочи'],
          5: ['Томск', 'Ревда', 'Псков'],
          6: ['Самара', 'Москва', 'Рязань'],
          7: ['Сызрань', 'Балашов', 'Саранск'],
          8: ['Тольятти', 'Владимир', 'Улан-Удэ'],
          9: ['Астрахань', 'Череповец', 'Ярославль'],
          10: ['Красноярск', 'Ставрополь', 'Кисловодск']
        }
      },
      {
        common: 'игры',
        subject: 'название игры',
        items: {
          3: ['NBA', 'WWE'],
          4: ['DayZ', 'Doom', 'FIFA'],
          5: ['Knack', 'Metro', 'Sonic'],
          6: ['FarCry', 'MadMax', 'Mortal'],
          7: ['Outlast', 'Horizon', 'Hotline'],
          8: ['Broforce', 'Terraria', 'GodOfWar'],
          9: ['Minecraft', 'Days_Gone', 'Destiny_2'],
          10: ['Dead_Space', 'Dishonored', 'BioShock_2']
        }
      }
    ]);

    let _symbolEncodingSizeInt = Math.pow(2, Math.ceil(Math.random() * 4));
    let _symbolEncodingSizeType = utils.randomItem(['битами', 'байтами']);
    this.symbolEncodingSize = `${_symbolEncodingSizeInt} ${_symbolEncodingSizeType}`;
    this.symbolEncodingSizeInBits = _symbolEncodingSizeType === 'битами' 
      ? _symbolEncodingSizeInt 
      : _symbolEncodingSizeInt * 8;
    
    let lengths = Object.keys(this.list.items).map(Number);
    this.symbolsRemoved = utils.random(Math.min(...lengths), Math.max(...lengths));

    let itemsList = [];
    for (let possibleWords of Object.values(this.list.items)) {
      itemsList.push(utils.randomItem(possibleWords));
    }
    itemsList[0] = utils.capitalize(itemsList[0]);

    this.answer = itemsList.filter(item => item.length === this.symbolsRemoved)[0];
    this.removedNameBits = (this.symbolsRemoved + 2) * this.symbolEncodingSizeInBits;
    const commaAndSpaceSymbols = 2;
    this.symbolsRemoved += commaAndSpaceSymbols;
    this.writtenText = `${itemsList.join(', ')} – ${this.list.common}`;

    this.state = {
      userAnswer: '',
      isChecked: false,
      correctAnswer: utils.encodeAnswer(1, this.answer)
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

    return (
      <div className="task">
        <h4>Задание 1</h4>
        <p>В одной из кодировок Unicode каждый символ кодируется {this.symbolEncodingSize}.</p>
        <p>Ученик написал текст (в нём нет лишних пробелов):</p>
        <pre>{this.writtenText}</pre>
        <p>Ученик удалил из списка {this.list.subject}, а также лишние запятую и пробел.</p>
        <p>При этом размер нового предложения в данной кодировке оказался на {this.removedNameBits} 
          бит меньше, чем размер исходного предложения.</p>
        <p>Напишите в ответе удалённое {this.list.subject}.</p>
        
        <input
          type="text"
          value={userAnswer}
          onChange={this.handleInputChange}
          disabled={isChecked}
        />
        
        <button onClick={this.handleCheck} disabled={isChecked}>
          Проверить
        </button>
        
        {isChecked && (
          <div className="result">
            {userAnswer === correctAnswer ? (
              <p className="correct">Верно! Правильный ответ: {this.answer}</p>
            ) : (
              <p className="incorrect">Неверно! Правильный ответ: {this.answer}</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Task1;
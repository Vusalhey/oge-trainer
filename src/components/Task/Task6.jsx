import React from 'react';
import generateTask6 from '/home/vus/oge-trainer/src/generetors/task6.js';

class Task6 extends React.Component {
  constructor(props) {
    super(props);
    this.taskData = generateTask6();
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

  renderTestCases() {
    return this.taskData.testCases.map((testCase, i) => (
      <tr key={i}>
        <td>({testCase[0]}, {testCase[1]})</td>
        <td>{this.taskData.outputs[i]}</td>
      </tr>
    ));
  }

  render() {
    const { userAnswer, isChecked, correctAnswer } = this.state;
    const { 
      condition1, 
      condition2, 
      logicalOperator, 
      targetOutput,
      testCases 
    } = this.taskData;
    
    const isCorrect = parseInt(userAnswer) === correctAnswer;

    return (
      <div className="task">
        <h4>Задание 6</h4>
        <p>Ниже приведена программа, записанная на трёх языках программирования.</p>
        
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Алгоритмический язык</th>
              <th>Pascal</th>
              <th>Python</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <pre>
                  алг<br />
                  нач<br />
                  цел s, t<br />
                  ввод s<br />
                  ввод t<br />
                  если s {condition1.operator} {condition1.value} {logicalOperator} t {condition2.operator} {condition2.value}<br />
                  то вывод "YES"<br />
                  иначе вывод "NO"<br />
                  все<br />
                  кон
                </pre>
              </td>
              <td>
                <pre>
                  var s, t: integer;<br />
                  begin<br />
                  readln(s);<br />
                  readln(t);<br />
                  if (s {condition1.operator} {condition1.value}) {logicalOperator === 'И' ? 'and' : 'or'} (t {condition2.operator} {condition2.value})<br />
                  then<br />
                  &nbsp;&nbsp;writeln('YES')<br />
                  else<br />
                  &nbsp;&nbsp;writeln('NO')<br />
                  end.
                </pre>
              </td>
              <td>
                <pre>
                  s = int(input())<br />
                  t = int(input())<br />
                  if (s {condition1.operator} {condition1.value}) {logicalOperator === 'И' ? 'and' : 'or'} (t {condition2.operator} {condition2.value}):<br />
                  &nbsp;&nbsp;print("YES")<br />
                  else:<br />
                  &nbsp;&nbsp;print("NO")
                </pre>
              </td>
            </tr>
          </tbody>
        </table>
        
        <p>
          Было проведено {testCases.length} запусков программы, при которых в качестве 
          значений переменных вводились следующие пары чисел (s, t):
        </p>
        
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Входные данные</th>
              <th>Результат</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTestCases()}
          </tbody>
        </table>
        
        <p>
          Сколько было запусков, при которых программа напечатала «{targetOutput}»?
        </p>
        
        <input
          type="number"
          min="0"
          max={testCases.length}
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

export default Task6;
import React from 'react';
import generateTask13 from '../../generators/task13.js';
import { Table } from 'reactstrap';

class Task13 extends React.Component {
  constructor(props) {
    super(props);
    this.taskData = generateTask13();
    this.state = {
      userText: '',
      isChecked: false
    };
  }

  handleTextChange = (e) => {
    this.setState({ userText: e.target.value });
  };

  handleCheck = () => {
    this.setState({ isChecked: true });
  };

  render() {
    const { userText, isChecked } = this.state;
    const { text, tableData, requirements } = this.taskData;

    return (
      <div className="task">
        <h4>Задание 13</h4>
        <p>Создайте в текстовом редакторе документ и напишите в нём следующий текст, точно воспроизведя всё оформление:</p>
        
        <div className="sample-text" style={{
          textAlign: 'justify',
          marginLeft: '40px',
          lineHeight: 1.5
        }}>
          <p style={{ textIndent: '40px' }}>
            {text.split(' ').map((word, i) => {
              if (word.startsWith('**') && word.endsWith('**')) {
                return <strong key={i}>{word.slice(2, -2)} </strong>;
              }
              if (word.startsWith('_') && word.endsWith('_')) {
                return <em key={i}>{word.slice(1, -1)} </em>;
              }
              if (word.startsWith('<u>') && word.endsWith('</u>')) {
                return <u key={i}>{word.slice(3, -4)} </u>;
              }
              return <span key={i}>{word} </span>;
            })}
          </p>
          
          <Table bordered style={{ 
            width: '100%', 
            textAlign: 'center',
            margin: '15px 0'
          }}>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    i === 0 ? 
                      <th key={j}>{cell}</th> : 
                      <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        
        <p>Требования к оформлению:</p>
        <ul>
          {requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
        
        <div className="user-input-area">
          <p>Скопируйте текст из вашего редактора сюда для проверки:</p>
          <textarea
            value={userText}
            onChange={this.handleTextChange}
            disabled={isChecked}
            rows={10}
            style={{ width: '100%' }}
          />
        </div>
        
        <button onClick={this.handleCheck} disabled={isChecked}>
          Проверить оформление
        </button>
      </div>
    );
  }
}

export default Task13;
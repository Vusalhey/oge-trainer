import React from 'react';
import { Button, Card, CardBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import CodeMirror from '@uiw/react-codemirror';
import generateTask15 from '../../generators/task15.js';

const defaultCode = {
  javascript: `function solution(input){\n  // формат входных данных: %%input%%\n  // формат выходных данных: %%output%%\n  let output\n  return output\n}`,
  python: `def solution(input):\n  # формат входных данных: %%input%%\n  # формат выходных данных: %%output%%\n  output = ''\n  return output`,
};

const languageNames = {
  javascript: 'JavaScript',
  python: 'Python'
};

class Task15 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: generateTask15(),
      language: 'javascript',
      code: '',
      executionInput: 'Здесь появится ввод в вашу программу',
      executionOutput: 'Здесь появится вывод вашей программы',
      outputType: 'default',
      exampleInput: '',
      exampleOutput: '',
      dropdownOpen: false
    };
  }

  componentDidMount() {
    this.setDefaultCode();
    this.runExample();
  }

  setDefaultCode() {
    const { language, task } = this.state;
    const code = defaultCode[language]
      .replace('%%input%%', task.languagesSpecificData[language].inputFormat)
      .replace('%%output%%', task.languagesSpecificData[language].outputFormat);
    
    this.setState({ code });
  }

  runExample() {
    const { language, task } = this.state;
    try {
      const exampleSolution = task.languagesSpecificData[language].exampleSolution;
      const input = task.languagesSpecificData[language].inputFillFunction();
      
      let output;
      if (language === 'javascript') {
        const func = new Function(`return ${exampleSolution}`)();
        output = func(eval(input));
      } else if (language === 'python' && window.pyodide) {
        output = window.pyodide.runPython(`${exampleSolution}\nsolution(${input})`);
      }

      this.setState({
        exampleInput: this.formatInput(input),
        exampleOutput: this.formatOutput(output)
      });
    } catch (e) {
      this.setState({
        exampleOutput: `Ошибка: ${e.message}`
      });
    }
  }

  handleLanguageChange(language) {
    this.setState({ language }, () => {
      this.setDefaultCode();
      this.runExample();
    });
  }

  handleExecute() {
    const { code, language, task } = this.state;
    
    try {
      const input = task.languagesSpecificData[language].inputFillFunction();
      let output;
      
      if (language === 'javascript') {
        const func = new Function(`return ${code}`)();
        output = func(eval(input));
      } else if (language === 'python' && window.pyodide) {
        output = window.pyodide.runPython(`${code}\nsolution(${input})`);
      }

      this.setState({
        executionInput: this.formatInput(input),
        executionOutput: this.formatOutput(output),
        outputType: 'default'
      });
    } catch (e) {
      this.setState({
        executionOutput: `Ошибка: ${e.message}`,
        outputType: 'error'
      });
    }
  }

  formatInput(input) {
    return typeof input === 'string' ? input : JSON.stringify(input);
  }

  formatOutput(output) {
    if (output === undefined || output === null) return 'undefined';
    if (output === '') return 'Пусто';
    return typeof output === 'string' ? output : JSON.stringify(output);
  }

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    const { 
      task, language, code, executionInput, executionOutput, outputType,
      exampleInput, exampleOutput, dropdownOpen 
    } = this.state;

    return (
      <div className="task task15">
        <h4>Задание 15 (Программирование)</h4>
        
        <div className="task-description">
          <p>{task.text}</p>
          
          <p><b>Пример работы программы:</b></p>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Входные данные</th>
                <th>Выходные данные</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><pre>{exampleInput}</pre></td>
                <td><pre>{exampleOutput}</pre></td>
              </tr>
            </tbody>
          </table>
        </div>

        <Card>
          <CardBody>
            <div className="code-editor-controls">
              <Dropdown isOpen={dropdownOpen} toggle={() => this.toggleDropdown()}>
                <DropdownToggle caret>
                  {languageNames[language]}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.handleLanguageChange('javascript')}>
                    JavaScript
                  </DropdownItem>
                  <DropdownItem onClick={() => this.handleLanguageChange('python')}>
                    Python
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              
              <Button color="primary" onClick={() => this.handleExecute()}>
                Выполнить
              </Button>
            </div>

            <div className="code-editor-container">
              <CodeMirror
                value={code}
                options={{
                  mode: language,
                  theme: 'material-ocean',
                  lineNumbers: true
                }}
                onBeforeChange={(editor, data, value) => {
                  this.setState({ code: value });
                }}
              />
            </div>

            <div className="execution-results">
              <div className="execution-input">
                <h5>Входные данные:</h5>
                <pre>{executionInput}</pre>
              </div>
              
              <div className="execution-output">
                <h5>Выходные данные:</h5>
                <pre className={outputType}>{executionOutput}</pre>
              </div>
            </div>
          </CardBody>
        </Card>

        <style jsx>{`
          .task15 {
            margin: 20px 0;
          }
          
          .code-editor-controls {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
          }
          
          .code-editor-container {
            margin-bottom: 20px;
          }
          
          .execution-results {
            display: flex;
            gap: 20px;
          }
          
          .execution-input, .execution-output {
            flex: 1;
          }
          
          pre {
            background: #f5f5f5;
            padding: 10px;
            border-radius: 4px;
            white-space: pre-wrap;
          }
          
          .error {
            color: #dc3545;
          }
        `}</style>
      </div>
    );
  }
}

export default Task15;
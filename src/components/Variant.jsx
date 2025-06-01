import { useState } from 'react';
import Task1 from './Task/Task1';
import Task2 from './Task/Task2';
import Task3 from './Task/Task3';
import Task4 from './Task/Task4';
import Task5 from './Task/Task5';
import Task6 from './Task/Task6';
import Task7 from './Task/Task7';
import Task8 from './Task/Task8';
import Task9 from './Task/Task9';
import Task10 from './Task/Task10';
import Task11 from './Task/Task11';
import Task12 from './Task/Task12';
import Task13 from './Task/Task13';
import Task14 from './Task/Task14';
import Task15 from './Task/Task15';

const taskComponents = [
  null,
  Task1, Task2, Task3, Task4, Task5,
  Task6, Task7, Task8, Task9, Task10,
  Task11, Task12, Task13, Task14, Task15
];

export default function Variant({ variant, onClose }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = (e) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    onClose();
  };

  return (
    <div className="variant">
      <div 
        className="variant-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="variant-title">
          <h3>Вариант #{variant.id}</h3>
        </div>
        <div className="variant-actions">
          <button 
            className="toggle-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? 'Свернуть' : 'Развернуть'}
          </button>
          <button 
            className="close-btn"
            onClick={handleClose}
          >
            Закрыть
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="variant-content">
          {variant.tasks.map(taskNumber => {
            const TaskComponent = taskComponents[taskNumber];
            return TaskComponent && <TaskComponent key={taskNumber} />;
          })}
        </div>
      )}
    </div>
  );
}
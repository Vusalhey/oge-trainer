// import { useState } from 'react';
// import Task1 from './Task/Task1';
// import Task2 from './Task/Task2';
// // ... импорты остальных заданий до Task15

// const taskComponents = {
//   1: Task1,
//   2: Task2,
//   // ... до 15
// };

// export default function Variant({ variant }) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="variant">
//       <div className="variant-header" onClick={() => setIsOpen(!isOpen)}>
//         <h3>Вариант #{variant.id}</h3>
//         <span>{isOpen ? '−' : '+'}</span>
//       </div>
//       {isOpen && (
//         <div className="variant-content">
//           {variant.tasks.map((taskNumber, index) => {
//             const TaskComponent = taskComponents[taskNumber];
//             return <TaskComponent key={index} />;
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
// import { useState } from 'react';
// import Task1 from '/home/vus/oge-trainer/src/components/Task/Task1.jsx';
// import Task2 from '/home/vus/oge-trainer/src/components/Task/Task2.jsx';
// ... импорты остальных заданий до Task15

// Изменяем структуру taskComponents на использование компонентов напрямую
// const taskComponents = [
//   null, // task 0 не существует
//   Task1,
  
//   // ... продолжаем до Task15
// ];

// export default function Variant({ variant }) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="variant">
//       <div className="variant-header" onClick={() => setIsOpen(!isOpen)}>
//         <h3>Вариант #{variant.id}</h3>
//         <span>{isOpen ? '−' : '+'}</span>
//       </div>
//       {isOpen && (
//         <div className="variant-content">
//           {variant.tasks.map((taskNumber, index) => {
//             const TaskComponent = taskComponents[taskNumber];
//             return <TaskComponent key={index} />;
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState } from 'react';
// import Task1 from './Task/Task1';
// // Импортируйте остальные компоненты по аналогии
// import Task2 from './Task/Task2';
// import Task3 from './Task/Task3';
// import Task4 from './Task/Task4';
// import Task5 from './Task/Task5';
// import Task6 from './Task/Task6';
// import Task7 from './Task/Task7';
// import Task8 from './Task/Task8';
// import Task9 from './Task/Task9';
// import Task10 from './Task/Task10';
// import Task11 from './Task/Task11';
// import Task12 from './Task/Task12';
// import Task13 from './Task/Task13';
// import Task14 from './Task/Task14';
// import Task15 from './Task/Task15';








// // ...
// // import Task15 from './Task/Task15';

// // Создаем массив компонентов (индекс соответствует номеру задания)
// const taskComponents = [
//   null, // 0 - не используется
//   Task1,
//   Task2,
//   Task3,
//   Task4,
//   Task5,
//   Task6,
//   Task7,
//   Task8,
//   Task9,
//   Task10,
//   Task11,
//   Task12,
//   Task13,
//   Task14,
//   Task15


//   // ...
//   // Task15
// ];

// export default function Variant({ variant }) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="variant">
//       <div className="variant-header" onClick={() => setIsOpen(!isOpen)}>
//         <h3>Вариант #{variant.id}</h3>
//         <span>{isOpen ? '−' : '+'}</span>
//       </div>
//       {isOpen && (
//         <div className="variant-content">
//           {variant.tasks.map((taskNumber) => {
//             const TaskComponent = taskComponents[taskNumber];
//             if (!TaskComponent) return null;
//             return <TaskComponent key={taskNumber} />;
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
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
  Task1,
  Task2,
  Task3,
  Task4,
  Task5,
  Task6,
  Task7,
  Task8,
  Task9,
  Task10,
  Task11,
  Task12,
  Task13,
  Task14,
  Task15
];

export default function Variant({ variant, onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    if (onClose) {
      onClose(variant.id);
    }
  };

  return (
    <div className="variant">
      <div className="variant-header">
        <div onClick={() => setIsOpen(!isOpen)} style={{flex: 1}}>
          <h3>Вариант #{variant.id}</h3>
        </div>
        <div className="variant-actions">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="toggle-btn"
          >
            {isOpen ? 'Свернуть' : 'Развернуть'}
          </button>
          <button 
            onClick={handleClose} 
            className="close-btn"
          >
            Закрыть
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="variant-content">
          {variant.tasks.map((taskNumber) => {
            const TaskComponent = taskComponents[taskNumber];
            if (!TaskComponent) return null;
            return <TaskComponent key={taskNumber} />;
          })}
        </div>
      )}
    </div>
  );
}
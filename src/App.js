// import { useState } from 'react';
// import VariantList from './components/VariantList';
// import './App.css';

// function App() {
//   const [variants, setVariants] = useState([]);

//   const generateVariant = () => {
//     const newVariant = {
//       id: Date.now(),
//       tasks: Array(15).fill().map((_, i) => i + 1) // Номера заданий 1-15
//     };
//     setVariants([...variants, newVariant]);
//   };

//   return (
//     <div className="app">
//       <h1>Генератор вариантов ОГЭ по информатике</h1>
//       <button onClick={generateVariant} className="generate-btn">
//         Сгенерировать вариант
//       </button>
//       <VariantList variants={variants} />
//     </div>
//   );
// }

// export default App;
import { useState } from 'react';
import VariantList from './components/VariantList';
import './App.css';

function App() {
  const [variants, setVariants] = useState([]);

  const generateVariant = () => {
    const newVariant = {
      id: Date.now(),
      tasks: Array(15).fill().map((_, i) => i + 1)
    };
    setVariants([...variants, newVariant]);
  };

  const removeVariant = (variantId) => {
    setVariants(variants.filter(v => v.id !== variantId));
  };

  return (
    <div className="app">
      <h1>Генератор вариантов ОГЭ по информатике</h1>
      <button onClick={generateVariant} className="generate-btn">
        Сгенерировать вариант
      </button>
      <button 
        onClick={() => setVariants([])} 
        className="clear-all-btn"
      >
        Очистить все варианты
      </button>
      <VariantList 
        variants={variants} 
        onRemoveVariant={removeVariant} 
      />
    </div>
  );
}

export default App;
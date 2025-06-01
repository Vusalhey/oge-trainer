import { useState } from 'react';
import VariantList from './components/VariantList';
import './App.css';

function App() {
  const [variants, setVariants] = useState([]);

  const generateVariant = () => {
    const newVariant = {
      id: Date.now(), // Используем timestamp для уникального ID
      tasks: Array.from({length: 15}, (_, i) => i + 1)
    };
    setVariants([...variants, newVariant]);
  };

  const removeVariant = (variantId) => {
    setVariants(prevVariants => prevVariants.filter(v => v.id !== variantId));
  };

  const clearAllVariants = () => {
    setVariants([]);
  };

  return (
    <div className="app">
      <h1>Генератор вариантов ОГЭ по информатике</h1>
      <div className="controls">
        <button onClick={generateVariant} className="generate-btn">
          Сгенерировать вариант
        </button>
        {variants.length > 0 && (
          <button onClick={clearAllVariants} className="clear-all-btn">
            Очистить все
          </button>
        )}
      </div>
      <VariantList 
        variants={variants} 
        onRemoveVariant={removeVariant} 
      />
    </div>
  );
}

export default App;
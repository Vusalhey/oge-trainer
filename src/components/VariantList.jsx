import Variant from './Variant';

export default function VariantList({ variants, onRemoveVariant }) {
  if (variants.length === 0) {
    return <p className="no-variants">Нет созданных вариантов</p>;
  }

  return (
    <div className="variant-list">
      {variants.map(variant => (
        <Variant 
          key={variant.id} 
          variant={variant}
          onClose={() => onRemoveVariant(variant.id)}
        />
      ))}
    </div>
  );
}
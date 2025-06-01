import Variant from './Variant';

export default function VariantList({ variants }) {
  return (
    <div className="variant-list">
      {variants.map(variant => (
        <Variant key={variant.id} variant={variant} />
      ))}
    </div>
  );
}
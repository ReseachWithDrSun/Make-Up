export default function TryOnButton({ product, onTry }) {
  return (
    <button onClick={() => onTry(product)}>
      Try {product.name}
    </button>
  );
}

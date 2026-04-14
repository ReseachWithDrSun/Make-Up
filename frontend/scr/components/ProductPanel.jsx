import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { getProducts } from "../api/client";

export default function ProductPanel() {
  const [products, setProducts] = useState([]);
  const setProduct = useStore(s => s.setProduct);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div style={{ position:"absolute", bottom:20, left:20, background:"#fff", padding:10 }}>
      {products.map(p => (
        <button key={p.id} onClick={() => setProduct(p.type, p)}>
          {p.name}
        </button>
      ))}
    </div>
  );
}

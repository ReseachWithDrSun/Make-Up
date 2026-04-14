import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { useStore } from "../store/useStore";

export default function ProductPanel() {
  const [products, setProducts] = useState([]);
  const setProduct = useStore(s => s.setProduct);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div style={{
      position: "absolute",
      bottom: 10,
      left: 10,
      background: "rgba(0,0,0,0.6)",
      padding: 10,
      color: "white"
    }}>
      {products.map(p => (
        <div key={p.id}>
          <b>{p.name}</b>

          <button onClick={() => setProduct(p.type, p)}>
            Try
          </button>

          <a href={p.url} target="_blank">
            Buy
          </a>
        </div>
      ))}
    </div>
  );
}

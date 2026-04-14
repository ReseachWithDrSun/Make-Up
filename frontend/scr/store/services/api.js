export async function getProducts() {
  const res = await fetch("http://localhost:8000/products");
  return res.json();
}

import { useState } from "react";

export default function SavedLooks() {
  const [looks, setLooks] = useState([]);

  function saveLook(look) {
    setLooks([...looks, look]);
  }

  return (
    <div>
      <h3>Saved Looks</h3>
      {looks.map((l, i) => (
        <div key={i}>{JSON.stringify(l)}</div>
      ))}
    </div>
  );
}

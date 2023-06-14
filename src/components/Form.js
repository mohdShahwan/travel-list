import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) =>
          setQuantity(() => setQuantity(() => Number(e.target.value)))
        }
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
          <option value={i}>{i}</option>
        ))}
      </select>
      <input
        type="text"
        onChange={(e) => setDescription(() => e.target.value)}
        placeholder="Item..."
        value={description}
      />
      <button>Add</button>
    </form>
  );
}

import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 12, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    // Spread operator where used here to achieve immutability by mutating elements in the original array
    setItems((currentItems) => [...currentItems, item]);
  }

  function handleDeleteItems(itemId) {
    setItems((currentItems) => currentItems.filter((i) => itemId !== i.id));
  }

  function handleUpdateItems(itemId) {
    setItems((currentItems) =>
      currentItems.map((i) =>
        i.id === itemId ? { ...i, packed: !i.packed } : i
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackageList
        onUpdateItems={handleUpdateItems}
        onDeleteItems={handleDeleteItems}
        items={items}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
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

function PackageList({ items, onDeleteItems, onUpdateItems }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  else if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  else
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onUpdateItems={onUpdateItems}
            onDeleteItems={onDeleteItems}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItems, onUpdateItems }) {
  return (
    <li>
      <input
        type="checkbox"
        onChange={() => onUpdateItems(item.id)}
        checked={item.packed}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((i) => i.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {numItems === numPacked
          ? "You got everything! Ready to go ✈"
          : `You have ${numItems} items on your list, and you have already packed
            ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}

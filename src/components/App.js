import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackageList from "./PackageList";
import Stats from "./Stats";

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

  function handleClearItems() {
    const confirmed = window.confirm(
      "Are you shure you want to delete all items?"
    );

    if (confirmed) setItems(() => []);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackageList
        items={items}
        onUpdateItems={handleUpdateItems}
        onDeleteItems={handleDeleteItems}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}

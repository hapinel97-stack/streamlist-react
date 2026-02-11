import React, { useEffect, useRef, useState } from "react";

export default function StreamList() {
  const [text, setText] = useState("");
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("streamListItems");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const didMountRef = useRef(false);

useEffect(() => {
  if (!didMountRef.current) {
    didMountRef.current = true;
    return;
  }

  localStorage.setItem("streamListItems", JSON.stringify(items));
}, [items]);

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    const newItem = {
      id: Date.now(),
      title: trimmed,
      completed: false,
    };

    setItems((prev) => [...prev, newItem]);
    console.log(trimmed);
    setText("");
  }

  function toggleComplete(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function startEdit(item) {
    setEditId(item.id);
    setEditText(item.title);
  }

  function saveEdit(id) {
    const trimmed = editText.trim();
    if (!trimmed) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, title: trimmed } : item
      )
    );

    setEditId(null);
    setEditText("");
  }

  function cancelEdit() {
    setEditId(null);
    setEditText("");
  }

  function deleteItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div style={{ padding: "16px" }}>
      <h1>StreamList</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "12px" }}>
        <input
          type="text"
          placeholder="Enter a movie or show"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ padding: "6px", width: "220px" }}
        />
        <button type="submit" style={{ marginLeft: "8px" }}>
          Add
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, maxWidth: "520px" }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "8px",
            }}
          >
            <div style={{ flex: 1 }}>
              {editId === item.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ width: "100%", padding: "6px" }}
                />
              ) : (
                <span
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  {item.title}
                </span>
              )}
            </div>

            <div style={{ display: "flex", gap: "8px", marginLeft: "12px" }}>
              <button onClick={() => toggleComplete(item.id)} type="button">
                <span className="material-symbols-outlined">
                  {item.completed ? "check_circle" : "radio_button_unchecked"}
                </span>
              </button>

              {editId === item.id ? (
                <>
                  <button onClick={() => saveEdit(item.id)} type="button">
                    <span className="material-symbols-outlined">save</span>
                  </button>
                  <button onClick={cancelEdit} type="button">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(item)} type="button">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button onClick={() => deleteItem(item.id)} type="button">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
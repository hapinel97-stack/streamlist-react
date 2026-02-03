import { useState } from "react";

function StreamList() {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    setTitle("");
  };

  return (
    <div>
      <h2>StreamList</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a movie or show"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default StreamList;
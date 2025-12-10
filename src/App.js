import { useState } from "react";

export default function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJoke = async () => {
    setLoading(true);
    setError("");
    setJoke(null);

    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setJoke(`${data.setup} ${data.punchline}`);
    } catch (err) {
      setError("Could not fetch a joke. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Random Joke</h2>

      {joke && !error && <p>{joke}</p>}
      {!joke && !error && <p>Click the button to fetch a fresh one.</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={fetchJoke} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Joke"}
      </button>
    </div>
  );
}
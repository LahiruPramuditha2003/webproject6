import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/") // calls your backend API
      .then((res) => res.text()) // backend sends plain text response
      .then((data) => setMessage(data)); // store it in "message" state
  }, []);

  return (
    <div>
      <h1>MERN Project</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { emit, listen } from "@tauri-apps/api/event";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unlisten = listen("inc", (event) => {
      console.log("Received event:", event);
      setCount((c) => c + 1);
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  const send = () => {
    console.log("Sending event...");
    emit("inc");
  };

  return (
    <div>
      <h1>React Counter</h1>
      <p>Current count: {count}</p>
      <button onClick={send}>Increment</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

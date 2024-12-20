import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-red-600">
      <p>This is my application.</p>
    </div>
  );
}

export default App;

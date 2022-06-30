import { useFetchAPI } from "../lib/hooks";

import "./App.css";
import logo from "./logo.svg";

function App() {
  const [data, loading, err] = useFetchAPI(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{ color: "#fa6f9d" }}>
          Hello guy, your welcome. Apply it for your project now! 💕
        </p>
        <a
          className="App-link"
          href="https://vdzblog.xyz/docs/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          Go to documentation ➜
        </a>
      </header>
    </div>
  );
}

export default App;

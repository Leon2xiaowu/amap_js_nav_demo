import "./App.css";
import Demo from "./pages/DEMO";
import { useState } from "react";

function App() {
  const [showMap, setMapVisibility] = useState(true);
  return (
    <div className="App">
      <div className="toolBar">
        <button onClick={() => setMapVisibility(!showMap)}>
          切换显示状态{showMap.toString()}
        </button>
      </div>
      {showMap ? <Demo /> : ""}
    </div>
  );
}

export default App;

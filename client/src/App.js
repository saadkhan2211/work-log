import "./App.css";
import WorkLogGenerator from "./WorkLog";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/work" element={<WorkLogGenerator />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

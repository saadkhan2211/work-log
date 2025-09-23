import "./App.css";
import WorkLogGenerator from "./WorkLog";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorkLogGenerator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

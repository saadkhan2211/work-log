import "./App.css";
import WorkLogGenerator from "./pages/WorkLog";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<WorkLogGenerator />} />
        <Route path="/auth" element={<WorkLogGenerator />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AdminPahe from "./page/admin";
import LoginPage from "./page/login";
import MainPage from "./page/main";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPahe />} />
      </Routes>
    </Router>
  );
}

export default App;
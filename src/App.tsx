import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Views/Authentication/LoginPage/Index";
import SignupPage from "./Views/Authentication/SignupPage";
import Home from "./Views/Home/Index";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

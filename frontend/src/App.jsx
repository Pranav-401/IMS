// Example App.jsx snippet
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import "./App.css";
import Dashboard from "./pages/Dashboard.jsx";
import Products from "./components/Product.jsx";
import Receipts from "./components/Receipt.jsx";

function App() {
  return (
    <div className="montserrat">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add a placeholder for Forgot Password if needed */}
      </Routes>
    </div>

    // <Products />
    // <Receipts />
  );
}

export default App;

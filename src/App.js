import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import Signup from "./screens/Signup.js";
import { CartProvider } from "./components/contextReducer.js";
import MyOrder from "./screens/MyOrder.js";
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/createuser" element={<Signup />}></Route>
            <Route exact path="/myorder" element={<MyOrder />}></Route>
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

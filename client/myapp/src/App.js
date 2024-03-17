import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";
import ImageUploading from "./components/Image-Handling/ImageUploading";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ImageUploading" element={<ImageUploading />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

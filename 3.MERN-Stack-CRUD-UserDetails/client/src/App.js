import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./screens/Users";
import CreateUsers from "./screens/CreateUser";
import EditUsers from "./screens/EditUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />}></Route>
          <Route path="/create" element={<CreateUsers />}></Route>
          <Route path="/edit/:id" element={<EditUsers />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

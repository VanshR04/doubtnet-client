import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import AddDoubt from "./AddDoubt";
import About from "./About";
import Signup from "./Signup";
import Login from "./Login";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Signup} />
        <Route path="/add-doubt" Component={AddDoubt} />
        <Route path="/about" Component={About} />
        <Route path="/signup" Component={Signup} />
        <Route path="/home" Component={Home} />
        <Route path="/login" Component={Login} />
      </Routes>
    </Router>
  );
}

export default App;

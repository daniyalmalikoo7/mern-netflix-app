import "./app.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

function App() {
  const user = true;

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/"
          element={user ? <Home /> : <Navigate to="/register" />}
        />
        {user && (
          <>
            <Route path="/movies" element={<Home type={"movies"} />} />
            <Route path="/series" element={<Home type={"series"} />} />
            <Route path="/watch/:movieId" element={<Watch />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

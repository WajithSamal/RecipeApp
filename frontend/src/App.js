import {BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Favourites from "./pages/Favourites";
import {useAuthContext} from "./hooks/useAuthContext";

function App() {
  const {user} = useAuthContext()

  return (
    <div className="App">
    <BrowserRouter>
      <Navbar></Navbar>
      <div className="pages">
        <Routes>
          <Route
              path="/"
              element={<Home />}

          />
          <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to={'/'}/>}

          />
          <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to={'/'}/>}

          />
          <Route
              path="/favourites"
              element={user ? <Favourites /> : <Navigate to={'/'}/>}

          />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;

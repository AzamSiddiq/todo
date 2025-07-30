import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import TodoPage from './pages/TodoPage';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/todo" /> : <Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={isLoggedIn ? <Navigate to="/todo" /> : <SignIn />} />
        <Route path="/todo" element={isLoggedIn ? <TodoPage /> : <Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;


//mongodb+srv://azamnba1:azamnba1@cluster0.cgqfz3y.mongodb.net/
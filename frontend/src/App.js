
import './App.css';
import { LoginForm } from './Components/LoginForm';
import { SignForm } from './Components/SignForm';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<SignForm />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

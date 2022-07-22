
import './App.css';
import { LoginForm } from './Components/LoginForm';
import { SignForm } from './Components/SignForm';
import { UIProvider } from './Components/Context/UIContext';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <UIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<SignForm />} />
        </Routes>
      </BrowserRouter>
    </UIProvider>
  );
}

export default App;


import './App.css';
import { LoginForm } from './Components/LoginForm';
import { SignForm } from './Components/SignForm';
import { MovementsContainer } from './Components/MovementsContainer';
import { UIProvider } from './Components/Context/UIContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UIProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<SignForm />} />
            <Route path="/movements" element={<MovementsContainer />} />
          </Routes>
        </BrowserRouter>
      </UIProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;


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
import { MovementsAddForm } from './Components/MovementsAddForm';
import { CategoriesContainer } from './Components/CategoriesContainer';
import { CategoriesAddForm } from './Components/CategoriesAddForm';
import { MovementsDetail } from './Components/MovementsDetail';
import { CategoriesDetail } from './Components/CategoriesDetail';
import { CategoriesEditForm } from './Components/CategoriesEditForm';
import { MovementsEditForm } from './Components/MovementsEditForm';
import { Home } from './Components/Home';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UIProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<SignForm />} />

            <Route path="/home" element={<Home />} />

            <Route path="/movements" element={<MovementsContainer />} />
            <Route path="/addMovement" element={<MovementsAddForm />} />
            <Route path="/movements/:id" element={<MovementsDetail />} />
            <Route path="/editMovement/:id" element={<MovementsEditForm />} />

            <Route path="/categories" element={<CategoriesContainer />} />
            <Route path="/addCategory" element={<CategoriesAddForm />} />
            <Route path="/categories/:id" element={<CategoriesDetail />} />
            <Route path="/editCategory/:id" element={<CategoriesEditForm />} />


          </Routes>
        </BrowserRouter>
      </UIProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;

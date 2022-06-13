//import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Cart from './pages/Cart';
import Home from "./pages/Home";
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Pay from './pages/Pay';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pay />} />
        <Route path='/pay' element={<Pay />} />
        <Route path='/sucess' element={<ProductList />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;

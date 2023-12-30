import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Navbar from './components/Navbar';
import EditProduct from './components/EditProduct';

const App = () => {
  return (

    <BrowserRouter>
      <div>
        <Navbar />

        <Routes>

          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" exact element={<ProductList />} />
          <Route path="/add" exact element={<AddProduct />} />
          <Route path="/edit" exact element={<EditProduct />} />
        </Routes>

      </div>
    </BrowserRouter>

  );
};

export default App;

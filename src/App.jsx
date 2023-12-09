
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './componentsPages/Footer';
import Nav from './componentsPages/Nav';
import FavoritesPage from './componentsPages/FavoritesPage';
import Home from './componentsPages/Home';
import Cart from './componentsPages/Cart';
import Login from './componentsPages/Login';
import ErrorPage from './componentsPages/ErrorPage';
import ProductsPage from './componentsPages/ProductsPage';




function App() {
 

  return (
    <div data-theme="fantasy" className="App">
       <Nav />

       
<main>

<Routes>
  <Route path='/' element={<Home />} />
  <Route path='/*' element={<ErrorPage/>} />
<Route path='/favoritespage' element={<FavoritesPage/>} />
<Route path='/cart' element={<Cart />} />
<Route path='/loginpage' element={<Login />} />
<Route path='/products' element={<ProductsPage />} />
</Routes>

</main>



       <Footer />
    </div>
  );
}

export default App;

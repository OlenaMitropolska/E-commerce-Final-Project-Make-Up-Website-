
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
import SelectedProduct from './componentsPages/SelectedProduct';
import Registration from './componentsPages/Registration';
import Backendless from 'backendless';
import Profile from './componentsPages/Profile';


function App() {

  Backendless.serverURL = "https://eu-api.backendless.com"
  Backendless.initApp(process.env.REACT_APP_APP_ID, process.env.REACT_APP_KEY);
 

  return (
    <div data-theme="fantasy" className="App">
       <Nav />

       
{/* <main></main> */}

<Routes>
  <Route path='/' element={<Home />} />
  <Route path='/*' element={<ErrorPage/>} />
<Route path='/favoritespage' element={<FavoritesPage/>} />
<Route path='/cart' element={<Cart />} />
<Route path='/loginpage' element={<Login />} />
<Route path='/products' element={<ProductsPage />} />
<Route path='/product' element={<SelectedProduct />} />
<Route path='/register' element={<Registration />} />
<Route path="/profile" element={<Profile />} />
</Routes>





       <Footer />
    </div>
  );
}

export default App;

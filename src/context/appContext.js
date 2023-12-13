import { createContext, useContext, useState } from "react"
import axios, { Axios } from 'axios';
import { useNavigate } from "react-router-dom";
import Backendless from "backendless";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContext = createContext()

export const AppProvider = ({children}) => {
   // api part
    function dataRetriever () {
        axios.get("https://makeup-api.herokuapp.com/api/v1/products.json")
        .then (response => console.log(response.data))
        .catch(err => console.log(err))
      }


      //products main search part
      const navigate = useNavigate()

      const [products, setProducts] = useState([])
      function searchSubmitHandler (category) {
         axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${category}`)
         .then(response => {
            setProducts (response.data);
            navigate("/products")
         })
        .catch(err => {console.log(err)
         navigate("/")
        })
       }

      // categories for search
      function categoriesSearchHandler (categorySearch) {
         axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${categorySearch}`)
         .then(response => {
            const data = response.data
          setProducts (data.slice(0,50))})
        .catch(err => console.log(err))

         navigate("/products")
      }

      //selected product part
      const [selectedProduct, setselectedProduct] = useState()
      function selectProduct(click) {
         setselectedProduct(click)
         navigate("/product")
       }

       //selected product price
       const [selectedProductPrice, setselectedProductPrice] = useState()
       function price () {
         if(selectedProduct.price !== "0.0") {
            setselectedProductPrice(selectedProduct.price);
         }else {
            setselectedProductPrice("Out of stock");
         }
       }

       //cart part
       const [cartProduct, setcartProduct] = useState([])
       function addCart (item) {
      console.log(item);
      setcartProduct(i => [...i,item])
      toast("Item has been added");

      
            // navigate("/cart")
          }

  


   // registration part

function RegisterUser(name,email,password,dateBirth,city,address, postcode) {
   var User = new Backendless.User()
   User.name = name
   User.email = email 
   User.password = password
   User.DateofBirth = dateBirth
   User.City = city
   User.Street = address
   User.Postcode = postcode
     Backendless.UserService.register(User)
   .then(
     res => console.log(res)
   ).catch(error => console.log(error)) 
 }

   // login part
   function LoginUser (loginEmail,loginPassword) {
      Backendless.UserService.login( loginEmail, loginPassword, true )
      .then( response => console.log("success"))
      .catch(err => console.log(err));
   }

    

   return <AppContext.Provider value={{dataRetriever, searchSubmitHandler, products, RegisterUser, LoginUser, 
   categoriesSearchHandler, selectedProduct, selectProduct,addCart,cartProduct, price, selectedProductPrice}}>
{children}
   </AppContext.Provider>
}

export const useAppContext = (() => {return useContext(AppContext)})
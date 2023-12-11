import { createContext, useContext, useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Backendless from "backendless";

const AppContext = createContext()

export const AppProvider = ({children}) => {
   // api part
    function dataRetriever () {
        axios.get("https://makeup-api.herokuapp.com/api/v1/products.json")
        .then (response => console.log(response.data))
        .catch(err => console.log(err))
      }

      const navigate = useNavigate()

      const [products, setProducts] = useState([])
      function searchSubmitHandler (value,category) {
         axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${value}`)
         // https://makeup-api.herokuapp.com/api/v1/products.json?brand=${value}&product_type=${category}
         .then(response => {
            console.log(response.data);
            setProducts (response.data)})
        .catch(err => console.log(err))
         console.log(products)

         navigate("/products")
       }

      //  function submitHandler (e) {
      //    e.preventDefault()
      //    const value = e.target.searchinput.value
      //    console.log(value)
      //    axios.get(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${value}`)
      //    .then(response => {
      //       console.log(response.data);
      //       setProducts (response.data)})
      //   .catch(err => console.log(err))
      //    console.log(products)

      //    navigate("/products")

      //    e.target.searchinput.value = ""
      //  }

      function faceProducts () {
         axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=blush`)
         .then(response => {
            console.log(response.data);
            setProducts (response.data)})
        .catch(err => console.log(err))
         console.log(products)

         navigate("/products")
      }

      // to many products to call? divide the categories


   // registration part

function RegisterUser(name,email,password) {
   var User = new Backendless.User()
   User.name = name
   User.email = email 
   User.password = password
     Backendless.UserService.register(User)
   .then(
     res => console.log(res)
   ).catch(error => console.log(error)) 
 }

   // login part
    

   return <AppContext.Provider value={{dataRetriever, searchSubmitHandler, products, faceProducts,RegisterUser}}>
{children}
   </AppContext.Provider>
}

export const useAppContext = (() => {return useContext(AppContext)})
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
      function submitHandler (e) {
         e.preventDefault() //same as register , do function in component and here just call api 
         const value = e.target.searchinput.value
         const category = e.target.searchinput.value
         console.log(value)
         axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${value}&product_type=lipstick`)
         // https://makeup-api.herokuapp.com/api/v1/products.json?brand=${value}&product_type=${category}
         .then(response => {
            console.log(response.data);
            setProducts (response.data)})
        .catch(err => console.log(err))
         console.log(products)

         navigate("/products")

         e.target.searchinput.value = ""
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
         axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=blush&product_type=foundation`)
         .then(response => {
            console.log(response.data);
            setProducts (response.data)})
        .catch(err => console.log(err))
         console.log(products)

         navigate("/products")
      }


   // registration part

   //here create const for name email and password and send to registration 

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
    

   return <AppContext.Provider value={{dataRetriever, submitHandler, products, faceProducts,RegisterUser}}>
{children}
   </AppContext.Provider>
}

export const useAppContext = (() => {return useContext(AppContext)})
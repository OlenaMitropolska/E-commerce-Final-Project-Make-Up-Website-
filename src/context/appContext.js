import { createContext, useContext, useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AppContext = createContext()

export const AppProvider = ({children}) => {
    function dataRetriever () {
        axios.get("https://makeup-api.herokuapp.com/api/v1/products.json")
        .then (response => console.log(response.data))
        .catch(err => console.log(err))
      }

      const navigate = useNavigate()

      const [products, setProducts] = useState([])
      function submitHandler (e) {
         e.preventDefault()
         const value = e.target.searchinput.value
         const category = e.target.searchinput.value
         console.log(value)
         axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl&product_type=lipstick`)
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
    

   return <AppContext.Provider value={{dataRetriever, submitHandler, products, faceProducts}}>
{children}
   </AppContext.Provider>
}

export const useAppContext = (() => {return useContext(AppContext)})
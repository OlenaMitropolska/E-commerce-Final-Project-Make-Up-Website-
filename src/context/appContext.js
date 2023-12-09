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
         console.log(value)
         axios.get(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${value}`)
         .then(response => {
            console.log(response.data);
            setProducts (response.data)})
        .catch(err => console.log(err))
         console.log(products)

         navigate("/products")

         e.target.searchinput.value = ""
       }




   return <AppContext.Provider value={{dataRetriever, submitHandler, products}}>
{children}
   </AppContext.Provider>
}

export const useAppContext = (() => {return useContext(AppContext)})
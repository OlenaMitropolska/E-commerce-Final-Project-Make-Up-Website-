import { createContext, useContext, useState } from "react"
import axios, { Axios } from 'axios';
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


      //products main search part
      const navigate = useNavigate()

      const [products, setProducts] = useState([])
      function searchSubmitHandler (category) {
         axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${category}`)
        
         .then(response => {
//             response.filter(obj =>{
//                var path = obj.image_link
//                axios.get('path')
// .then(res=> {return obj})
// .catch(er=>{
//    console.log(er);
//    return null
// })
//             } )
            setProducts (response.data);
            navigate("/products")
            console.log(products)
         
         })
        .catch(err => {console.log(err)
         navigate("/")
        })
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


      // categories for search
      function categoriesSearchHandler (categorySearch) {
         axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${categorySearch}`)
         .then(response => {
            const data = response.data
          setProducts (data.slice(0,50))})
        .catch(err => console.log(err))

         navigate("/products")
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

    

   return <AppContext.Provider value={{dataRetriever, searchSubmitHandler, products, RegisterUser, LoginUser, categoriesSearchHandler}}>
{children}
   </AppContext.Provider>
}

export const useAppContext = (() => {return useContext(AppContext)})
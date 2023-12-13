import { createContext, useContext, useEffect, useState } from "react"
import axios, { Axios } from 'axios';
import { useNavigate } from "react-router-dom";
import Backendless from "backendless";
import { ToastContainer, toast } from 'react-toastify';
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
      const [selectedProduct, setselectedProduct] = useState([])
      function selectProduct(click) {
         setselectedProduct(i => [...i,click])
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
       //cart add 
       const [cartProduct, setcartProduct] = useState([])
       function addCart (item) {
           console.log(item);
          setcartProduct(i => [...i,item])
          document.getElementById('my_modal_5').showModal()
            // navigate("/cart")
          }
       


      // cart increase quantity
      function increaseCart(item) {
         const result = cartProduct.map((i) => {
           if (i.selectedProduct.id == item.selectedProduct.id) {
             i.quantity += 1;
           }
           return i;
         });
     
         setcartProduct((i) => result);
       }


      

         // if (cartProduct.find((i) => i.selectedProduct.id == item.id)) {
         //    const result = cartProduct.map((i) => {
         //      if (i.selectedProduct.id == item.id) {
         //        i.quantity += 1;
         //      }
         //      return i;
         //    });
      
         //    setcartProduct((i) => result);
         //  } else {
         //    setcartProduct((i) => [...i, { product: item, quantity: 1 }]);
         //  }

         


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
     res => {console.log(res)

      toast.success("You have successfully registered!", {
        position: toast.POSITION.TOP_CENTER});  //how to add the instead of text a div element
      navigate("/loginpage")
     }).catch(error => {console.log(error)
      alert("smth went wrong, please try again!")}) 
 }

   // login part
   function LoginUser (loginEmail,loginPassword) {
      Backendless.UserService.login( loginEmail, loginPassword, true )
      .then( response => {console.log("success")

      getProfileInfo ()
      navigate("/")
   })
      .catch(err => console.log(err));
   }

   //check if logged in then to profile page if not to login page
   function LoggedinOrNot () {
    Backendless.UserService.isValidLogin()
    .then(response => {console.log(response) 
    if(response == true) {
      navigate("/profile")
    }else {
      navigate("/loginpage")
    }
    })
    .catch(error => console.log(error));
   }
  //  works, but i can still manually go to the profile page

  // profile page part, basic object retrieval (take info from backend to display to user)
  const [userInfo, setUserInfo] = useState([])
  function getProfileInfo () {
    Backendless.Data.of( "Users" ).find()
    .then(res => {console.log(res)
      setUserInfo(res)
    })
    .catch(err => console.log(err)) 
  }
//save only 1 users info and display it, save if refreshed!
  useEffect(() => { if(userInfo != "") {
    localStorage.setItem('userInfo', JSON.stringify(userInfo)); //i save but not display if refresh
  }
}, [userInfo]);


  // other comp
  // if(localStorage.getItem("todos")) { //so it works on other peoples maschines
//     let saved = localStorage.getItem("todos")
//     todos = JSON.parse(saved)
// }
  


   return <AppContext.Provider value={{dataRetriever, searchSubmitHandler, products, RegisterUser, LoginUser, 
   categoriesSearchHandler, selectedProduct, selectProduct,addCart,cartProduct, price,increaseCart, LoggedinOrNot, getProfileInfo,userInfo }}>
{children}
   </AppContext.Provider>
}

export const useAppContext = (() => {return useContext(AppContext)})
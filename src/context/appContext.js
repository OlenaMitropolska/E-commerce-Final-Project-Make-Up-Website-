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

      //home page part -- do the map of brands if clicked on one, go to all products from this brand here with function works only if we click or smth, do otherwise
const [brands, setBrands] = useState([])
function displayBrands () {
  axios.get("https://makeup-api.herokuapp.com/api/v1/products.json")
        .then (response => {console.log(response.data)
          setBrands (response.data)
        })
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

          //selected product price
      //  const [selectedProductPrice, setselectedProductPrice] = useState()
      //  function price () {
      //    if(selectedProduct.price !== "0.0") {
      //       setselectedProductPrice(selectedProduct.price);
      //    }else {
      //       setselectedProductPrice("Out of stock");
      //    }
      //  }

      //selected product part
      const [selectedProduct, setselectedProduct] = useState([])
      function selectProduct(click) {
         setselectedProduct(i => [...i,click])
         navigate("/product")
       }

       //cart part
       //cart add 
       const [cartProduct, setcartProduct] = useState([])
       function addCart (item) {
        console.log(item);
        console.log(selectedProduct[0].id);
         if (cartProduct.find((i) => i.selectedProduct.id == item.id)) {
            const addP = cartProduct.map((i) => {
              if (i.selectedProduct.id == item.id) {
                i.quantity += 1;
                document.getElementById('my_modal_5').showModal()
              }
              return i;
            });
            setcartProduct((i) => [addP]);
          } else {
            setcartProduct((i) => [...i, { product: item, quantity: 1 }]);
            document.getElementById('my_modal_5').showModal()
          }
        }

          // console.log(item);
          // setcartProduct(i => [...i,item])
// document.getElementById('my_modal_5').showModal()
        
       



     


             // cart increase quantity
      // function increaseCart(item) {
      //    const incC = cartProduct.map((i) => {
      //      if (i.selectedProduct.id == item.selectedProduct.id) {
      //        i.quantity += 1;
      //      }
      //      return i;
      //    });
     
      //    setcartProduct((i) => incC);
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
        position: toast.POSITION.TOP_CENTER});  //add the instead of text a div element
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

  //protected routes 
  // const [user, setUser] = useState(false) //Set to true in logged in if logged in

   //check if logged in then to profile page if not to login page
   function LoggedinOrNot () {
    Backendless.UserService.isValidLogin()
    .then(response => {console.log(response) 
    if(response == true) {
      navigate("/profile")
      // setUser(true)
    }else {
      navigate("/loginpage")
    }
    })
    .catch(error => console.log(error));
   }

   //check if logged in to go to fav page
   function LoggedinOrNotFavPage () {
    Backendless.UserService.isValidLogin()
    .then(response => {console.log(response) 
    if(response == true) {
      navigate("/favoritespage")
      // setUser(true)
    }else {
      navigate("/loginpage")
    }
    })
    .catch(error => console.log(error));
   }

  // profile page part
  const [userInfo, setUserInfo] = useState()
  function getProfileInfo () {
    Backendless.UserService.getCurrentUser()
    .then(res => {
      console.log(res)
      setUserInfo(res)
    })
    .catch(error => {
      console.error(error)
    })}



   return <AppContext.Provider value={{dataRetriever, searchSubmitHandler, products, RegisterUser, LoginUser, 
   categoriesSearchHandler,brands, selectedProduct, selectProduct,addCart,cartProduct, LoggedinOrNot,LoggedinOrNotFavPage, getProfileInfo,userInfo}}>
{children}
   </AppContext.Provider>
}

export const useAppContext = (() => {return useContext(AppContext)})
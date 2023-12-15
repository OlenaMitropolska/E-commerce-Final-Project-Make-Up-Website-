import { createContext, useContext, useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import Backendless from "backendless";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // api part
  // function dataRetriever() {
  //   axios
  //     .get("https://makeup-api.herokuapp.com/api/v1/products.json")
  //     .then((response) => console.log(response.data))
  //     .catch((err) => console.log(err));
  // }

  //home page part -- do the map of brands if clicked on one, go to all products from this brand here with function works only if we click or smth, do otherwise
  const [brands, setBrands] = useState([]);
  function displayBrands() {
    axios
      .get("https://makeup-api.herokuapp.com/api/v1/products.json")
      .then((response) => {
        const data = response.data
        const uK = [...new Set(data.map(q => q.brand))];
        console.log(uK)
        setBrands(uK)
  
    //    const uniqueData =  data.map (q => q.brand)
    //    console.log(
    //   uniqueData.filter((q, idx) => 
    //   uniqueData.indexOf(q) === idx)
    //   );
    //   const uN =  uniqueData.filter((q, idx) => uniqueData.indexOf(q) === idx)
    // setBrands(uN)
        
      })
      .catch((err) => console.log(err));
  }

  //go to brand when clicked on home page
  function seeBrand () {

  }
 

  //products main search part
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  function searchSubmitHandler(category) {
    axios
      .get(
        `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${category}`
      )
      .then((response) => {
        setProducts(response.data);
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }

  // categories for search
  function categoriesSearchHandler(categorySearch) {
    axios
      .get(
        `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${categorySearch}`
      )
      .then((response) => {
        const data = response.data;
        setProducts(data.slice(0, 50));
      })
      .catch((err) => console.log(err));

    navigate("/products");
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
  const [selectedProduct, setselectedProduct] = useState([]);
  function selectProduct(click) {
    setselectedProduct((i) => [...i, click]);
    navigate("/product");
  }

  //cart part

  //cart add
  const [cartProduct, setcartProduct] = useState([]);
  function addCart(item) {
    const obj = { ...item, quantity: 1 };
    const res = cartProduct.find((i) => i.id == item.id);
    if (res) {
      const newCart = cartProduct.map((i) => {
        if (i.id == item.id) i.quantity += 1;
        return i;
      });

      setcartProduct(newCart);
      document.getElementById("my_modal_5").showModal();
    } else {
      setcartProduct((arr) => [...arr, obj]);
      document.getElementById("my_modal_5").showModal();
    }
  }

  //cart page empty or not check
  function isCartEmpty () {
    if (cartProduct.length < 1) {
      navigate("/emptycart")
    }else {
      navigate("/cart")
    }
  }

  // cart increase quantity
  function increaseCart(item) {
    const incC = cartProduct.map((i) => {
      if (i.id == item.id) {
        i.quantity += 1; 
      }
      return i;
    });

    setcartProduct((i) => incC);
  }

  //cart decrease quantity
  function decreaseCart(item) {
    const f = cartProduct.find((i) => i.id == item.id);
    let notZ = f.quantity > 1;

    if (notZ) {
      const result = cartProduct.map((i) => {
        if (i.id == item.id) {
          i.quantity -= 1;
        }
        return i;
      });

      setcartProduct((i) => result);
    } else {
      removeFromCart(item);
    }
  }

  //save cart in backendless: 1 cart per person, update if it is changed
  const sa = cartProduct.map((i) => i.id);
  // console.log(sa);
  const savedCart = {
    productID: sa,
  };
  const [cartInfo, setCartInfo] = useState();

  function saveCart() {
    Backendless.Data.of("Cart")
    .find()
    .then((res) => {
      console.log(res);
      // setCartInfo(res.data);
      console.log(cartInfo);
if (res.length < 1) {
  Backendless.Data.of( "Cart" ).save(savedCart)
  .then( response => console.log("all saved"))
  .catch(err => console.log(err))
}else {
  Backendless.Data.of( "Cart" ).save( {objectId: res[0].objectId, productID: sa })
 .then( res => console.log(res))
 .catch(err => console.log(err));
}   
    })
    .catch((error) => {
      console.error(error);
    });
    }

      //remove from cart and from backendless
  function removeFromCart(item) {
    const result = cartProduct.filter((i) => i.id != item.id);
    setcartProduct((i) => result);

  Backendless.Data.of( "Cart" ).remove( savedCart )
  .then(response => console.log(response))
  .catch(err => console.log(err));

  }

//display the cart for User
function displayCart () {
  Backendless.Data.of( "Cart" ).find()
  .then(response => {
    setCartInfo(response)
    console.log(response)})
  .catch(err => console.log(err))
}

  // registration part
  function RegisterUser(
    name,
    email,
    password,
    dateBirth,
    city,
    address,
    postcode
  ) {
    var User = new Backendless.User();
    User.name = name;
    User.email = email;
    User.password = password;
    User.DateofBirth = dateBirth;
    User.City = city;
    User.Street = address;
    User.Postcode = postcode;
    Backendless.UserService.register(User)
      .then((res) => {
        // console.log(res);

        toast.success("You have successfully registered!", {
          position: toast.POSITION.TOP_CENTER,
        }); //add the instead of text a div element
        navigate("/loginpage");
      })
      .catch((error) => {
        // console.log(error);
        alert("smth went wrong, please try again!");
      });
  }

  // login part
  function LoginUser(loginEmail, loginPassword) {
    Backendless.UserService.login(loginEmail, loginPassword, true)
      .then((response) => {
        // console.log("success");

        getProfileInfo();
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  //protected routes
  // const [user, setUser] = useState(false) //Set to true in logged in if logged in

  //check if logged in then to profile page if not to login page
  function LoggedinOrNot() {
    Backendless.UserService.isValidLogin()
      .then((response) => {
        // console.log(response);
        if (response == true) {
          navigate("/profile");
        } else {
          navigate("/loginpage");
        }
      })
      .catch((error) => console.log(error));
  }

  // check logged in or not registration page

  function LoggedinOrNotReg() {
    Backendless.UserService.isValidLogin()
      .then((response) => {
        // console.log(response);
        if (response == true) {
          navigate("/profile");
        } else {
          navigate("/register");
        }
      })
      .catch((error) => console.log(error));
  }

  //check if logged in to go to fav page
  function LoggedinOrNotFavPage() {
    Backendless.UserService.isValidLogin()
      .then((response) => {
        // console.log(response);
        if (response == true) {
          navigate("/favoritespage");
        } else {
          navigate("/loginpage");
        }
      })
      .catch((error) => console.log(error));
  }

  // profile page part
  const [userInfo, setUserInfo] = useState();
  function getProfileInfo() {
    Backendless.UserService.getCurrentUser()
      .then((res) => {
        // console.log(res);
        setUserInfo(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // logout
  function logout () {
    Backendless.UserService.logout()
    .then(response => {console.log("logged out")
  navigate("/")
  })
    .catch(err => console.log(err))
  }

  return (
    <AppContext.Provider
      value={{
        searchSubmitHandler,
        products,
        RegisterUser,
        LoginUser,
        categoriesSearchHandler,
        selectedProduct,
        selectProduct,
        addCart,
        cartProduct,
        LoggedinOrNot,
        LoggedinOrNotFavPage,
        getProfileInfo,
        userInfo,
        saveCart,
        increaseCart,
        decreaseCart,
        LoggedinOrNotReg,
        logout,
        brands,
        displayBrands,
        removeFromCart,
        isCartEmpty,
        displayCart,
        seeBrand
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

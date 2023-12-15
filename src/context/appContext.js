import { createContext, useContext, useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import Backendless from "backendless";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  //home page
  const [brands, setBrands] = useState([]);
  function displayBrands() {
    axios
      .get("https://makeup-api.herokuapp.com/api/v1/products.json")
      .then((response) => {
        const data = response.data;
        const uK = [...new Set(data.map((q) => q.brand))];
        setBrands(uK);
      })
      .catch((err) => console.log(err));
  }

  //go to brand when clicked on home page
  function seeBrand(item) {
    console.log(item);
    const itemM = item;
    axios
      .get(
        `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${itemM}`
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
  function isCartEmpty() {
    if (cartProduct.length < 1) {
      navigate("/emptycart");
    } else {
      navigate("/cart");
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

  // const sa = cartProduct.map((i) => i.id);
  // // console.log(sa);
  // const savedCart = {
  //   productID: sa,
  // };
  // display the cart for User
  const [cartInfo, setCartInfo] = useState([]);
  function displayCart() {
    Backendless.Data.of("Cart")
      .find()
      .then((response) => {
        // setCartInfo(response[0].productID)
       if (response.length >= 1) {
        
         setcartProduct((i) => [...response[0].productID]);
       }

        // console.log("here");
        console.log(response);
        // console.log("here");
      })
      .catch((err) => console.log(err));
  }

  function saveCart() {
    Backendless.Data.of("Cart")
      .find()
      .then((res) => {
        console.log(res);
        // setCartInfo(res.data);
        // console.log(cartInfo);
        if (res.length < 1) {
          console.log(cartProduct);
          Backendless.Data.of("Cart")
            .save({productID: cartProduct})
            .then((response) => console.log("all saved"))
            .catch((err) => console.log(err));
        } else {
        //  const arr =  res[0].productID.filter((i) => {
        //     let exist = false;
        //     for (let p = 0; p < cartProduct.length; p++) {
        //       const element = cartProduct[p];
        //       if (i.id === element.id) {
        //         exist = true;
        //       }
        //     }
        //     if (!exist) {

        //       return i
        //     }
        //   });
        //   console.log(arr);
          Backendless.Data.of("Cart")
            .save({
              objectId: res[0].objectId,
              productID: [...res[0].productID, ...cartProduct],
            })
            .then((res) => {
              console.log(res);
              setcartProduct(res.productID);
            })
            .catch((err) => console.log(err));
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

    Backendless.Data.of("Cart")
      .remove(result)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
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
        toast.success("You have successfully registered!", {
          position: toast.POSITION.TOP_CENTER,
        }); //add the instead of text a div element
        navigate("/loginpage");
      })
      .catch((error) => {
        alert("smth went wrong, please try again!");
      });
  }

  // login part
  function LoginUser(loginEmail, loginPassword) {
    Backendless.UserService.login(loginEmail, loginPassword, true)
      .then((response) => {

        getProfileInfo();
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

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
        setUserInfo(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // logout
  function logout() {
    Backendless.UserService.logout()
      .then((response) => {
        console.log("logged out");
        navigate("/");
      })
      .catch((err) => console.log(err));
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
        seeBrand,
        cartInfo,
        setcartProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

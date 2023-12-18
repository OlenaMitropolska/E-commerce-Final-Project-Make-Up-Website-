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
      .get("https://makeup-api.herokuapp.com/api/v1/products.json", {
        headers: {
          "Content-Type": 'text/json'
        }
      })
      .then((response) => {
        const data = response.data;
        const uK = [...new Set(data.map((q) => q.brand))];
        setBrands(uK);
      })
      .catch((err) => console.log(err));
  }

  //go to brand when clicked on home page
  function seeBrand(item) {
    // console.log(item);
    const itemM = item;
    axios
      .get(
        `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${itemM}`, {
          headers: {
            "Content-Type": 'text/json'
          }
        }
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
    if (selectedProduct.length < 1) {
      setselectedProduct((i) => [...i, click]);
    } else {
      const i = selectedProduct.findIndex(
        (x) => x.id === selectedProduct[0].id
      );
      selectedProduct[i] = click;
    }
    navigate("/product");
  }

  //cart part

  // local storage
  // const storage = JSON.parse(localStorage.getItem('cartStorage'));
  // const [cartProduct, setcartProduct] = useState(storage);
  // useEffect(() => {
  //   localStorage.setItem('cartStorage', JSON.stringify(cartProduct));
  // }, [cartProduct]);

  //cart add
  // const [cartProduct, setcartProduct] = useState([]);
  const storage = JSON.parse(localStorage.getItem("cartStorage"));
  const [cartProduct, setcartProduct] = useState(storage);
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
  useEffect(() => {
    localStorage.setItem("cartStorage", JSON.stringify(cartProduct));
  }, [cartProduct]);

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

  //remove from cart and from backendless
  function removeFromCart(item) {
    const result = cartProduct.filter((i) => i.id != item.id);
    setcartProduct((i) => result);
  }

  //save cart in backendless: 1 cart per person, update if it is changed

  // const [cartInfo, setCartInfo] = useState([]);
  // function displayCart() {
  //   Backendless.Data.of("Cart")
  //     .find()
  //     .then((response) => {
  //       if (response.length >= 1) {
  //         setcartProduct((i) => [...response[0].productID]);
  //       }
  //       console.log(response);
  //     })
  //     .catch((err) => console.log(err));
  // }

  // function saveCart() {
  //   Backendless.Data.of("Cart")
  //     .find()
  //     .then((res) => {
  //       console.log(res);
  //       if (res.length < 1) {
  //         console.log(cartProduct);
  //         Backendless.Data.of("Cart")
  //           .save({ productID: cartProduct })
  //           .then((response) => console.log("all saved"))
  //           .catch((err) => console.log(err));
  //       } else {
  //         Backendless.Data.of("Cart")
  //           .save({
  //             objectId: res[0].objectId,
  //             productID: [...res[0].productID, ...cartProduct],
  //           })
  //           .then((res) => {
  //             console.log(res);
  //             setcartProduct(res.productID);
  //             console.log(res.productID);
  //           })
  //           .catch((err) => console.log(err));
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

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
        alert("you have been logged out");
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
        increaseCart,
        decreaseCart,
        LoggedinOrNotReg,
        logout,
        brands,
        displayBrands,
        removeFromCart,
        isCartEmpty,
        seeBrand,
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

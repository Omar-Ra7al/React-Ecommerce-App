// 1- Import CreatSlice
// 12 Import createAsyncThunk >> to mak  e async code
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Use creatthunk function
// import the function in used componnet to send the tunck function to the slice
export const fetchProducts = createAsyncThunk("productsFeatching", async () => {
  const response = await fetch("/data/products.json");
  const productsResult = await response.json();
  return productsResult;
});

// 2- declare the initialState
// U will call it in the creat slice in obj initialState:your State
// عادي تكتبها مره واحدهه وتتعرف عادي KEY لو سميتهما بنفس اسم ال
const initialState = {
  productsState: {
    products: [],
    category: "all",
    cartProducts: [],
    productInCart: false,
    userQuantity: 1,
    cartProductsLength: JSON.parse(localStorage.getItem("cart-products"))
      ? JSON.parse(localStorage.getItem("cart-products")).length
      : 0,
    isLoading: true,
    displayedProducts: 6,
    popup: {
      open: false,
      color: "success",
      msg: "",
    },
  },
};

// 3- Creat your Slice >> and export him
export const productsSlice = createSlice({
  // 4- name the slice
  name: "products",
  // 5- call state here
  initialState,

  // 6- Start The reducers
  reducers: {
    // Handell loading
    isLoading: (currrentState) => {
      currrentState.productsState.isLoading = false;
    },
    // ___________________________________________________________________________________________________

    // Show products in the products page
    displayedProducts: (currrentState, action) => {
      currrentState.productsState.displayedProducts +=
        currrentState.productsState.displayedProducts;
      if (action.payload == "reset") {
        currrentState.productsState.displayedProducts = 6;
      }
    },
    // ___________________________________________________________________________________________________

    // Add product to cart
    addProduct: (currrentState, action) => {
      const productsLocalStorage = JSON.parse(localStorage.getItem("products"));
      const cartProducts =
        JSON.parse(localStorage.getItem("cart-products")) || [];
      // popup msg to handel the msg in diffrent cases
      const popup = currrentState.productsState.popup;
      popup.open = true;
      // return the value if the product in cart before or not
      const incluedsArr = cartProducts.some((cartItem) => {
        return cartItem.id === action.payload;
      });

      // if the product is in cart prevent to push anything
      if (!incluedsArr) {
        popup.msg = "The product added successfully";
        currrentState.productsState.productInCart = false;
        productsLocalStorage.map((productItem) => {
          if (productItem.id === action.payload) {
            //Push the product and save in lc
            // ADD UserQuantity >> ++++ ____ ++++
            cartProducts.unshift({ ...productItem, userQuantity: 1 });
            localStorage.setItem("cart-products", JSON.stringify(cartProducts));
            popup.color = "success";
          }
        });
      } else {
        popup.color = "error";
        currrentState.productsState.productInCart = true;
        popup.msg = "The product in your cart";
      }
      currrentState.productsState.cartProductsLength = cartProducts.length;
    },

    // ___________________________________________________________________________________________________
    // UserQuantity
    userQuantity: (currrentState, action) => {
      const cartProducts =
        JSON.parse(localStorage.getItem("cart-products")) || [];
      const popup = currrentState.productsState.popup;
      const newCartQuantity = cartProducts.map((product) => {
        if (product.id == action.payload.id) {
          // ++++++++++ \\
          if (product.userQuantity < product.quantity) {
            //
            if (action.payload.status == "increase") {
              return { ...product, userQuantity: product.userQuantity + 1 };
            }
          } else if (product.userQuantity == product.quantity) {
            popup.open = true;
            popup.color = "error";
            popup.msg = "No more of this in shop";
          }

          // ---------- \\

          if (action.payload.status == "decrease" && product.userQuantity > 1) {
            popup.open = false;
            return { ...product, userQuantity: product.userQuantity - 1 };
          }
          //
          return { ...product, userQuantity: product.userQuantity };
        } else {
          return product;
        }
      });
      localStorage.setItem("cart-products", JSON.stringify(newCartQuantity));
      currrentState.productsState.cartProducts = newCartQuantity;
    },
    // ___________________________________________________________________________________________________

    // Fillter Products
    filterCategory: (currrentState, action) => {
      currrentState.productsState.isLoading = true;
      // We fillter the data from localStorage cuz we will change the array to the slected categorey after that the array will nothave any
      // anohter category and the localStorage not effected it still have the all Data and category
      currrentState.productsState.products = JSON.parse(
        localStorage.getItem("products")
      ).filter((product) => {
        if (action.payload == "all") {
          return product;
        } else {
          return product.category == action.payload;
        }
      });
    },
    // ___________________________________________________________________________________________________

    // Delete product to cart
    deleteCartProduct: (currrentState, action) => {
      const cartProducts =
        JSON.parse(localStorage.getItem("cart-products")) || [];

      // popup msg to handel the msg in diffrent cases
      const popup = currrentState.productsState.popup;

      // return the value if the product in cart before or not
      const newCart = cartProducts.filter((cartItem) => {
        return cartItem.id !== action.payload;
      });

      localStorage.setItem("cart-products", JSON.stringify(newCart));
      currrentState.productsState.cartProductsLength = newCart.length;
      popup.msg = "Product Deleted Succesffuly";
      popup.color = "success";
      popup.open = true;
    },
    // ___________________________________________________________________________________________________

    // Popup Logic
    popup: (currrentState, action) => {
      currrentState.productsState.popup.open = true;
      // Handdel Close
      if (action.payload.close) {
        currrentState.productsState.popup.open = false;
      }
    },
  },

  //   Extra Reducers typing outsite the reducers to handdel async code
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.fulfilled, (currrentState, action) => {
        currrentState.productsState.isLoading = false;
        // Prevent fetching fdata evrey time
        // and also to handel filteration proceess to not save data in lc evrey foltter just change the array
        if (localStorage.getItem("products")) {
          currrentState.productsState.products = JSON.parse(
            localStorage.getItem("products")
          );
          console.log("now products come form lc");
        } else {
          localStorage.setItem("products", JSON.stringify(action.payload));
          currrentState.productsState.products = action.payload;
          console.log("Dataa is fetched");
        }
      })
      .addCase(fetchProducts.rejected, (currrentState) => {
        currrentState.productsState.isLoading = false;
      });
  },
});

// 7- export all actions >> the redux give u a prop name action to extract all actions from the slice
export const {
  addProduct,
  isLoading,
  displayedProducts,
  filterCategory,
  userQuantity,
  popup,
  deleteCartProduct,
} = productsSlice.actions;

// 8- export the reducer
export default productsSlice.reducer;
// store
// 9- add the slice reducer to the store
// 10- the store almost finish u can start use it
// component
// 11- import useSelcetor and useDispatch
// 12- import actions also

// Start to add Async code into the slice
/*
    *Any asynchronicity has to happen outside the store*
    من الكومبوننت الي هتستخدمها فيه dispatch هنا عادي بس هتبعت ال  thunck function ف هتعمل ال 
    1- import thunk function
    2- USE THUNKFUNCTION 
    3- EXPORT IT 
    4- USE IT IN COMPONENT AND SEND IT INTO DISPATCH
    5- 
*/

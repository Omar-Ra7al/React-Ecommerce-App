// Css
import "./App.css";
import "./styles/Home.css";

// Mui

// Components
import NavBar from "./components/Nav";
import Home from "./pages/Home";
import Products from "./pages/Product";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import CustomizedSnackbars from "./components/Popup";
// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* This is the main content the frist component will show in the app*/}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/products" element={<Products />} />
        <Route
          path="/products/product-detailS/:postId"
          element={<ProductDetails />}
        />

        <Route path="/cart" element={<Cart />} />

        {/* Catch-all route for unmatched paths */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <CustomizedSnackbars></CustomizedSnackbars>;
    </BrowserRouter>
  );
};
export default App;

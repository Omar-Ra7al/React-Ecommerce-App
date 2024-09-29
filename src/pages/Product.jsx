// Css
import "../styles/products.css";

// React
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

// Mui
import { Container } from "@mui/system";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Mui icons
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// Redux
// useSelcotor to select wich state u want in this component
// use dispach to send actions and the payload
import { useSelector, useDispatch } from "react-redux";
// We will add the addProduct as function into dispatch
import {
  fetchProducts,
  addProduct,
  filterCategory,
  isLoading,
  displayedProducts,
  popup,
} from "../features/products/productsSlice";

// Component
import Loader from "../components/loader/Loader";

export default function Products() {
  const productsState = useSelector((state) => state.products.productsState);
  const dispatch = useDispatch();
  let [productId, setProductId] = useState(0);

  // << Start Products Logic
  const products = productsState.products;
  //  Send fetch dispatch
  useEffect(() => {
    let timeoutId;
    timeoutId = setTimeout(() => {
      dispatch(isLoading());
    }, 1000);
    dispatch(fetchProducts());
    // Cleanup function to avoid memory leaks
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // << Start Add Product To Cart
  const addCartProduct = (id) => {
    dispatch(addProduct(id));
    setProductId(id);
    //  Popup
    setTimeout(() => {
      setProductId(0);
      dispatch(popup({ close: true }));
    }, 2000);
  };
  //End  Add Product To Cart //>>

  // << Start Show More Products
  const showMore = productsState.displayedProducts;
  const handleShowMore = () => {
    dispatch(displayedProducts());
  };
  // End Show More Products //>>

  // Products jsx >>
  const inCartState = productsState.productInCart; // Check if the produt in cart to add animation
  const productsJsx = useMemo(() => {
    return products.slice(0, showMore).map((product) => (
      <div
        key={product.id}
        className={`card ${
          productId == product.id ? (inCartState ? "inCart" : "added") : ""
        }`}>
        <Card sx={{ height: 405 }}>
          <CardMedia
            sx={{ height: 200 }}
            image={`/images/${product.image}`}
            title="green iguana"
          />
          <div className="card-contetn-wrapper">
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Price: ${product.price}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.description}
              </Typography>
            </CardContent>
            <CardActions className="btn-wrapper">
              <Button
                size="small"
                onClick={() => {
                  addCartProduct(product.id);
                }}>
                Add To Cart
                <AddShoppingCartIcon
                  color="primary"
                  style={{ marginLeft: "5px" }}
                />
              </Button>

              {/* Place the IconButton outside the Button */}

              <Button size="small">
                <Link to={`product-details/${product.id}`}>Get Details</Link>
              </Button>
            </CardActions>
          </div>
        </Card>
      </div>
    ));
  }, [products, showMore, productId]);
  // End Products Logic // >>

  // _________________________________________________________________________________________________ \\

  // << Start Categoty Buttons Logic

  // From localStorage cuz the array will change to show onley the ctegorey u choose when u do that will not find any another
  // categorey except what u select in local storage the array will not chnage whenu change the category
  const productsCategorey = JSON.parse(localStorage.getItem("products")) || [];
  const categoryItems = new Set(
    productsCategorey.map((item) => {
      return item.category;
    })
  );
  const fillterByCategory = function (value) {
    dispatch(filterCategory(value));
    // to reset the show more counter
    dispatch(displayedProducts("reset"));
    setTimeout(() => {
      dispatch(isLoading());
    }, 1000);
  };
  // Categoty Jsx >>
  const categoryJsx = Array.from(categoryItems).map((value) => {
    return (
      <div key={value}>
        <Button
          onClick={() => {
            fillterByCategory(value);
          }}>
          {value}
        </Button>
      </div>
    );
  });

  // End Categoty Buttons Logic //>>

  return (
    <Container>
      {!productsState.isLoading ? (
        <>
          <div className="category-btns">
            <ButtonGroup
              className="categoryBtns-wrapper"
              variant="contained"
              aria-label="Basic button group">
              <Button
                onClick={() => {
                  fillterByCategory("all");
                }}>
                All
              </Button>
              {categoryJsx}
            </ButtonGroup>
          </div>
          <div className="products-wrapper">{productsJsx}</div>
          <div className="show-more-wrapper">
            {showMore < products.length ? (
              <Button onClick={handleShowMore} variant="contained">
                Show More
              </Button>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </Container>
  );
}

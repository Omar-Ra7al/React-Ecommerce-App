import "../styles/products.css";
// React
import { useMemo, useState } from "react";
// MUI >>
import { Container, Box } from "@mui/system"; // Use Container and Box from @mui/system
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid"; // Correctly import Grid
import Divider from "@mui/material/Divider"; // Import Divider properly
// Mui icons >>
import IconButton from "@mui/material/IconButton"; // Import IconButton properly
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  popup,
  userQuantity,
} from "../features/products/productsSlice";
import Loader from "../components/loader/Loader";

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  handleLoad();

  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products.productsState);

  const [id, setId] = useState();
  const cartProducts = JSON.parse(localStorage.getItem("cart-products")) || [];

  const deleteProduct = function (id) {
    setId(id); // to check the className then add the animation
    setTimeout(() => {
      dispatch(popup({ close: false }));
      dispatch(deleteCartProduct(id));
      // Reset id to remove the className if we add the same product again
      setId();
    }, 500);

    setTimeout(() => {
      dispatch(popup({ close: true }));
    }, 2000);
  };
  const handleIncrease = function (id) {
    dispatch(userQuantity({ id, status: "increase" }));
    setTimeout(() => {
      dispatch(popup({ close: true }));
    }, 2000);
  };
  const handleDecrease = function (id) {
    dispatch(userQuantity({ id, status: "decrease" }));
  };
  let subTotal = [];
  const cartProductsJsx = useMemo(() => {
    return cartProducts.map((product) => {
      subTotal.push(product.price * product.userQuantity);

      return (
        <div
          key={product.id}
          // className=""
          className={`card cart ${id === product.id ? "removed" : ""}`}>
          <Card className="cart-wrapper">
            <CardMedia
              className="cart-img"
              sx={{ height: "100%", width: "45%" }}
              image={`/images/${product.image}`}
              title={product.name}
            />
            <div className="card-contetn-wrapper">
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography gutterBottom component="div">
                  Price: ${product.price}
                </Typography>
              </CardContent>
              {/* ___________________________________________________- */}
              <div>
                <IconButton
                  onClick={() => {
                    handleDecrease(product.id);
                  }}>
                  <RemoveIcon />
                </IconButton>
                <span>{product.userQuantity}</span>
                <IconButton
                  onClick={() => {
                    handleIncrease(product.id);
                  }}>
                  <AddIcon />
                </IconButton>
              </div>
              {/* ___________________________________________________- */}
              {/* <span>Quantitey</span> */}
              <CardActions>
                <Button
                  color="error"
                  size="small"
                  onClick={() => {
                    deleteProduct(product.id);
                  }}>
                  Remove
                  <DeleteIcon color="error" style={{ marginLeft: "5px" }} />
                </Button>
              </CardActions>
            </div>
          </Card>
        </div>
      );
    });
  }, [cartProducts, id, productsState.cartProducts]);

  const checkOutJsx = (
    <Paper
      elevation={6}
      sx={{ padding: "32px", marginTop: "16px", borderRadius: "10px" }}>
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton color="primary">
          <ShoppingCartIcon fontSize="large" />
        </IconButton>
        <Typography variant="h4" gutterBottom sx={{ ml: 2 }}>
          Checkout
        </Typography>
      </Box>
      <Divider />
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Items in Cart: {cartProducts.length}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Subtotal:</Typography>
          <Typography variant="h5" color="primary">
            {subTotal.length > 0
              ? subTotal.reduce((a, b) => a + b).toFixed(2)
              : ""}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Shipping Cost:</Typography>
          <Typography variant="h5" color="secondary">
            Free
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ margin: "16px 0" }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h5" color="success.main">
            {subTotal.length > 0
              ? subTotal.reduce((a, b) => a + b).toFixed(2)
              : ""}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" size="large" fullWidth>
            Proceed to Payment
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <Container>
      {!isLoading ? (
        <div className="products-wrapper cart">
          {cartProducts.length == 0 ? (
            <Typography
              gutterBottom
              variant="h4"
              color="#fff"
              width={"100%"}
              textAlign={"center"}>
              Your Cart Is Emptey
            </Typography>
          ) : (
            ""
          )}
          {cartProductsJsx}
          {checkOutJsx}
        </div>
      ) : (
        <Loader />
      )}
    </Container>
  );
}

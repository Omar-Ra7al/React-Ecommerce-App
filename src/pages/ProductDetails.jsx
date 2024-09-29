// React
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Mui
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// Mui icons
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// Redux
import { useDispatch } from "react-redux";
import { addProduct, popup } from "../features/products/productsSlice";

export default function ProductDetails() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation

  const productsLocalStorage = JSON.parse(localStorage.getItem("products"));
  const currentProduct = productsLocalStorage.filter((item) => {
    return item.id == postId;
  });
  const product = currentProduct[0];

  useEffect(() => {
    if (!product) {
      navigate("/error"); // Redirect to the error page
    }
  }, [product, navigate]);

  // Add Product To Cart
  const addCartProduct = (id) => {
    dispatch(addProduct(id));
    //  Popup
    dispatch(popup({ close: false }));
    setTimeout(() => {
      dispatch(popup({ close: true }));
    }, 2000);
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{
        width: "100%",
        margin: "0 auto",
        padding: "20px",
      }}>
      {/* Check if the product here or not to render it if he needed if not go to error page */}
      {product ? (
        <Grid item xs={12} md={8} lg={6}>
          <Card
            sx={{
              width: "100%",
              backgroundColor: "#f5f5f5", // Light background
              borderRadius: "10px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Custom shadow
            }}>
            {/* Product Image */}
            <CardMedia
              component="img"
              height="400"
              image={`/images/${product.image}`}
              alt={product.name}
              sx={{
                objectFit: "cover",
                borderRadius: "10px 10px 0 0", // Rounded top corners
              }}
            />
            {/* Product Info */}
            <CardContent
              sx={{
                padding: "20px",
              }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  color: "#333", // Darker text color
                  fontWeight: "bold",
                }}>
                {product.name}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  marginBottom: "20px",
                  fontSize: "1.2rem",
                }}>
                {product.description2}
              </Typography>
              <Typography
                variant="h5"
                color="text.primary"
                sx={{
                  fontWeight: "500",
                  color: "#ff4081", // Custom color for price
                }}>
                Price: ${product.price}
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                size="large"
                onClick={() => {
                  addCartProduct(product.id);
                }}>
                Add To Cart
              </Button>
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={() => {
                  addCartProduct(product.id);
                }}>
                <AddShoppingCartIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
}

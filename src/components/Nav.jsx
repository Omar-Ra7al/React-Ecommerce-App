import "../styles/navMenu.css";
// React
import { useState } from "react";
import { Link } from "react-router-dom";
// MUI
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
// component
import Cart from "../pages/Cart";
// Redux
import { useSelector } from "react-redux";

export default function NavBar(props) {
  const productsState = useSelector((state) => state.products.productsState);

  // << Mui logic
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children ?? <div />}
      </Slide>
    );
  }
  HideOnScroll.propTypes = {
    children: PropTypes.element,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
  // Mui logic //>>
  const [toggleNav, setToggleNav] = useState(false);
  const handelToggleNav = () => {
    setToggleNav(!toggleNav);
  };
  const closeNavMenu = () => {
    setToggleNav(false);
  };

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className="header-nav" position="sticky">
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <LocalOfferIcon
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 2, // Adjusted margin right for spacing
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/home"
                sx={{
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}>
                ShopHub
              </Typography>
              {/* Menu Links */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit">
                  <MenuIcon />
                </IconButton>
                {/* Menu Links */}
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      <Link to="/home" style={{ color: "#000" }}>
                        Home
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      <Link to="/products" style={{ color: "#000" }}>
                        Products
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      <Link to="/cart" style={{ color: "#000" }}>
                        Cart
                      </Link>
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <LocalOfferIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 2 }} // Adjusted margin right for spacing
              />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/home"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}>
                ShopHub
              </Typography>
              {/* Home links */}
              <Box
                sx={{
                  width: "70%",
                  display: { xs: "none", md: "flex" },
                  justifyContent: "center",
                }}>
                <Link to="/home">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block", mr: 2 }}>
                    {" "}
                    {/* Adjusted margin right for spacing */}
                    Home
                  </Button>
                </Link>
                <Link to="/products">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block", mr: 2 }}>
                    {" "}
                    {/* Adjusted margin right for spacing */}
                    Products
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block", mr: 2 }}>
                    {" "}
                    Cart
                  </Button>
                </Link>
              </Box>
              {/* Shooping Cart icon */}
              <Button
                className="cart-btn"
                color="#fff"
                onClick={handelToggleNav}>
                <ShoppingCartIcon />
                <span className="cart-length">
                  {/* {JSON.parse(localStorage.getItem("cart-products")).length} */}
                  {productsState.cartProductsLength}
                </span>
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <div className={`nav-menu ${toggleNav ? "open" : ""}`}>
        <IconButton onClick={closeNavMenu} aria-label="close">
          <CloseIcon />
        </IconButton>
        <Cart />
      </div>
    </>
  );
}

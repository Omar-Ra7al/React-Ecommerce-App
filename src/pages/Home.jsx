// React
import { useState } from "react";
import { Link } from "react-router-dom";
// MUI
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
// Images
import pinkBeats from "/images/pink-beats.jpg";
import gradintBeats from "/images/gradint-beats.jpg";
import perfumMajic from "/images/perfum-majic.jpg";
// Component
import Loader from "../components/loader/Loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <main className="home">
      <Container>
        <section className="welcome">
          <h1>Ecommerce for everyone</h1>
          <p>
            Everythin you need to buy online . Try it free , No credit card
            requierd
          </p>
        </section>
        {/*  */}
        <section className="imgs-wrapper">
          <img src={gradintBeats} alt="" onLoad={handleLoad} />
          <img src={perfumMajic} alt="" onLoad={handleLoad} />
          <img src={pinkBeats} alt="" onLoad={handleLoad} />
        </section>
        {/*  */}
        {!isLoading ? (
          <section className="shop-more">
            <Link to="/products">
              <Button variant="contained" disableElevation>
                Shop Our Products
              </Button>
            </Link>
          </section>
        ) : (
          <Loader />
        )}
      </Container>
    </main>
  );
}

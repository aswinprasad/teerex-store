import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";
import OutOfStock from "../out-of-stock.png"

const ProductCard = ({ product, handleAddToCart }) => {
  // console.log(product);
  return (
    <Card className="card">
      <CardContent>
        <div className="img-cont"><CardMedia
          className={product.quantity === 0 ? "card-image" : ""}
          component="img"
          height="194"
          image={product.imageURL}
          alt={product.name}
          sx={{objectFit:"contain"}}
        />
        <CardMedia
          className={product.quantity === 0 ? "out" : "out out-hide"}
          component="img"
          height="194"
          image={OutOfStock}
          alt="OutOfStock"
          sx={{objectFit:"contain"}}
        />
        </div>
        <Typography variant="h5" fontWeight={700} component="div">
          {product.name}
        </Typography>
        <Typography variant="h5" component="div">
          ₹{product.price}.00
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className="card-button"
          variant="contained"
          fullWidth
          onClick={handleAddToCart}
        >
          <AddShoppingCartOutlined />
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

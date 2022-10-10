import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Cart.css";
import Header from "./Header";

export const getTotalCartValue = (items = []) => {
  const total = items.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price * currentValue.quantity;
  }, 0);

  return total;
};

const ItemQuantity = ({ value, handleAdd, handleDelete, max }) => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        size="small"
        color="primary"
        onClick={handleDelete}
        disabled={value === 1 ? true : false}
      >
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton
        size="small"
        color="primary"
        onClick={handleAdd}
        disabled={value === max ? true : false}
      >
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

const Cart = () => {
  const location = useLocation();
  // eslint-disable-next-line
  const [value, setValue] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  // let items = location.state.items;

  useEffect(() => {
    let newCart = location.state
    if(!newCart) {
      setCartItems([])
    }
    else {
      setCartItems(...[newCart.items])
    }
    // eslint-disable-next-line
  }, []);

  const removeProduct = (id) => {
    if (window.confirm("Are you sure to remove this product ?")) {
      cartItems.forEach((item, index) => {
        if (item.id === id) {
          cartItems.splice(index, 1);
        }
      });
      setCartItems([...cartItems]);
    }
  };

  // console.log(items)
  if (!cartItems.length) {
    return (
      <>
        {" "}
        <Header />
        <Box className="cart empty">
          <ShoppingCartOutlined className="empty-cart-icon" />
          <Box color="#aaa" textAlign="center">
            Cart is empty. Add more items to the cart to checkout.
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header items={cartItems} cartLength={cartItems.length} />
      <Box className="cart">
        {cartItems.map((item) => (
          <Box key={item.id}>
            <Box display="flex" alignItems="flex-start" padding="1rem">
              <Box className="image-container">
                <img
                  src={item.image}
                  alt={item.name}
                  width="100%"
                  height="100%"
                />
              </Box>
              <Box
              className="item-details"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
                width="100%"
              >
                <div className="item-name">{item.name}</div>
                <Box fontWeight="700" className="item-price">
                  ₹{item.price}.00
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <ItemQuantity
                    value={item.quantity}
                    handleAdd={() => {
                      item.quantity += 1;
                      setValue((value) => value + 1);
                    }}
                    handleDelete={() => {
                      item.quantity -= 1;
                      setValue((value) => value + 1);
                    }}
                    max={item.max}
                  />

                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    className="cart-footer"
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={() => removeProduct(item.id)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
                {item.quantity !== item.max ? (
                  <Typography
                    paddingLeft="10px"
                    fontSize="1rem"
                    color="red"
                    variant="h5"
                    component="div"
                  >
                    Only {item.max - item.quantity} left in stock
                  </Typography>
                ) : (
                  <Typography
                    paddingLeft="10px"
                    fontSize="1rem"
                    color="red"
                    variant="h5"
                    component="div"
                  >
                    Out of stock
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        ))}
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            color="#3C3C3C"
            fontSize="1.75rem"
            fontWeight="700"
            alignSelf="center"
          >
            Order total:
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.75rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ₹{getTotalCartValue(cartItems)}.00
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Cart;

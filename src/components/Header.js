import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import "./Header.css";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = ({ items, cartLength }) => {
  const navigate = useNavigate();

  return (
    <Box className="header">
      <Box className="header-title" onClick={() => navigate("/", {state:{items:items}})}>
        <Typography variant="h4" fontSize="1.75rem" fontWeight="700" component="div">
          TeeRex Store
        </Typography>
      </Box>

      <Stack>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          marginRight="1rem"
        >
          <Button
            className="login-button"
            variant="text"
            onClick={() => {
              navigate("/", {state:{items:items}})
            }}
          >
            Products
          </Button>

          <IconButton
            sx={{ marginRight: "1rem" }}
            aria-label="cart"
            onClick={() => {
                
                navigate('/cart', {state:{items:items}})}}
          >
              <StyledBadge badgeContent={cartLength} color="primary">
                <ShoppingCartIcon />
              </StyledBadge>
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;

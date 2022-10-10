import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/system";
import "./Filters.css";

const colors = [
  "Black",
  "Blue",
  "Pink",
  "Green",
  "Red",
  "Grey",
  "Purple",
  "White",
  "Yellow",
];
const genders = ["Men", "Women"];
const prices = [
  { min: 0, max: 250 },
  { min: 250, max: 450 },
  { min: 450, max: 500 },
];
const types = ["Polo", "Hoodie", "Basic"];

const Filters = ({ anchor, handleChange, handlePrice, toggleDrawer }) => {
  return (
    <>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onKeyDown={toggleDrawer(anchor, false)}
        className="filters"
      >
        <h4>Color</h4>

        {colors.map((color) => (
          <FormGroup key={color}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => {
                    handleChange(color);
                  }}
                  size="small"
                />
              }
              label={color}
            />
          </FormGroup>
        ))}

        <h4>Gender</h4>

        {genders.map((gender) => (
          <FormGroup key={gender}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => {
                    handleChange(gender);
                  }}
                  size="small"
                />
              }
              label={gender}
            />
          </FormGroup>
        ))}

        <h4>Price</h4>

        {prices.map((price) => (
          <FormGroup key={price.min}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => {
                    handlePrice(price.min, price.max);
                  }}
                  size="small"
                />
              }
              label={`${price.min} - ${price.max}`}
            />
          </FormGroup>
        ))}

        <h4>Type</h4>

        {types.map((type) => (
          <FormGroup key={type}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => {
                    handleChange(type);
                  }}
                  size="small"
                />
              }
              label={type}
            />
          </FormGroup>
        ))}
      </Box>
    </>
  );
};

export default Filters;

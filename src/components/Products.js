import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import IconButton from "@mui/material/IconButton";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import { CircularProgress, Grid, InputAdornment, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { config } from "../App";
import Header from "./Header";
import ProductCard from "./ProductCard";
import Filters from "./Filters";
import "./Products.css";

const Products = () => {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 1200) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    const loadHandler = async () => {
      await performAPICall();
    };

    loadHandler();
    handleResize();

    
    let newCart = location.state
    // console.log(newCart)
    if(!newCart || !newCart.items?.length) {
      setCartItems([])
    }
    else {
      setCartItems([...newCart.items])
    }

    // eslint-disable-next-line
  }, []);

  const performAPICall = async () => {
    setLoader(true);
    try {
      let res = await axios.get(`${config.endpoint}`);
      setProducts(res.data);
      setFilteredProducts(res.data);
      setLoader(false);
      return res.data;
    } catch (err) {
      setLoader(false);
      if (err.response) {
        if (err.res.status === 400) {
          return enqueueSnackbar("Failed to fetch", {
            variant: "error",
          });
        }
        if (err.res.status === 500) {
          return enqueueSnackbar(
            "Something went wrong. Check the backend console for more details",
            {
              variant: "error",
            }
          );
        }
      } else {
        return enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
    }
  };

  const performSearch = (text) => {
    if (text?.length > 0) {
      setFilteredProducts(
        // eslint-disable-next-line
        products?.filter((member) => {
          if (
            member.name?.toLowerCase().includes(text.toLowerCase()) ||
            member.color?.toLowerCase().includes(text.toLowerCase()) ||
            member.type?.toLowerCase().includes(text.toLowerCase())
          ) {
            return member;
          }
        })
      );
    } else {
      setFilteredProducts(products);
    }
  };

  // useEffect(() => {
  //   console.log(products);
  // }, [cartItems]);

  const addToCart = (product) => {
    // console.log(products)
    if (product.quantity === 0) {
      enqueueSnackbar("Item out of stock", { variant: "error" });
      return;
    }
    if (!cartItems.length) {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.imageURL,
          max: product.quantity,
          quantity: 1,
        },
      ]);
    }
    if (cartItems.findIndex((item) => item.id === product.id) !== -1) {
      enqueueSnackbar("Item already in cart", { variant: "warning" });
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.imageURL,
          max: product.quantity,
          quantity: 1,
        },
      ]);
    }
  };

  useEffect(() => {
    console.log("Filters: ", filterList);

    if (filterList.length) {
      setFilteredProducts(
        products.filter((item) =>
          // eslint-disable-next-line
          filterList.some((filter) => {
            if (
              filter === item.color ||
              filter === item.gender ||
              filter === item.type ||
              (filter[0] < item.price && item.price <= filter[1])
            ) {
              return filter;
            }
          })
        )
      );
    } else {
      setFilteredProducts(products);
    }

    // eslint-disable-next-line
  }, [filterList]);

  const handleChange = (event) => {
    if (filterList.includes(event)) {
      filterList.splice(filterList.indexOf(event), 1);
      setFilterList([...filterList]);
    } else {
      setFilterList([...filterList, event]);
    }
  };

  const handlePrice = (min, max) => {
    let remIndex = 0;

    if (
      // eslint-disable-next-line
      filterList.find((element, index) => {
        if (element[0] === min) {
          remIndex = index;
          return element;
        }
      })
    ) {
      filterList.splice(remIndex, 1);
      setFilterList([...filterList]);
    } else {
      setFilterList([...filterList, [min, max]]);
    }
  };

  return (
    <div>
      <Header
        items={cartItems}
        cartLength={cartItems.length}
      ></Header>

      <Box display="flex" alignItems="center" className="search-container">
        <TextField
          className="search-desktop"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
          onChange={(e) => performSearch(e.target.value)}
        />
      </Box>

      {/* Search view for mobiles */}
      <Box display="flex" alignItems="center">
        <TextField
          className="search-mobile"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
          onChange={(e) => performSearch(e.target.value)}
        />
        <div>
          <IconButton
            aria-label="filter"
            onClick={toggleDrawer("left", true)}
            size="large"
          >
            <FilterAltOutlinedIcon
              color="primary"
              className="filter-icon"
              fontSize="large"
            />
          </IconButton>
        </div>
      </Box>

      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
      >
        {isMobile ? (
          ["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {/* {list(anchor)} */}
                <Filters
                  anchor={anchor}
                  handleChange={handleChange}
                  handlePrice={handlePrice}
                  toggleDrawer={toggleDrawer}
                />
              </Drawer>
            </React.Fragment>
          ))
        ) : (
          <>
            <Filters
              handleChange={handleChange}
              handlePrice={handlePrice}
              toggleDrawer={toggleDrawer}
            />
          </>
        )}

        <Grid item xs={12} md={9} className="product-grid">
          {loader ? (
            <Box className="loading">
              <CircularProgress />
              <p>Loading Products...</p>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {filteredProducts.length ? (
                filteredProducts.map((product) => (
                  <Grid item xs={6} md={3} key={product.id}>
                    <ProductCard
                      product={product}
                      handleAddToCart={() => {
                        addToCart(product);
                      }}
                    />
                  </Grid>
                ))
              ) : (
                <Box className="loading">
                  <SentimentDissatisfied />
                  <p>No Products Found</p>
                </Box>
              )}
            </Grid>
          )}
        </Grid>

        {/* <Cart
            products={products}
            items={cartItems}
            removeProduct={removeProduct}
          /> */}
      </Grid>
    </div>
  );
};

export default Products;

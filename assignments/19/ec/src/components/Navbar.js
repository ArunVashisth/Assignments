import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            E-Commerce Store
          </Button>
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/add-product">
            Add Product
          </Button>
          <Button color="inherit" component={Link} to="/cart">
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

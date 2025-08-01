import React from 'react';
import { Container, Typography, Button, Box, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const tax = cartTotal * 0.18; // 18% GST
  const total = cartTotal + tax;

  if (cartCount === 0) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Shopping Cart
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 2 }}>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </Box>
        
        <Paper elevation={3} sx={{ p: 3, height: 'fit-content', flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Subtotal ({cartCount} items):</Typography>
              <Typography>{formatPrice(cartTotal)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>GST (18%):</Typography>
              <Typography>{formatPrice(tax)}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">{formatPrice(total)}</Typography>
            </Box>
          </Box>
          
          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => alert('Thank you for your purchase!')}
          >
            Proceed to Checkout
          </Button>
          
          <Button 
            fullWidth 
            variant="outlined" 
            sx={{ mt: 2 }}
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Cart;

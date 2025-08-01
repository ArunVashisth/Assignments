import React from 'react';
import { Box, Typography, IconButton, TextField, Button, Card, CardContent, CardMedia } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <Card sx={{ display: 'flex', mb: 2, height: 150 }}>
      <CardMedia
        component="img"
        sx={{ width: 150, objectFit: 'cover' }}
        image={item.image}
        alt={item.name}
      />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6" component="div">
            {item.name}
          </Typography>
          <IconButton 
            color="error" 
            onClick={() => removeFromCart(item.id)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
          {formatPrice(item.price)} each
        </Typography>
        <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center' }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            sx={{ minWidth: '32px' }}
          >
            -
          </Button>
          <TextField
            value={item.quantity}
            size="small"
            type="number"
            inputProps={{ min: 1, style: { textAlign: 'center' } }}
            sx={{ width: '60px', mx: 1 }}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            sx={{ minWidth: '32px' }}
          >
            +
          </Button>
          <Typography variant="h6" sx={{ ml: 'auto' }}>
            {formatPrice(item.price * item.quantity)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItem;

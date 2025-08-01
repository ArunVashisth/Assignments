import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
  });
  
  const [errors, setErrors] = useState({});
  const { addProduct } = useCart();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }
    
    if (!formData.image) {
      newErrors.image = 'Image URL is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newProduct = {
        ...formData,
        price: parseFloat(formData.price),
      };
      
      addProduct(newProduct);
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        image: '',
      });
      
      // Show success message
      alert('Product added successfully!');
      
      // Navigate to home page
      navigate('/');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Product
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price (₹)"
            type="number"
            id="price"
            inputProps={{ min: "0.01", step: "0.01" }}
            value={formData.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="image"
            label="Image URL"
            type="url"
            id="image"
            value={formData.image}
            onChange={handleChange}
            error={!!errors.image}
            helperText={errors.image}
          />
          
          {formData.image && (
            <Box sx={{ my: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2" gutterBottom>
                Image Preview:
              </Typography>
              <img 
                src={formData.image} 
                alt="Preview" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '200px',
                  margin: '0 auto',
                  display: 'block',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200?text=Invalid+Image+URL';
                }}
              />
            </Box>
          )}
          
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
            >
              Add Product
            </Button>
            
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/')}
              size="large"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddProduct;

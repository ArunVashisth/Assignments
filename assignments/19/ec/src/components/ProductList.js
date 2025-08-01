import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';

const ProductList = () => {
  const { products } = useCart();

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Our Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;

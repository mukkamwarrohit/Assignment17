import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import { Grid, Container, Typography, FormControl, Select, MenuItem, InputLabel, Box } from "@mui/material";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
}

export default function Home() {
  const [sortOrder, setSortOrder] = useState<string>("default");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <Typography>Loading products...</Typography>;
  if (error || !products) return <Typography color="error">Error loading products.</Typography>;

  const categories = ["all", ...Array.from(new Set(products.map((product) => product.category)))];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter((product) => product.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>Products</Typography>
      
      <Box display="flex" gap={2} mb={3}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Sort by Price</InputLabel>
          <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} label="Sort by Price">
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="lowToHigh">Low to High</MenuItem>
            <MenuItem value="highToLow">High to Low</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} label="Category">
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {sortedProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} display="flex">
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

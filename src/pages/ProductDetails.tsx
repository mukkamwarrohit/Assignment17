import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/products";
import { Container, Typography, Button, CircularProgress, Card, CardContent, CardMedia } from "@mui/material";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(Number(id)),
  });

  const { addToCart } = useCart(); 

  if (isLoading) return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
  if (error) return <Typography color="error">Failed to load product.</Typography>;

  return (
    <Container sx={{ textAlign: "center", marginTop: 4 }}>
      <Card sx={{ maxWidth: 500, margin: "auto", padding: 3, boxShadow: 3 }}>
        <CardMedia component="img" image={product.image} alt={product.title} sx={{ height: 300 }} />
        <CardContent>
          <Typography variant="h4">{product.title}</Typography>
          <Typography variant="h5" color="primary">${product.price}</Typography>
          <Typography variant="body1" sx={{ marginY: 2 }}>{product.description}</Typography>
          <Button variant="contained" color="primary" fullWidth onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

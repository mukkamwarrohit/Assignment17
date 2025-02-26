import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface ProductProps {
  id: number;
  title: string;
  image: string;
  price: number;
}

export default function ProductCard({ id, title, image, price }: ProductProps) {
  return (
    <Card sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", boxShadow: 3 }}>
      <CardMedia component="img" image={image} alt={title} sx={{ height: 200, objectFit: "contain", padding: 2 }} />
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600, textAlign: "center" }}>
          {title}
        </Typography>
        <Typography variant="body1" color="primary" sx={{ textAlign: "center", fontWeight: 700, marginTop: 1 }}>
          ${price.toFixed(2)}
        </Typography>
        <Button variant="contained" fullWidth component={Link} to={`/product/${id}`} sx={{ marginTop: 2 }}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

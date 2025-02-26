import { Container, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Button } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();

  return (
    <Container sx={{ marginTop: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty 😔
        </Typography>
      ) : (
        <>
          <List>
            {cart.map((item) => (
              <ListItem key={item.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                <ListItemAvatar>
                  <Avatar src={item.image} alt={item.title} sx={{ width: 56, height: 56 }} />
                </ListItemAvatar>
                <ListItemText primary={item.title} secondary={`$${item.price} x ${item.quantity}`} />
                
                {/* Quantity Controls */}
                <IconButton onClick={() => decreaseQuantity(item.id)} color="primary">
                  <Remove />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton onClick={() => increaseQuantity(item.id)} color="primary">
                  <Add />
                </IconButton>

                {/* Remove Item */}
                <IconButton onClick={() => removeFromCart(item.id)} color="error">
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>

          <Typography variant="h5" sx={{ marginTop: 2 }}>
            Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </Typography>

          <Button variant="contained" color="secondary" sx={{ marginTop: 2 }} onClick={clearCart}>
            Clear Cart
          </Button>
        </>
      )}
    </Container>
  );
}

import { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

export default function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCartStore();

  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const [openClearCartDialog, setOpenClearCartDialog] = useState(false);

  const handleOpenRemoveDialog = (id: number) => {
    setSelectedItemId(id);
    setOpenRemoveDialog(true);
  };

  const handleCloseRemoveDialog = () => {
    setOpenRemoveDialog(false);
    setSelectedItemId(null);
  };

  const handleConfirmRemove = () => {
    if (selectedItemId !== null) {
      removeFromCart(selectedItemId);
    }
    handleCloseRemoveDialog();
  };

  const handleOpenClearCartDialog = () => {
    setOpenClearCartDialog(true);
  };

  const handleCloseClearCartDialog = () => {
    setOpenClearCartDialog(false);
  };

  const handleConfirmClearCart = () => {
    clearCart();
    handleCloseClearCartDialog();
  };

  return (
    <Container sx={{ marginTop: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" color="text.secondary">Your cart is empty 😔</Typography>
      ) : (
        <>
          <List>
            {cart.map((item) => (
              <ListItem key={item.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                <ListItemAvatar>
                  <Avatar src={item.image} alt={item.title} sx={{ width: 56, height: 56 }} />
                </ListItemAvatar>
                <ListItemText primary={item.title} secondary={`$${item.price} x ${item.quantity}`} />
                
                <IconButton onClick={() => decreaseQuantity(item.id)} color="primary">
                  <Remove />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton onClick={() => increaseQuantity(item.id)} color="primary">
                  <Add />
                </IconButton>

                <IconButton onClick={() => handleOpenRemoveDialog(item.id)} color="error">
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>

          <Typography variant="h5" sx={{ marginTop: 2 }}>
            Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </Typography>

          <Button variant="contained" color="secondary" sx={{ marginTop: 2 }} onClick={handleOpenClearCartDialog}>
            Clear Cart
          </Button>
        </>
      )}

      {/* Confirmation Dialog for Removing an Item */}
      <Dialog open={openRemoveDialog} onClose={handleCloseRemoveDialog}>
        <DialogTitle>Remove Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this item from your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRemoveDialog} color="primary">Cancel</Button>
          <Button onClick={handleConfirmRemove} color="error">Remove</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Clearing the Cart */}
      <Dialog open={openClearCartDialog} onClose={handleCloseClearCartDialog}>
        <DialogTitle>Clear Cart</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to clear your entire cart? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClearCartDialog} color="primary">Cancel</Button>
          <Button onClick={handleConfirmClearCart} color="error">Clear Cart</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

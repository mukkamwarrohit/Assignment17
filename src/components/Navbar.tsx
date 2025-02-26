import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          E-Shop
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <IconButton color="inherit" component={Link} to="/cart">
          <ShoppingCart />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

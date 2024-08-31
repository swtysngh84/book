import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slice/loginSlice";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  logo: {
    marginRight: 2,
    cursor: "pointer",
  },
  navButtons: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
  },
  avatarButton: {
    marginLeft: 2,
  },
}));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector((state) => state.login.user);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout()).then((response) => {
      if (!response.error) {
        navigate("/login");
      }
    });
    handleClose();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Book collections
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleMenuClick}
            className={classes.avatarButton}
          >
            <Avatar alt="User Avatar">
              {user?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

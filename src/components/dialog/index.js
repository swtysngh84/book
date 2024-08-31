import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
// import CloseIcon from "@mui/icons-material";
// import { IconButton, CloseIcon } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
  dialogTitleRoot: {
    "& .MuiTypography-h6": {
      fontSize: 16,
    },
    display: "flex",
    justifyContent: "space-between",
  },
  dialogActionsRoot: {
    padding: "16px 24px",
  },
}));

const CommonDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  isDisabledConfirm,
  fullWidth,
  maxWidth,
  classes,
  hideFooter,
}) => {
  const newClasses = useStyles();
  return (
    <Dialog
      open={open}
      fullWidth={fullWidth}
      onClose={onClose}
      maxWidth={maxWidth}
      classes={classes}
    >
      <DialogTitle className={newClasses.dialogTitleRoot}>
        {title}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>{content}</DialogContent>
      {!hideFooter ? (
        <DialogActions classes={{ root: newClasses.dialogActionsRoot }}>
          <Button onClick={onClose}>Cancle</Button>

          <Button
            onClick={onConfirm}
            color="primary"
            variant="contained"
            disabled={isDisabledConfirm}
          >
            Save
          </Button>
        </DialogActions>
      ) : (
        ""
      )}
    </Dialog>
  );
};

export default CommonDialog;

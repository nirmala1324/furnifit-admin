import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const DeleteConfirmation = ({ furnitureID, onDelete, furnitureName, publicID }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    onDelete(furnitureID);
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="error" onClick={handleOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            padding: "1vw", // Set your desired padding here
          },
        }}
      >
        <DialogTitle>
          <strong>Delete Confirmation</strong>
        </DialogTitle>
        <DialogContent style={{ lineHeight: "2" }}>
          Are you sure you want to delete this furniture?
          <br />
          Furniture ID&ensp;&ensp;&ensp;&ensp;:<strong> {furnitureID}</strong>
          <br />
          Furniture Name&nbsp;: <strong>{furnitureName}</strong>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="violet">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteConfirmation;

import React from "react";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { useDisclosure } from "../../hooks/useDisclosure";
import Dialog from "../../components/dialog";
import { addBook, getBook } from "../../slice/bookSlice";
const AddBook = ({ pagination }) => {
  const disclouser = useDisclosure(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading } = useSelector((state) => state.book);
  const [book, setBook] = useState({ title: "", author: "" });
  const [error, setError] = useState({ title: "", author: "" });

  const onChange = (event) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { author, title } = book;
    if (!title) {
      error.title = "Please enter a title.";
    } else {
      error.title = "";
    }
    if (!author) {
      error.author = "Please enter a author name.";
    } else {
      error.author = "";
    }
    setError({ ...error });
    if (!error.title && !error.author) {
      dispatch(addBook(book)).then((response) => {
        if (!response.error) {
          dispatch(
            getBook({
              page: pagination.page,
              rowsPerPage: pagination.rowsPerPage,
            })
          );
          enqueueSnackbar(response.payload.message, {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
      });
      disclouser.onClose();
      setBook({});
    }
  };
  const onClose = () => {
    setBook({});
    disclouser.onClose();
  };
  return (
    <>
      <Button onClick={disclouser.onOpen}>Add Book</Button>
      <Dialog
        open={disclouser.isOpen}
        onClose={onClose}
        onConfirm={handleSubmit}
        isDisabledConfirm={isLoading}
        title="Add Book"
        content={
          <form>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={book.title}
              error={!!error.title}
              helperText={error.title}
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="author"
              label="Author Name"
              id="author"
              value={book.author}
              error={!!error.author}
              helperText={error.author}
              onChange={onChange}
            />
          </form>
        }
      />
    </>
  );
};
export default React.memo(AddBook);

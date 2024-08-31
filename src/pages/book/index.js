import { useEffect } from "react";
import { Container, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import Table from "../../components/table";
import AddBook from "./addBook";
import { getBook } from "../../slice/bookSlice";
import { usePagination } from "../../hooks/usePagination";

const Book = () => {
  const { list, totalPages, isLoading } = useSelector((state) => state.book);
  const dispatch = useDispatch();
  const pagination = usePagination({
    page: 1,
    pageSize: 5,
  });

  useEffect(() => {
    dispatch(
      getBook({
        page: pagination.page,
        rowsPerPage: pagination.rowsPerPage,
      })
    );
  }, [dispatch, pagination.page, pagination.rowsPerPage]);

  const columns = [
    {
      label: "Title",
      key: "title",
    },
    {
      label: "Author",
      key: "author",
    },
  ];
  return (
    <Container sx={{ margin: 2 }}>
      <Box>
        <AddBook pagination={pagination} />{" "}
      </Box>
      <Box>
        <Table
          columns={columns}
          tablebody={list}
          isLoading={isLoading}
          handleChangePage={pagination.handleChangePage}
          handleChangeRowsPerPage={pagination.handleChangeRowsPerPage}
          page={pagination.page}
          rowsPerPage={pagination.rowsPerPage}
          pagination={true}
          count={totalPages}
          emptyMessage={"There are no books."}
          variant="nohover"
        />
      </Box>
    </Container>
  );
};
export default Book;

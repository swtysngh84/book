import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  emptyMessage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function BasicTable(props) {
  const {
    tablebody,
    columns,
    emptyMessage,
    rowsPerPage,
    handleChangePage,
    page,
    handleChangeRowsPerPage,
    pagination,
    count,
    isLoading,
  } = props;
  const style = useStyles();
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell key={column.label}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <p className={style.emptyMessage}>Loading......</p>
                </TableCell>
              </TableRow>
            ) : tablebody.length ? (
              tablebody?.map((row) => (
                <TableRow
                  key={`row_${row._id}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {columns?.map((column) => {
                    const displayValue = row[column.key];
                    return (
                      <TableCell
                        component="th"
                        scope="row"
                        key={`${row._id + column.key}`}
                      >
                        {displayValue}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <p className={style.emptyMessage}>{emptyMessage}</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && tablebody.length ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}
    </>
  );
}

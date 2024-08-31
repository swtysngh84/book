import { useState } from "react";

export const usePagination = (defaults = {}) => {
  const [page, setPage] = useState(defaults.page || 1);
  const [rowsPerPage, setRowsPerPage] = useState(defaults.pageSize || 10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

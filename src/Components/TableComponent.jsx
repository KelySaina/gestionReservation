import * as React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

export default function TableComponent({ children }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} >{children}</Table>
    </TableContainer>
  );
}
import React from "react";
import Header from "./Header";
import { Box } from "@mui/material";

export default function ContainerComponents({ children }) {
  return (
    <Box sx={{ pt: 12, mx: 3, background: "", marginTop:'-70px' }}>
      {children}
    </Box>
  );
}
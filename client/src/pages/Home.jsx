import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { grey } from "../constants/color";

function Home() {
  return (
    <Box 
      sx={{ 
        bgcolor: grey, 
        minHeight: "100vh", 
        width: "100%", 
        flexGrow: 1,  
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center"
      }}
    >
      <Typography variant="h5" textAlign="center">
        Select a friend to chat
      </Typography>
    </Box>
  );
}

export default AppLayout()(Home);

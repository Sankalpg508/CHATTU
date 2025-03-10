import React from "react";
import { Grid2,Skeleton, Stack } from "@mui/material";
export const LayoutLoader = () => {
    return   <Grid2 container height={'calc(100vh - 4rem)'} spacing={'1rem'}>
    <Grid2 item sm={4} md={3} sx={{
      display:{xs: 'none',sm:'block' },
    }}
    height={'100%'}>
    <Skeleton variant="rectangular"/>
    </Grid2>
    <Grid2 item xs={12} sm={8} md={5} lg={6} height={'100%'} > </Grid2>
    <Stack spacing={'1rem'}> 
    {
Array.from({length:10}).map((_, index) => (
    <Skeleton key={index} variant="rectangular" height={'5rem'}/> 
))
    }
    </Stack>
    <Grid2 item md={4} lg={3} 
    sx={{
      display:{xs: 'none',md:'block' },
    
    }}
    height={'100%'} > </Grid2>
    <Skeleton variant="rectangular" height={'100vh'}/>
    </Grid2>
}
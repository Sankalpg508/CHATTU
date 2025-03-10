import { styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // ✅ Correct import
import { grey } from '../../constants/color';

export const VisuallyHiddenInput = styled('input')({
  border: 0,
  clip: 'rect(0 0 0 0)', 
  height: 1,  
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});

export const Link = styled(RouterLink)`  
  text-decoration: none;
  color: black;
  padding: 0.5rem;  
  &:hover {
    color:rgb(231, 14, 227);  
  }
`;

export const InputBox = styled('input')`
width: 100%;
height: 100%;
border: none;
outline: none;
padding: 0 3rem;
border-radius: 1.5rem;
background-color: ${grey}
`
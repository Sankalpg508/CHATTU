import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box,
  Fade,
  Zoom
} from '@mui/material';
import { useInputValidation } from '6pp';
import { Navigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { palette } from '../../constants/color';
// Custom color palette


// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '16px',
  background: palette.cream,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '450px',
}));

const StyledTextField = styled(TextField)({
  marginBottom: '1.5rem',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: palette.blue,
    },
    '&:hover fieldset': {
      borderColor: palette.orange,
    },
    '&.Mui-focused fieldset': {
      borderColor: palette.blue,
    },
  },
  '& .MuiInputLabel-root': {
    color: palette.navy,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: palette.blue,
  },
  '& .MuiOutlinedInput-input': {
    color: palette.navy,
  },
});

const GradientButton = styled(Button)({
  background: `linear-gradient(45deg, ${palette.blue} 30%, ${palette.navy} 90%)`,
  color: palette.cream,
  fontWeight: 'bold',
  padding: '12px 0',
  marginTop: '1.5rem',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `linear-gradient(45deg, ${palette.orange} 30%, ${palette.maroon} 90%)`,
    transform: 'translateY(-3px)',
    boxShadow: `0 6px 20px rgba(${parseInt(palette.maroon.slice(1, 3), 16)}, ${parseInt(palette.maroon.slice(3, 5), 16)}, ${parseInt(palette.maroon.slice(5, 7), 16)}, 0.4)`,
  },
});

const AnimatedBackground = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
});

const FloatingCircle = styled(Box)(({ size, top, left, animationDuration }) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${palette.navy}33, ${palette.blue}33)`,
  top,
  left,
  animation: `float ${animationDuration}s infinite alternate ease-in-out`,
  '@keyframes float': {
    '0%': {
      transform: 'translate(0, 0) rotate(0deg)',
    },
    '100%': {
      transform: 'translate(30px, 30px) rotate(30deg)',
    },
  },
}));

const AnimatedFormItem = styled(Box)(({ delay }) => ({
  opacity: 0,
  transform: 'translateY(20px)',
  animation: 'fadeInUp 0.6s forwards',
  animationDelay: `${delay}s`,
  '@keyframes fadeInUp': {
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const AdminLogin = () => {
  const isAdmin = false;
  const secretKey = useInputValidation('');
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    // Set form visible after component mount
    setFormVisible(true);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submitting');
  };

  if (isAdmin) return <Navigate to='/admin/dashboard' />;
  
  // Create background gradient
  const bgGradient = `linear-gradient(135deg, ${palette.navy} 0%, ${palette.blue} 100%)`;

  return (
    <Box
      sx={{
        background: bgGradient,
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 30% 20%, ${palette.cream}20 0%, transparent 40%)`,
          zIndex: 1,
        },
      }}
    >
      <AnimatedBackground>
        {[...Array(5)].map((_, i) => (
          <FloatingCircle 
            key={i}
            size={['80px', '100px', '120px', '150px', '180px'][i]}
            top={`${Math.random() * 100}%`}
            left={`${Math.random() * 100}%`}
            animationDuration={15 + i * 5}
          />
        ))}
      </AnimatedBackground>
      
      <Container component="main" sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
      }}>
        <Zoom in={true} style={{ transitionDelay: '150ms' }}>
          <StyledPaper elevation={6}>
            <Fade in={formVisible} timeout={500}>
              <Box width="100%">
                <AnimatedFormItem delay={0.1}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: palette.navy, 
                      fontWeight: 'bold',
                      marginBottom: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    Admin Login
                  </Typography>
                </AnimatedFormItem>
                
                <form 
                  style={{
                    width: '100%',
                  }}
                  onSubmit={submitHandler}
                >
                  <AnimatedFormItem delay={0.3}>
                    <StyledTextField 
                      required
                      label="Secret Key" 
                      type="password"
                      fullWidth 
                      variant="outlined" 
                      value={secretKey.value}
                      onChange={secretKey.changeHandler}
                    />
                  </AnimatedFormItem>
                  
                  <AnimatedFormItem delay={0.4}>
                    <GradientButton
                      variant="contained" 
                      type="submit" 
                      fullWidth
                    >
                      Login
                    </GradientButton>
                  </AnimatedFormItem>
                </form>
              </Box>
            </Fade>
          </StyledPaper>
        </Zoom>
      </Container>
      
      {/* Loading indicator for form toggle */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '2px',
          bgcolor: 'transparent',
          zIndex: 9999,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(to right, transparent, ${palette.orange}, transparent)`,
            animation: formVisible ? 'none' : 'loading 1s infinite',
          },
          '@keyframes loading': {
            '0%': {
              transform: 'translateX(-100%)',
            },
            '100%': {
              transform: 'translateX(100%)',
            },
          },
        }}
      />
    </Box>
  );
};

export default AdminLogin;
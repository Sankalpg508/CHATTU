import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  Stack,
  Fade,
  Zoom,
  Paper,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

// Custom color palette
const palette = {
  'navy': '#001524',
  'blue': '#15616d',
  'cream': '#ffecd1',
  'orange': '#ff7d00',
  'maroon': '#78290f',
};

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '450px',
  borderRadius: '16px',
  background: palette.cream,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
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
  marginTop: '1rem',
  marginBottom: '1.5rem',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `linear-gradient(45deg, ${palette.orange} 30%, ${palette.maroon} 90%)`,
    transform: 'translateY(-3px)',
    boxShadow: `0 6px 20px rgba(${parseInt(palette.maroon.slice(1, 3), 16)}, ${parseInt(palette.maroon.slice(3, 5), 16)}, ${parseInt(palette.maroon.slice(5, 7), 16)}, 0.4)`,
  },
});

const StyledAvatar = styled(Avatar)({
  width: '120px',
  height: '120px',
  margin: 'auto',
  border: `3px solid ${palette.blue}`,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// Main component
export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formVisible, setFormVisible] = useState(true);
  
  // Form state
  const [username, setUsername] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [name, setName] = useState({ value: '' });
  const [bio, setBio] = useState({ value: '' });
  const [avatar, setAvatar] = useState({ preview: '', file: null, error: '' });
  
  const toggleLogin = () => {
    setFormVisible(false);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setFormVisible(true);
    }, 500);
  };
  
  const handleUsername = (e) => {
    setUsername({ ...username, value: e.target.value });
  };
  
  const handlePassword = (e) => {
    setPassword({ ...password, value: e.target.value });
  };
  
  const handleName = (e) => {
    setName({ ...name, value: e.target.value });
  };
  
  const handleBio = (e) => {
    setBio({ ...bio, value: e.target.value });
  };
  
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setAvatar({ ...avatar, error: 'File size must be less than 2MB' });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar({ preview: reader.result, file, error: '' });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login with:', { username: username.value, password: password.value });
  };
  
  const handleSignUp = (e) => {
    e.preventDefault();
    // Add signup logic here
    console.log('Sign up with:', { 
      name: name.value,
      bio: bio.value,
      username: username.value,
      password: password.value,
      avatar: avatar.file
    });
  };
  
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
                {isLogin ? (
                  <>
                    <AnimatedFormItem delay={0.1}>
                      <Typography variant="h5" fontWeight="bold" mb={2} align="center" sx={{ color: palette.navy }}>
                        Welcome Back
                      </Typography>
                    </AnimatedFormItem>
                    
                    <form 
                      style={{ width: '100%' }}
                      onSubmit={handleLogin}
                    >
                      <AnimatedFormItem delay={0.2}>
                        <StyledTextField 
                          required
                          label="Username" 
                          fullWidth 
                          variant="outlined" 
                          value={username.value}
                          onChange={handleUsername}
                        />
                      </AnimatedFormItem>
                      
                      <AnimatedFormItem delay={0.3}>
                        <StyledTextField 
                          required
                          label="Password" 
                          type="password"
                          fullWidth 
                          variant="outlined" 
                          value={password.value}
                          onChange={handlePassword}
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
                      
                      <AnimatedFormItem delay={0.5}>
                        <Divider sx={{ color: palette.navy }}>
                          <Typography variant="body2">OR</Typography>
                        </Divider>
                      </AnimatedFormItem>
                      
                      <AnimatedFormItem delay={0.6}>
                        <Button 
                          sx={{    
                            marginTop: '0.5rem',
                            textTransform: 'none',
                            fontWeight: 'medium',
                            borderRadius: '8px',
                            padding: '10px',
                            transition: 'all 0.2s ease',
                            color: palette.blue,
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              color: palette.orange,
                            },
                          }}
                          fullWidth
                          variant="text"  
                          onClick={toggleLogin}
                        >
                          Sign Up Instead
                        </Button>
                      </AnimatedFormItem>
                    </form>
                  </>
                ) : (
                  <>
                    <AnimatedFormItem delay={0.1}>
                      <Typography variant="h5" fontWeight="bold" mb={2} align="center" sx={{ color: palette.navy }}>
                        Create Account
                      </Typography>
                    </AnimatedFormItem>
                    
                    <form 
                      style={{ width: '100%' }}
                      onSubmit={handleSignUp}
                    >
                      <AnimatedFormItem delay={0.2}>
                        <Stack 
                          position="relative"
                          width="10rem"
                          margin="auto"
                          mb={2}
                        >
                          <StyledAvatar
                            src={avatar.preview || '/default-avatar.png'}
                            className="pulsing-shadow"
                            sx={{
                              '@keyframes pulseShadow': {
                                '0%': {
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                },
                                '100%': {
                                  boxShadow: `0 8px 24px ${palette.blue}40`
                                }
                              },
                              '&.pulsing-shadow': {
                                animation: 'pulseShadow 2s infinite alternate ease-in-out'
                              }
                            }}
                          />
                          
                          <IconButton
                            sx={{
                              position: 'absolute',
                              bottom: '0',
                              right: '0',
                              color: palette.cream,
                              bgcolor: palette.navy + 'CC',
                              ':hover': {
                                bgcolor: palette.orange + 'CC',
                                transform: 'scale(1.1)'
                              },
                              transition: 'all 0.2s ease',
                              padding: '10px',
                            }}
                            component="label"
                          >
                            <>
                              <CameraAltIcon />
                              <VisuallyHiddenInput type="file" onChange={handleAvatar} />
                            </>
                          </IconButton>
                        </Stack>
                      </AnimatedFormItem>
                      
                      {avatar.error && (
                        <Fade in={!!avatar.error}>
                          <Typography 
                            m="1rem" 
                            width="fit-content"
                            display="block"
                            color={palette.maroon} 
                            variant="caption"
                            align="center"
                          >
                            {avatar.error}
                          </Typography>
                        </Fade>
                      )}
                      
                      <AnimatedFormItem delay={0.3}>
                        <StyledTextField 
                          required
                          label="Name" 
                          fullWidth 
                          variant="outlined" 
                          value={name.value}
                          onChange={handleName}
                        />
                      </AnimatedFormItem>
                      
                      <AnimatedFormItem delay={0.4}>
                        <StyledTextField 
                          required
                          label="Bio" 
                          fullWidth 
                          variant="outlined" 
                          value={bio.value}
                          onChange={handleBio}
                        />
                      </AnimatedFormItem>
                      
                      <AnimatedFormItem delay={0.5}>
                        <StyledTextField 
                          required
                          label="Username" 
                          fullWidth 
                          variant="outlined" 
                          value={username.value}
                          onChange={handleUsername}
                        />
                      </AnimatedFormItem>
                      
                      {username.error && (
                        <Fade in={!!username.error}>
                          <Typography color={palette.maroon} variant="caption">
                            {username.error}
                          </Typography>
                        </Fade>
                      )}
                      
                      <AnimatedFormItem delay={0.6}>
                        <StyledTextField 
                          required
                          label="Password" 
                          type="password"
                          fullWidth 
                          variant="outlined" 
                          value={password.value}
                          onChange={handlePassword}
                        />
                      </AnimatedFormItem>
                      
                      {password.error && (
                        <Fade in={!!password.error}>
                          <Typography color={palette.maroon} variant="caption">
                            {password.error}
                          </Typography>
                        </Fade>
                      )}
                      
                      <AnimatedFormItem delay={0.7}>
                        <GradientButton
                          variant="contained" 
                          type="submit" 
                          fullWidth
                        >
                          Sign Up
                        </GradientButton>
                      </AnimatedFormItem>
                      
                      <AnimatedFormItem delay={0.8}>
                        <Divider sx={{ color: palette.navy }}>
                          <Typography variant="body2">OR</Typography>
                        </Divider>
                      </AnimatedFormItem>
                      
                      <AnimatedFormItem delay={0.9}>
                        <Button 
                          sx={{    
                            marginTop: '0.5rem',
                            textTransform: 'none',
                            fontWeight: 'medium',
                            borderRadius: '8px',
                            padding: '10px',
                            transition: 'all 0.2s ease',
                            color: palette.blue,
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              color: palette.orange,
                            },
                          }}
                          fullWidth
                          variant="text"  
                          onClick={toggleLogin}
                        >
                          Login Instead
                        </Button>
                      </AnimatedFormItem>
                    </form>
                  </>
                )}
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
}
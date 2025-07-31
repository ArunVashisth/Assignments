import React, { useState, useMemo } from 'react';
import Login from './Login';
import Signup from './Signup';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { makeServer } from './server';

if (window.server == null) {
  makeServer();
}

const lightTheme = {
  background: 'linear-gradient(120deg, #d1c4e9 0%, #7e57c2 100%)',
  cardBg: '#fff',
  text: '#222',
  cardShadow: '0 8px 32px rgba(60, 60, 120, 0.12)',
  link: '#3486eb',
  buttonBg: 'linear-gradient(90deg, #3486eb 0%, #6ed0fa 100%)',
  buttonHover: 'linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)',
  inputBg: '#f9fafb',
  inputBorder: '#d1d5db',
};
const darkTheme = {
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  cardBg: '#1e1e2f',
  text: '#e6e6e6',
  cardShadow: '0 8px 32px rgba(0,0,0,0.4)',
  link: '#64b5f6',
  buttonBg: 'linear-gradient(90deg, #4a6cf7 0%, #3a56c9 100%)',
  buttonHover: 'linear-gradient(90deg, #3a56c9 0%, #2a46b8 100%)',
  inputBg: '#252a41',
  inputBorder: '#3a4055',
};
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    min-height: 100vh;
    transition: background 0.3s ease, color 0.3s ease;
    line-height: 1.6;
  }
  
  * {
    box-sizing: border-box;
  }
  
  a {
    color: ${props => props.theme.link};
    text-decoration: none;
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 0.9;
    }
  }
`;
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
  transition: background 0.3s;
`;
const Card = styled.div`
  background: ${props => props.theme.cardBg};
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: ${props => props.theme.cardShadow};
  width: 100%;
  max-width: 420px;
  margin: 2rem;
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  
  @media (max-width: 480px) {
    margin: 1rem;
    padding: 1.75rem;
  }
`;
const SwitchLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.link};
  margin-top: 1rem;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
`;
const ThemeToggle = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: ${({ theme }) => theme === lightTheme ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${({ theme }) => theme === lightTheme ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.5rem;
  border-radius: 12px;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(8px);
  
  &:hover {
    background: ${({ theme }) => theme === lightTheme ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme === lightTheme ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  }
  
  @media (max-width: 480px) {
    top: 1rem;
    right: 1rem;
    width: 2.25rem;
    height: 2.25rem;
    font-size: 1.1rem;
  }
`;
const Button = styled.button`
  width: 100%;
  padding: 0.875rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.buttonBg};
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: ${({ theme }) => theme.buttonHover};
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(100, 181, 246, 0.3);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::after {
    transform: translateX(100%);
  }
`;
const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  margin: 0.5rem 0 1.25rem;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 0.75rem;
  font-size: 1rem;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  transition: all 0.2s ease;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.link};
    box-shadow: 0 0 0 3px rgba(100, 181, 246, 0.15);
    transform: translateY(-1px);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.text}80;
    opacity: 0.7;
  }
  
  &:hover:not(:focus) {
    border-color: ${({ theme }) => theme.link}50;
  }
`;

function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState('light');
  
  const currentTheme = useMemo(() => 
    theme === 'light' ? lightTheme : darkTheme,
    [theme]
  );

  const handleThemeToggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const handleLogin = async (email, password) => {
    setMessage('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const err = await res.json();
        setMessage(err.message || 'Login failed.');
        return;
      }
      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      setMessage('Network error.');
    }
  };

  const handleSignup = async (name, email, password) => {
    setMessage('');
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      if (!res.ok) {
        const err = await res.json();
        setMessage(err.message || 'Signup failed.');
        return;
      }
      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      setMessage('Network error.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
    setMessage('');
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Container>
        <ThemeToggle onClick={handleThemeToggle} aria-label="Toggle theme">
          {theme === 'light' ? '🌙 Dark' : '🌞 Light'}
        </ThemeToggle>
        <Card>
          {user ? (
            <>
              <h2>Welcome, {user.name}!</h2>
              <button onClick={handleLogout}>Log Out</button>
            </>
          ) : page === 'login' ? (
            <>
              <Login onLogin={handleLogin} />
              {message && <p style={{ color: 'red', marginTop: '1rem' }}>{message}</p>}
              <SwitchLink onClick={() => { setPage('signup'); setMessage(''); }}>
                Don't have an account? Sign Up
              </SwitchLink>
            </>
          ) : (
            <>
              <Signup onSignup={handleSignup} />
              {message && <p style={{ color: 'red', marginTop: '1rem' }}>{message}</p>}
              <SwitchLink onClick={() => { setPage('login'); setMessage(''); }}>
                Already have an account? Log In
              </SwitchLink>
            </>
          )}
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default App;

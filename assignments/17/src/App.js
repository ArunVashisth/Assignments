import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import styled from 'styled-components';
import { makeServer } from './server';

if (window.server == null) {
  makeServer();
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #d1c4e9 0%, #7e57c2 100%);
`;

const Card = styled.div`
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px rgba(60, 60, 120, 0.12);
  min-width: 320px;
  max-width: 400px;
  width: 100%;
  margin: 1.5rem;
`;

const SwitchLink = styled.button`
  background: none;
  border: none;
  color: #3486eb;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
`;

function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

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
    <Container>
      <Card>
        {user ? (
          <div style={{textAlign: 'center'}}>
            <h2>Welcome, {user.name}!</h2>
            <p>You are logged in as <b>{user.email}</b></p>
            <button onClick={handleLogout} style={{marginTop: '1.5rem', padding: '0.7rem 2rem', borderRadius: '2rem', border: 'none', background: '#3486eb', color: '#fff', fontWeight: 600, fontSize: '1rem', cursor: 'pointer'}}>Logout</button>
          </div>
        ) : page === 'login' ? (
          <>
            <Login onLogin={handleLogin} />
            <SwitchLink onClick={() => { setPage('signup'); setMessage(''); }}>Don't have an account? Sign up</SwitchLink>
          </>
        ) : (
          <>
            <Signup onSignup={handleSignup} />
            <SwitchLink onClick={() => { setPage('login'); setMessage(''); }}>Already have an account? Log in</SwitchLink>
          </>
        )}
        {message && <p style={{color: '#e74c3c', marginTop: '1rem'}}>{message}</p>}
      </Card>
    </Container>
  );
}

export default App;

import React, { useState } from 'react';
import styled from 'styled-components';

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #222;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-bottom: 1.1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.7rem;
  font-size: 1rem;
  background: #f9fafb;
  transition: border 0.2s;
  &:focus { border-color: #3486eb; outline: none; }
`;
const Button = styled.button`
  width: 100%;
  padding: 0.9rem 0;
  background: linear-gradient(90deg, #3486eb 0%, #6ed0fa 100%);
  color: #fff;
  border: none;
  border-radius: 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 0.5rem;
  &:hover { background: linear-gradient(90deg, #2563eb 0%, #38bdf8 100%); }
`;

function Signup({ onSignup }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSignup(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Title>Sign Up</Title>
      <Input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
      <Button type="submit">Create Account</Button>
    </form>
  );
}

export default Signup;

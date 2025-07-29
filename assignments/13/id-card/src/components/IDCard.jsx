import React, { useEffect, useState } from 'react';
import './IDCard.css';

const IDCard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=12')
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  return (
    <div className="card-container">
      {users.map((user) => (
        <div key={user.id} className="card">
          <div className="card-header">
            <img src={user.image} alt="User" className="avatar" />
            <div>
              <h2>{user.firstName} {user.lastName}</h2>
              <p className="user-id">User ID: {user.id}</p>
            </div>
          </div>

          <div className="card-body">
            <InfoField label="Email" value={user.email} />
            <InfoField label="Phone" value={user.phone} />
            <InfoField label="Company" value={user.company.name} />
            <InfoField label="Address" value={`${user.address.address}, ${user.address.city}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

const InfoField = ({ label, value }) => (
  <div className="info-group">
    <label>{label}</label>
    <p>{value}</p>
  </div>
);

export default IDCard;

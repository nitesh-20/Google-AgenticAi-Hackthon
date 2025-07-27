import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileButton.css';

const ProfileButton = ({ user }) => {
  const navigate = useNavigate();
  return (
    <button className="profile-btn" onClick={() => navigate('/profile')}
      title="Profile">
      <img src={user.avatar || '/placeholder.svg'} alt={user.name} className="profile-btn-avatar" />
    </button>
  );
};

export default ProfileButton;

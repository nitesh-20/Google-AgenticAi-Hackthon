import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const defaultUser = {
  name: 'Your Farm',
  handle: 'yourfarm',
  bio: '🌽 Corn and soybean farmer | Learning sustainable practices',
  location: 'Your Location',
  avatar: '/placeholder.svg',
};

const ProfilePage = () => {
  const [user, setUser] = useState(defaultUser);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(form);
    setEdit(false);
  };

  const handleLogout = () => {
    // Clear user (simulate logout)
    setUser(null);
    setTimeout(() => navigate('/login'), 300);
  };

  if (!user) {
    return (
      <div className="profile-bg">
        <div className="profile-card">
          <h2 style={{textAlign:'center', color:'#f87171'}}>You have been logged out.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-bg">
      <div className="profile-card">
        <div className="profile-header">
          <img src={form.avatar} alt={form.name} className="profile-avatar-lg" />
          {edit && (
            <input type="text" name="avatar" value={form.avatar} onChange={handleChange} className="profile-avatar-input" placeholder="Avatar URL" />
          )}
        </div>
        <div className="profile-fields">
          {edit ? (
            <>
              <input name="name" value={form.name} onChange={handleChange} className="profile-input" placeholder="Name" />
              <input name="handle" value={form.handle} onChange={handleChange} className="profile-input" placeholder="Handle" />
              <input name="location" value={form.location} onChange={handleChange} className="profile-input" placeholder="Location" />
              <textarea name="bio" value={form.bio} onChange={handleChange} className="profile-input" placeholder="Bio" />
            </>
          ) : (
            <>
              <h2 style={{color:'#16a34a'}}>{user.name} <span className="profile-handle">@{user.handle}</span></h2>
              <div className="profile-location">{user.location}</div>
              <div className="profile-bio">{user.bio}</div>
            </>
          )}
        </div>
        <div className="profile-actions">
          {edit ? (
            <button className="profile-save-btn" onClick={handleSave}>Save</button>
          ) : (
            <button className="profile-edit-btn" onClick={() => setEdit(true)}>Edit Profile</button>
          )}
          <button className="profile-logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

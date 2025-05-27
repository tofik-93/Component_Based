import React from 'react';

type ProfileCardProps = {
  name: string;
  title: string;
  avatarUrl: string;
};

export const ProfileCard: React.FC<ProfileCardProps> = ({ name, title, avatarUrl }) => {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '16px',
      maxWidth: '300px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <img
        src={avatarUrl}
        alt={name}
        style={{ borderRadius: '50%', width: '64px', height: '64px', marginBottom: '12px' }}
      />
      <h3 style={{ margin: 0, fontSize: '18px' }}>{name}</h3>
      <p style={{ margin: 0, color: '#6b7280' }}>{title}</p>
    </div>
  );
};

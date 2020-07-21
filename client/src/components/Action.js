import React from 'react';

export default function Action({ id, type, onActionClick }) {
  const handleIconClick = () => {
    onActionClick(id, type);
  };

  return (
    <span
      className="material-icons"
      style={{
        fontSize: '1.2rem',
        cursor: 'pointer',
        marginRight: '10px',
      }}
      onClick={handleIconClick}
    >
      {type}
    </span>
  );
}

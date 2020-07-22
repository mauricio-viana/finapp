import React from 'react';

export default function Action({ id, type, onActionClick }) {
  const classIcons =
    type === 'edit' ? 'material-icons modal-trigger' : 'material-icons';

  const handleIconClick = () => {
    onActionClick(id, type);
  };

  return (
    <span
      className={classIcons}
      data-target="modal1"
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

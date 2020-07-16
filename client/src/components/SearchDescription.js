import React from 'react';

export default function SearchDescription({ onChangeFilter, searchText }) {
  const handleChangeInput = (event) => {
    const inputText = event.target.value;
    onChangeFilter(inputText);
  };

  return (
    <div
      style={{
        paddingRight: '10px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <button className="waves-effect waves-light btn">
        + Novo lançamento
      </button>
      <div
        className="input-field"
        style={{ marginLeft: '10px', display: 'flex', flex: '1 1 0%' }}
      >
        <input
          placeholder="Filtro"
          type="text"
          value={searchText}
          onChange={handleChangeInput}
        />
      </div>
    </div>
  );
}

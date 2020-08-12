import React from 'react';

export default function SearchDescription({ onChangeFilter, searchText }) {
  const handleChangeInput = (event) => {
    const inputText = event.target.value;
    onChangeFilter(inputText);
  };

  return (
    <input
      placeholder="Filtro"
      type="text"
      value={searchText}
      onChange={handleChangeInput}
    />
  );
}

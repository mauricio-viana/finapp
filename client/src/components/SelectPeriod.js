import React, { useState } from 'react';
import { getPeriod } from '../helpers/monthsYears';

const periodMonthsYears = getPeriod();

export default function SelectPeriod({ onChangeSelected }) {
  const [valueSelected, setValueSelected] = useState('2020-07');

  const handleChange = (event) => {
    const newPeriod = event.target.value;
    setValueSelected(newPeriod);
    onChangeSelected(newPeriod);
  };

  return (
    <div
      className="center"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px',
      }}
    >
      <button
        className="waves-effect waves-light btn"
        style={{ marginLeft: '5px', marginRight: '5px', fontWeight: 'bold' }}
      >
        &lt;
      </button>
      <select
        onChange={handleChange}
        value={valueSelected}
        className="browser-default"
        style={{
          width: '150px',
          fontFamily: `"Fira Code Retina", Consolas, monospace, Arial`,
        }}
      >
        {periodMonthsYears.map(({ monthYear, descriptionMonthYear }) => (
          <option key={monthYear} value={monthYear}>
            {descriptionMonthYear}
          </option>
        ))}
      </select>
      <button
        className="waves-effect waves-light btn"
        style={{ marginLeft: '5px', marginRight: '5px', fontWeight: 'bold' }}
      >
        &gt;
      </button>
    </div>
  );
}

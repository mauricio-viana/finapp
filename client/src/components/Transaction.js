import React from 'react';
import { formatMoney } from '../helpers/formatNumber';

export default function Transaction({ data }) {
  const {
    _id,
    category,
    day,
    description,
    month,
    type,
    value,
    year,
    yearMoth,
    yearMonthDay,
  } = data;
  return (
    <div className="card-transaction">
      <span className="day-card">{day.toString().padStart(2, '0')}</span>
      <div className="body-card">
        <div className="card-description">
          <strong style={{ fontSize: '1.2rem' }}>{category}</strong>
          <span style={{ fontSize: '1.1rem' }}>{description}</span>
        </div>
        <div className="value-card">
          <span>{formatMoney(value)}</span>
        </div>
      </div>
      <div className="div-icons">
        <span
          class="material-icons"
          style={{
            fontSize: '1.2rem',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          edit
        </span>
        <span
          class="material-icons"
          style={{
            fontSize: '1.2rem',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          delete
        </span>
      </div>
    </div>
  );
}

import React from 'react';
import { formatMoney } from '../helpers/formatNumber';
import Action from './Action';

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

  const colorTransaction = {
    credit: 'card-transaction deep-orange lighten-2',
    debit: 'deep-orange lighten-2',
  };
  const handleActionClick = (id, type) => {
    //   const grade = grades.find((grade) => grade.id === id);
    //   if (type === 'delete') {
    //     onDelete(grade);
    //     return;
    //   }
    //   onPersist(grade);
    console.log(`clicado id: ${(id, type)}`);
  };

  return (
    <div className={colorTransaction.credit}>
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
        <Action id={_id} type="edit" onActionClick={handleActionClick} />
        <Action id={_id} type="delete" onActionClick={handleActionClick} />
      </div>
    </div>
  );
}

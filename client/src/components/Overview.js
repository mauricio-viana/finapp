import React from 'react';
import { formatMoney } from '../helpers/formatNumber';

export default function Overview({ filterList }) {
  let totalTransaction = 0;
  let totalCredit = 0;
  let totalDebit = 0;

  filterList.forEach(({ type, value }) => {
    totalTransaction++;
    if (type === '+') totalCredit += value;
    if (type === '-') totalDebit += value;
  });

  const balance = totalCredit - totalDebit;

  return (
    <div>
      <div
        style={{
          paddingTop: '20px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <strong style={{ fontSize: '1.1rem' }}>Saldo:</strong>
        <div className="value-card teal-text text-accent-4">
          <span>{formatMoney(balance)}</span>
        </div>
      </div>
      <div className="row" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <div
          className="col s6"
          style={{
            padding: '20px 20px 0px 0px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <strong style={{ fontSize: '1.1rem' }}>Receitas:</strong>
          <div>
            <strong style={{ fontSize: '1.1rem' }}>
              {formatMoney(totalCredit)}
            </strong>
          </div>
        </div>

        <div
          className="col s6"
          style={{
            padding: '20px 0px 0px 20px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <strong style={{ fontSize: '1.1rem' }}>Despesas:</strong>
          <div>
            <strong style={{ fontSize: '1.1rem' }}>
              {formatMoney(totalDebit)}
            </strong>
          </div>
        </div>
      </div>
      <div>
        <strong style={{ fontSize: '1.1rem' }}>
          Lançamentos: {totalTransaction}
        </strong>
      </div>
    </div>
  );
}

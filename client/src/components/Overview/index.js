import React from 'react';
import { formatMoney } from '../../helpers/formatNumber';
import SelectPeriod from './components/SelectPeriod';
import PieChart from './components/PieChart';
import './styles.css';

export default function Overview({
  listFilter,
  period,
  onPeriod,
  isModalOpen,
  isPreloader,
}) {
  let totalTransaction = 0;
  let totalCredit = 0;
  let totalDebit = 0;
  let dataCategories = [];

  listFilter.forEach(({ type, value, category }) => {
    totalTransaction++;
    if (type === '+') totalCredit += value;
    if (type === '-') totalDebit += value;
    if (dataCategories.indexOf(category) === -1 && type === '-')
      dataCategories.push(category);
  });

  dataCategories = dataCategories
    .sort((a, b) => a.localeCompare(b))
    .map((dataCategory) => {
      const totalCategory = listFilter.reduce((acc, cur) => {
        if (cur.category === dataCategory && cur.type === '-')
          return acc + cur.value;
        return acc;
      }, 0);
      return [dataCategory, totalCategory];
    });

  const balance = totalCredit - totalDebit;
  const classBalance =
    balance < 0 ? 'red-text text-red accent-2' : 'green-text text-green';

  const hadleChangeSelectedPeriod = (newPeriod) => {
    onPeriod(newPeriod);
  };

  return (
    <div id="panel-overview" className="col s6">
      {!isModalOpen && (
        <SelectPeriod
          onChangeSelected={hadleChangeSelectedPeriod}
          period={period}
        />
      )}

      <div className="results">
        {!isPreloader ? (
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        ) : (
          <>
            <div className="show-balance">
              <div className="font-xlarge">
                <strong className={classBalance}>{formatMoney(balance)}</strong>
              </div>
              <span className="font-normal">Saldo atual em contas</span>
            </div>

            <div className="values-panel">
              <div className="font-normal values">
                <strong>Receitas:</strong>
                <strong className="green-text text-green">
                  {formatMoney(totalCredit)}
                </strong>
              </div>

              <div className="font-normal values">
                <strong>Despesas:</strong>
                <strong className="red-text text-red accent-2">
                  {formatMoney(totalDebit)}
                </strong>
              </div>

              <div className="font-normal values">
                <strong>Lançamentos:</strong>
                <strong> {totalTransaction}</strong>
              </div>
            </div>
          </>
        )}
      </div>
      {isPreloader && <PieChart dataCategories={dataCategories} />}
    </div>
  );
}

import React, { useState } from 'react';
import TransactionList from './components/TransactionList';
import * as api from './api/apiService';
import SelectPeriod from './components/SelectPeriod';
import Overview from './components/Overview';
import M from 'materialize-css';

export default function App() {
  const [filterText, setFilterText] = useState('');
  const [listFilter, setListFilter] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [period, setPeriod] = useState(
    `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0')}`
  );

  React.useEffect(() => {
    M.AutoInit();
  }, []);

  React.useEffect(() => {
    const getTransactionsList = async () => {
      const newList = await api.getPeriodTransaction(period);
      setTransactions(newList.transactions);
    };
    getTransactionsList();
  }, [period]);

  React.useEffect(() => {
    const newFilterList = () => {
      const newList =
        filterText.length > 0
          ? transactions
              .filter((item) => {
                const textDescription = item.description.toLowerCase();
                if (textDescription.indexOf(filterText) >= 0) return item;
              })
              .sort((a, b) => a.day - b.day)
          : Object.assign(
              [],
              transactions.sort((a, b) => a.day - b.day)
            );
      setListFilter(newList);
    };
    newFilterList();
  }, [transactions, filterText]);

  const hadleChangeSelected = (newPeriod) => {
    setPeriod(newPeriod);
  };

  const handleFilterText = (newDescription) => {
    setFilterText(newDescription);
  };

  const handlePersistData = async (formData, isEdit) => {
    const newTransaction = isEdit
      ? await api.update(formData)
      : await api.create(formData);

    if (newTransaction.yearMonth === period) {
      let newList = isEdit
        ? Object.assign([], [...transactions, newTransaction])
        : Object.assign(
            [],
            [
              ...transactions.filter(({ _id }) => _id !== newTransaction._id),
              newTransaction,
            ]
          );
      setTransactions(newList);
    }
  };

  const handleRemove = async (id) => {
    const transactionData = listFilter.find(({ _id }) => _id === id);
    await api.remove(transactionData);
    const newList = transactions.filter(({ _id }) => _id !== id);
    setTransactions(newList);
  };

  return (
    <>
      <header>
        <div className="navbar-fixed">
          <nav className="blue-grey lighten-2">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: '0 auto',
                width: '80%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  lineHeight: 'normal',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}
              >
                <strong style={{ fontSize: '2rem' }}>
                  Controle Financeiro Pessoal
                </strong>

                <span style={{ fontSize: '1.1rem' }}>
                  Bootcamp Full Stack - Desafio Final
                </span>
              </div>
              <div>
                <SelectPeriod
                  onChangeSelected={hadleChangeSelected}
                  period={period}
                />
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className="container-main">
        <div className="row">
          <TransactionList
            listFilter={listFilter}
            filterText={filterText}
            onFilterText={handleFilterText}
            onPersist={handlePersistData}
            onRemove={handleRemove}
          />
          <Overview listFilter={listFilter} />
        </div>
      </main>
    </>
  );
}

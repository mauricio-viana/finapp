import React, { useState, useEffect } from 'react';
import TransactionList from './components/TransactionList';
import * as api from './api/apiService';
import SelectPeriod from './components/SelectPeriod';

export default function App() {
  const [period, setPeriod] = useState('2019-01');
  const [transactions, setTransactions] = useState({});

  useEffect(() => {
    const getTransactionsList = async () => {
      const dataList = await api.getPeriodTransaction(period);
      setTransactions(dataList);
    };
    getTransactionsList();
  }, [period]);

  const hadleChangeSelected = (newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <div className="container">
      <div className="center">
        <h1>Bootcamp Full Stack - Desafio Final</h1>
        <h2>Controle Financeiro Pessoal</h2>
      </div>

      <SelectPeriod onChangeSelected={hadleChangeSelected} />

      {transactions.length && (
        <TransactionList transactionsList={transactions.transactions} />
      )}
    </div>
  );
}

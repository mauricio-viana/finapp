import React, { useState, useEffect } from 'react';
import Transaction from './Transaction';
import SearchDescription from './SearchDescription';

export default function TransactionList({ transactionsList }) {
  const [filterText, setFilterText] = useState('');
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    const newFilterList = () => {
      const newList =
        filterText.length > 0
          ? transactionsList.filter((item) => {
              const textDescription = item.description.toLowerCase();
              if (textDescription.indexOf(filterText) >= 0) return item;
            })
          : transactionsList;
      setFilterList(newList);
    };
    newFilterList();
  }, [transactionsList, filterText]);

  const handleChangeFilter = (newDescription) => {
    setFilterText(newDescription);
  };

  return (
    <div className="row">
      <div className="col s6">
        <h3 className="center">Lançamentos</h3>

        <SearchDescription
          searchText={filterText}
          onChangeFilter={handleChangeFilter}
        />

        {filterList.map((data, index) => {
          return <Transaction key={index} data={data} />;
        })}
      </div>
      <div className="col s6">
        <h3 className="center">Visão Geral</h3>
      </div>
    </div>
  );
}

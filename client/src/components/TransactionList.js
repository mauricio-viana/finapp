import React, { useState } from 'react';
import Transaction from './Transaction';
import SearchDescription from './SearchDescription';
import Overview from './Overview';
import M from 'materialize-css';
import Modal from './Modal';
import * as api from '../api/apiService';

export default function TransactionList({ transactionsList }) {
  const [filterText, setFilterText] = useState('');
  const [filterList, setFilterList] = useState([]);

  React.useEffect(() => {
    M.AutoInit();
  }, []);

  React.useEffect(() => {
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

  const handlePersistData = async (formData) => {
    console.log(formData);
    await api.create(formData);
  };

  return (
    <div className="row">
      <div className="col s6">
        <h3 className="center">Lançamentos</h3>
        <div
          style={{
            paddingRight: '10px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <button
            className="waves-effect waves-light btn modal-trigger"
            data-target="modal1"
          >
            + Novo lançamento
          </button>
          <div
            className="input-field"
            style={{ marginLeft: '10px', display: 'flex', flex: '1 1 0%' }}
          >
            <SearchDescription
              searchText={filterText}
              onChangeFilter={handleChangeFilter}
            />
          </div>
        </div>

        {filterList.map((data, index) => {
          return <Transaction key={index} data={data} />;
        })}
      </div>
      <div className="col s6">
        <h3 className="center">Visão Geral</h3>
        <Overview filterList={filterList} />
      </div>

      <Modal title="Inclusão de lançamento" onSave={handlePersistData} />
    </div>
  );
}

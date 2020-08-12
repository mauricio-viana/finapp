import React from 'react';
import Transaction from './components/Transaction';
import SearchDescription from './components/SearchDescription';
import './styles.css';

export default function TransactionList(props) {
  const {
    listFilter,
    filterText,
    onFilterText,
    onRemove,
    onNew,
    onEdit,
    isModalOpen,
  } = props;

  const handleChangeFilter = (newDescription) => {
    onFilterText(newDescription);
  };

  const handleRemoveData = (data) => {
    onRemove(data);
  };

  let dataCurrent = '';

  return (
    <div id="transaction-list" className="col s6">
      <h4 className="center">Lançamentos</h4>
      {!isModalOpen && (
        <div className="content-search">
          <a
            href="#!"
            className="btn-floating btn-medium waves-effect waves-light modal-trigger"
            data-target="modal1"
            onClick={() => onNew()}
          >
            <i className="material-icons">add</i>
          </a>
          <div className="input-field">
            <SearchDescription
              searchText={filterText}
              onChangeFilter={handleChangeFilter}
            />
          </div>
        </div>
      )}
      {listFilter.map((data, index) => {
        let isNewDay = false;
        const { yearMonthDay } = data;
        if (dataCurrent !== yearMonthDay) {
          dataCurrent = yearMonthDay;
          isNewDay = true;
        }
        return (
          <Transaction
            key={index}
            data={data}
            onRemoveData={handleRemoveData}
            onEditData={() => onEdit(data)}
            newDay={isNewDay}
          />
        );
      })}
    </div>
  );
}

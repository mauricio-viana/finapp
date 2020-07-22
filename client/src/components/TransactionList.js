import React, { useState } from 'react';
import Transaction from './Transaction';
import SearchDescription from './SearchDescription';
import M from 'materialize-css';
import Modal from './Modal';

export default function TransactionList(props) {
  const { listFilter, filterText, onFilterText, onPersist, onRemove } = props;
  const [dataSelected, setDataSelected] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  React.useEffect(() => {
    M.AutoInit();
  }, []);

  const handleChangeFilter = (newDescription) => {
    onFilterText(newDescription);
  };

  const handlePersistDataForm = async (formData, isEdit) => {
    onPersist(formData, isEdit);
  };

  const handleRemoveData = (data) => {
    onRemove(data);
  };

  const handleInputNewTransaction = () => {
    setDataSelected({});
    setIsEdit(false);
  };

  const handleEditData = (data) => {
    setDataSelected(data);
    setIsEdit(true);
  };

  return (
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
          onClick={handleInputNewTransaction}
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

      {listFilter.map((data, index) => {
        return (
          <Transaction
            key={index}
            data={data}
            onRemoveData={handleRemoveData}
            onEdit={handleEditData}
          />
        );
      })}

      <Modal
        title="Inclusão de lançamento"
        onSave={handlePersistDataForm}
        data={dataSelected}
        isEdit={isEdit}
      />
    </div>
  );
}

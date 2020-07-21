import React, { useState } from 'react';

export default function Modal({ title, onSave }) {
  const startDate = new Date();

  const [formData, setFormData] = useState({});
  const [date, setDate] = useState(
    `${startDate.getFullYear()}-${startDate
      .getMonth()
      .toString()
      .padStart(2, '0')}-${startDate.getDate()}`
  );

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target);
    if (name === 'date') setDate(value);
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  return (
    <div
      id="modal1"
      className="modal modal-fixed-footer"
      style={{ maxWidth: '500px', maxHeight: '550px' }}
    >
      <form onSubmit={handleFormSubmit}>
        <div className="modal-content">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h4 style={{ marginTop: '10px' }}>{title}</h4>
            <button className="waves-effect waves-light btn red darken-4 modal-close">
              X
            </button>
          </div>
          <div className="divider"></div>
          <div className="center">
            <div className="row" style={{ marginTop: '30px' }}>
              <div className="col s6">
                <label>
                  <input
                    name="type"
                    type="radio"
                    value="+"
                    onChange={handleInputChange}
                  />
                  <span>Despesa</span>
                </label>
              </div>
              <div className="col s6">
                <label>
                  <input
                    name="type"
                    type="radio"
                    value="-"
                    onChange={handleInputChange}
                  />
                  <span>Receita</span>
                </label>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '22px' }}>
            <label htmlFor="description">Descrição</label>
            <input
              id="description"
              name="description"
              type="text"
              className="validate"
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginTop: '22px' }}>
            <label htmlFor="category">Categoria</label>
            <input
              id="category"
              name="category"
              type="text"
              className="validate"
              onChange={handleInputChange}
            />
          </div>
          <div className="row" style={{ marginTop: '22px' }}>
            <div className="col s6" style={{ paddingLeft: '0px' }}>
              <label htmlFor="value" style={{ left: '0px' }}>
                Valor
              </label>
              <input
                id="value"
                name="value"
                type="number"
                min="0"
                step="0.01"
                className="validate"
                onChange={handleInputChange}
              />
            </div>
            <div className="col s6" style={{ paddingRight: '0px' }}>
              <label htmlFor="date">Data</label>
              <input
                id="date"
                name="date"
                type="date"
                className="validate"
                value={date}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className="waves-effect waves-light btn-small">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

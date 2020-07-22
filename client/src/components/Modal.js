import React, { useState } from 'react';

export default function Modal({ title, onSave, data, isEdit }) {
  const [formData, setFormData] = useState(data);
  const [yearMonthDay, setYearMonthDay] = useState(
    `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${new Date().getDate()}`
  );

  const [isValid, setIsValid] = useState(false);

  React.useEffect(() => {
    if (Object.entries(data).length > 0) {
      setFormData(data);
      return;
    }

    const newFormData = {
      value: 0,
      category: '',
      description: '',
      type: '-',
      yearMonthDay: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${new Date().getDate()}`,
    };

    setFormData(newFormData);
    console.log(formData);
  }, [data]);

  const validate = () => {
    const { description, category, value } = formData;
    const validated =
      description &&
      description !== '' &&
      category &&
      category !== '' &&
      value > 0;
    console.log(description);
    setIsValid(validated);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('passei no submit');
    if (!isValid) return;

    onSave(formData, isEdit);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'yearMonthDay') setYearMonthDay(value);
    setFormData({ ...formData, [name]: value });
    console.log('passei no change');
    validate();
  };

  return (
    <div
      id="modal1"
      className="modal modal-fixed-footer"
      style={{ maxWidth: '500px', maxHeight: '550px' }}
    >
      <form action="handleFormSubmit" onSubmit={handleFormSubmit}>
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
                    defaultChecked={formData && formData.type === '+'}
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
                    defaultChecked={formData && formData.type === '-'}
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
              required
              defaultValue={formData && formData.description}
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
              required
              defaultValue={formData && formData.category}
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
                required
                defaultValue={formData && formData.value}
                onChange={handleInputChange}
              />
            </div>
            <div className="col s6" style={{ paddingRight: '0px' }}>
              <label htmlFor="yearMonthDay">Data</label>
              <input
                id="yearMonthDay"
                name="yearMonthDay"
                type="date"
                className="validate"
                required
                defaultValue={formData && formData.yearMonthDay}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="submit"
            className="waves-effect waves-light btn-small"
            disabled={!isValid}
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

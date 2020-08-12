import React from 'react';
import { getPeriod } from '../../../../helpers/monthsYears';
import { useState } from 'react';
import './styles.css';

const PERIOD_MONTH_YEAR = getPeriod();

export default function SelectPeriod({ onChangeSelected, period }) {
  const [index, setIndex] = useState(0);

  const handleChange = (event) => {
    const newPeriod = event.target.value;
    onChangeSelected(newPeriod);
  };

  React.useEffect(() => {
    const indexSelected = PERIOD_MONTH_YEAR.findIndex(
      ({ monthYear }) => monthYear === period
    );
    setIndex(indexSelected);
  }, [period]);

  const handleClickButton = (operator) => {
    const nextPeriod = PERIOD_MONTH_YEAR[index + operator].monthYear;
    onChangeSelected(nextPeriod);
  };

  return (
    <div id="select-period" className="center">
      <button
        className={`waves-effect waves-light btn ${
          index === 0 ? 'disabled' : ''
        }`}
        onClick={() => handleClickButton(-1)}
      >
        &lt;
      </button>
      <select
        onChange={handleChange}
        value={period}
        className="browser-default font-medium"
      >
        {PERIOD_MONTH_YEAR.map(({ monthYear, descriptionMonthYear }) => (
          <option key={monthYear} value={monthYear}>
            {descriptionMonthYear}
          </option>
        ))}
      </select>
      <button
        className={`waves-effect waves-light btn ${
          index === PERIOD_MONTH_YEAR.length - 1 ? 'disabled' : ''
        }`}
        onClick={() => handleClickButton(1)}
      >
        &gt;
      </button>
    </div>
  );
}

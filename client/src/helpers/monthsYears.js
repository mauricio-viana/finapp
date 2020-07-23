const getPeriod = () => {
  const monthName = [
    '',
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  let month = 0;
  let year = 2019;

  const array = Array.from({ length: 36 }).map((_) => {
    if (month++ >= 12) {
      month = 1;
      year++;
    }

    const monthYear = `${year}-${month.toString().padStart(2, '0')}`;
    const descriptionMonthYear = `${monthName[month]} - ${year}`;

    return { monthYear, descriptionMonthYear };
  });

  return array;
};

export { getPeriod };

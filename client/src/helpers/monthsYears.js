const getPeriod = () => {
  const monthName = [
    '',
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  let month = 0;
  let year = 2019;

  const array = Array.from({ length: 36 }).map((_) => {
    if (month++ >= 12) {
      month = 1;
      year++;
    }

    const monthYear = `${year}-${month.toString().padStart(2, '0')}`;
    const descriptionMonthYear = `${monthName[month]}/${year}`;

    return { monthYear, descriptionMonthYear };
  });

  return array;
};

export { getPeriod };

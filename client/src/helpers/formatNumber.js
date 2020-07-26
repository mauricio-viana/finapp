const moneyFormatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function formatMoney(value) {
  return moneyFormatter.format(value);
}

export { formatMoney };

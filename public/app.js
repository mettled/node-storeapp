document.querySelectorAll('.price')
  .forEach(node => (
    node.textContent = new Intl.NumberFormat('ru-RU', {
      currency: 'rub',
      style: 'currency',
      currencyDisplay: "symbol"
    }).format(node.textContent)
  ));
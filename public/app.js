const toCurrency = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency',
    currencyDisplay: "symbol"
  }).format(price);
}
document.querySelectorAll('.price')
  .forEach(node => node.textContent = toCurrency(node.textContent));

const toDate = (date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(date));
}
document.querySelectorAll('.date')
  .forEach(node => node.textContent = toDate(node.textContent));


function updateCart({ target }) {
  if (target.classList.contains('js-remove')) {
    const { id } = target.dataset;
    const { csrf } = target.dataset;

    fetch(`/cart/delete/${id}`, {
      headers: {
        'CSRF-Token': csrf
      },
      method: 'delete'
    }).then((response) => response.json())
      .then(({ courses, price: totalPrice }) => {
        if (Object.keys(courses).length === 0) {
          return document.querySelector('.cart').innerHTML = `
          <h4>Cart</h4><p>Cart is empty</p>`; 
        }
        document.querySelector('tbody').innerHTML = 
          courses.map(({ count, courseID: { name, price, _id:idCourse }}) => `
          <tr>
            <td>${name}</td>
            <td>${count}</td>
            <td>${price}</td>
            <td>
              <button class="btn btn-primary js-remove" data-id=${idCourse} data-csrf=${csrf}>Delete</button>
            </td>
          </tr>
          `).join('');
          document.querySelector('.price').innerHTML = `${toCurrency(totalPrice)}`;
      }
    )
  }
}

const cart = document.querySelector('.cart');
if (cart) {
  cart.addEventListener('click', updateCart);
}

M.Tabs.init(document.querySelectorAll('.tabs'));

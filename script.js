const spinnerButtonMin = document.getElementsByClassName('spinner__button-min');
const spinnerButtonPlus = document.getElementsByClassName(
  'spinner__button-plus',
);
const shippingCost = parseInt(document.getElementById('shipping-cost') | 0);
const totalPriceElement = document.getElementById('total-price');
const formArticleInfo = document.getElementsByClassName('form__article-info');

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function updateTotalPrice() {
  let total = [...formArticleInfo]
    .map(
      (el) =>
        parseFloat(
          el
            .getElementsByClassName('form__price--special')[0]
            .textContent.trim()
            .replace('$', ''),
        ) *
        parseInt(el.getElementsByClassName('spinner__input')[0].value | 0, 10),
    )
    .reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      shippingCost,
    );

  totalPriceElement.innerText = USDollar.format(total);
}

[...spinnerButtonMin].forEach((el) =>
  el.addEventListener('click', (event) => {
    event.preventDefault();
    const element = event.target.nextElementSibling;
    const value = parseInt(element.value | 0, 10);
    if (value > 0) {
      element.value = value - 1;
      updateTotalPrice();
    }
  }),
);

[...spinnerButtonPlus].forEach((el) =>
  el.addEventListener('click', (event) => {
    event.preventDefault();
    const element = event.target.previousElementSibling;
    const value = parseInt(element.value | 0, 10);
    element.value = value + 1;
    updateTotalPrice();
  }),
);

const form = document.getElementById('form');
const submitBtn = document.getElementById('information__btn');
const message = document.getElementById('information__message');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  submitBtn.classList.toggle('information__btn--success');
  message.classList.toggle('information__message--hidden');
  var elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = true;
  }
});

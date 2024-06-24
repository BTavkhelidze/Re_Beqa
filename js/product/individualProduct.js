const urlParam = new URLSearchParams(window.location.search);

console.log(urlParam);

const productId = +urlParam.get('id') - 1;

const name = document.querySelector('.name');

console.log(productId);

fetch('./products.json')
  .then((response) => response.json())
  .then((data) => {
    const product = data[productId];
    console.log(product);
    name.textContent = product.name;
  });

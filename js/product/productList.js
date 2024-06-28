const sellingProductContent = document.querySelector(
  '.selling_product_content'
);

console.log('.lsad');

const prevButton = document.querySelector('.prev_Button');
const nextButton = document.querySelector('.next_Button');

let currentPage = 1;

const limit = 2;

let productsArray = [];

async function productsApi() {
  sellingProductContent.innerHTML = '';

  const products = await fetch('././././products.json');
  const product = await products.json();
  // console.log(product);

  productsArray = product;
  const start = (currentPage - 1) * limit;
  const end = start + limit;

  // console.log(productsArray);
  const productDisplay = productsArray.slice(start, end);
  console.log(productDisplay);

  productDisplay.forEach((product) => {
    const productWrapper = document.createElement('div');
    productWrapper.className = 'product_wrapper';

    //   create image

    const image = document.createElement('img');
    image.src = `./assets/webp/productHTML/${product.img}`;

    // create describtion content
    const describtionContent = document.createElement('div');
    describtionContent.className = 'describtion_content';

    // new paragrap
    const newProduct = document.createElement('p');
    newProduct.className = 'new_product';
    newProduct.textContent = 'NEW PRODUCT';

    // product Name
    const productName = document.createElement('h2');
    productName.className = 'product_name';
    productName.textContent = product.name;

    // product Type
    const productType = document.createElement('p');
    productType.className = 'product_type';
    productType.textContent = product.type;

    // product describtion
    const productDescribtion = document.createElement('p');
    productDescribtion.className = 'product_describtion';
    productDescribtion.textContent = product.description;

    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'btn_wrapper';

    const seeMoreBtn = document.createElement('button');
    seeMoreBtn.className = 'btn_see_product';
    seeMoreBtn.textContent = 'SEE PRODUCT';
    btnWrapper.appendChild(seeMoreBtn);

    describtionContent.appendChild(newProduct);
    describtionContent.appendChild(productName);
    describtionContent.appendChild(productType);
    describtionContent.appendChild(productDescribtion);
    describtionContent.appendChild(btnWrapper);

    if (+product.id % 2 === 0) {
      productWrapper.appendChild(describtionContent);
      productWrapper.appendChild(image);
    } else {
      productWrapper.appendChild(image);
      productWrapper.appendChild(describtionContent);
    }

    sellingProductContent.appendChild(productWrapper);

    seeMoreBtn.addEventListener('click', () => seeProduct(product.id));
  });
}

prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    productsApi();
  }
});

nextButton.addEventListener('click', () => {
  if (currentPage < Math.ceil(6 / limit)) {
    currentPage++;
    productsApi();
  }
});

function seeProduct(productId) {
  window.location.href = `individualProduct.html?id=${productId}`;
}

function calculateTotalPrice(cart) {
  const totalPrice = cart.reduce((acc, cur) => {
    return acc + parseInt(cur.price) * parseInt(cur.quantity);
  }, 0);
  return totalPrice;
}

function calculateProductQuantity(cart) {
  const totalQuantity = cart.reduce((acc, cur) => {
    return acc + parseInt(cur.quantity);
  });
  return totalQuantity;
}

function updatecart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const cartContainer = document.querySelector('.cart_products_container');

  const productQuantity = document.querySelector('.product_quantity');
  cartContainer.innerHTML = '';
  productQuantity.textContent = cart.length;

  const productsTotalPrice = document.querySelector('.products_total_price');
  productsTotalPrice.textContent = `$${calculateTotalPrice(cart)}`;

  const removeAll = document.querySelector('.remove_all');

  const checkout_product = document.querySelector('.checkout_product');
  cart.forEach((product, index) => {
    const htmlfile = `

    <div class="cart_products">
      <div class="cart_product_details">
        <img
          class="product_img"
          src="./assets/webp/productHTML/${product.img}"
          alt=""
          />
        <div class="product_name_wrapper">
        <h4 class="cart_product_name">${product.name}</h4>
        <p class="cart_product_price">$${product.price}</p>
        </div>
      </div>
     <div>
         <span class="cart_product_quantity">${product.quantity}</span>
         <button   class="remove_item_btn">REMOVE</button>
      </div>
     </div>
     `;
    cartContainer.insertAdjacentHTML('afterbegin', htmlfile);

    const button = document.querySelector('.remove_item_btn');

    button.addEventListener('click', () => {
      cart.splice(index, 1);

      localStorage.setItem('cart', JSON.stringify(cart));

      updatecart();
    });

    removeAll.addEventListener('click', () => {
      localStorage.removeItem('cart');
      updatecart();
    });
  });
}

const cartDiv = document.querySelector('.cart');
const overley = document.querySelector('.overlay');

function cartDecoration() {
  updatecart();

  document.querySelector('.cart_wrapper').classList.toggle('hidden');
  document.querySelector('.overlay').classList.toggle('hidden');
  document.body.classList.toggle('noScroll');
}

cartDiv.addEventListener('click', () => {
  cartDecoration();
});

overley.addEventListener('click', () => {
  cartDecoration();
});

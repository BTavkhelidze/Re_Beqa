const urlParam = new URLSearchParams(window.location.search);

const productId = +urlParam.get('id') - 1;

const name = document.querySelector('.name');

const cartDiv = document.querySelector('.cart');

fetch('./products.json')
  .then((response) => response.json())
  .then((data) => {
    const productWrapper = document.querySelector('.product_wrapper');
    const product = data[productId];

    productWrapper.innerHTML = '';

    const productImg = document.createElement('img');
    productImg.src = `./assets/webp/productHTML/${product.img}`;

    const describtionContent = document.createElement('div');
    describtionContent.className = 'describtion_content';

    // new product
    const newProduct = document.createElement('p');
    newProduct.className = 'new_product';
    newProduct.textContent = 'New Product';

    describtionContent.appendChild(newProduct);

    // product Name

    const productName = document.createElement('h2');
    productName.className = 'product_name';
    productName.textContent = product.name;

    describtionContent.appendChild(productName);

    // product type

    const productType = document.createElement('p');
    productType.className = 'product_type';
    productType.textContent = product.type;

    describtionContent.appendChild(productType);
    // product Describtion

    const productDescription = document.createElement('p');
    productDescription.className = 'product_describtion';
    productDescription.textContent = product.description;

    describtionContent.appendChild(productDescription);

    //price
    const productPrice = document.createElement('p');
    productPrice.className = 'price';
    productPrice.textContent = `$${product.price}`;

    describtionContent.appendChild(productPrice);
    // add to cart container

    const addToCartContainer = document.createElement('div');
    addToCartContainer.className = 'add_to_cart_container';

    describtionContent.appendChild(addToCartContainer);

    // decriment Increment
    const decrimentIncrementWrapper = document.createElement('div');
    decrimentIncrementWrapper.className = 'decriment_increment';

    addToCartContainer.appendChild(decrimentIncrementWrapper);

    const decrimentBtn = document.createElement('button');
    decrimentBtn.className = 'decriment';
    decrimentBtn.textContent = '-';

    decrimentIncrementWrapper.appendChild(decrimentBtn);

    const quantityInput = document.createElement('input');
    quantityInput.id = `quantity_${product.id}`;
    quantityInput.value = 1;
    quantityInput.min = '1';

    decrimentIncrementWrapper.appendChild(quantityInput);

    const incrimentBtn = document.createElement('button');
    incrimentBtn.className = 'increment';
    incrimentBtn.textContent = '+';

    decrimentIncrementWrapper.appendChild(incrimentBtn);

    const addToCartBtnWrapper = document.createElement('div');
    addToCartBtnWrapper.className = 'btn_wrapper';

    addToCartContainer.appendChild(addToCartBtnWrapper);

    const addToCart = document.createElement('button');
    addToCart.className = 'btn_add_to_cart';
    addToCart.textContent = 'ADD TO CART';

    addToCartBtnWrapper.appendChild(addToCart);

    productWrapper.appendChild(productImg);
    productWrapper.appendChild(describtionContent);

    const featureContent = document.querySelector('.feature_content');
    featureContent.innerHTML = '';

    const featureH = document.createElement('h3');
    featureH.className = 'feature_header';
    featureH.textContent = 'FEATURES';

    const featureDes = document.createElement('p');
    featureDes.className = 'product_feature_des';
    featureDes.textContent = product.features;

    featureContent.appendChild(featureH);
    featureContent.appendChild(featureDes);

    decrimentBtn.addEventListener('click', () => {
      decrimentQuantity(product.id);
    });
    incrimentBtn.addEventListener('click', () => {
      incrimentQuantity(product.id);
    });

    addToCart.addEventListener('click', () => {
      const quantity = +document.querySelector(`#quantity_${product.id}`).value;

      // cartIconShow();
      addProductToCart({ ...product, quantity });
    });
  });

function decrimentQuantity(productId) {
  const quantityInput = document.querySelector(`#quantity_${productId}`);
  if (quantityInput.value > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
}

function incrimentQuantity(productId) {
  const quantityInput = document.querySelector(`#quantity_${productId}`);
  quantityInput.value = parseInt(quantityInput.value) + 1;
}

function addProductToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  let existingIndex = cart.findIndex((p) => p.id === product.id);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += product.quantity;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  cartIconShow(cart);

  // console.log(cart.length);
  calculateProductQuantity(cart);
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

//! card decoration part
const cartIconRedDot = document.querySelector('.cartDecIcon');

function cartIconShow() {
  const cart = JSON.parse(localStorage.getItem('cart'));

  if (cart) {
    cartIconRedDot.classList.remove('hidden');
    cartIconRedDot.textContent = cart.length;
  } else {
    cartIconRedDot.classList.add('hidden');
  }
}
cartIconShow();

console.log(cartIconShow());
const overley = document.querySelector('.overlay');

function updatecart(cart) {
  let cartPro = JSON.parse(localStorage.getItem('cart')) || [];

  // if(cartPro !== []){}
  const cartContainer = document.querySelector('.cart_products');

  const productQuantity = document.querySelector('.product_quantity');
  cartContainer.innerHTML = '';
  productQuantity.textContent = `${cartPro.length > 0 ? cartPro.length : '0'}`;

  const productsTotalPrice = document.querySelector('.products_total_price');
  productsTotalPrice.textContent = `$${calculateTotalPrice(cartPro)}`;

  const removeAll = document.querySelector('.remove_all');

  const checkout_product = document.querySelector('.checkout_product');

  // checkout_product.addEventListener('click', () => {
  //   console.log('hello');
  // });

  // console.log(button);
  console.log(productId);
  cartPro.forEach((product, index) => {
    // console.log(product);
    // //   // cartProductsDiv.innerHTML = '';

    // const cartProductDetails = document.querySelector('div');
    // cartProductDetails.className = 'cart_product_details';

    // const productImg = document.createElement('img');
    // productImg.src = `./assets/webp/productHTML/${product.img}`;
    // productImg.className = console.log(product);

    // cartProductDetails.appendChild(productImg);

    // //product Name
    // const priceDiv = document.createElement('div');
    // priceDiv.className = 'product_name_wrapper';

    // const productName = document.createElement('h4');
    // productName.className = 'cart_product_name';
    // productName.textContent = product.name;

    // const productPrice = document.createElement('p');
    // productPrice.className = 'cart_product_price';
    // productPrice.textContent = product.price;

    // priceDiv.appendChild(productName);
    // priceDiv.appendChild(productPrice);

    // cartProductDetails.appendChild(priceDiv);
    // cartContainer.appendChild(cartProductDetails);
    //   // cartProductsDiv();
    //   // cartProductsDiv.insertAdjacentHTML('afterbegin', cartHTML);

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
    // // console.log(cart.length);
    const button = document.querySelector('.remove_item_btn');

    button.addEventListener('click', () => {
      cartPro.splice(index, 1);

      localStorage.setItem('cart', JSON.stringify(cartPro));

      updatecart();
      cartIconShow();
    });

    removeAll.addEventListener('click', () => {
      localStorage.removeItem('cart');
      updatecart();
      cartIconShow();
    });
    // console.log(button);
  });
  // console.log(cart);
}

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

//cart red dot icon

// const cartDecIcon = document.querySelector('.cartDecIcon');

// cartDecIcon.addEventListener('click', () => {})

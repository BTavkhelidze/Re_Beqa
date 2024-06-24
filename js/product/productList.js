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

  const products = await fetch('./products.json');
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

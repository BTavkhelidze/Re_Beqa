const day = document.querySelector('.day');
const hour = document.querySelector('.hours');
const minute = document.querySelector('.minuts');
const second = document.querySelector('.seconds');

const topSaleProductsDiv = document.querySelector('.top_sale_products');

const offerDay = new Date('25 jun, 2024 12:00:00');

const getSaleOfferTime = () => {
  const nowDate = new Date();
  const timeDiff = offerDay.getTime() - nowDate.getTime();

  if (timeDiff < 0) {
    clearInterval(refreshInterval);

    day.textContent = '0';
    hour.textContent = '0';
    minute.textContent = '0';
    second.textContent = '0';

    topSaleProductsDiv.style.display = 'block';
  } else {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    day.textContent = days;

    hour.textContent = hours;
    minute.textContent = minutes;
    second.textContent = seconds;
  }
};

let refreshInterval = setInterval(getSaleOfferTime, 1000);

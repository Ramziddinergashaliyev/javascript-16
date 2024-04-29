let API__URL = "https://66289a1f54afcabd073644cb.mockapi.io/shop";

async function apiData(url) {
  let pramp = new URLSearchParams(window.location.search);
  let id = pramp.get("id");

  let data = await fetch(`${url}/products/${id}`);
  data
    .json()
    .then((res) => mapData(res))
    .catch((err) => console.log(err));
}
apiData(API__URL);

const productsCards = document.querySelector(".products__cards");

function mapData(pro) {
  productsCards.innerHTML = `
          <div class="products__card">
            <div class="products__card__img">
              <img src="${pro.img}" alt="" />
            </div>
            <div class="products__card__info">
              <h1 class="products__card__info__title">name :${pro.name}</h1>
              <p class="products__card__info__desc">category: ${pro.category}</p>
              <p class="products__card__info__desc">size: ${pro.size}</p>
              <p class="products__card__info__desc">unit: ${pro.unit}</p>
              <button class="products__btn" data-id="${pro.id}">
                See more
              </button>
            </div>
          </div>
  `;
}

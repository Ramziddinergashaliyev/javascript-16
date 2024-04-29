let API__URL = "https://66289a1f54afcabd073644cb.mockapi.io/shop";
const productsCards = document.querySelector(".products__cards");
const productsBtn = document.querySelector(".products__btn");
const productsSearch = document.querySelector(".products__search input");
let limit = 4;

async function getData(URL, searchText = "", categoryText = "") {
  let data = await fetch(
    `${URL}/products?name=${searchText}&category=${categoryText}`,
    {
      method: "GET",
    }
  );
  data
    .json()
    .then((res) => mapData(res))
    .catch((err) => console.log(err));
}

async function apiData(url) {
  let data = await fetch(`${url}/products?limit= ${limit}`, {
    method: "GET",
  });
  data
    .json()
    .then((res) => mapData(res))
    .catch((err) => console.log(err));
}
apiData(API__URL);

function mapData(produc) {
  let productCard = "";
  produc.forEach((pro) => {
    productCard += `
          <div class="products__card">
            <div class="products__card__img">
              <img src=${pro.img} alt="">
            </div>
            <div class="products__card__info">
              <h1 class="products__card__info__title">name: ${pro.name}</h1>
              <p class="products__card__info__desc">category: ${pro.category}</p>
              <button class="products__btn" data-id=${pro.id}>See more</button>
            </div>
          </div> 
    `;
  });
  productsCards.innerHTML = productCard;
}

const products = document.querySelector(".products");

products.addEventListener("click", (e) => {
  if (e.target.className === "products__btn") {
    let id = e.target.dataset.id;
    window.open(`./pages/card.html?id=${id}`, "_self");
  }
});

productsSearch.addEventListener("input", (e) => {
  let search = e.target.value;

  getData(API__URL, search);
});

async function selecData(URL) {
  let data = await fetch(`${URL}/products`);
  let categors = [];
  data
    .json()
    .then((res) => {
      res.forEach((product) => {
        !categors.includes(product.category)
          ? categors.push(product.category)
          : "";
      });
      categoryMap(categors);
    })
    .catch((err) => console.log(err));
}
selecData(API__URL);

const productsCategory = document.querySelector("#products__category");

function categoryMap(category) {
  let optionsSelect = "<option value=''>all</option>";
  category.forEach((data) => {
    optionsSelect += `
     <option value="${data.toLowerCase()}">${
      data.slice(0, 1).toUpperCase() + data.slice(1).toLowerCase()
    }</option>
    `;
  });
  productsCategory.innerHTML = optionsSelect;
}

productsCategory.addEventListener("change", (e) => {
  let value = e.target.value;
  getData(API__URL, "", value);
});

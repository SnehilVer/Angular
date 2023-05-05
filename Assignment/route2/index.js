// const data = [
//   { title: "Card 1", price: 50 },
//   { title: "Card 1", price: 60 },
//   { title: "Card 1", price: 170 },
//   { title: "Card 1", price: 90 },
//   { title: "Card 1", price: 10 },
//   { title: "Card 1", price: 190 },
// ];

// Function for populating on initial load
$(async function () {
  let data = await fetch("./data.json").then((response) => response.json());
  console.log(data);
  let count = data.length;
  let cards = ``;

  for (let i = 0; i < count; i++) {
    cards += `<div class="col-3 mb-4 card-item">
    <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${data[i].title}</h5>
          <h6 class="card-title">Price: ${data[i].price}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Click Me</a>
        </div>
      </div>
</div>`;
  }
  $("#card-content-row").html(cards);
});

function toggleView(view) {
  if (view === 'list') {
    var elements = document.querySelectorAll('.card-item');
    for (var i = 0; i < elements.length; i++) {
      console.log(elements[i]);
      elements[i].classList.remove("col-3");
      elements[i].classList.add("col-6");
      if (i % 2 == 0) {
        elements[i].classList.add("d-flex");
        elements[i].classList.add("justify-content-end");
      } else {
        elements[i].classList.add("d-flex");
        elements[i].classList.add("justify-content-start");
      }
    }
  }
  else {
    var elements = document.querySelectorAll('.card-item');
    for (var i = 0; i < elements.length; i++) {
      console.log(elements[i]);
      elements[i].classList.remove("col-6");
      elements[i].classList.add("col-3");
    }
  }
}

// add listener on filter
const priceFilter = document.getElementById('price-filter');
priceFilter.addEventListener('change', () => {
  const priceRange = priceFilter.value.split('-').map(Number);
  filterProducts(priceRange);
});

function filterProducts(priceRange) {
  let data = fetch("./data.json", { mode: 'no-cors' }).then((response) => response.json());
  const result = data.filter((card) => card.price >= priceRange[0] && card.price < priceRange[1]);
  let count = result.length;
  let cards = ``;

  updateCardsBody(count, cards, result);
}

//Common function for populating filtered cards
function updateCardsBody(count, cards, result) {
  for (let i = 0; i < count; i++) {
    cards += `<div class="col-3 mb-4 card-item">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${result[i].title}</h5>
              <h6 class="card-title">Price: ${result[i].price}</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary">Click Me</a>
            </div>
          </div>
    </div>`;
  }

  $("#card-content-row").html(cards);
}

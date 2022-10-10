const discounts = {
  estudiante: 0.8,
  trainee: 0.5,
  junior: 0.15,
};

const TICKET_PRICE = 200;

const ticketForm = document.querySelector("#ticket-form");
const inputQuantity = ticketForm.querySelector("#quantity");
const selectCategory = ticketForm.querySelector("#category");
const priceSpan = ticketForm.querySelector("#price");

const discountPriceCards = document.querySelectorAll(".card.card-group__card");

function updatePriceSpan() {
  const currentQuantity = inputQuantity.value;

  if (currentQuantity <= 0) {
    priceSpan.innerHTML = "";
    return;
  }

  const currentCategory = selectCategory.value;
  const flatPrice = TICKET_PRICE * currentQuantity;
  let roundedPrice = Math.ceil(flatPrice * (1 - discounts[currentCategory]));
  let roundedPriceArray = String(roundedPrice).split("");
  let price = [];
  for (let i = 0; i < roundedPriceArray.length; i++) {
    price.push(roundedPriceArray[i]);
    if (
      i + 1 != roundedPriceArray.length &&
      (roundedPriceArray.length - i - 1) % 3 == 0
    ) {
      price.push(".");
    }
  }
  priceSpan.innerHTML = price.join("");
}

inputQuantity.addEventListener("input", updatePriceSpan);
selectCategory.addEventListener("input", updatePriceSpan);
ticketForm.addEventListener("reset", () => (priceSpan.innerHTML = ""));

discountPriceCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    selectCategory.value = card.dataset.discount;
    updatePriceSpan();
  });
});

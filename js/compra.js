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

function updatePriceSpan() {
  const currentQuantity = inputQuantity.value;

  if (currentQuantity <= 0) {
    priceSpan.innerHTML = "";
    return;
  }

  const currentCategory = selectCategory.value;
  const flatPrice = TICKET_PRICE * currentQuantity;
  priceSpan.innerHTML = Math.ceil(flatPrice * (1 - discounts[currentCategory]));
}

inputQuantity.addEventListener("input", updatePriceSpan);
selectCategory.addEventListener("input", updatePriceSpan);
ticketForm.addEventListener('reset', () => priceSpan.innerHTML = "");
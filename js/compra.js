/***************************************
 * CREACIÓN DE CONSTANTES DEL PROGRAMA *
 ***************************************/

// Creación de objeto con llave -> tipo de descuento, y valor -> descuento
// Las llaves coinciden justamente con el valor de los options del select
// (más abajo se explica nuevamente)
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


/**************************************
 * CREACION DE FUNCIONES DEL PROGRAMA *
 **************************************/

/**  Función que calcula el precio total de los tickets 
 *   y actualiza el span con el precio total
 */
function updatePriceSpan() {

  const currentQuantity = inputQuantity.value;  // Se busca la cantidad de tickets en el input de números

  // En caso de set negativo, no se muestra nada en el span, y se termina la función
  if (currentQuantity < 0) {
    priceSpan.innerHTML = "";
    return;
  }

  const currentCategory = selectCategory.value; // Se busca el tipo de descuento, que se encuentra en el value del select
  const flatPrice = TICKET_PRICE * currentQuantity;

  // discounts va a tener de llave cada tipo de descuento, en el caso de ser estudiante, trainee o junior
  // se va a buscar discounts["estudiante"], por ejemplo, que en ese caso va a ser 0.8, por lo que el precio real
  // que se va a pagar va a ser 1 - 0.8 = 0.2, multiplicado por el precio base
  const priceWithDiscount = flatPrice * (1 - discounts[currentCategory])

  let roundedPrice = Math.ceil(priceWithDiscount); // Redondea el precio al entero superior
  let finalPrice = addDotToPrice(roundedPrice);

  priceSpan.innerHTML = finalPrice;          // Finalmente se actualiza el span con el precio final
}

/** Función que agrega un punto a los miles del precio
 * 
 * @param {string} price 
 * @returns {string} price actualizado con punto para separar miles 
 */
function addDotToPrice(price) {
  let priceArray = String(price).split("");     // Convierte el número en un array de strings

  // Array donde se guardará el precio final. Se trabaja con un array porque es más facil insertar el punto que con un string
  let finalPrice = [];                          

  for (let i = 0; i < priceArray.length; i++) {
    finalPrice.push(priceArray[i]);             // Agrega el dígito al array final
    if (
      i + 1 != priceArray.length &&             // Si no nos encontramos al final del string
      (priceArray.length - i - 1) % 3 == 0      // Y si estamos en una posicion que es multiplo de 3
    ) {
      finalPrice.push(".");                     // Agregamos un punto
    }
  }
  return finalPrice.join("");                   // Convertimos el array de precio en un string de precio y se retorna
}


/*****************************
 * ADICIÓN DE EVENTOS AL DOM *
 *****************************/

// El span se debe actualizar tanto si se escribe algún numero en el input como si se selecciona algo en el select
inputQuantity.addEventListener("input", updatePriceSpan);
selectCategory.addEventListener("input", updatePriceSpan);

ticketForm.addEventListener("reset", () => (priceSpan.innerHTML = "")); // Cuando se resetea el formulario, se borra el precio

// Actualiza el precio al presionar las cards de descuento (esto posible ya que se le agrega un evento a cada card)
// y actualiza el select de categoría en cuestión
// tomando el dato a partir del dataset del elemento
discountPriceCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    selectCategory.value = card.dataset.discount;     // Actualiza el select de categoría según el dataSet de la card seleccionada
    updatePriceSpan();
  });
});

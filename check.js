const taxRate = 0.18;  
const shippingPrice = 15.0;
window.onload = () => {
  window.localStorage.setItem("taxRate", taxRate);
  localStorage.setItem("shippingPrice", shippingPrice);
  window.sessionStorage.setItem("taxRate", taxRate);
  sessionStorage.setItem("shippingPrice", shippingPrice);
  caclculateCartTotal(); 
};
let quantityDivs = document.getElementsByClassName("quantity-controller");
console.log(quantityDivs);
[...quantityDivs].forEach((quantityDiv) => {
  let quantitiyP = quantityDiv.querySelector("#product-quantity");
  //minus button
  quantityDiv.firstElementChild.addEventListener("click", () => {
    // if (quantitiyP.innerText != "1") {
    //   quantitiyP.innerText = parseInt(quantitiyP.innerText) - 1;
    // }
    quantitiyP.innerText = parseInt(quantitiyP.innerText) - 1;
    if (quantitiyP.innerText == "0") {
      alert("product will be removed");
      quantityDiv.parentElement.parentElement.remove();
    }
    calculateProductTotal(quantitiyP);
  });
  //plus button
  quantityDiv.lastElementChild.addEventListener("click", () => {
    quantitiyP.innerText = parseInt(quantitiyP.innerText) + 1;
    calculateProductTotal(quantitiyP);
  });
});
const calculateProductTotal = (quantitiyP) => {
  let productInfoDiv = quantitiyP.parentElement.parentElement;
  const productPrice = productInfoDiv.querySelector("strong").innerText;
  let productTotalPrice = productPrice * parseInt(quantitiyP.innerText);
  let productTotalDiv = productInfoDiv.querySelector(".product-line-price");
  productTotalDiv.innerText = productTotalPrice.toFixed(2);
  caclculateCartTotal();
};
const caclculateCartTotal = () => {
  //Node List.forech or array.forEach
  let productTotalPrices = document.querySelectorAll(".product-line-price");
  // HTML collection[...].forech
  //   let productTotalPrices =
  //     document.getElementsByClassName("product-line-price");
  let subtotal = 0;
  productTotalPrices.forEach((productPrice) => {
    subtotal += parseFloat(productPrice.innerText);
  });
  let taxPrice = subtotal * taxRate;
  //   let taxPrice = subtotal * parseFloat(localStorage.getItem("taxrate"));   local storage dan çektim
  let shipping = subtotal > 0 ? shippingPrice : 0;
  let cartTotal = subtotal + taxPrice + shipping;
  document.querySelector("#cart-subtotal p:nth-child(2)").innerText =
    subtotal.toFixed(2);
  document.querySelector("#cart-tax p:nth-child(2)").innerText =
    taxPrice.toFixed(2);
  document.querySelector("#cart-shipping p:nth-child(2)").innerText =
    shipping.toFixed(2);
  document.querySelector("#cart-total p:nth-child(2)").innerText =
    cartTotal.toFixed(2); // or .lastElementChild
};

document.querySelectorAll(".remove-product").forEach((removeButton) => {
  removeButton.addEventListener("click", () => {
    removeProduct(removeButton);
  });
});
const removeProduct = (removeButton) => {
  let productDiv = removeButton.parentElement.parentElement.parentElement;
  productDiv.remove();
};

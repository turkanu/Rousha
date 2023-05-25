const burger = document.querySelector('.burger');
const logo = document.querySelector(".destlogo");
const secondMenu = document.querySelector(".secondMenu");
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  logo.classList.toggle('destroy');
  secondMenu.classList.toggle('activeSecondMenu');
});

 const pantaloniCheckbox = document.getElementById("pantaloni");
 const jacheteCheckbox = document.getElementById("jachete");

 const haine = [
   {
     "categoria":"jacketa",
     "cart":"../catalog/cart.webp",
     "name":"Jaketa la 1 Rând",
     "color":"Negru",
     "img":"../catalog/JaketaNeagra.webp",
     "price": "49"
   },
   {
     "categoria":"jacketa",
     "cart":"../catalog/cart.webp",
     "name":"Jachetă Short Denim",
     "color":"Albastru deschis",
     "img":"../catalog/jacketaAlbastra.webp",
     "price":"39"
   },
   {
     "categoria":"jacketa",
     "cart":"../catalog/cart.webp",
     "name":"Jachetă la 2 Rânduri",
     "color":"Bej",
     "img":"../catalog/jacketaBej.webp",
     "price":"44"
   },
   {
     "categoria":"jacketa",
     "cart":"../catalog/cart.webp",
     "name":"Bluză la 1 Rând",
     "color":"Roz",
     "img":"../catalog/jacketaRoz.webp",
     "price":"34"
   },
   {
     "categoria":"pantaloni",
     "cart":"../catalog/cart.webp",
     "name":"Blugi drepți",
     "color":"albaștri",
     "img":"../catalog/blugiDrepti.webp",
     "price":"29"
   },
   {
     "categoria":"pantaloni",
     "cart":"../catalog/cart.webp",
     "name":"Pantaloni Largi",
     "color":"verzi",
     "img":"../catalog/pantaloniVerzi.webp",
     "price":"24"
   },
   {
     "categoria":"pantaloni",
     "cart":"../catalog/cart.webp",
     "name":"Pantaloni de mamă",
     "color":"albaștri",
     "img":"../catalog/pantaloniMama.webp",
     "price":"40"
   },
   {
     "categoria":"pantaloni",
     "cart":"../catalog/cart.webp",
     "name":"Pantaloni Parașută",
     "color":"verzi",
     "img":"../catalog/pantaloni(1).webp",
     "price":"35"
   }
 ]

 function test(){
  handleCheckboxChange();
  displayProducts();
 }


 let peEcran = []
 pantaloniCheckbox.addEventListener("change", test);
 jacheteCheckbox.addEventListener("change", test);
 function handleCheckboxChange() {
   peEcran = []
   if (pantaloniCheckbox.checked) {
     const pantaloniItems = haine.filter(item => item.categoria === "pantaloni");
     peEcran = peEcran.concat(pantaloniItems);
   }
   if (jacheteCheckbox.checked) {
     const jacheteItems = haine.filter(item => item.categoria === "jacketa");
     peEcran = peEcran.concat(jacheteItems);
   }
   console.log(peEcran); 
  }

handleCheckboxChange();

const productsDiv = document.querySelector(".products");

function displayProducts() {
  productsDiv.innerHTML = ""; // Clear previous contents

  peEcran.forEach(item => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    const image = document.createElement("img");
    image.src = item.img;
    image.alt = item.name;
    image.classList.add("pentruRef");
    productItem.appendChild(image);

    const cart = document.createElement("img");
    cart.src = item.cart;
    cart.alt = item.name;
    cart.setAttribute("id", "cart-icon");
    productItem.appendChild(cart);

    const name = document.createElement("h3");
    name.textContent = item.name;
    productItem.appendChild(name);

    const color = document.createElement("p");
    color.textContent = item.color;
    productItem.appendChild(color);

    const price = document.createElement("span");
    price.textContent = "$" + item.price;
    productItem.appendChild(price);
    productsDiv.appendChild(productItem);
  });
}

displayProducts();

// Ceea ce tine de coș e mai jos

const cartIcons = document.querySelectorAll("#cart-icon");
let clickedProducts = [];

// Retrieve clickedProducts array from local storage, if available
const storedProducts = localStorage.getItem("clickedProducts");
if (storedProducts) {
  clickedProducts = JSON.parse(storedProducts);
}

cartIcons.forEach(cartIcon => {
  cartIcon.addEventListener("click", handleCartIconClick);
});

function handleCartIconClick(event) {
  const productItem = event.target.closest(".product-item");
  if (productItem) {
    const productInfo = {
      img: productItem.querySelector("img").src,
      name: productItem.querySelector("h3").textContent,
      color: productItem.querySelector("p").textContent,
      price: productItem.querySelector("span").textContent,
    };

    const isProductExist = clickedProducts.some(item => isEqual(item, productInfo));

    if (!isProductExist) {
      clickedProducts.push(productInfo);
      console.log(clickedProducts);

      // Store clickedProducts array in local storage
      localStorage.setItem("clickedProducts", JSON.stringify(clickedProducts));
    }
    location.reload();
  }
}

// Helper function to check if two objects are equal
function isEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const buysDiv = document.querySelector(".buys");
 const storedClickedProducts = localStorage.getItem("clickedProducts");
 const clickedProductsArray = storedClickedProducts ? JSON.parse(storedClickedProducts) : [];

 let totalPrice = 0;
 clickedProductsArray.forEach(product => {
  const priceValue = parseFloat(product.price.replace('$', ''));
  totalPrice += priceValue;
  const div = document.createElement("div");
  div.classList.add("buy-item");

  const img = document.createElement("img");
  img.src = product.img;
  img.alt = product.name;
  div.appendChild(img);

  const deleteBtn = document.createElement("img");
  deleteBtn.src = "../catalog/delete.webp";
  deleteBtn.alt = "X";
  deleteBtn.setAttribute("id", "deleteX");
  deleteBtn.addEventListener("click", function() {
    // Retrieve the clicked product's index
    const index = clickedProductsArray.indexOf(product);

    if (index !== -1) {
      // Get the price value of the deleted item
      const deletedItemPrice = parseFloat(clickedProductsArray[index].price.replace('$', ''));
      
      // Subtract the price of the deleted item from the total price
      totalPrice -= deletedItemPrice;

      // Remove the product from the array
      clickedProductsArray.splice(index, 1);

      // Update the local storage
      localStorage.setItem('clickedProducts', JSON.stringify(clickedProductsArray));

      // Remove the corresponding div from the DOM
      div.remove();

      // Update the total paragraph with the updated total price
      totalParagraph.textContent = `Total: ${totalPrice}$`;
    }
  });
  div.appendChild(deleteBtn);

  const h3 = document.createElement("h3");
  h3.textContent = product.name;
  div.appendChild(h3);

  const p = document.createElement("p");
  p.textContent = `culoare: ${product.color}`;
  div.appendChild(p);

  const span = document.createElement("span");
  span.textContent = product.price;
  div.appendChild(span);

  buysDiv.appendChild(div);
});

 const totalParagraph = document.querySelector('.Total');

// Set the text content of the total paragraph to display the total price
totalParagraph.textContent = `${totalPrice}$`;
const tripleG = document.querySelector("#tripleG");
const jojo = document.querySelector("#image");
const ceeaCeApare = document.querySelector(".cart");
const close = document.querySelector(".close");
const header = document.querySelector("header");
const scroll = document.querySelector("main");

jojo.addEventListener("click", () => {
  ceeaCeApare.style.display = "grid";
  header.style.display = "none";
  const inaltimea = ceeaCeApare.offsetHeight + "px";
  scroll.style.height = inaltimea;
  scroll.style.marginTop = "0";
});

tripleG.addEventListener("click", () => {
  ceeaCeApare.style.display = "grid";
  header.style.display = "none";
  const inaltimea = ceeaCeApare.offsetHeight + "px";
  scroll.style.height = inaltimea;
  scroll.style.marginTop = "0";
  burger.classList.toggle('active');
  logo.classList.toggle('destroy');
  secondMenu.classList.toggle('activeSecondMenu');
});

close.addEventListener("click", () => {
  ceeaCeApare.style.display = "none";
  header.style.display = "block";
  scroll.style.height = "auto";
  scroll.style.marginTop = "25vh";
  location.reload();
});


const firstImage = document.querySelector('.pentruRef');

firstImage.addEventListener('click', () => {
  // Redirect to individual.html
  window.location.href = '../pages/individual.html';
});
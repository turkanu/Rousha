const burger = document.querySelector('.burger');
const logo = document.querySelector(".destlogo");
const secondMenu = document.querySelector(".secondMenu");

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  logo.classList.toggle('destroy');
  secondMenu.classList.toggle('activeSecondMenu');
})



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


// pentru ca imaginile sa se schimbe


const imageDivs = document.querySelectorAll('.img1, .img2, .img3');

const fullSizeDiv = document.querySelector('.full-size');


imageDivs.forEach((div) => {
  div.addEventListener('click', () => {
    const stylesP = window.getComputedStyle(fullSizeDiv);
    const backgroundImageP = stylesP.getPropertyValue("background-image");
    const imageUrlP = backgroundImageP.slice(4, -1).replace(/['"]/g, "");
    
    const styles = window.getComputedStyle(div);
    const backgroundImage = styles.getPropertyValue("background-image");
    const imageUrl = backgroundImage.slice(4, -1).replace(/['"]/g, ""); 
    fullSizeDiv.style.backgroundImage = `url(${imageUrl})`;
    div.style.backgroundImage = `url(${imageUrlP})`;
  });
});

// // Get the first image inside the product-item div
// const firstImage = document.querySelector('.product-item img:first-child');

// // Add click event listener to the first image
// firstImage.addEventListener('click', () => {
//   // Redirect to individual.html
//   window.location.href = 'individual.html';
// });




// Ceea ce tine de coș e mai jos

const cartIcons = document.querySelectorAll(".caracteristici button");
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
  const productItem = event.target.closest(".caracteristici");
  if (productItem) {
    const productInfo = {
      img: "../source/ind1.webp",
      name: productItem.querySelector("h2").textContent,
      color: productItem.querySelector("strong").textContent,
      price: productItem.querySelector("h1").textContent,
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
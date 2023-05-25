const deceText = document.querySelectorAll(".dece-text");
const titlurile = document.querySelectorAll(".titlurile");
const arrows = document.querySelectorAll(".titlurile img");

let activeIndex = 0;


deceText[activeIndex].style.display = "block";
arrows[activeIndex].style.transform = "rotate(0deg)";

titlurile.forEach((titl, index) => {
  titl.addEventListener("click", () => {
    if (activeIndex === index) {
      deceText[index].style.display = "";
      arrows[index].style.transform = "";
      activeIndex = -1;
    } else {
      if (activeIndex !== -1) {
        deceText[activeIndex].style.display = "";
        arrows[activeIndex].style.transform = "";
      }
      deceText[index].style.display = "block";
      arrows[index].style.transform = "rotate(0deg)";
      activeIndex = index;
    }
  });
});


const burger = document.querySelector('.burger');
const logo = document.querySelector(".destlogo");
const secondMenu = document.querySelector(".secondMenu");

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  logo.classList.toggle('destroy');
  secondMenu.classList.toggle('activeSecondMenu');
});


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
  deleteBtn.src = "catalog/delete.webp";
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

const btns = document.querySelectorAll("button");

// Add click event listener to each button
btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Redirect to catalog.html
    window.location.href = 'catalog.html';
  });
});
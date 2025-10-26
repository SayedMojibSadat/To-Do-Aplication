let inputCartName = document.querySelector("#nameInput");
let inputCartLevel = document.querySelector("#levelSelect");
let inputCartDate = document.querySelector("#setDate");
let inputCartTime = document.querySelector("#setTime");
let inputCartDiscribtion = document.querySelector("#inputDiscribtion");
let addCartButton = document.querySelector("#addButton");
let deleteAllCartButton = document.querySelector("#deleteButton");
let outputCartsPossition = document.querySelector("#mainList");

let outputCarts = [];
let editIndex = null;

const addToArray = () => {
  let newAray = {
    name: inputCartName.value,
    level: inputCartLevel.value,
    date: inputCartDate.value,
    time: inputCartTime.value,
    discribtion: inputCartDiscribtion.value,
  };
  if (
    inputCartName.value != "" &&
    inputCartLevel.value != "" &&
    inputCartDate.value != "" &&
    inputCartTime.value != ""
  ) {
    if (editIndex === null) {
      outputCarts.push(newAray);
    } else {
      outputCarts[editIndex] = newAray;
      editIndex = null;
    }
  }
  cartRenderer(outputCarts);
  resetInputs();
};

const resetInputs = () => {
  inputCartName.value = "";
  inputCartLevel.value = "";
  inputCartDate.value = "";
  inputCartTime.value = "";
  inputCartDiscribtion.value = "";
};

const cartRenderer = (task) => {
  let cartLC;
  let rows = task
    .map((element, index) => {
      element.level == 1
        ? (cartLC = "l1Color")
        : element.level == 2
        ? (cartLC = "l2Color")
        : element.level == 3
        ? (cartLC = "l3Color")
        : (cartLC = "l0Color");
      return `
      <div class="cards">
      <div class="cartDetails">

        <div id="colorContainer">
          <div id="${cartLC}" class="colors ${cartLC}">${element.level}</div>
        </div>

      <div id="cartsName" class="nameDateTime">
        ${element.name}
      </div>

      <div id="cartsDate" class="nameDateTime">
        ${element.date}
      </div>

      <div id="cartsTime" class="nameDateTime">
        ${element.time}
      </div>

      <div class="cartsButton">
        <button id="editCart" class="editDeleteCarts editCart" data-index="${index}">ادیت</button>
        <button id="deleteCart" class="editDeleteCarts deleteCart" data-index="${index}">حذف</button>
      </div>

      <div class="showDiscribtionContainer">
        <button class="showDiscribtionButton">▾</button>
      </div>

        </div>
        
      <div class="outputDiscribtion">
      ${inputCartDiscribtion.value}
      </div>
      
      </div>
      `;
    })
    .join("");

  outputCartsPossition.innerHTML = rows;
  addDeleteCartButton();
  addEditCartButton();
  addShowDiscribtionButton();
};


addCartButton.addEventListener("click", () => {
  addCartButton.innerHTML = "اضافه کردن";
  addToArray();
});

deleteAllCartButton.addEventListener("click", () => {
  outputCarts = [];
  cartRenderer(outputCarts);
});

const deleteCart = (index) => {
  outputCarts.splice(index, 1);
  cartRenderer(outputCarts);
};

const addDeleteCartButton = () => {
  let deleteCartButton = document.querySelectorAll(".deleteCart");
  deleteCartButton.forEach((element) => {
    element.addEventListener("click", () => {
      let index = element.getAttribute("data-index");
      deleteCart(index);
    });
  });
};

const addEditCartButton = () => {
  let editCartButton = document.querySelectorAll(".editCart");
  editCartButton.forEach((element) => {
    element.addEventListener("click", () => {
      let index = element.getAttribute("data-index");
      let cart = outputCarts[index];
      inputCartName.value = cart.name;
      inputCartLevel.value = cart.level;
      inputCartDate.value = cart.date;
      inputCartTime.value = cart.time;
      inputCartDiscribtion.value = cart.discribtion;
      editIndex = index;
      addCartButton.innerHTML = "انجام شد";
    });
  });
};

const addShowDiscribtionButton = () => {
  let showButtons = document.querySelectorAll(".showDiscribtionButton");

  showButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let card = button.closest(".cards");
      let discribtion = card.querySelector(".outputDiscribtion");

      if (discribtion.style.display === "block") {
        discribtion.style.display = "none";
        document.querySelector(".showDiscribtionButton").innerHTML = "▾";
      } else {
        discribtion.style.display = "block";
        document.querySelector(".showDiscribtionButton").innerHTML = "▴";
      }
    });
  });
};



const filterByLevel = (level) => {
  if (level === "A") {
    cartRenderer(outputCarts);
  } else {
    let filtered = outputCarts.filter((cart) => cart.level == level);
    cartRenderer(filtered);
  }
};



document.querySelectorAll(".priorityLevel").forEach((item) => {
  item.addEventListener("click", () => {
    let text = item.querySelector(".texts").innerText;

    if (text === "همه") filterByLevel("A");
    else if (text === "درجه اول") filterByLevel(1);
    else if (text === "درجه دوم") filterByLevel(2);
    else if (text === "درجه سوم") filterByLevel(3);
  });
});


let settingButton = document.querySelector('#setting')
let settingSection = document.querySelector('.settingSection')

settingButton .addEventListener('click', () => {
  settingSection.style.display = 'inline'
})

let closeSettingButton = document.querySelector('#closeSettingButton')

closeSettingButton.addEventListener('click', () => {
  settingSection.style.display = 'none'
})
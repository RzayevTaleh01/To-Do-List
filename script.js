const form = document.querySelector("form");
const input = document.querySelector(".addToTask");
const btnDeleteAll = document.querySelector("#deleteAll");
const taskList = document.querySelector(".taskList");
const sort = document.querySelector(".sort");
let items;
let icon = true;

checkList();
loadItems();
eventListeners();

function checkList() {
  if (taskList.children.length == 0) {
    taskList.style.display = 'none';
  }
}

function loadItems() {
  items = getItemsFromLS();
  items.forEach(function (item) {
    createItem(item);
  });
}

function eventListeners() {
  form.addEventListener("submit", addNewItem);
  taskList.addEventListener("click", deleteItem);
  btnDeleteAll.addEventListener("click", deleteAllItems);
  sort.addEventListener("click", sortList);

}

function createItem(text) {
  taskList.style.display = "block";
  const li = document.createElement("li");
  li.classList = "todo-item";
  li.appendChild(document.createTextNode(text));
  const a = document.createElement("a");
  a.classList = "delete-item";
  a.setAttribute("href", "#");
  a.innerHTML = '<img src="./img/x-btn.svg"/ class="x-btn">';
  li.appendChild(a);
  taskList.appendChild(li);
}

function addNewItem(e) {
  if (input.value !== "" && input.value !== " ") {
    createItem(input.value);
    setItemToLS(input.value);
    input.value = "";
    e.preventDefault();
  } else {
    alert("Xananı doldurun!");
  }
}
function deleteItem(e) {
  console.log(e.target.className);
  if (e.target.className === "x-btn") {
    e.target.parentElement.parentElement.remove();
    deleteItemFromLS(e.target.parentElement.parentElement.textContent);
  }
  checkList();
  e.preventDefault();
}

function deleteAllItems(e) {
  e.preventDefault();
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  checkList();
  localStorage.clear();
}

function getItemsFromLS() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

function setItemToLS(text) {
  items = getItemsFromLS();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}

function deleteItemFromLS(text) {
  items = getItemsFromLS();
  items.forEach(function (item, index) {
    if (item === text) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}
function sortList() {
  if (icon == false) {
    icon = true;
    document.querySelector(".sort").innerHTML ='<img src="./img/sort-icon-2.svg"/ class="sort-icon">';
  }
  else{
    icon = false;
    document.querySelector(".sort").innerHTML ='<img src="./img/sort-icon-1.svg"/ class="sort-icon">';
  }
  sortArr = taskList.querySelectorAll("li");
  console.log(sortArr);

  for (let i = sortArr.length - 1; i >= 0; i--) {
    taskList.append(sortArr[i]);
  }

}
const itemList = document.getElementById("item-list");
const itemInput = document.getElementById("item-input");
const form = document.getElementById("item-form");
const clearBtn = document.getElementById("clear");
const filter = document.getElementById("filter");
const formBtn = form.querySelector("button");
let isSetItem = false;

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.forEach(item => addItemToDOM(item));
    resetUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    if(newItem === ""){
        alert("Please enter an item");
        return;
    }

    if(isSetItem){
        const itemToEdit = itemList.querySelector(".edit-mode");
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.remove();

        isSetItem = false;
    } else {
        if(checkIfItemExists(newItem)) {
            alert("That item does exist.");
            itemInput.value = "";
            return;
        }
    }

    addItemToDOM(newItem);
    addItemToLocalStorage(newItem);

    resetUI();
    itemInput.value = "";

}

function addItemToDOM(item) {

    const li = document.createElement("li");
    li.appendChild(document.createTextNode(item));
    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);

    itemList.appendChild(li);
}

function createButton(classes) {

    const button = document.createElement("button");
    button.classList = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;

}

function createIcon(classes) {

    const icon = document.createElement("i");
    icon.classList = classes;
    return icon;
}

function addItemToLocalStorage(item){
    let itemsInLocalStorage = getItemsFromStorage();

    itemsInLocalStorage.push(item);

    localStorage.setItem("items", JSON.stringify(itemsInLocalStorage));
}

function getItemsFromStorage() {
    let itemsInLocalStorage;

    if(localStorage.getItem("items") === null) {
        itemsInLocalStorage = [];
    } else {
        itemsInLocalStorage = JSON.parse(localStorage.getItem("items"));
    }

    return itemsInLocalStorage;
}

function onClickItem(e) {
    if(e.target.parentElement.classList.contains("remove-item")){
        removeItem(e.target.parentElement.parentElement);
    } else {
        
        setItemToEdit(e.target);
    }
}

function checkIfItemExists(item) {

    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);

}

function setItemToEdit(item) {

    isSetItem = true;

    itemList.querySelectorAll("li").forEach(i => i.classList.remove("edit-mode"));

    itemInput.value = item.textContent;
    item.classList.add("edit-mode");
    formBtn.innerHTML = "<i class='fa-solid fa-pen'></i> Update Item";
    formBtn.style.backgroundColor = "#228B22";

}

function removeItem(item) {
    
        if(confirm("Are you sure to delete?")){
            item.remove();

            removeItemFromStorage(item.textContent);

            resetUI();
        }
    
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage = itemsFromStorage.filter(i => i !== item);

    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems(e) {

    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }

    localStorage.removeItem("items");

    resetUI();
}

function filterItems(e) {
    const items = itemList.querySelectorAll("li");
    const text = e.target.value.toLowerCase();
    
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if(itemName.indexOf(text) != -1){
            item.style.display = "flex";
        }else {
            item.style.display = "none";
        }
    })
}

function resetUI() {

    itemInput.value = "";

    const items = itemList.querySelectorAll("li");

    if(items.length === 0){
        filter.style.display = "none";
        clearBtn.style.display = "none";
    } else {
        filter.style.display = "block";
        clearBtn.style.display = "block";
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
    formBtn.style.backgroundColor = "#333";

    isEditMode = false;
}

function init() {

    form.addEventListener("submit", onAddItemSubmit);
    itemList.addEventListener("click", onClickItem);
    clearBtn.addEventListener("click", clearItems);
    filter.addEventListener("input", filterItems);
    document.addEventListener("DOMContentLoaded", displayItems);

    resetUI();
}

init();



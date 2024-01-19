const itemList = document.getElementById("item-list");
const itemInput = document.getElementById("item-input");
const form = document.getElementById("item-form");
const clearBtn = document.getElementById("clear");
const filter = document.getElementById("filter");



function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    if(newItem === ""){
        alert("Please enter an item");
        return;
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

function addItemToLocalStorage(item){
    let itemsInLocalStorage;

    if(localStorage.getItem("items") === null) {
        itemsInLocalStorage = [];
    } else {
        itemsInLocalStorage = JSON.parse(localStorage.getItem("items"));
    }

    itemsInLocalStorage.push(item);

    localStorage.setItem("items", JSON.stringify(itemsInLocalStorage));
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

function removeItem(e) {
    
    if(e.target.parentElement.classList.contains("remove-item")){
        if(confirm("Are you sure to delete?")){
            e.target.parentElement.parentElement.remove();
            resetUI();
        }
    }
}

function clearItems(e) {

    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
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
    const items = itemList.querySelectorAll("li");

    if(items.length === 0){
        filter.style.display = "none";
        clearBtn.style.display = "none";
    } else {
        filter.style.display = "block";
        clearBtn.style.display = "block";
    }

}

form.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
filter.addEventListener("input", filterItems);


resetUI();

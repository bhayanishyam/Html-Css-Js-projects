let btnAdd = document.getElementById("add");
let inputTask = document.getElementById("inputTask");
let listContainer = document.getElementById("listContainer");

document.getElementById("add").addEventListener("click", () => {
  if (inputTask.value === "") {
    alert("Enter Task");
  }else {
    let list = document.createElement("li");
    list.innerText = inputTask.value;
    let del = document.createElement("button");
    del.innerHTML = "X";
    del.value = 'X';
    listContainer.appendChild(list);
    list.appendChild(del);
  }

  inputTask.value = "";
  saveData();


});

listContainer.addEventListener("click", function (e) {
    console.log(e.target);
  if(e.target.tagName === 'LI'){
        e.target.classList.toggle('checked');
        saveData();
  }else if(e.target.tagName === 'BUTTON'){
        e.target.parentElement.remove();
        saveData();
  }
}, false);

function saveData(){
    localStorage.setItem("task", listContainer.innerHTML);
}

function showData(){
    listContainer.innerHTML = localStorage.getItem("task");
}

showData();
let submit = document.querySelector("#submit");
let fname = document.querySelector("#fname");
let lname = document.querySelector("#lname");
let city = document.querySelector("#city");
let mobile = document.querySelector("#mobile");
let birthDate = document.querySelector("#birthDate");
let state = document.querySelector("#state");
let pinCode = document.querySelector("#pincode");
let country = document.querySelector("#country");
let form = document.querySelector(".user-form");
let table = document.querySelector("table");
let btnAddUser = document.querySelector(".btn-add");
let userData = document.querySelector(".user-data");
let notFoundMes = document.querySelector(".not-found");
let btnAddFist = document.querySelector('.btn-add-fist');
let searchText = document.querySelector('#search-text');
let search = document.querySelector("#search");


let user = {};

submit.addEventListener("click", () => {
  let startId = localStorage.key(localStorage.length - 1)
    ? Number.parseInt(localStorage.key(localStorage.length - 1))
    : 1000;
  user.id = startId + 1;
  user.fname = fname.value;
  user.lname = lname.value;
  user.birthDate = birthDate.value;
  user.mobile = mobile.value;
  user.address = address.value;
  user.city = city.value;
  user.pin = pinCode.value;
  user.state = state.value;
  user.country = country.value;

  createUser(user.id, user);
  clearInput();
  userData.classList.toggle("hide");
  form.classList.toggle("hide");
  location.reload();
});

btnAddUser.addEventListener("click", () => {
  userData.classList.toggle("hide");
  form.classList.toggle("hide");
  update.classList.toggle('hide');
});

let clearInput = () => {
  fname.value = "";
  lname.value = "";
  mobile.value = "";
  birthDate.value = "";
  address.value = "";
  city.value = "";
  pinCode.value = "";
  country.value = "";
  state.value = "";
};

let createUser = (id, user) => {
  localStorage.setItem(id, JSON.stringify(user));
};

let showData = (isForSearch) => {
  let length = localStorage.length;

  if (length == 0) {
    userData.classList.add("hide");
    notFoundMes.classList.toggle('hide');

  }else {

  notFoundMes.classList.add('hide');

  

  for (let i = 0; i < length; i++) {
    let tr = document.createElement("tr");
    let user = JSON.parse(localStorage.getItem(localStorage.key(i)));

    for (let key in user) {
      let td = document.createElement("td");
      td.textContent = user[key];
      tr.appendChild(td);
    }

    let td = document.createElement("td");

    //Delete Button
    let btnDel = document.createElement("button");
    btnDel.classList.add("btn-del");
    btnDel.innerHTML = "Delete";
    td.appendChild(btnDel);
    tr.appendChild(td);

    // Edit Button
    let btnEdit = document.createElement("button");
    btnEdit.classList.add("btn-edit");
    btnEdit.innerHTML = "Edit";
    td.appendChild(btnEdit);
    tr.appendChild(td);
    table.appendChild(tr);
}
  }
};


btnAddFist.addEventListener("click", ()=> {
  
  notFoundMes.classList.toggle('hide');
  form.classList.toggle("hide");
  update.classList.toggle('hide');
});

window.onload = showData();

// Delete
let trs = document.querySelectorAll("tr");

let deleteUser = (id) => {
  let ask = confirm("confirm to delete?");
  if (ask) {
    localStorage.removeItem(id);
    alert(`Successfully delete ${id} data!`);
    location.reload();
  }
};

// Edit
let update = document.querySelector("#update");

let updateUserId = 0;
let selectUser = (id) => {
  userData.classList.toggle("hide");
  form.classList.toggle("hide");
  submit.classList.toggle("hide");


  updateUserId = id;
  let user = JSON.parse(localStorage.getItem(id));

  fname.value = user.fname;
  lname.value = user.lname;
  mobile.value = user.mobile;
  birthDate.value = user.birthDate;
  address.value = user.address;
  city.value = user.city;
  pinCode.value = user.pin;
  country.value = user.country;
  state.value = user.state;
};

update.addEventListener("click", () => {
  user.id = updateUserId;
  user.fname = fname.value;
  user.lname = lname.value;
  user.birthDate = birthDate.value;
  user.mobile = mobile.value;
  user.address = address.value;
  user.city = city.value;
  user.pin = pinCode.value;
  user.state = state.value;
  user.country = country.value;

  createUser(user.id, user);
  clearInput();
  userData.classList.toggle("hide");
  form.classList.toggle("hide");
  location.reload();
});

// Selecting the row for Deleting of Editing
trs.forEach((tr) => {
  tr.addEventListener("click", (e) => {
    let userId = tr.firstChild.innerHTML;
    if (e.target.innerHTML == "Delete") {
      deleteUser(userId);
    } else if (e.target.innerHTML == "Edit") {
      selectUser(userId);
    }
  });
});


// search


search.addEventListener("click", ()=> {

  let tr = document.querySelector("tr");

  alert(table.removeChild(tr));
  alert(searchText.value);

});



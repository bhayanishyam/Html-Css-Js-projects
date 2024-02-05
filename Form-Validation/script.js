let name = document.querySelector("#user-name");
let email = document.querySelector("#user-email");
let number = document.querySelector("#user-number");
let psw = document.querySelector("#user-psw");
let cpsw = document.querySelector("#user-cpsw");

// error

let nameLength = document.querySelector(".length-name");
let numberLength = document.querySelector(".length-number");
let notMatch = document.querySelector(".cpsw-matched");
let emailError = document.querySelector(".email-error");
let pswLength = document.querySelector(".length-msg");
let pswLower = document.querySelector(".lower-msg");
let pswUpper = document.querySelector(".upper-msg");
let pswDigit = document.querySelector(".digit-msg");
let pswchar = document.querySelector(".char-msg");


let submit = document.querySelector("#submit");

submit.addEventListener("click", () => {
    isNull(cpsw.value) ? cpsw.focus() : cpsw.classList.remove("error");
    isNull(psw.value) ? psw.focus() : psw.classList.remove("error");
    isNull(number.value) ? number.focus() : number.classList.remove("error");
    isNull(email.value) ? email.focus() : email.classList.remove("error");
    isNull(name.value) ? name.focus() : name.classList.remove("error");
});

name.addEventListener("input", (e) => {
  e.target.value.length < 5
    ? nameLength.classList.remove("hide")
    : nameLength.classList.add("hide");
});

email.addEventListener("input", (e) => {
  !isEmail(e.target.value)
    ? emailError.classList.remove("hide")
    : emailError.classList.add("hide");
});

number.addEventListener("input", (e) => {
  e.target.value.length != 10
    ? numberLength.classList.remove("hide")
    : numberLength.classList.add("hide");
});

psw.addEventListener("input", (e) => {
  !isPassword(e.target.value)
    ? e.target.classList.add("error")
    : e.target.classList.remove("error");
});

cpsw.addEventListener("input", (e) => {
  e.target.value !== psw.value
    ? notMatch.classList.remove("hide")
    : notMatch.classList.add("hide");
});

const isNull = (data) => {
  return data.length <= 0;
};

const isEmail = (mail) => {
  return /^\w+@\S+\.\D{3}/.test(mail);
};

const isPassword = (psw) => {
  psw.length < 8
    ? pswLength.classList.remove("hide")
    : pswLength.classList.add("hide");
  !/[a-z]/.test(psw)
    ? pswLower.classList.remove("hide")
    : pswLower.classList.add("hide");
  !/[A-Z]/.test(psw)
    ? pswUpper.classList.remove("hide")
    : pswUpper.classList.add("hide");
  !/[0-9]/.test(psw)
    ? pswDigit.classList.remove("hide")
    : pswDigit.classList.add("hide");
  !/[!@#$%^&*]/.test(psw)
    ? pswchar.classList.remove("hide")
    : pswchar.classList.add("hide");

  return true;
};

function btnNumber(num) {
  let inputBox = document.getElementById("inputBox");
  if (num !== "=") {
    if (inputBox.innerText === "0") {
      if (!isOpretor(num)) {
        inputBox.innerText = num;
      }
    } else {
      if (isOpretor(inputBox.innerHTML.toString().at(-1)) && isOpretor(num)) {
        inputBox.innerText = inputBox.innerHTML.toString().slice(0, -1) + num;
      } else {
        inputBox.innerText = inputBox.innerText + num;
      }
    }
  } else {
    //Result 
    inputBox.innerText = Function("return " + inputBox.innerText)();
  }

  function isOpretor(val) {
    if (
      val === "+" ||
      val === "*" ||
      val === "-" ||
      val === "/" ||
      val === "."
    ) {
      return true;
    }
    return false;
  }
}

function clare() {
  inputBox.innerText = "0";
}

function removeOne() {
  inputBox.innerText = inputBox.innerHTML.toString().slice(0, -1);

  if(!inputBox.innerText) inputBox.innerText = '0'; 
  
}

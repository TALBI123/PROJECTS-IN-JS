let opertions = [...document.querySelector(".opertions").children];
let choices = [...document.querySelector(".choices").children];
let opertion_obj = document.querySelector(".opertion");
let num1_obj = document.querySelector(".number1");
let num2_obj = document.querySelector(".number2");
let arrOpertions = [
  { str: "ADD", op: "+" },
  { str: "SUBTRACT", op: "-" },
  { str: "MULTIPLY", op: "*" },
  { str: "DIVIDE", op: "/" },
];
let charOp;
let maxValue = 200;
let answer;
let win = new Audio("audio/correct.mp3");
let lose = new Audio("audio/wrong.mp3");
let randInt = () => Math.trunc(Math.random() * maxValue);
let fill = (opertion) => {
  num1_obj.textContent = randInt();
  num2_obj.textContent = randInt();
  opertion_obj.textContent = opertion;
  let index = ~~(Math.random() * choices.length);
  switch (opertion) {
    case "+":
      choices[index].textContent =
        +num1_obj.textContent + +num2_obj.textContent;
      break;
    case "-":
      choices[index].textContent =
        +num1_obj.textContent - +num2_obj.textContent;
      break;
    case "*":
      choices[index].textContent =
        +num1_obj.textContent * +num2_obj.textContent;
      break;
    case "/":
      choices[index].textContent =
        +num2_obj.textContent === 0
          ? "ERROR MATH"
          : (+num1_obj.textContent / +num2_obj.textContent).toFixed(2);
      break;
  }
  answer = +choices[index].textContent;
  for (let i = 0; i < choices.length; i++) {
    if (i !== index){
        let num1 = randInt(),num2 = randInt();
        switch(opertion){
            case '*':
                choices[i].textContent = num1*num2;
                break;
            case'/':
            choices[i].textContent = num2 === 0 ? "ERROR MATH"  : (num1 / num2).toFixed(2);
                break;
            default:
                choices[i].textContent = num1;
                break;
        }
    }
  }
};
//nav
opertions.forEach((opertion) => {
  opertion.addEventListener("click", () => {
    for (let i = 0; i < opertions.length; i++) {
      if (opertions[i].classList.contains("active"))
        opertions[i].classList.remove("active");
    }
    opertion.classList.add("active");
    for (let i = 0; i < arrOpertions.length; i++) {
      if (opertion.textContent === arrOpertions[i].str) {
        charOp = arrOpertions[i].op;
        break;
      }
    }
    fill(charOp);
  });
});
fill("+");
//choices
choices.forEach((choise) => {
  choise.addEventListener("click", () => {
    if (+choise.textContent === answer) win.play();
    else lose.play();
    fill(arrOpertions[ (() => {
        for(let i=0;i<opertions.length;i++){
            if(opertions[i].classList.contains('active'))
                return i;
        }
    })()].op);
  });
});
const cards = [...document.querySelector(".cards").children];
const container = document.querySelector(".container");
const referch = document.querySelector('.referch');
const start = document.querySelector(".start");
const move = document.querySelector(".move");
const objSec = document.querySelector(".sec");
const objMin = document.querySelector(".min");
let timer;
let back = [];
let obj_img1 = []; //array of object wih value without repeat
let img2 = []; //array of object wih value with repeat
let correct = [];
let count = 0;
let ind;
let sec = 60;
let min = 0;
let firstClick = true;
document.querySelector('.sec').textContent = sec;
let randInt = (value = obj_img1.length) => Math.trunc(Math.random() * value);
let time = () => {
  sec--;
  if(sec === -1){
    clearTimeout(timer);
    container.classList.add('disabled');
    return;
  }
  objSec.textContent = sec < 10 ? "0" + sec : sec;
};
for (let i = 0; i < cards.length / 2; i++)
  obj_img1.push({ img: `images/img${i + 1}.png`, rep: 2, value: i });
for (let i = 0; i < cards.length; i++) {
  let rand;
  do {
    rand = randInt();
    if (obj_img1[rand].rep === 0) continue;
  } while (obj_img1[rand].rep === 0);
  img2.push({ $img: obj_img1[rand].img, $value: obj_img1[rand].value });
  obj_img1[rand].rep--;
}
cards.forEach((card, index) => {
  back.push(card.children[card.children.length - 1].children[0]);
  back[index].style.background = `url(${img2[index].$img}) center/cover`;
});
start.addEventListener("click", () => {
  start.classList.add("clicked");
  setTimeout(() => {
    container.classList.remove("disabled");
    start.classList.add("disabled");
  }, 300);
});
let ispro = false;
cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    if(firstClick){
      timer = setInterval(time, 100);
      firstClick = false;
    }
    if (correct.includes(index) || ispro) return;
      card.classList.add("rotate");
    console.log("correct", correct);
    if (index !== ind) count++;
    if (count === 2) {
      count = 0;
      if (img2[index].$value === img2[ind].$value) {
        console.log("are the same");
        correct.push(index,ind);
      } else {
        ispro = true;
        setTimeout(() => {
          cards[ind].classList.remove("rotate");
          card.classList.remove("rotate");
          ispro = false;
        }, 1000);
        move.textContent = +move.textContent + 1;
      }
    } else ind = index;
  });
});
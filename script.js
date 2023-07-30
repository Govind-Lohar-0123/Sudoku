let del = document.querySelector(".delete");
let digits = document.querySelectorAll("span");
let mistake = document.querySelector(".mistake");
let boxes = document.querySelectorAll(".box");

/////*********fillArray**** */
const fill = [
    "8-6-1----",
    "--3-64-9-",
    "9-----816",
    "-8-396---",
    "7-2-4-3-9",
    "---572-8-",
    "521-----4",
    "-3-75-2--",
    "----2-1-5"
];
const solution = [
    "856917423",
    "213864597",
    "947235816",
    "185396724",
    "762148359",
    "394572681",
    "521683974",
    "439751268",
    "678429135"
];

let check=false;

let j = 0;
let t = 0;
window.onload=FillValue;
// ******arrayFillvalue******
function FillValue(){
for (let i = 0; i < fill.length; i++) {
    let temp = fill[i].split("");
    t = 0;
    for (; j < (i + 1) * (temp.length); j++) {
        boxes[j].setAttribute("data",`${i},${j},${t}`);
        if (temp[t] == "-") {
            boxes[j].innerHTML = "";
        }
        else {
            boxes[j].innerHTML = temp[t];

        }
        t++;
    }
}
}


// **********CONDITIONS OF FILLING SUDOKU*******
let data="";
function isCorrectDigit(value){
   let arr=data.split(",");
    let row=solution[arr[0]].split("");
    
    let ans=row[arr[2]];
   if(ans==value){
    return true;
    
   }
   return false;

}







// ********---ABOUT BOX FILLED------*****

boxes.forEach((box,i) => {
    if (box.innerHTML == "") {
        box.addEventListener("click", boxFill);
       
        
    }
})



// ******classRemove******


function classRemove() {
    boxes.forEach((box) => {
        box.classList.remove("select");

    })
}

let count=2;

let flag = true;
let play=true;
// *******boxFill******
function boxFill(box) {

    if(play){
    classRemove();
    box = box.target;
    box.classList.add("select");
    data=box.getAttribute("data");
    flag=true;
    count=2;
    digitClick(box);
    deleteDigit(box);
    }

}
// ******VALUES OF BUTTON******

function digitClick(box) {
    digits.forEach(
        (digit) => {
            digit.addEventListener("click", (event) => {
                
                if (box.classList.contains("select") && (flag) && (count)) {
                    let value = event.target.innerHTML;
                    box.innerHTML = value;
                    box.style.color="red";
                    count--;
                    
                    winner();
                    if (isCorrectDigit(value)) {
                        
                        flag = false;
                        box.style.color = "green";
                    }
                }
            })
        })
}











let mis=0;
// ********DELETE DIGIT****
function deleteDigit(box) {

    del.addEventListener("click", () => {
        let v=box.innerHTML;
        if (box.classList.contains("select") && (flag) && v!="" ) {
            box.innerHTML = "";
            count++;
            MISTAKE();
        }
    })
}

// *****mistakes******
function MISTAKE(){
    mis++;
   mistake.children[0].innerHTML=`${mis}`;
    if(mis==3){
        flag=false;
        play=false;

        let gameOver=document.createElement("div");
        let btn=document.createElement("button");
        gameOver.classList.add("gv");
        let cont=document.querySelector(".container");
        gameOver.innerHTML="Game Over";
        btn.innerHTML="Restart";
        cont.appendChild(gameOver);
        cont.appendChild(btn);
        restart();

    }
}
function restart(){
    document.querySelector("button").addEventListener("click",()=>{
        window.location.reload();
    })
}


let k=0;
let win=false;
// ********WINNER******
function winner(){
   boxes.forEach((box)=>{
    let value=box.innerHTML;
    let check=window.getComputedStyle(box).getPropertyValue("color");
    if(value=="" || check=="red"){
        win=true;
    }
   })
   if(!win){
    let w=document.createElement("div");
    w.classList.add("win");
    w.innerHTML="WINNER";
   console.log("win1")

    document.querySelector(".container").appendChild(w);
   }
   console.log("win")
  
}




document.addEventListener('DOMContentLoaded', function() {

  // window.onbeforeunload = function() {   // Предупреждение при обновлении/покидании страницы
  //   return "Вы уверены, что хотите обновить страницу? Все несохраненные данные будут потеряны.";   
  // };


let isDragging = false;
let isDraggingMob =false;
let currentElement;
let offsetX, offsetY, offsetXmob, offsetYmob;
let startScrollX, startScrollY;
let mouseScroll = false;
const marginTop = 50;    //Потом, чтобы отодвинуть её от верхнего края и засунуть шапку
const spaseforPuzzleX = 360;
const spaseforPuzzleY = 700;
let sec =0;
let minutForTimer = 0;
let secondForTimer = "";

let about =  document.getElementById('about');
let foScrol = document.getElementById('wrapGame');
let startGame = document.getElementById("startGame");
let endGame = document.getElementById("endGame");
let puzSVG =[];
puzSVG = document.getElementsByClassName('puzsvg');
let timer = document.querySelector('.timer');

let colors=[];
colors[0] = "#FFFF66";
colors[1] = "#CC3333";
colors[2] = "#FF33CC";                               //Просто цвета)
colors[3] = "#3300FF";
colors[4] = "#66FFFF";
colors[5] = "#33FF66";

let ReadyX =[140, 306, 153.6, 165.59, 273.59, 183.597, 354.183, 120.188, 294, 137,    99,  388, 126, 113, 81,      318, 35,  175, 75,  120, 908,     72,  246, 60,      161.996, 166.979, 80,      74.980,  486,    244,      43,      3,       1,        258,    224, 154.16,  132,   238.982, 132,      172, 185.992, 162, 131.99,  107,     82,      714.992, 964,     1071,    977,     689,     522,     204,     141, 103,     101,     95,     114,      272, 354,     444,   602,  5,   29,      53,  78,            101, 214,  396,     1014,   941,  534,    1014,     810, 628,   527,    510,     426,      440, 76,       65,    56,   45,  32,  64,  194, 208,     210, 202, 170  ];
let ReadyY =[305, 185, 216,   282,    420,    376.733, 406,     322,     342, 333.81, 324, 434, 235, 346, 333.733, 432, 203, 309, 302, 444, 360.333, 496, 359, 491.421, 354.423, 143.424, 440.993, 496.867, 561.807, 401.667, 437.667, 386.833, 402.839, 240.549, 305, 364.148, 355.9, 115.148, 200.729,  244, 296.232, 307, 292.427, 302.156, 352.833, 479.992, 580.667, 228.021, 251.444, 140.656, 64.9062, 415.427, 385, 391.667, 359.808, 272.808, 258.667, 326, 298.179, 414.24, 396, 370, 375.238, 379, 374.667,       216, 11.8, 192.155, 83.1583, 586, 558.238, 461.437, 492, 503.5, 524.732, 500.242, 466.809, 522, 488.732, 446.808, 482, 465, 414, 399, 400, 371.732, 348, 360, 328  ] ;

//  ^
//  L_ координаты для каждого субьекта относительно 0:0



 




for(let i=0; i<puzSVG.length; i++)        //В самом начале карта заполняется а потом разлетается
{
  document.getElementById("puz"+i).style.zIndex = 2000-i;
  // document.getElementById("puz"+i).firstElementChild.style.zIndex = 2000-i;
  document.getElementById("puz"+i).style.fill = colors[(Math.floor(Math.random()*10))%6];    
  document.getElementById("puz"+i).style.position = 'absolute';
  document.getElementById("puz"+i).style.left = ReadyX[i] + "px";
  document.getElementById("puz"+i).style.top = ReadyY[i] + "px";
  document.getElementById("puz"+i).classList.add('blockDrag');
}



startGame.addEventListener('click', ()=>{
  startGame.style.display = "none";
  timer.innerHTML = "0:00";
  sec=0;

  for(let i=0; i<puzSVG.length; i++)
  {
    puzSVG[i].style.left = (1200 + Math.random()*spaseforPuzzleX)+ "px";
    puzSVG[i].style.top = (marginTop + Math.random()*spaseforPuzzleY)+ "px";
    puzSVG[i].classList.remove('blockSVG');   // А вдруг :)
    puzSVG[i].classList.remove('blockDrag');  // По любому надо!
  }
  document.getElementById("puz66").style.left =  1220+ "px";


    let time = setInterval(()=>{
      sec++;
      if(endGame.style.display == "flex")
      {
        clearInterval(time);
      }
      else{
        minutForTimer = parseInt(sec/60);

        if(parseInt((sec%60)/10)==0)
        {
          secondForTimer = "0" + parseInt(sec%60);
        }
        else{
          secondForTimer = "" + parseInt(sec%60);
        }

        timer.innerHTML = minutForTimer + ":" + secondForTimer;
      }

    },1000);
  



});








foScrol.addEventListener('mousedown', (e) => {    //Двигатся по карте с помощью мыши
  mouseScroll=true;
  startScrollX = e.clientX + window.scrollX;
  startScrollY = e.clientY + window.scrollY;
});

foScrol.addEventListener('mousemove', (e) => {    //Двигатся по карте с помощью мыши
  if(mouseScroll == true)
    {
      window.scrollTo(startScrollX-e.clientX, startScrollY-e.clientY);
    }
});








document.addEventListener('mousedown', (e) => {         //Нажали и смотрим какой двигать
  const elements = document.getElementsByClassName('puzzle');
  for(let i=0; i<elements.length; i++)
  {
    if(elements[i] == e.target && !elements[i].parentElement.classList.contains('blockSVG') && !elements[i].parentElement.classList.contains('blockDrag'))
    {
      isDragging = true;
      currentElement = elements[i].parentElement;
      currentElement.style.position = 'absolute'; // Убедитесь, что элемент позиционируется абсолютно
      const rect = currentElement.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      return;
    }
  }
  
});

document.addEventListener('mousemove', (e) => {      // Двигаем субьект РФ + Выводим инфо о субьекте
    
  if(document.querySelector('.puzzle:hover'))
  {
    about.style.display='block';
    about.style.position = 'absolute';
    about.textContent = document.querySelector('.puzzle:hover').dataset.title;
    about.style.left = ((e.clientX - about.clientWidth/2)+window.scrollX) + "px";
    about.style.top = ((e.clientY-(about.clientHeight+30))+ window.scrollY) + "px";
  }
  else
  {
    about.style.display = 'none';
  }

  if (!isDragging) return;

  currentElement.style.left = ((e.clientX - offsetX) + window.scrollX) + 'px';
  currentElement.style.top = ((e.clientY - offsetY) + window.scrollY) + 'px';
});

document.addEventListener('mouseup', () => {        // Очистка после завершения перетаскивания 
  isDragging = false;
  mouseScroll = false;

  if(currentElement!=null)
  {
    let idEl = currentElement.id;
    let num=0;
    if(idEl.length==4) num = parseInt(idEl[idEl.length-1]);
    if(idEl.length==5) num = parseInt(idEl[idEl.length-2]+idEl[idEl.length-1]);
    
    if(parseInt(currentElement.style.left)>(ReadyX[num]-5) && parseInt(currentElement.style.left)<(ReadyX[num]+5) && parseInt(currentElement.style.top)>(ReadyY[num]-5) && parseInt(currentElement.style.top)<(ReadyY[num]+5) && startGame.style.display == "none")
    {
      currentElement.style.zIndex = 1000;
      currentElement.style.fill = 'Green';
      currentElement.style.left = ReadyX[num] + "px";
      currentElement.style.top = ReadyY[num] + "px";
      currentElement.classList.add('blockSVG');
      if(document.getElementsByClassName('blockSVG').length == 1)
      {
        endGame.style.display="flex";
        document.querySelector('.timeEnd').innerHTML = "За " + timer.innerHTML;
        document.querySelector('input#time').value = sec;
      }

    }
  }
  currentElement = null; 
});



document.getElementById("repeat").addEventListener('click', ()=>{
  this.location.reload();
});




document.addEventListener('touchstart', (e) => {         //Нажали и смотрим какой двигать
  console.log("touchstart");

  const elements = document.getElementsByClassName('puzzle');
  for(let i=0; i<elements.length; i++)
  {
    if(elements[i] == e.target && !elements[i].parentElement.classList.contains('blockSVG') && !elements[i].parentElement.classList.contains('blockDrag'))
    {
      isDraggingMob = true;
      currentElement = elements[i].parentElement;
      currentElement.style.position = 'absolute'; // Убедитесь, что элемент позиционируется абсолютно
      const rect = currentElement.getBoundingClientRect();
      offsetXmob = e.targetTouches[0].clientX - rect.left;
      offsetYmob = e.targetTouches[0].clientY - rect.top;
      return;
    }
  }
  
});


document.addEventListener('touchmove', (e) => {   
    console.log("touchmove");
  if (!isDraggingMob) return;


  
    about.style.display='block';
    about.style.position = 'absolute';
    about.textContent = currentElement.firstElementChild.dataset.title;
    about.style.left = ((e.targetTouches[0].clientX - about.clientWidth/2)+window.scrollX) + "px";
    about.style.top = ((e.targetTouches[0].clientY-(about.clientHeight+80))+ window.scrollY) + "px";

  

  

  currentElement.style.left = (e.targetTouches[0].pageX - offsetXmob) + 'px';
  currentElement.style.top =  (e.targetTouches[0].pageY - offsetYmob) + 'px';
});


document.addEventListener('touchend', () => {        // Очистка после завершения перетаскивания 
  console.log("touchend");

  isDraggingMob = false;
  about.style.display='none';

  if(currentElement!=null)
  {
    let idEl = currentElement.id;
    let num=0;
    if(idEl.length==4) num = parseInt(idEl[idEl.length-1]);
    if(idEl.length==5) num = parseInt(idEl[idEl.length-2]+idEl[idEl.length-1]);
    
    if(parseInt(currentElement.style.left)>(ReadyX[num]-15) && parseInt(currentElement.style.left)<(ReadyX[num]+15) && parseInt(currentElement.style.top)>(ReadyY[num]-15) && parseInt(currentElement.style.top)<(ReadyY[num]+15) && startGame.style.display == "none")
    {
      currentElement.style.zIndex = 1000;
      currentElement.style.fill = 'Green';
      currentElement.style.left = ReadyX[num] + "px";
      currentElement.style.top = ReadyY[num] + "px";
      currentElement.classList.add('blockSVG');
      currentElement.classList.add("AcceptTouchAction");
      currentElement.firstElementChild.classList.add("AcceptTouchAction");
      if(document.getElementsByClassName('blockSVG').length == 89)
      {
        endGame.style.display="flex";
        document.querySelector('.timeEnd').innerHTML = "За " + timer.innerHTML;
      }

    }
  }
  currentElement = null; 
});









});
document.addEventListener('DOMContentLoaded', function() {

  // window.onbeforeunload = function() {   // Предупреждение при обновлении/покидании страницы
  //   return "Вы уверены, что хотите обновить страницу? Все несохраненные данные будут потеряны.";   
  // };


let isDragging = false;
let isDraggingMob =false;
let currentElement;
let offsetX, offsetY, offsetXmob, offsetYmob;
//let startScrollX, startScrollY;
//let mouseScroll = false;
const marginTop = 50;    //Потом, чтобы отодвинуть её от верхнего края и засунуть шапку
const spaseforPuzzleX = 360;
const spaseforPuzzleY = 700;
let sec =0;
let minutForTimer = 0;
let secondForTimer = "";

let about =  document.getElementById('about');
//let foScrol = document.getElementById('wrapGame');
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

let ReadyX =[538.615, 836.448, 341.156, 881.951,252.507, 96.3036,768.333, 319.806,383.822, 960.208,375.604, 760.383, 794.115,502.078, 812.85, 652.635,381.354,192.567,785.005,959.125,585.602,379.435,530.381,855.583,439    ,450.094    ];
let ReadyY =[391.865, 507.042, 252.448, 376.08, 321.991, 236.964,428.385, 462.38, 520.771, 260.483,333.615, 97.9833, 125.479,595.369,365.758, 306.625,152.771,426.52, 247.306,425.101,547.769,110.268,570.155,217.169,656.964,344.021  ];

//  ^
//  L_ координаты для каждого субьекта относительно 0:0






for(let i=0; i<puzSVG.length; i++)        //В самом начале карта заполняется а потом разлетается
{
    let curPuz = document.getElementById("puz"+i);
    curPuz.style.fill = colors[(Math.floor(Math.random()*10))%6];    
    curPuz.style.position = 'absolute';
    curPuz.style.left = ReadyX[i] + "px";
    curPuz.style.top = ReadyY[i] + "px";
    curPuz.classList.add('blockDrag');
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








// foScrol.addEventListener('mousedown', (e) => {    //Двигатся по карте с помощью мыши
//   mouseScroll=true;
//   startScrollX = e.clientX + window.scrollX;
//   startScrollY = e.clientY + window.scrollY;
// });

// foScrol.addEventListener('mousemove', (e) => {    //Двигатся по карте с помощью мыши
//   if(mouseScroll == true)
//     {
//       window.scrollTo(startScrollX-e.clientX, startScrollY-e.clientY);
//     }
// });








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
  //mouseScroll = false;

  if(currentElement!=null)
  {
    let idEl = currentElement.id;
    let num=0;
    if(idEl.length==4) num = parseInt(idEl[idEl.length-1]);                       //Пришёл через 3 месяца, не понял чё за приколы
    if(idEl.length==5) num = parseInt(idEl[idEl.length-2]+idEl[idEl.length-1]);   //Теперь понял
    
    if(parseInt(currentElement.style.left)>(ReadyX[num]-5) && parseInt(currentElement.style.left)<(ReadyX[num]+5) && parseInt(currentElement.style.top)>(ReadyY[num]-5) && parseInt(currentElement.style.top)<(ReadyY[num]+5) && startGame.style.display == "none")
    {
      currentElement.style.zIndex = 1000;
      currentElement.style.fill = 'Green';
      currentElement.style.left = ReadyX[num] + "px";
      currentElement.style.top = ReadyY[num] + "px";
      currentElement.classList.add('blockSVG');
      if(document.getElementsByClassName('blockSVG').length == 5)
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


(function(){
    var matches = 0;
    var images =[];
    var imgMatchSign = document.querySelector("#imgMatchSign");
    var flippedCards = []; 
    var modalGamerOver = document.querySelector("#modalGameOver");
    var pontuacao = 0;

    for(var i = 0; i < 16; i++){
            var img = {
                src: "imagens/"+ i +".jpg",
                id: i % 8
        }; 

        images.push(img);
    }
	         startGame();

	function startGame(){
            matches = 0;
            flippedCards = [];
            images = radomSort(images);
            var frontFaces = document.getElementsByClassName("front");
            var backFaces = document.getElementsByClassName("back");

		for(var i = 0; i < 16; i++){
                frontFaces[i].classList.remove("flipped", "match");
                backFaces[i].classList.remove("flipped", "match");
                var card = document.querySelector("#card" + i);
                card.style.left = (i % 8 === 0) ? 5 + "px" : (i % 8) * 165 + 5 + "px";
                card.style.top = i < 8 ? 5 + "px" : 250 + "px";
                card .addEventListener("click", flipCard, false);
            
                frontFaces[i].style.background = "url('"+ images[i].src +"')";
                frontFaces[i].setAttribute("id", images[i].id);
		}
	}
    function radomSort(oldArray){

        var newArray = [];
        
            while(newArray.length !== oldArray.length){
        
              var i = Math.floor(Math.random()*oldArray.length);
        
            if (newArray.indexOf(oldArray[i]) < 0){
                newArray.push(oldArray[i]);
            }
        }

        return newArray;
    }
    function flipCard(){       
        
            if(flippedCards.length < 2){           
                var faces = this.getElementsByClassName("face");

               if(faces[0].classList.length >2){
                    return;
                }

                faces[0].classList.toggle("flipped");
                faces[1].classList.toggle("flipped");
                flippedCards.push(this);
                if(flippedCards.length === 2){
                    if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id ){
                        flippedCards[0].childNodes[1].classList.toggle("match");
                        flippedCards[0].childNodes[3].classList.toggle("match");
                        flippedCards[1].childNodes[1].classList.toggle("match");
                        flippedCards[1].childNodes[3].classList.toggle("match");

                        matchCardSign();

                        matches++;

                        pontuacao++;
                        document.querySelector('#pontuacao').innerHTML = pontuacao;
                        if(pontuacao === 8){
                           window.location.reload();
                        }                   
                        flippedCards = [];

                        if(matches === 8){
                            gameOver();
                        }
                    }
                }
            } 

            else{
                flippedCards[0].childNodes[1].classList.toggle("flipped");
                flippedCards[0].childNodes[3].classList.toggle("flipped");
                flippedCards[1].childNodes[1].classList.toggle("flipped");
                flippedCards[1].childNodes[3].classList.toggle("flipped");
                flippedCards = [];
        }
    }

    function matchCardSign(){
        imgMatchSign.style.zIndex = 1;
        imgMatchSign.style.top = 150 + "px";
        imgMatchSign.style.opacity = 0;
        setTimeout(function(){
            imgMatchSign.style.zIndex = -1;
            imgMatchSign.style.top = 50 + "px";
            imgMatchSign.style.opacity = 1;
        },1500)
    }
}());

"use strict";

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

document.form_main.start.onclick = () => start();
document.form_main.pause.onclick = () => pause();
document.form_main.reset.onclick = () => reset();

function start() {
  pause();
  cron = setInterval(() => { timer(); }, 10);
}

function pause() {
  clearInterval(cron);
}

function reset() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  document.getElementById('millisecond').innerText = '000';
}

function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
}

function returnData(input) {
  return input > 10 ? input : `0${input}`
}
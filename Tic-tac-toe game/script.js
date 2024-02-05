let boxs = document.querySelectorAll('.box');
let playZone = document.getElementById("play-zone");
let btnResetGame = document.querySelector('#btn-reset');
let btnNew = document.querySelector('.btn-new');
let playerName = document.querySelector('#player-name');
let result = document.querySelector('.result');
let selectBtns = document.querySelector('#select-btns');
let select = document.querySelector('.select');
let player1Display = document.querySelector('#player1-display');
let player2Display = document.querySelector('#player2-display');
let turn = true;
let player1 = '';
let player2 = '';

let winPatten = [


[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

btnResetGame.addEventListener("click", ()=> { restartGame() });

boxs.forEach( (box)=> {
    box.addEventListener('click', ()=> {
        if(turn){
            box.innerText = player1;
            turn = false;
        }else {
            box.innerText = player2;
            turn = true;
        }
        box.disabled = true;
        whoIsWin();
    })

})




function whoIsWin(){

    for(let patten of winPatten){
        let value1 = boxs[patten[0]].innerHTML;
        let value2 = boxs[patten[1]].innerHTML;
        let value3 = boxs[patten[2]].innerHTML;
            
        if( value1 && value2 &&  value3 ){

            if(value1 == value2 && value2 == value3){
                playerName.innerText = value1;
                result.classList.remove('hide');

            }
        }
           
    }

}

btnNew.addEventListener('click', ()=> {
    restartGame();
    result.classList.add('hide');
    select.classList.remove('hide');



})

selectBtns.addEventListener('click' , (e)=> {
    if(e.target.innerText == 'X'){
        player1 = 'x';
        player2 = 'o';
    }else if(e.target.innerText == 'O'){
        player1 = 'o';
        player2 = 'x';
    }

    player1Display.innerHTML = player1;
    player2Display.innerHTML = player2;

    select.classList.add('hide');
    
});

let restartGame = ()=> {
    boxs.forEach( (box)=> {
        box.innerHTML = '';
        box.disabled = false;
    select.classList.remove('hide');
    player1Display.innerHTML = '';
    player2Display.innerHTML = '';


    })
};

let textarea = document.querySelector('#user-text');
let demoText = document.querySelector('.text-zone');
let p = document.querySelector('#text'); 
let input = document.querySelector('#input-text');
let timeTag = document.querySelector('#time');
let error = document.querySelector("#error");
let accuracy = document.querySelector("#accuracy");
let speed = document.querySelector('#speed');
let tryAgain = document.querySelector('#try-again');
let sentences = [ "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "How razorback-jumping frogs can level six piqued gymnasts!",
    "Crazy Fredrick bought many very exquisite opal jewels.",
    "We promptly judged antique ivory buckles for the next prize.",
    "Jinxed wizards pluck ivy from the big quilt.",
    "The five boxing wizards jump quickly.",
    "Jackdaws love my big sphinx of quartz.",
    "The job requires extra pluck and zeal from every young wage earner.",
    "A quick movement of the enemy will jeopardize six gunboats.",
    "All questions asked by five watch experts amazed the judge.",
    "The public was amazed to view the quickness and dexterity of the juggler.",
    "Six of the women quietly gave back prizes to the judge.",
    "The sky is clear; the stars are twinkling.",
    "Three years later, the coffin was still full of Jello.",
    "The fish listened intently to what the frogs had to say.",
    "A kangaroo is really just a rabbit on steroids.",
    "As he entered the church he could hear the soft voice of someone whispering into a cell phone.",
    "He found the chocolate covered roaches quite tasty.",
    "The beauty of the sunset was obscured by the industrial cranes."
]

let currentIndex = 0;
let countError = 0;
let timer,
maxTime = 60,
timeLeft = maxTime,
isTyping = false
totalChar = 0,
lineCount = (Math.random()*20).toFixed(0),
wpm = 0;


tryAgain.addEventListener('click', ()=> {

    location.reload();
});

document.addEventListener('keydown', () => input.focus());
p.addEventListener('click', () => input.focus());




input.addEventListener("input", () => {

    if(!isTyping){
        timer = setInterval(startTimer, 1000);
        isTyping = true;
    }
    let orignalChar = document.querySelectorAll('span');
    let inputChar = input.value.split('')[currentIndex];

    if(currentIndex == totalChar-1){
        lineCount = (Math.random()*20).toFixed(0);
        showText();
    }

    if(inputChar == null){
        currentIndex--;
        if(orignalChar[currentIndex].classList.contains('incorrect')) { countError--; }
        orignalChar[currentIndex].classList.remove('correct', 'incorrect');

        
    }else{
    
        if(orignalChar[currentIndex].innerHTML === inputChar){
            orignalChar[currentIndex].classList.add('correct');
            }else {
            orignalChar[currentIndex].classList.add('incorrect');
            countError++;
        }
        currentIndex++;        

    }
    wpm = Math.round(((currentIndex - countError) / 5)  / (maxTime - timeLeft) * 60);
    wpm = (wpm < 0) || wpm === NaN || wpm === Infinity ? 0 : wpm;
    error.innerHTML = countError;
    accuracy.innerHTML = (((currentIndex - countError)/ currentIndex)*100).toFixed(2) + "%";
    orignalChar.forEach( span => span.classList.remove('active') );
    orignalChar[currentIndex].classList.add('active');
    speed.innerHTML = wpm;


})

const stopTest = ()=> {

    input.disabled = true;
}


function startTimer(){

    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerHTML = timeLeft;
        
    }else {
        clearInterval(timer);
        stopTest();
    }
}



const showText = ()=>{

    let charList = [...sentences[lineCount]];
    totalChar += charList.length;

    charList.forEach(element => {
        let span = document.createElement('span');
        span.innerHTML = element;
        p.append(span);
    });

    p.append(document.createElement('br'));
    
}

showText();
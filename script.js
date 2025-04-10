let number
let totalSeconds = 8 ;
let numroosters = 7 ;
let secondsRemaining ;
let intervalID ;

let numberText = document.getElementById("numberfield") ;
let chicken_img = document.getElementById("chickenImg") ;
let inputblock = document.querySelector(".inputblock") ;

numberText.innerHTML = totalSeconds ;


function startCountdown () {

    secondsRemaining = totalSeconds ;
    intervalID = setInterval (ticktock, 1000) ;

}

function ticktock () {
    if (secondsRemaining==totalSeconds){
        chicken_img.src = "chicken_7.jpg" ;
        
    }
    totalSeconds -= 1 ;
    console.log(totalSeconds) ;
    numberText.innerHTML= totalSeconds ;
    if (totalSeconds<=0){
        clearInterval(intervalID) ;
        chicken_img.src = "rooster.jpg" ;
        loadForm() ;
        
    }


}

function loadForm () {
    
    inputblock.innerHTML =
        `<h2>Your Guess</h2>
        <form >
        <input type="number" id="howMany" name="howMany" value=0><br><br>
        <input type="submit" value="Submit" onclick="getGuess()">
        </form > `;

    
}

function getGuess(){
    console.log("You are in get guess");
    let guessID = document.getElementById("howMany") ;
    let varguess = guessID.value ;

    console.log("You are in get guess", varguess);
    if (varguess != numroosters){
        inputblock.innerHTML =
        `<audio id="myAudio">
            <source src="rooster_crow.mp3" type="audio/mpeg">
        </audio>
        <h2>Sorry<h2> 
        <h3>See you later</h3>
        <Button class="formButton" onclick="playAgain()">Play Again</Button
        `;
        
        let myAudio = document.getElementById("myAudio") ;
        myAudio.play() ;
    } else {
        inputblock.innerHTML =`
        <audio id="myAudio">
            <source src="rooster_crow.mp3" type="audio/mpeg">
        </audio>
        <h2>Correct</h2>
        <h3>See you later</h3>
        <Button class="formButton" onclick="playAgain()">Play Again</Button>
        `;
        let myAudio = document.getElementById("myAudio") ;
        myAudio.play() ;

    }
    

    


}

function playAgain(){
    window.location.reload() ;
}
let number
let totalSeconds = 8 ;
let numroosters = 2 ;
let secondsRemaining ;
let intervalID ;

let numberText = document.getElementById("numberfield") ;
let chicken_img = document.getElementById("chickenImg") ;
let inputblock = document.querySelector(".inputblock") ;
let imageArr=[] ;
let imageCounts=[] ;
let currentJPG = "images/chicken_7.jpg" ;

numberText.innerHTML = totalSeconds ;




function getFiles() {
    let i=0 ;
    $ajaxUtils.sendGetRequest ('images/images.txt', function(responseText){
            //Split the csv into rows
        const rows = responseText.split('\n');
        for (row of rows) {
                //Split the row into each of the comma separated values
                let cols = row.split(',') ;
                if(cols[0].length < 5) {
                    continue ;
                }
                imageArr.push (cols[0]) ;
                imageCounts.push (cols[1]) ;
        }

    }, false) ;
    document.getElementById("loadButton").classList.remove("loadNew") ;
    return 0 ;
} 


function loadNew () {

    // use getImage to select random image from stack and load numroosters
    let thisRun = getImage() ;
    currentJPG = thisRun[0] ;
    numroosters = Number(thisRun[1]) ;
    secondsRemaining = totalSeconds ;
    document.getElementById("loadButton").classList.add("loadNew") ;

}
function startCountdown () {

    // use getImage to select random image from stack and load numroosters
    secondsRemaining = totalSeconds ;
    intervalID = setInterval (ticktock, 1000) ;

}

function ticktock () {
    console.log("in ticktock") ;
    if (secondsRemaining==totalSeconds){
        chicken_img.src = currentJPG ;
        
    }
    secondsRemaining -= 1 ;
    document.getElementById("numberfield").innerHTML=`${secondsRemaining} s` ;
    if (secondsRemaining<=0){
        clearInterval(intervalID) ;
        chicken_img.src = "rooster.jpg" ;
        loadForm() ;
        
    }


}

function loadForm () {
    
    inputblock.innerHTML =
        `<h2>How Many Chickens?</h2>
        <form >
        <label>Your Guess</label>
        <input type="number" id="howMany" name="howMany" value=0><br><br>
        <input type="submit" value="Submit" onclick="getGuess()">
        </form > `;

    
}

function getGuess(){
    let guessID = document.getElementById("howMany") ;
    let varguess = guessID.value ;
    if (varguess != numroosters){
        inputblock.innerHTML =
        `<audio id="myAudio">
            <source src="rooster_crow.mp3" type="audio/mpeg">
        </audio>
        <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXVyb3VvMHoxb25zZGZwZnVqbzRuMzg3aDBybHp1YzZ2eWt3Z2xucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yhab3ESWEhJNCyBzH2/giphy.gif" alt="chicken.gif" style="width:256px;height:256px;"/> 
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
        <img src="https://media.giphy.com/media/fPIo1tm5fokxy/giphy.gif?cid=ecf05e474615xenk30smgbbcn2l2r4z7z7mg5zcdl4ssrprl&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="chicken.gif" style="width:256px;height:220px;"/> 
        <h2>Congrats, you get free parking</h2>
        <h3>See you later</h3>
        <Button class="formButton" onclick="playAgain()">Play Again</Button>
        `;
        let myAudio = document.getElementById("myAudio") ;
        myAudio.play() ;

    }
    

    


}

function playAgain(){
    inputblock.innerHTML =
    `<div class="numberblock">
                    <h2>Seconds Remaining</h2>
                    <h3 id="numberfield">${totalSeconds} s</h3>
                    <button class="startButton" id="loadButton" onclick="loadNew()">Load New Photo</button>
                    <button class="startButton" id="startButton" onclick="startCountdown()">Start Countdown</button>
                    
    </div>` ;
}

function getImage (){
    let numImages = imageArr.length ;
    let randimage = Math.floor(Math.random() * numImages) ;
    if (randimage >= numImages) {
        randimage = numImages - 1 ;
    }
    console.log(randimage, imageArr[randimage]) ;
    return ([imageArr[randimage],imageCounts[randimage]]) ;
}

getFiles() ;